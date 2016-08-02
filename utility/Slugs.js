import toLower from 'lodash/toLower'

export function slugify(input) {
  if (typeof input !== 'string')
    return input

  if (Array.isArray(input))
    return input.map(slugify)

  return toLower(input)
    .replace(/[^\w\d/_]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}
