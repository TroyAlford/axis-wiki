import { difference, includes, kebabCase, toLower } from 'lodash'

export function Slug(input) {
  if (Array.isArray(input))
    return difference(input.map(Slug), [''])

  if (!input || includes(['object', 'function'], typeof input))
    return '' // Return '' for all falsy values, objects and fn's

  const lowercase = toLower(strip(input))
  return lowercase.split('.').map(kebabCase).join('.')
  // Split file.ext and kebab-case each section, then rejoin
}
export default Slug

export function Extract(input) {
  if (Array.isArray(input))
    return difference(input.map(Extract), [''])

  if (typeof input !== 'string')
    return ''

  return Slug(
    input.split(/[\/\\]/g).pop()
         .split(/[?#]/g).shift()
  )
}
export function Url(input) {
  if (Array.isArray(input))
    return difference(input.map(Url), [''])

  if (typeof input !== 'string')
    return ''

  let result = []

  let [file, ...path] = input.split('/').reverse()
  let [slug, extension] = file.split('.')

  if (path.length)
    result = [path.reverse().join('/'), '/']

  result.push(Slug(slug))

  if (extension)
    result = [...result, '.', extension]

  return result.join('')
}

function strip(string) {
  return string
    .replace(/\s/g, ' ')
    .replace(/[^a-z0-9_.-]/gi, '-')
}
