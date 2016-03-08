import _      from 'lodash'

var Slug = module.exports = {
  normalize: function (value, retain_path) {
    var parsed = (/([/]?[\w\d -_]{1,}[/])?(.*)/g).exec(_.toLower(value));

    var path = parsed[1] || '';
    var slug = parsed[2]
      .replace(/[^\w\d/_]/g, '-')         // replace all non-valid characters with -'s
      .replace(/-{2,}/g, '-')              // replace all sequential -'s with a single -
      .replace(/(^[-]{1,})|(-$){1,}/g, '') // remove all leading or trailing -'s
    ;

    return retain_path ? path + slug : slug;
  }
}
