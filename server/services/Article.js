import $                    from 'cheerio'
import _                    from 'lodash'
import { html as beautify } from 'js-beautify'
import fs                   from 'fs'
import path                 from 'path'
import url                  from 'url'
import utils                from 'fs-utils'

import Config               from './Config'
import Links                from './Links'
import Slug                 from './Slug'
import Tags                 from './Tags'

class Article {
  constructor() {
    this.folders = Config.folders;
    this.beauty_settings = Config.settings.html.beautifier;

    this.get_clean = this.get_clean.bind(this);
    this.get_final = this.get_final.bind(this);

    this.load = this.load.bind(this);
    this.load_html = this.load_html.bind(this);
    this.load_meta = this.load_meta.bind(this);

    this.clean = this.clean.bind(this);
    this.build_html = this.build_html.bind(this);

    this.save = this.save.bind(this);
  }

  get_clean(slug) {
    return this.clean(this.load(slug));
  }
  get_final(slug) {
    let base = this.load(slug);
    return Object.assign(
      this.build_html(base.html),
      this.clean_meta(base),
      { children: Tags.for(slug) }
    );
  }

  load(slug) {
    return Object.assign(
      { html: this.load_html(slug) },
      this.load_meta(slug)
    )
  }
  load_html(slug) {
    let file = path.resolve(this.folders.articles, `${slug}.html`),
        html = '';

    try {
      html = utils.readFileSync(file);
    } catch (err) {
      html = `<h1>${_.startCase(slug)}</h1>`;
    }

    return html;
  }
  load_meta(slug) {
    let file = path.resolve(this.folders.articles, `${slug}.json`),
        meta = {};

    try {
      meta = utils.readJSONSync(file);
    } catch (err) {
      meta = {};
    }

    return {
      aliases: meta.aliases || [],
      data:    meta.data    || [],
      tags:    meta.tags    || []
    };
  }

  clean(article) {
    return Object.assign(
      { html: this.clean_html(article.html) },
      this.clean_meta(article)
    );
  }
  clean_html(html) {
    let $html = $.load(html || '');
    $html('style').remove();  // Remove all style tags
    $html('script').remove(); // Remove all script tags
    $html('a').each((index, element) => {
      let $el = $html(element);
      $el.removeAttr('target').removeAttr('class');
    });
    return $html.html();
  }
  clean_meta(meta) {
    return {
      aliases:  Slug.normalize(meta.aliases || []),
      tags:     Slug.normalize(meta.tags    || []),
      data:     meta.data || []
    };
  }

  build_html(html) {
    let $html         = $.load(html),
        links_to      = [],
        missing_links = [];
    $html('a').each((index, element) => {
      let link    = url.parse(element.attribs.href),
          $el     = $html(element);

      if (link.hostname) // External link
        $el.attr('target', '_new').addClass('wiki-external');
      else { // Internal link
        let link_slug = Slug.normalize(link.pathname);
        links_to.push(link_slug);

        let lookup = Links.get(link_slug);
        if (!lookup || !lookup.exists) {
          missing_links = _.union(missing_links, [link_slug]);
          $el.addClass('wiki-missing');
        }
      }
    });

    return {
      html:          beautify($html.html(), this.beauty_settings),
      links_to:      Slug.normalize(links_to),
      missing_links: Slug.normalize(missing_links)
    };
  }

  save(slug, article) {
    let base = path.resolve(this.folders.articles, slug),
        html = this.clean_html(article.html),
        meta = this.clean_meta(article);
    try {
      fs.writeFileSync(`${base}.html`, html);
      fs.writeFileSync(`${base}.json`, JSON.stringify(meta));
    } catch (err) {
      console.log(err.message);
      return false;
    }

    return true;
  }
}

export default new Article();