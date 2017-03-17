import { kebabCase, toLower } from 'lodash'

function strip(string) {
  return string
    .replace(/\s/g, ' ')
    .replace(/[^a-z0-9_.-]/gi, '-')
}

export function slugify(input) {
  if (Array.isArray(input)) {
    return input.map(slugify).filter(slug => slug)
  }

  if (!input || typeof input === 'object' || typeof input === 'function') {
    return '' // Return '' for all falsy values, objects and fn's
  }

  const lowercase = toLower(strip(input))
  return lowercase.split('.').map(kebabCase).join('.')
  // Split file.ext and kebab-case each section, then rejoin
}

export function extractSlug(input) {
  if (Array.isArray(input)) {
    return input.map(extractSlug).filter(slug => slug)
  }

  if (typeof input !== 'string') return ''

  return slugify(
    input.split(/[/\\]/g).pop()
         .split(/[?#]/g).shift()
  )
}
export function slugifyUrl(input) {
  if (Array.isArray(input)) {
    return input.map(slugifyUrl).filter(slug => slug)
  }

  if (typeof input !== 'string') return ''

  let result = []

  const [file, ...path] = input.split('/').reverse()
  const [slug, extension] = file.split('.')

  if (path.length) {
    result = [path.reverse().join('/'), '/']
  }

  result.push(slugify(slug))

  if (extension) {
    result = [...result, '.', extension]
  }

  return result.join('')
}
