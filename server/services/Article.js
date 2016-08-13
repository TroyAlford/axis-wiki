import difference           from 'lodash/difference'
import flatten              from 'lodash/flatten'
import flow                 from 'lodash/flow'
import forEach              from 'lodash/forEach'
import keys                 from 'lodash/keys'
import map                  from 'lodash/map'
import startCase            from 'lodash/startCase'
import uniq                 from 'lodash/uniq'
import union                from 'lodash/union'
import xor                  from 'lodash/xor'

import $                    from 'cheerio'
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
    this.delete = this.delete.bind(this);
    this.build_html = this.build_html.bind(this);

    this.get_rooted_url = this.get_rooted_url.bind(this);
    this.is_local_url = this.is_local_url.bind(this);

    this.save = this.save.bind(this);
  }

  get_clean(slug) {
    return this.clean(this.load(slug));
  }
  get_final(slug) {
    let base = this.load(slug);
    return {
      ...this.build_html(base.html),
      ...this.clean_meta(base),
      children: Tags.for(slug)
    }
  }

  load(slug) {
    return {
      ...this.load_meta(slug),
      html: this.load_html(slug)
    }
  }
  load_html(slug) {
    let file = path.resolve(this.folders.articles, `${slug}.html`),
        html = '';

    try {
      html = utils.readFileSync(file);
    } catch (err) {
      html = `<h1>${startCase(slug)}</h1>`;
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
    return {
      ...this.clean_meta(article),
      html: this.clean_html(article.html)
    }
  }
  clean_html(html) {
    let $html = $.load(html || '');
    $html('style').remove();   // Remove all style tags
    $html('script').remove();  // Remove all script tags

    let $includes = $html('include').html('') // Empty all <include> tags
    // Get all of the html attributes of 'include' tags as a single array.
    let attrs = flow(
      map(el => keys(el.attribs)), // Attributes of every <include> tag as an array
      flatten(), uniq(), // Flatten into a single array, remove all duplicates
      xor(['class', 'from', 'sections']), // White-list the allowed attributes
      forEach(attr => $includes.removeAttr(attr))
    )($includes.get())

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

  delete(slug) {
    // Removes files only. Reference updates are performed in response to file watchers.
    let base = path.resolve(this.folders.articles, slug);
    forEach(['html', 'json'], ext => {
      let filename = `${base}.${ext}`;
      if (utils.exists(filename))
        fs.unlinkSync(filename, { force: true });
    });
    return true;
  }

  build_html(html) {
    let $html         = $.load(html),
        links_to      = [],
        missing_links = [];
    $html('a').each((index, element) => {
      let href = element.attribs.href,
          link = url.parse(href),
          $el  = $html(element);

      if (!this.is_local_url(href)) // External link
        $el.attr('target', '_new').addClass('external');
      else { // Internal link
        let link_slug = Slug.normalize(link.pathname);
        links_to.push(link_slug);

        let lookup = Links.get(link_slug),
            is_media = 0 <= link.pathname.indexOf('media/');

        if ((is_media && !utils.exists(path.join(this.folders.media, path.basename(href)))
        || (!is_media && (!lookup || !lookup.exists)))) {
          missing_links = union(missing_links, [link_slug]);
          $el.addClass('missing');
        }

        element.attribs.href = this.get_rooted_url(link.pathname);
      }
      $html('img').each((index, element) => {
        element.attribs.src = this.get_rooted_url(element.attribs.src);
      });
    });

    return {
      html:          beautify($html.html(), this.beauty_settings),
      links_to:      Slug.normalize(links_to),
      missing_links: Slug.normalize(missing_links)
    };
  }

  get_rooted_url(value) {
    if (!this.is_local_url(value)) return value;

    let href = Slug.normalize(value, true).replace(/^[.]{0,}\//g, '');
    if (href.split('/').length == 1)
      href = `page/${href}`;

    return `/${href}`;
  }
  is_local_url(value) {
    let link = url.parse(value);
    return !link.hostname;
  }

  transclude(article) {

  }

  save(slug, article) {
    let base = path.resolve(this.folders.articles, slug),
        html = this.clean_html(article.html),
        meta = this.clean_meta(article);

    meta.aliases = difference(meta.aliases, [slug]); // No self-referential aliases.

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
