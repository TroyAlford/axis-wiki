// Links File Example:
//'home': {
//  exists: true,
//  to:   ['article_1', 'article_47'], // articles which this article has a link to
//  from: ['article_25']               // articles which link to this article
//}

var
  _       = require('lodash'),
  fs      = require('fs'),
  path    = require('path'),
  utils   = require('fs-utils'),

  config  = require('./config'),
  Slug    = require('./slug')
;

var folders = config.folders();
var files = {
  links: path.resolve(folders.metadata, 'links.json')
}

var Links = {
  add_from: function(to, from) {
    to = Slug.normalize(to);
    from = Slug.normalize(from);

    var entry = Links.ensure(to);
    entry.from = _.union(entry.from, [from]);
  },
  alias: function(slug, aliases) {
    if (aliases === undefined)
      return this.ensure(slug).aliases;

    slug = Slug.normalize(slug);
    aliases = _.sortBy(_.difference(_.uniq(_.map(aliases, Slug.normalize)),['',slug]));

    var entry = this.ensure(slug);
    if (entry.aliases && entry.aliases.length) {
      _.forEach(_.difference(entry.aliases, aliases), function(alias_to_remove) {
        var entry = links[alias_to_remove];
        if (entry && entry.alias_for == slug)
          delete entry.alias_for;
      });
    }
    entry.aliases = aliases;

    _.forEach(aliases, function(alias) {
      var entry = this.ensure(alias);
      entry.alias_for = slug;
    }.bind(this));

    save_to_disk();
  },
  ensure: function(slug) {
    slug = Slug.normalize(slug);
    if (typeof slug != 'string' || !slug.length) return false;

    if (!links[slug])
      links[slug] = {
        exists: utils.exists(path.resolve(folders.articles, slug + '.html'))
      };

    return links[slug];
  },
  get: function(slug) {
    return links[Links.resolve(slug)];
  },
  missing_for: function(slug) {
    return _.difference(_.map(Links.ensure(slug).to, function(link) {
      var entry = links[link];
      return !entry || (!entry.exists && !entry.alias_for) ? link : '';
    }), ['']);
  },
  resolve: function(slug) {
    slug = Slug.normalize(slug);
    var entry = Links.ensure(slug);

    return (entry && entry.alias_for) ? Links.resolve(entry.alias_for) : slug;
  },
  set: function(slug, links_to) {
    slug = Slug.normalize(slug);
    if (!slug || !Array.isArray(links_to)) return false;

    var entry = Links.ensure(slug);
    if (!entry) return false;

    entry.exists = utils.exists(path.resolve(folders.articles, slug + '.html'));
    entry.to = _.difference(_.uniq(_.map(links_to, function(link) {
      var link_slug = Slug.normalize(link);
      return (link_slug && link_slug.length) ? link_slug : '';
    })), ['']); // << Eliminate blank slugs (incl. those we just blanked for invalidity)

    _.forEach(entry.to, function (link) {
      Links.add_from(link, slug)
    });
    save_to_disk();
  }
};

var links = {};
function load_from_disk() {
  links = utils.exists(files.links) ? utils.readJSONSync(files.links) : {};
}
function save_to_disk() {
  fs.writeFile(files.links, JSON.stringify(links));
}
load_from_disk(); // Load the links initially.

module.exports = Links;