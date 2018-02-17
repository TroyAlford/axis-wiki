jest.unmock('./WhitelistAttributes')
jest.unmock('cheerio')

import WhitelistAttributes from './WhitelistAttributes'

describe('WhitelistAttributes', () => {
  it('strips tags correctly', () => {
    const before =
      '<p>' +
      '<a href="blah" style="" extraneous="junk">blah</a>' +
      '<a href="blah" extra="tag" doesnt="belong">blah</a>' +
      '</p>'
    const expected =
      '<p>' +
      '<a href="blah">blah</a>' +
      '<a href="blah">blah</a>' +
      '</p>'
    const whitelist = {
      a: ['href'],
    }

    const after = WhitelistAttributes({ html: before }, whitelist)

    expect(after.html).toEqual(expected)
  })
})
