var
  express = require('express'),
  fs      = require('fs'),
  textile = require('textile-js')
;

var article = module.exports = express();

article.get('/:slug', function(req, res) {
  var slug = normalize_slug(req.params.slug),
      path = article_path(slug)
  ;

  if (req.params.slug != slug) {
    return res.redirect(article.path() + '/' + slug);
  }

  try {
    // fs.accessSync(path, fs.F_OK | fs.R_OK);
    var tx = fs.readFileSync(path, 'utf8');
    return res.status('200').send(textile.parse(parse_links(tx)));
  } catch (err) {
    return res.status('404').send('Article not found.');
  }
});

function article_path(slug) {
  return '../content/articles/' + slug + '.tx';
};
function parse_links(textile) {
  // First, convert [[Slug]] and [[Slug|]] to [[Slug|Text]] format.
  var result = textile.replace(/\[\[([ a-zA-Z0-9-_]*)[|]?]]/g, '[[$1|$1]]');
  // Next, normalize the slug portion, and return the result.
  return result.replace(/\[\[([ a-zA-Z0-9-_]*)[|](.*)]]/g, function(m, p1, p2) {
    var slug = normalize_slug(p1), text = p2;
    return '"' + text + '":/w/' + slug;
  });
};
function normalize_slug(slug) {
  return slug.toLowerCase()
    .replace(/([ ]{1,})/g, '_')                  // replace all spaces with _'s
    .replace(/([^\w\d_]{1,})/g, '-')             // replace all non-alphanumerics (other than _'s) with -'s
    .replace(/--/g, '-')                         // remove all double -'s
    .replace(/(^[-_ ]{1,})|([-_ ]{1,}$)/gmi, '') // remove any leading or trailing -'s
  ;
};