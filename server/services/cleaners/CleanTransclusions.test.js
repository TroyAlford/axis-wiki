jest.unmock('./CleanTransclusions')
jest.unmock('cheerio')
jest.unmock('../../../utility/Slugs')

import CleanTransclusions from './CleanTransclusions'

describe('CleanTransclusions', () => {
  it('strips tag contents', () => {
    const before = '<include from="test" sections="*">text</include>'
    const expected = '<include from="test" sections="*"></include>'

    const after = CleanTransclusions({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('enforces slug-format for from attribute', () => {
    const before = '<include from=" Test Slug " sections="*"></include>'
    const expected = '<include from="test-slug" sections="*"></include>'

    const after = CleanTransclusions({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('adds sections="*" if sections are unspecified', () => {
    const before = '<include from="test"></include>'
    const expected = '<include from="test" sections="*"></include>'

    const after = CleanTransclusions({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('enforces slug-format for specified sections', () => {
    const before = '<include from="test" sections="A Slug, Another Slug, Third"></include>'
    const expected = '<include from="test" sections="a-slug,another-slug,third"></include>'

    const after = CleanTransclusions({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('eliminates * and invalid slugs from lists with multiple sections', () => {
    const before = '<include from="test" sections="a-slug,*,,---"></include>'
    const expected = '<include from="test" sections="a-slug"></include>'

    const after = CleanTransclusions({ html: before })
    expect(after.html).toEqual(expected)
  })
})
