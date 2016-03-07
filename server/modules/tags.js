// Tags File Example:
//{
//  'articles': {
//    'article_1': ['tag_1', 'tag_2'],
//    ...
//  },
//  'tags': {
//    'magic': ['article_1', 'article_47'], // articles which are tagged 'magic'
//    'deity': ['article_5', 'article_8']   // articles which are tagged 'deity'
//  }
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
  tags: path.resolve(folders.metadata, 'tags.json')
};

var Tags = {
  articles_tagged: function(tag) { return index.tags[tag]; },
  set: function(slug, tags) {
    slug = Slug.normalize(slug);
    if (!slug || !Array.isArray(tags) || !utils.exists(path.resolve(folders.articles, slug + '.html'))) return false;

    tags = _.difference(_.uniq(_.map(tags, function(link) {
      var link_slug = Slug.normalize(link);
      return (link_slug && link_slug.length) ? link_slug : '';
    })), ['']); // << Eliminate blank slugs (incl. those we just blanked for invalidity)

    // remove any removed tags
    _.forEach(_.difference(index.articles[slug], tags), function(tag) {
      index.tags[tag] = _.difference(index.tags[tag], [slug]);
    });

    if (tags.length)
      index.articles[slug] = tags; // set the new tag list for the article
    else
      delete index.articles[slug]; // no tags - so delete the node entirely

    // add any new tags
    _.forEach(tags, function (tag) {
      index.tags[tag] = _.sortBy(_.union(index.tags[tag], [slug]));
    });

    setTimeout(clean_empty_nodes.bind(this, true), 0); // Asynchronously clean empty nodes and save
  }
};

var index = {};
function clean_empty_nodes(and_save) {
  for (var article in index.articles) {
    if (!index.articles[article].length) delete index.articles[article];
  }
  for (var tag in index.tags) {
    if (!index.tags[tag].length) delete index.tags[tag];
  }
  return and_save && save_to_disk();
}
function load_from_disk() {
  index = utils.exists(files.tags) ? utils.readJSONSync(files.tags) : {articles:{},tags:{}};
}
function save_to_disk() {
  fs.writeFile(files.tags, JSON.stringify(index));
}
load_from_disk(); // Load the links initially.

module.exports = Tags;