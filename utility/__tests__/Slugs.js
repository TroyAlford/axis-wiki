jest.unmock('../Slugs')

import TestUtils from 'react-addons-test-utils'
import { slugify } from '../Slugs'

describe('slugify()', () => {
  it('eliminates leading and trailing white-space/dashes', () => {
    const input = '   no leading or trailing white-space   '
    expect(slugify(input)).toEqual('no-leading-or-trailing-white-space')
  })
  it('eliminates special characters, with no double-dashes', () => {
    const input = ' no•••••  $$special$$-$^&   CharACters  '
    expect(slugify(input)).toEqual('no-special-characters')
  })
})
