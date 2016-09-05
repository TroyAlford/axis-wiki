jest.unmock('cheerio')
jest.unmock('path')
jest.unmock('url')

jest.unmock('../ParseLinks')
jest.unmock('../../../../utility/Slugs')

jest.mock('../../Config', () => ({
  folders: { articles: '', media: '' }
}))
jest.mock('fs-utils', () => ({
  exists: path => {
    return !!path.match(/existing/)
  },
}))

import ParseLinks from '../ParseLinks'

describe('ParseLinks', () => {
  it('marks external links correctly', () => {
    const before = '<a href="https://external.url/blah">blah</a>'
    const expected = '<a href="https://external.url/blah" target="_new" class="external">blah</a>'

    const after = ParseLinks(before)
    expect(after).toEqual(expected)
  })
  it('rebases internal page links', () => {
    const before = '<a href="path/to/existing-link">blah</a>'
    const expected = '<a href="/page/existing-link">blah</a>'

    const after = ParseLinks(before)
    expect(after).toEqual(expected)
  })
  it('rebases internal media links', () => {
    const before = '<a href="path/to/existing-media.jpg">image</a>'
    const expected = '<a href="/media/existing-media.jpg">image</a>'

    const after = ParseLinks(before)
    expect(after).toEqual(expected)
  })

  it('marks missing page links', () => {
    const before = '<a href="path/to/missing-link">page</a>'
    const expected = '<a href="/page/missing-link" class="missing">page</a>'

    const article = {}

    const after = ParseLinks.apply(article, [before])
    expect(after).toEqual(expected)
    expect(article.missing_links).toEqual(['missing-link'])
    expect(article.links_to).toEqual(['missing-link'])
  })
  it('marks missing media links', () => {
    const before = '<a href="path/to/missing-media.jpg">image</a>'
    const expected = '<a href="/media/missing-media.jpg" class="missing">image</a>'

    const article = {}

    const after = ParseLinks.apply(article, [before])
    expect(after).toEqual(expected)
    expect(article.missing_links).toEqual(['missing-media.jpg'])
    expect(article.links_to).toEqual(['missing-media.jpg'])
  })
})
