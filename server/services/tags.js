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
import chokidar     from 'chokidar'
import fs           from 'fs'
import path         from 'path'
import utils        from 'fs-utils'

import Config       from './Config'
import Slug         from './Slug'

class Tags {
  constructor() {
    this.tags = {};

    this.for = this.for.bind(this);

    this.cleanse = this.cleanse.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.reindex = this.reindex.bind(this);
    this.reload = this.reload.bind(this);
    this.save = this.save.bind(this);

    this.folders = Config.folders;
    this.files = { tags: path.resolve(this.folders.metadata, 'tags.json') };

    setTimeout(this.rebuild, 0);
  }

  for(tag) { return this.tags[tag]; }

  cleanse() {
    for (var article in this.articles) {
      if (!this.articles[article].length) delete this.articles[article];
    }
    for (var tag in this.tags) {
      if (!this.tags[tag].length) delete this.tags[tag];
    }
    return this.save();
  }
  reindex(slug) {
    console.log(`${slug} changed: reindexing tags.`);
    let existing = this.tags[slug],
        updated  = utils.readJSONSync(path.join(this.folders.articles, `${slug}.json`)),
        in_both  = _.intersection(existing, updated),
        to_drop  = _.difference(existing, in_both),
        to_add   = _.difference(updated, in_both);

    to_drop.forEach(drop => { this.tags[drop] = _.difference(this.tags[drop], [slug]); });
    to_add.forEach(add => { this.tags[add] = _.union(this.tags[add], [slug]); });

    this.articles[slug] = updated;
  }
  rebuild() {
    let rebuilt = { articles: {}, tags: {} };
    fs.readdirSync(this.folders.articles)
      .filter(name => { return name.endsWith('.json') })
      .forEach(file => {
        let slug = file.replace(/.json/, ''),
            json = utils.readJSONSync(path.join(this.folders.articles, file));

        rebuilt.articles[slug] = _.union(rebuilt.articles[slug], json.tags);
        (json.tags || []).forEach(tag => {
          rebuilt.tags[tag] = _.union(rebuilt.tags[tag], [slug]);
        });
      });

    this.articles = rebuilt.articles;
    this.tags = rebuilt.tags;

    setTimeout(this.cleanse, 0); // Will also save.
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
}

let Singleton = new Tags();
export default Singleton;

// File Watcher, to re-index on any .json file change in the Articles directory.
let reindexer = file => Singleton.reindex(path.basename(file, '.json'));
chokidar.watch(`${Singleton.folders.articles}/*.json`, { ignoreInitial: true })
  .on('add', reindexer)
  .on('change', reindexer)
;