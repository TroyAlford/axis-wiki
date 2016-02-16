var
  _ = require('lodash')
;

var Slug = {
  normalize: function (slug) {
    return _.toLower(slug)
      .replace(/^[/]?[w]?[/\s]*/, '')              // remove leading /'s, whitespace &/or /w/
      .replace(/([ ]{1,})/g, '_')                  // replace all remaining spaces with _'s
      .replace(/([^\w\d_-]{1,})/g, '')             // remove all non-alphanumerics (other than _ & -)
      .replace(/(^[-_ ]{1,})|([-_ ]{1,}$)/gmi, '') // remove any leading or trailing _ & -
    ;
  }
}

module.exports = Slug;