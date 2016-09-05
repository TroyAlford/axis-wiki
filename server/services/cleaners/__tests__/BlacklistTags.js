jest.unmock('../BlacklistTags')
jest.unmock('cheerio')

import BlacklistTags from '../BlacklistTags'

describe('BlacklistTags', () => {
  it('strips tags correctly', () => {
    const before = '<html><body><script>blah</script></body></html>'
    const expected = '<html><body></body></html>'

    expect(BlacklistTags(before, ['script'])).toEqual(expected)
  })
  it('eliminates orphaned tag fragments', () => {
    const before = '<html><script><body></script></body></html>'
    const expected = '<html></html>'

    expect(BlacklistTags(before, ['script'])).toEqual(expected)
  })
})
