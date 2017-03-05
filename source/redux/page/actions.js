export const PAGE_METADATA = 'page.metadata'

export function setMetadata(title, keywords = []) {
  return {
    type: PAGE_METADATA,
    keywords,
    title,
  }
}

