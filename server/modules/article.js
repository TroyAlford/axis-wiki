var
  bodyParser = require('body-parser'),
  cheerio    = require('cheerio'),
  express    = require('express'),
  fs         = require('fs'),
  gulp       = require('gulp'),
  path       = require('path')
;

var paths = {
  articles: path.resolve(__dirname, '../../content/articles')
};

var article = module.exports = express();
article.use(bodyParser.json()); // Parses application/json
article.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-encoded

article.get('/:slug', function(req, res) {
  var slug = normalize_slug(req.params.slug),
      path = article_path(slug);

  // If the slug is not properly normalized, normalize it and redirect
  if (req.params.slug != slug) {
    return res.redirect(article.path() + '/' + slug);
  }

  // Now, look for the valid slug.
  try {
    var $ = cheerio.load(fs.readFileSync(path, 'utf8'));

    // Clean & parse the article's HTML fragment
    $('script').remove(); // Remove all script tags.

    return res.status(200).send($.html());
  } catch (err) {
    console.log(err.message);
    return res.status(404).send('Article not found.');
  }
});
article.post('/:slug', function(req, res) {
  var slug = normalize_slug(req.params.slug),
      path = article_path(slug);

  var $ = cheerio.load(req.body.html);
  $('script').remove(); // Remove all <script> tags.

  try {
    fs.writeFileSync(path, $.html(), 'utf8');
    return res.status(200).send($.html());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Unable to save article.');
  }

  console.log($.html());
});

function article_path(slug) {
  return path.resolve(paths.articles, slug + '.html');
};
function normalize_slug(slug) {
  return slug.toLowerCase()
    .replace(/([ ]{1,})/g, '_')                  // replace all spaces with _'s
    .replace(/([^\w\d_]{1,})/g, '-')             // replace all non-alphanumerics (other than _'s) with -'s
    .replace(/--/g, '-')                         // remove all double -'s
    .replace(/(^[-_ ]{1,})|([-_ ]{1,}$)/gmi, '') // remove any leading or trailing -'s
  ;
};