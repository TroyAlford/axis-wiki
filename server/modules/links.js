// Links File Example:
//'home': {
//  exists: true,
//  to:   ['article_1', 'article_47'], // articles which this article has a link to
//  from: ['article_25']               // articles which link to this article
//}

var
  _     = require('lodash'),
  fs    = require('fs'),
  path  = require('path'),
  utils = require('fs-utils'),
  Slug  = require('./slug')
;

var paths = {
  articles: path.resolve(__dirname, '../../content/articles'),
  links_metadata: path.resolve(__dirname, '../../content/metadata', 'links.json')
};

var Links = {
  add_from: function(to, from) {
    to = Slug.normalize(to);
    from = Slug.normalize(from);

    var entry = Links.ensure(to);
    entry.from = _.union(entry.from, [from]);
  },
  ensure: function(slug) {
    slug = Slug.normalize(slug);
    if (typeof slug != 'string' || !slug.length) return false;

    if (!links[slug])
      links[slug] = {
        exists: utils.exists(path.resolve(paths.articles, slug + '.html'))
      };

    return links[slug];
  },
  missing_for: function(slug) {
    return _.difference(_.map(Links.ensure(slug).to, function(link) {
      return (!links[link] || !links[link].exists) ? link : ''
    }), ['']);
  },
  set: function(slug, links_to) {
    slug = Slug.normalize(slug);
    if (!slug || !Array.isArray(links_to)) return false;

    var entry = Links.ensure(slug);
    if (!entry) return false;

    entry.exists = utils.exists(path.resolve(paths.articles, slug + '.html'));
    entry.to = _.difference(_.uniq(_.map(links_to, function(link) {
      var link_slug = Slug.normalize(link);
      return (link_slug && link_slug.length) ? link_slug : '';
    })), ['']); // << Eliminate blank slugs (incl. those we just blanked for invalidity)

    _.forEach(entry.to, function (link) {
      Links.add_from(link, slug)
    });
    save_to_disk();
  },
};

var links = {};
function load_from_disk() {
  links = utils.exists(paths.links_metadata) ? utils.readJSONSync(paths.links_metadata) : {};
}
function save_to_disk() {
  fs.writeFile(paths.links_metadata, JSON.stringify(links, null, 2));
}
load_from_disk(); // Load the links initially.

module.exports = Links;