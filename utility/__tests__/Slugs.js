jest.unmock('../Slugs')

import TestUtils from 'react-addons-test-utils'
import { Slug, Url } from '../Slugs'
import { isEqual } from 'lodash'

describe('Slug()', () => {
  it('returns empty string for falsy values', () => {
    const emptyString = ''
    expect(Slug()).toEqual(emptyString)
    expect(Slug(undefined)).toEqual(emptyString)
    expect(Slug(null)).toEqual(emptyString)
    expect(Slug(false)).toEqual(emptyString)
    expect(Slug(0)).toEqual(emptyString)
    expect(Slug(() => {})).toEqual(emptyString)
    expect(Slug({})).toEqual(emptyString)
  })

  it('eliminates special characters, double-dashes, leading/trailling dashes', () => {
    const before = ' no•••••  $$special$$-$^&   CharACters  '
    const after = Slug(before)
    expect(after).toEqual('no-special-characters')

    // LCase Letters, Numbers, and _ or - Only
    expect(after).toMatch(/[a-z\d_-]*/)

    // No repeating -'s
    expect(after).not.toContain('--')
    expect(after).not.toMatch(/^-/)
    expect(after).not.toMatch(/-$/)
  })

  it('normalizes arrays', () => {
    const before = ['$P3(14L---', '-leading  trailing-', '   ', '<<-empty']
    const after  = Slug(before)
    const expected = ['p-3-14-l', 'leading-trailing', 'empty']

    expect(after.length).toEqual(3) // 3rd should be eliminated entirely
    expect(isEqual(after, expected)).toBeTruthy()
  })

  it('maintains path correctly', () => {
    let before = 'path/to/Slug Which Must Be Changed'
    let after  = Url(before, true)

    expect(after).toEqual('path/to/slug-which-must-be-changed')
  })
})

describe('Url()', () => {
  it('maintains extensions', () => {
    const before = 'This is my File Name.ext'
    const after = Url(before)
    const expected = 'this-is-my-file-name.ext'

    expect(after).toEqual(expected)
  })

  it('maintains paths', () => {
    const before = '/path/to/resource/Funky  Resource   Name!!.html'
    const after = Url(before)
    const expected = '/path/to/resource/funky-resource-name.html'
  })

  it('handles / terminated urls properly', () => {
    const before = '/path/to/resource/'
    const after = Url(before)

    expect(after).toEqual(before)
  })
})
