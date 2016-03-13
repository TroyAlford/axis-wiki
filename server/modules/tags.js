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

import _            from 'lodash'
import fs           from 'fs'
import path         from 'path'
import utils        from 'fs-utils'

import Config       from './config'
import Slug         from './slug'

export default class Tags {
  constructor() {
    this.for = this.for.bind(this);
    this.set = this.set.bind(this);

    this.cleanse = this.cleanse.bind(this);
    this.reload = this.reload.bind(this);
    this.save = this.save.bind(this);

    this.folders = Config.folders();
    this.files = { tags: path.resolve(this.folders.metadata, 'tags.json') }

    this.reload();
  }

  for(tag) { return this.tags[tag]; }

  set(slug, tags) {
    slug = Slug.normalize(slug);
    if (!slug || !Array.isArray(tags) || !utils.exists(path.resolve(this.folders.articles, slug + '.html'))) return false;

    tags = _.difference(_.uniq(_.map(tags, function(link) {
      var link_slug = Slug.normalize(link);
      return (link_slug && link_slug.length) ? link_slug : '';
    })), ['']); // << Eliminate blank slugs (incl. those we just blanked for invalidity)

    // remove any removed tags
    _.forEach(_.difference(this.articles[slug], tags), function(tag) {
      this.tags[tag] = _.difference(this.tags[tag], [slug]);
    }.bind(this));

    if (tags.length)
      this.articles[slug] = tags; // set the new tag list for the article
    else
      delete this.articles[slug]; // no tags - so delete the node entirely

    // add any new tags
    _.forEach(tags, function (tag) {
      this.tags[tag] = _.sortBy(_.union(this.tags[tag], [slug]));
    }.bind(this));

    setTimeout(this.cleanse, 0); // Asynchronously clean empty nodes and save
  }

  cleanse() {
    for (var article in this.articles) {
      if (!this.articles[article].length) delete this.articles[article];
    }
    for (var tag in this.tags) {
      if (!this.tags[tag].length) delete this.tags[tag];
    }
    return this.save();
  }
  reload() {
    let json = utils.exists(this.files.tags) ? utils.readJSONSync(this.files.tags) : {articles:{},tags:{}};
    this.articles = json.articles;
    this.tags = json.tags;
  }
  save() {
    fs.writeFile(this.files.tags, JSON.stringify({
      articles: this.articles,
      tags: this.tags
    }));
  }
};

export let Singleton = new Tags();