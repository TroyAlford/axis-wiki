export const ARTICLE = 'article'
export const PICTURE = 'picture'
export const PROFILE = 'profile'
export const SEARCH = 'search'

export const LOADING = 'loading'

export const TYPES = [ARTICLE, PICTURE, PROFILE, SEARCH]

export function setPage(type, data) {
  return { type, data }
}
