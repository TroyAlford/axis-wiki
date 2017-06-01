jest.unmock('./SheetHeader')

/* eslint-disable import/first */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SheetHeader from './SheetHeader'

describe('SheetHeader', () => {
  let parent = null
  let component = null

  function render(element) { component = ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    render(<SheetHeader />, parent)
  })

  describe('calculateAttributes', () => {
    it('calculates correctly', () => {
      /* eslint-disable no-multi-spaces */
      const attributes = [                // xp:  0 | starting value
        { key: 'strength',   value: -1 }, // xp:   0 | +  0 (0^2)
        { key: 'intellect',  value:  0 }, // xp:   1 | +  1 (0^2 + 1^2)
        { key: 'confidence', value:  1 }, // xp:   6 | +  5 (0^2 + 1^2 + 2^2)
        { key: 'agility',    value:  2 }, // xp:  20 | + 14 (0^2 + 1^2 + 2^2 + 3^2)
        { key: 'acuity',     value:  3 }, // xp:  50 | + 30 (0^2 + 1^2 + 2^2 + 3^2 + 4^2)
        { key: 'intuition',  value:  4 }, // xp: 105 | + 55 (0^2 + 1^2 + 2^2 + 3^2 + 4^2 + 5^2)
        { key: 'ignore-me',  value:  5 }, // xp: 105 | +  0 (ignored)
      ]
      const expected = 105

      render(<SheetHeader attributes={attributes} />)
      const actual = component.calculateAttributes()

      expect(actual).toEqual(expected)
    })
  })
  describe('calculateSkills', () => {
    it('calculates correctly', () => {
      const skills = [
        { values: [0, 0] }, // xp:  0
        { values: [1, 1] }, // xp:  2 = free, 2
        { values: [2, 2] }, // xp: 10 = 2^2 | 2^2 + 2
        { values: [3, 3] }, // xp: 28 = 3^2 + 2^2 | 3^2 + 2^2 + 2
      ]
      const expected = 40 // 0 + 2 + 10 + 28

      render(<SheetHeader skills={skills} />)
      const actual = component.calculateSkills()

      expect(actual).toEqual(expected)
    })
  })
  describe('calculateTraits', () => {
    it('calculates correctly', () => {
      const traits = [
        { value: 0 }, // xp: 0
        { value: 1 }, // xp: 1
        { value: 2 }, // xp: 2
        { value: 3 }, // xp: 3
      ]
      const expected = 6 // 0 + 1 + 2 + 3

      render(<SheetHeader traits={traits} />)
      const actual = component.calculateTraits()

      expect(actual).toEqual(expected)
    })
  })
})
