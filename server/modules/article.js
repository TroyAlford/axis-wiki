var
  _          = require('lodash'),
  beautify   = require('js-beautify').html,
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  path       = require('path'),
  URL        = require('url'),
  utils      = require('fs-utils'),

  Links      = require('./links'),
  Slug       = require('./slug'),
  Tags       = require('./tags')
;

var paths = {
  articles: path.resolve(__dirname, '../../content/articles'),
};

var article = module.exports = express();
article.use(bodyParser.json()); // Parses application/json
article.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

article.get('/:slug', function(request, response) {
  var slug = Slug.normalize(request.params.slug),
      path = article_path(slug);

  if (request.params.slug != slug) {// Redirect to normalized slug link
    return response.redirect(slug);
  }

  // Now, look for the valid slug.
  var article = load_article(slug);
  if (!article)
    return response.status(404).send('Article not found');

  var $ = cheerio.load(article.html);
  decorate_links($, article.missing_links, URL.parse(request_url(request)));

  article.html = beautify($.html(), beauty_options);

  return response.status(200).send(article);
});
article.post('/:slug', function(request, response) {
  var slug = Slug.normalize(request.params.slug),
      path = article_path(slug),
      wiki_url = URL.parse(request_url(request));

  var article = {
    html: request.body.html,
    meta: Object.assign({ data: [], tags: [] }, request.body.meta)
  };

  if (article.meta.tags.length)
    article.meta.tags = _.sortBy(_.uniq(article.meta.tags));

  var $ = cheerio.load(article.html);
  $('script').remove(); // Remove all <script> tags.
  $('a').removeAttr('target').removeClass('wiki-missing wiki-external');
  $('a').each(function() {
    var wiki_link = to_wiki_link(URL.parse(request_url(request)), URL.parse(this.attribs.href));
    if (wiki_link && wiki_link != this.attribs.href)
      $(this).attr('href', wiki_link);
  }); // Reduce local links to slug-only.
  article.html = $.html();

  Links.set(slug, extract_wiki_links(wiki_url, $));
  Tags.set(slug, article.meta.tags);

  try {
    fs.writeFileSync(path + '.html', article.html);
    fs.writeFileSync(path + '.json', JSON.stringify(article.meta));

    // Before sending back to the client, update the missing_links
    article.missing_links = Links.missing_for(slug);
    decorate_links($, article.missing_links, wiki_url);
    article.html = beautify($.html(), beauty_options);

    return response.status(200).send(article);
  } catch (err) {
    console.log(err.message);
    return response.status(500).send('Unable to save article.');
  }
});

function article_path(slug) {
  return path.resolve(paths.articles, slug);
}
function extract_wiki_links(request_url, $) {
  return _.difference(_.uniq(_.map($('a'), function(link) {
    return to_wiki_link(request_url, URL.parse(link.attribs.href));
  })), ['']); // << remove any blank entries (blanks are created for external links)
}
function load_article(slug) {
  var path = article_path(slug);
  try {
    var html = fs.readFileSync(path + '.html');
    var meta = utils.exists(path + '.json') ?
      utils.readJSONSync(path + '.json') : { data: [], tags: [] };

    return {
      html: html,
      meta: meta,
      missing_links: Links.missing_for(slug)
    };
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
    ? Slug.normalize(link_url.pathname)
    : ''
  ;
}

var beauty_options = {
  indent_size: 2,
  indent_char: ' ',
  eol: '\n',
  indent_level: 0,
  indent_with_tabs: false,
  max_preserve_newlines: 0,
  end_with_newline: true
};