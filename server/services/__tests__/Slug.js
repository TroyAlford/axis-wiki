jest.unmock('../Slug')
import Slug from '../Slug'

describe('Slug', () => {
  it('returns empty string for any non-string values', () => {
    let before = () => {}
    let after = Slug.normalize(before)

    expect(after).toEqual('')
  })

  it('eliminates all but a-z, 0-9, _ and -', () => {
    let before = 'Cr4zy+  S1ug with $P3(14L (|-|4r4(73r$'
    let after  = Slug.normalize(before)

    expect(after).toEqual('cr4zy-s1ug-with-p3-14l-4r4-73r')
    // LCase Letters, Numbers, and _ or - Only
    expect(after).toMatch(/[a-z\d_-]*/)
    // No repeating -'s
    expect(after).not.toContain('--')
    expect(after).not.toMatch(/^-/)
    expect(after).not.toMatch(/-$/)
  })

  it('normalizes arrays', () => {
    let before = ['$P3(14L---', '-leading  trailing-', '   ', '<<-empty']
    let after  = Slug.normalize(before)

    expect(after.length).toEqual(3) // 3rd should be eliminated entirely
    expect(after[0]).toEqual('p3-14l')
    expect(after[1]).toEqual('leading-trailing')
    expect(after[2]).toEqual('empty')
  })

  it('maintains path correctly', () => {
    let before = 'path/to/Slug Which Must Be Changed'
    let after  = Slug.normalize(before, true)

    expect(after).toEqual('path/to/slug-which-must-be-changed')
  })
})
