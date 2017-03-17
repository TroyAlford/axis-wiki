export const ARTICLE = 'article'
export const PICTURE = 'picture'
export const PROFILE = 'profile'
export const SEARCH = 'search'

const TYPES = [ARTICLE, PICTURE, PROFILE, SEARCH]
export const DEFAULTS = TYPES.reduce((defaults, type) => ({
  ...defaults,
  [type]: {},
}), {})

export function setPage(type, data) {
  return {
    type,
    [type]: data,
  }
}

export const METADATA = 'metadata'
export function setMetadata({ title, keywords = [] }) {
  return {
    type: METADATA,

    metadata: {
      keywords,
      title,
    },
  }
}
