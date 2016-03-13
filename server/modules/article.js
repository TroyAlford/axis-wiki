import _                    from 'lodash'
import { html as beautify } from 'js-beautify'
import bodyParser           from 'body-parser'
import cheerio              from 'cheerio'
import express              from 'express'
import fs                   from 'fs'
import path                 from 'path'
import URL                  from 'url'
import utils                from 'fs-utils'

import Config               from './config'
import Links                from './links'
import Slug                 from './slug'
import Tags                 from './tags'

var folders = Config.folders();

var article = module.exports = express();
article.use(bodyParser.json()); // Parses application/json
article.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

article.get('/:slug', function(request, response) {
  var slug = Links.resolve(Slug.normalize(request.params.slug));

  if (request.params.slug != slug) // Redirect to normalized slug link
    return response.redirect(slug);

  // Now, look for the valid slug.
  var article = load_article(slug);
  if (!article)
    return response.status(404).send({
      html: (
        `<h1>${_.startCase(slug)}</h1>\n` +
        `<p>This article does not exist! Click <strong>edit</strong> to create it!</p>`
      )
    });

  article.html = this.html(slug, URL.parse(request_url(request)));

  return response.status(200).send(article);
}.bind(article));
article.post('/:slug', function(request, response) {
  var slug = Slug.normalize(request.params.slug),
      path = article_path(slug),
      wiki_url = URL.parse(request_url(request)),
      posted = request.body
  ;

  var article = {
    html: posted.html || '',
    aliases: posted.aliases || [],
    data: posted.data || [],
    tags: posted.tags || []
  };

  if (article.tags.length)
    article.tags = _.sortBy(_.uniq(article.tags));

  var $ = cheerio.load(article.html);
  $('script').remove(); // Remove all <script> tags.
  $('a').removeAttr('target').removeAttr('class');
  $('a').each(function() {
    var wiki_link = to_wiki_link(URL.parse(request_url(request)), URL.parse(this.attribs.href));
    if (wiki_link && wiki_link != this.attribs.href)
      $(this).attr('href', wiki_link);
  }); // Reduce local links to slug-only.
  article.html = $.html();

  Links.alias(slug, article.aliases);
  Links.set(slug, extract_wiki_links(wiki_url, $));
  Tags.set(slug, article.tags);

  try {
    article.missing_links = Links.missing_for(slug);
    decorate_links($, article.missing_links, wiki_url);
    article.html = beautify($.html(), beauty_options);
    article.aliases = Links.alias(slug);

    fs.writeFileSync(`${path}.html`, article.html);
    fs.writeFileSync(`${path}.json`, JSON.stringify({
      aliases: article.aliases,
      data: article.data,
      tags: article.tags
    }));

    return response.status(200).send(article);
  } catch (err) {
    console.log(err.message);
    return response.status(500).send('Unable to save article.');
  }
});

article.html = function(slug, url) {
  var path = article_path(slug),
      article = load_article(slug);

  if (!article) return null;

  var $ = cheerio.load(article.html);
  decorate_links($, article.missing_links, url);
  return beautify($.html(), beauty_options);
};

function article_path(slug) {
  return path.resolve(folders.articles, slug);
}
function extract_wiki_links(request_url, $) {
  return _.difference(_.uniq(_.map($('a'), function(link) {
    return to_wiki_link(request_url, URL.parse(link.attribs.href));
  })), ['']); // << remove any blank entries (blanks are created for external links)
}
function load_article(slug) {
  var path = article_path(slug);
  try {
    let meta = utils.exists(path + '.json')
      ? utils.readJSONSync(path + '.json')
      : { aliases: [], data: [], tags: [] };

    return Object.assign(meta, {
      html: fs.readFileSync(path + '.html'),
      children: Tags.articles_tagged(slug),
      missing_links: Links.missing_for(slug)
    });
  } catch (err) {
    if (err.code == 'ENOENT') {
      console.log('404: Article "' + slug + '" not found.');
      return null;
    } else {
      console.log(err);
    }
  }
}
function decorate_links($, missing_links, wiki_url) {
  $('a').each(function() { // Add 'wiki-missing' class, where appropriate, before send
    var link_url = URL.parse($(this).attr('href'));
    if (link_url.hostname && link_url.hostname != wiki_url.hostname) {
      $(this).attr('target', '_new').addClass('wiki-external');
    } else if (_.includes(missing_links, to_wiki_link(wiki_url, link_url))) {
      $(this).addClass('wiki-missing');
    }
  });
}
function request_url(request) {
  return URL.parse(request.protocol + '://' + request.get('host') + request.originalUrl);
}
function to_wiki_link(wiki_url, link_url) {
  return (!link_url.hostname || link_url.hostname == wiki_url.hostname)
    ? Slug.normalize(link_url.pathname, true)
    : ''
  ;
}

var beauty_options = {
  indent_size: 2,                            // force 2-space indentation
  indent_char: ' ', indent_with_tabs: false, // force indentation with spaces
  max_preserve_newlines: 0,                  // don't allow multiple newlines
  eol: '\n', end_with_newline: true,         // force trailing \n
  wrap_line_length: 0                        // enable forced wrapping
};