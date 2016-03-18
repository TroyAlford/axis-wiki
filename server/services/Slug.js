import _ from 'lodash'

export default class Slug {
  static normalize(value, retain_path) {
    if (Array.isArray(value)) {
      return Slug.normalize_array(value, retain_path);
    }

    let parsed = (/([/]?[\w\d -_]{1,}[/])?(.*)/g).exec(value.toLowerCase());

    let path = parsed[1] || '',
        slug = parsed[2]
               .replace(/[^\w\d/_.]/g, '-')          // replace all non-valid characters with -'s
               .replace(/-{2,}/g, '-')              // replace all sequential -'s with a single -
               .replace(/(^[-]{1,})|(-$){1,}/g, '') // remove all leading or trailing -'s
    ;

    return retain_path ? path + slug : slug;
  }
  static normalize_array(values, retain_path) {
    return _.difference(_.sortBy(_.uniq(values.map(value => Slug.normalize(value, retain_path)))), ['']);
  }
}