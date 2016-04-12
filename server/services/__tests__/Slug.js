jest.unmock('../Slug');

import React      from 'react'
import ReactDOM   from 'react-dom'
import TestUtils  from 'react-addons-test-utils'
import Slug       from '../Slug'

describe('Slug', () => {
  it('eliminates all but a-z, 0-9, _ and -', () => {
    let before = 'Cr4zy+  S1ug with $P3(14L (|-|4r4(73r$';
    let after  = Slug.normalize(before);

    // LCase Letters, Numbers, and _ or - Only
    expect(after).toMatch(/[a-z\d_-]*/);
    // No repeating -'s
    expect(after).not.toContain('--');
    expect(after).not.toMatch(/^-/);
    expect(after).not.toMatch(/-$/);
  });

  it('maintains path correctly', () => {
    let before = 'path/to/Slug Which Must Be Changed';
    let after  = Slug.normalize(before, true);

    expect(after).toEqual('path/to/slug-which-must-be-changed');
  });
});