var
  _          = require('lodash'),
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  path       = require('path'),
  URL        = require('url'),
  utils      = require('fs-utils'),

  Links      = require('./links'),
  Slug       = require('./slug')
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

  // If the slug is not properly normalized, normalize it and redirect
  if (request.params.slug != slug) {
    return response.redirect(path);
  }

  // Now, look for the valid slug.
  try {
    var $ = cheerio.load(fs.readFileSync(path + '.html', 'utf8'));
    var meta = utils.exists(path + '.json') ?
        utils.readJSONSync(path + '.json') : { data: [], tags: [] };

    // Clean & parse the article's HTML fragment
    $('script').remove(); // Remove all script tags.

    return response
      .status(200)
      .format({
        '*/*': function() {
          response.send({
            html: $.html(),
            meta: meta,
            missing_links: Links.missing_for(slug)
          });
        }
      })
    ;
  } catch (err) {
    console.log(err.message);
    return response.status(404).send('Article not found.');
  }
});
article.post('/:slug', function(request, response) {
  var slug = Slug.normalize(request.params.slug),
      path = article_path(slug);

  var $ = cheerio.load(request.body.html);
  $('script').remove(); // Remove all <script> tags.

  var wiki_links = extract_wiki_links(
    URL.parse(request.protocol + '://' + request.get('host') + request.originalUrl), $
  );
  Links.set(slug, wiki_links);

  var meta = Object.assign({ data: [], tags: [] }, request.body.meta);

  try {
    fs.writeFileSync(path + '.html', $.html(), 'utf8');
    fs.writeFileSync(path + '.json', JSON.stringify(meta), 'utf8');

    return response.status(200).send({
      html: $.html(),
      meta: meta,
      missing_links: Links.missing_for(slug)
    });
  } catch (err) {
    console.log(err.message);
    return response.status(500).send('Unable to save article.');
  }
});

function article_path(slug) {
  return path.resolve(paths.articles, slug);
};
function extract_wiki_links(request_url, $) {
  var wiki_url = URL.parse(request_url);
  return _.difference(_.uniq(_.map($('a'), function(link) {
    var link_url = URL.parse(link.attribs.href);
    return (!link_url.hostname || link_url.hostname == wiki_url.hostname)
      ? Slug.normalize(link_url.pathname)
      : ''
    ;
  })), ['']); // << remove any blank entries (blanks are created for external links)
};