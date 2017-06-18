jest.unmock('./BlacklistTags')
jest.unmock('cheerio')

import BlacklistTags from './BlacklistTags'

describe('BlacklistTags', () => {
  it('strips tags correctly', () => {
    const before = { html: '<html><body><script>blah</script></body></html>' }
    const expected = '<html><body></body></html>'

    const after = BlacklistTags(before, ['script']).html
    expect(after).toEqual(expected)
  })
  it('eliminates orphaned tag fragments', () => {
    const before = { html: '<html><script><body></script></body></html>' }
    const expected = '<html></html>'

    const after = BlacklistTags(before, ['script']).html
    expect(after).toEqual(expected)
  })
})
