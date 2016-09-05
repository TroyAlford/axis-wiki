import { includes, toLower } from 'lodash'

export default function Slug(input) {
  if (Array.isArray(input))
    return input.map(Slug)

  if (!input || includes(['object', 'function'], typeof input))
    return '' // Return '' for all falsy values, objects and fn's

  return toLower(input)
    .replace(/[^\w\d/_]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}
