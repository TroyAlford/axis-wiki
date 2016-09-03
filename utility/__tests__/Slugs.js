jest.unmock('../Slugs')

import TestUtils from 'react-addons-test-utils'
import Slug from '../Slugs'

describe('Slug()', () => {
  it('eliminates leading and trailing white-space/dashes', () => {
    const input = '   no leading or trailing white-space   '
    expect(Slug(input)).toEqual('no-leading-or-trailing-white-space')
  })
  it('eliminates special characters, with no double-dashes', () => {
    const input = ' no•••••  $$special$$-$^&   CharACters  '
    expect(Slug(input)).toEqual('no-special-characters')
  })
})
