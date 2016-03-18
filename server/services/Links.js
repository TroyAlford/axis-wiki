// Links File Example:
//'elf': {
//  exists: true,
//  to:   ['human', 'orc', 'dwarf'],      // articles which this article has a link to
//  from: ['many', 'other', 'articles'],  // articles which link to this article
//  alias_for: 'elf-race',                // this form is for entries which are redirects
//  aliases: ['elven', 'elves', 'elvish'] // this form is for articles which have other names
//}
// Note: If both alias_for and aliases is included, the redirect chain will work - but the other fields are irrelevant.

import _          from 'lodash'
import chokidar   from 'chokidar'
import fs         from 'fs'
import path       from 'path'
import utils      from 'fs-utils'

import Article    from './Article'
import Config     from './Config'
import Slug       from './Slug'

const THROTTLE = Config.settings.saving.throttle;

class Links {
  constructor() {
    this.links = {};

    this.get = this.get.bind(this);
    this.resolve = this.resolve.bind(this);

    this.cleanse = this.cleanse.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.reload = this.reload.bind(this);

    this.reindex_html = this.reindex_html.bind(this);
    this.reindex_json = this.reindex_json.bind(this);
    this.unindex_html = this.unindex_html.bind(this);
    this.unindex_json = this.unindex_json.bind(this);

    this.save = this.save.bind(this);

    this.folders = Config.folders;
    this.files = { links: path.resolve(this.folders.metadata, 'links.json') };

    setTimeout(this.rebuild, 0);
  }

  static get default_node() {
    return {
      exists: false,
      to: [],
      from: [],
      aliases: []
    };
  }

  get(slug) {
    return this.links[this.resolve(slug)];
  }
  resolve(slug) {
    let norm = Slug.normalize(slug),
        link = this.links[norm];

    if (link && link.alias_for && link.alias_for == norm) delete link.alias_for;
    return (link && link.alias_for) ? this.resolve(link.alias_for) : norm;
  }

  cleanse() {
    if (this.last_cleanse && (Date.now() - this.last_cleanse < THROTTLE)) {
      clearTimeout(this.cleanse_queued); // Clear any already queued cleansing, ...
      this.cleanse_queued = setTimeout(this.cleanse, THROTTLE); // ... and enqueue again ...
      return; // ... then stop processing.
    }

    this.last_cleanse = Date.now(); // Update the last cleansed time.
    this.cleanse_queued = null;     // This should be the queued cleanse, so clear the timer.

    for (let slug in this.links) {
      let link = Object.assign(Links.default_node, this.links[slug]);
      if (link && link.alias_for == slug) delete link.alias_for;
      if (!link.exists && !link.to.length && !link.from.length && !link.aliases.length && !link.alias_for)
        delete this.links[slug];
    }

    this.save();
  }
  reindex_html(slug) {
    console.log(`${slug} changed: reindexing links.`);
    this.links[slug] = this.links[slug] || Links.default_node;
    let existing = this.links[slug].to,
        updated  = Article.build_html(Article.load_html(slug)).links_to,
        in_both  = _.intersection(existing, updated),
        to_drop  = _.difference(existing, in_both),
        to_add   = _.difference(updated, in_both);

    to_drop.forEach(drop => { this.links[drop].from = _.difference(this.links[drop].from, [slug]) });
    to_add.forEach(add => {
      if (!this.links[add]) this.links[add] = Links.default_node;
      this.links[add].from = _.union(this.links[add].from, [slug])
    });

    this.links[slug].exists = true;
    this.links[slug].to = updated;

    setTimeout(this.cleanse, THROTTLE); // Also saves.
  }
  reindex_json(slug) {
    console.log(`${slug} changed: reindexing aliases.`);
    this.links[slug] = this.links[slug] || Links.default_node;
    let existing = this.links[slug].aliases,
        updated  = Article.load_meta(slug).aliases,
        in_both  = _.intersection(existing, updated),
        to_drop  = _.difference(existing, in_both),
        to_add   = _.difference(updated, in_both);

    to_drop.forEach(drop => { delete this.links[drop].alias_for; });
    to_add.forEach(add => {
      this.links[add] = Object.assign(
        Links.default_node,
        this.links[add]
      );
      if (add != slug) this.links[add].alias_for = slug;
    });

    this.links[slug].aliases = updated;

    setTimeout(this.cleanse, THROTTLE); // Also saves.
  }
  unindex_html(slug) {
    console.log(`${slug} removed: unindexing links.`);
    this.links[slug] = this.links[slug] || Links.default_node;
    let existing = this.links[slug].to;

    this.links[slug].exists = false;
    this.links[slug].to = [];
    existing.forEach((link) => {
      this.links[link].from = _.difference(this.links[link].from, [slug]);
    });

    setTimeout(this.cleanse, THROTTLE); // Also saves.
  }
  unindex_json(slug) {
    console.log(`${slug} removed: unindexing aliases.`);
    let existing = this.links[slug].aliases;

    this.links[slug].aliases = [];
    existing.forEach((link) => {
      if (this.links[link].alias_for == slug)
        delete this.links[link].alias_for;
    });

    setTimeout(this.cleanse, THROTTLE); // Also saves.
  }

  rebuild() {
    let rebuilt = {};
    fs.readdirSync(this.folders.articles)
      .filter(name => { return name.endsWith('.html') })
      .forEach(file => {
        let slug = file.replace(/.html/, ''),
            html = Article.build_html(Article.load_html(slug)),
            meta = Article.clean_meta(Article.load_meta(slug));

        // This article exists, because it was listed above. Create it.
        rebuilt[slug] = Object.assign(
          Links.default_node,
          rebuilt[slug] || {},
          { exists: true, to: html.links_to, aliases: meta.aliases }
        );

        // Now parse all `links_to` and add this slug to each entry.
        html.links_to.forEach(link => {
          rebuilt[link] = Object.assign(
            Links.default_node,
            rebuilt[link] || {}
          );
          rebuilt[link].from = _.union(rebuilt[link].from, [slug]);
        });

        meta.aliases.forEach(alias => {
          rebuilt[alias] = Object.assign(
            Links.default_node,
            rebuilt[alias] || {}
          );
          if (alias != slug)
            rebuilt[alias].alias_for = slug;
        });
      });

    this.links = rebuilt;

    setTimeout(this.cleanse, THROTTLE); // Also saves.
  }
  reload() {
    this.links = utils.exists(this.files.links) ? utils.readJSONSync(this.files.links) : {};
  }
  save() {
    var json = !Config.settings.debugging
      ? JSON.stringify(this.links)
      : JSON.stringify(this.links, null, 2);
    fs.writeFile(this.files.links, json);
  }
}

let Singleton = new Links();
export default Singleton;