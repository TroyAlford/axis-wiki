export const
  PAGE_METADATA = 'page.title'
;

export function setMetadata(title, keywords = []) {
  return {
    type: PAGE_METADATA,
    title,
    keywords
  }
}
