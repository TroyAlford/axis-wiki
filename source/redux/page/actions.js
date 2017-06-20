export const ARTICLE = 'article'
export const PICTURE = 'picture'
export const PROFILE = 'profile'
export const SEARCH = 'search'

export const FAVORITE = 'favorite'
export const LOADING = 'loading'

export const TYPES = [ARTICLE, PICTURE, PROFILE, SEARCH]

export function setPage(type, data) {
  return { type, data }
}

export const SMALL = 'small'
export const MEDIUM = 'medium'
export const LARGE = 'large'

export const LAYOUT = 'layout'

export function getLayout() {
  if (!window.matchMedia) return LARGE
  if (window.matchMedia('screen and (max-width:  320px)').matches) return SMALL
  if (window.matchMedia('screen and (max-width: 1024px)').matches) return MEDIUM
  if (window.matchMedia('screen and (min-width: 1025px)').matches) return LARGE
  return LARGE
}
export function updateLayout() {
  return { type: LAYOUT, layout: getLayout() }
}
