import { slugify, slugifyUrl } from './Slugs'

jest.unmock('./Slugs')

describe('slugify()', () => {
  it('returns empty string for falsy values', () => {
    const emptyString = ''
    expect(slugify()).toEqual(emptyString)
    expect(slugify(undefined)).toEqual(emptyString)
    expect(slugify(null)).toEqual(emptyString)
    expect(slugify(false)).toEqual(emptyString)
    expect(slugify(0)).toEqual(emptyString)
    expect(slugify(() => { })).toEqual(emptyString)
    expect(slugify({})).toEqual(emptyString)
  })

  it('eliminates special characters, double-dashes, leading/trailling dashes', () => {
    const before = ' no•••••  $$special$$-$^&   CharACters  '
    const after = slugify(before)
    expect(after).toEqual('no-special-characters')

    // LCase Letters, Numbers, and _ or - Only
    expect(after).toMatch(/[a-z\d_-]*/)

    // No repeating -'s
    expect(after).not.toContain('--')
    expect(after).not.toMatch(/^-/)
    expect(after).not.toMatch(/-$/)
  })

  it('normalizes, uniques, and sorts arrays', () => {
    const before = ['$P3(14L---', '-leading  trailing-', '   ', 'empty', '<<-empty']
    const after = slugify(before)
    const expected = ['empty', 'leading-trailing', 'p-3-14-l']

    expect(after.length).toEqual(3) // 3rd should be eliminated entirely
    expect(after).toEqual(expected)
  })

  it('maintains path correctly', () => {
    const before = 'path/to/Slug Which Must Be Changed'
    const after = slugifyUrl(before, true)

    expect(after).toEqual('path/to/slug-which-must-be-changed')
  })
})

describe('slugifyUrl()', () => {
  it('maintains extensions', () => {
    const before = 'This is my File Name.ext'
    const after = slugifyUrl(before)
    const expected = 'this-is-my-file-name.ext'

    expect(after).toEqual(expected)
  })

  it('maintains paths', () => {
    const before = '/path/to/resource/Funky  Resource   Name!!.html'
    const after = slugifyUrl(before)
    const expected = '/path/to/resource/funky-resource-name.html'

    expect(after).toEqual(expected)
  })

  it('handles / terminated urls properly', () => {
    const before = '/path/to/resource/'
    const after = slugifyUrl(before)

    expect(after).toEqual(before)
  })
})
