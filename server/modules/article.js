var
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  gulp       = require('gulp'),
  path       = require('path'),
  utils      = require('fs-utils')
;

var paths = {
  articles: path.resolve(__dirname, '../../content/articles')
};

var article = module.exports = express();
article.use(bodyParser.json()); // Parses application/json
article.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

article.get('/:slug', function(request, response) {
  var slug = normalize_slug(request.params.slug),
      path = article_path(slug);

  // If the slug is not properly normalized, normalize it and redirect
  if (request.params.slug != slug) {
    return response.redirect(path);
  }

  // Now, look for the valid slug.
  try {
    var $ = cheerio.load(fs.readFileSync(path + '.html', 'utf8'));
    var meta = utils.exists(path + '.json') ? utils.readJSONSync(path + '.json') : {
      data: [], tags: [slug]
    };

    // Clean & parse the article's HTML fragment
    $('script').remove(); // Remove all script tags.

    return response
      .status(200)
      .format({
        '*/*': function() {
          response.send({
            html: $.html(),
            meta: meta
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
  var slug = normalize_slug(request.params.slug),
      path = article_path(slug);

  var $ = cheerio.load(request.body.html);
  $('script').remove(); // Remove all <script> tags.

  var meta = Object.assign({}, { data: [], tags: [] }, request.body.meta);

  try {
    fs.writeFileSync(path + '.html', $.html(), 'utf8');
    fs.writeFileSync(path + '.json', JSON.stringify(meta), 'utf8');

    return response.status(200).send({
      html: $.html(),
      meta: meta
    });
  } catch (err) {
    console.log(err.message);
    return response.status(500).send('Unable to save article.');
  }
});

function article_path(slug) {
  return path.resolve(paths.articles, slug);
};
function normalize_slug(slug) {
  return slug.toLowerCase()
    .replace(/([ ]{1,})/g, '_')                  // replace all spaces with _'s
    .replace(/([^\w\d_]{1,})/g, '-')             // replace all non-alphanumerics (other than _'s) with -'s
    .replace(/--/g, '-')                         // remove all double -'s
    .replace(/(^[-_ ]{1,})|([-_ ]{1,}$)/gmi, '') // remove any leading or trailing -'s
  ;
};