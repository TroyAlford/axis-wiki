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

  describe('createRange()', () => {
    it('returns [] if low > high', () => {
      const low = 1
      const high = 0
      const expected = []
      const actual = component.createRange(low, high)
      expect(actual).toEqual(expected)
    })
    it('returns 1 value when low === high', () => {
      const low = 1
      const high = 1
      const expected = [1]
      const actual = component.createRange(low, high)
      expect(actual).toEqual(expected)
    })
    it('calculates range correctly', () => {
      const low = 1
      const high = 5
      const expected = [1, 2, 3, 4, 5]
      const actual = component.createRange(low, high)
      expect(actual).toEqual(expected)
    })
  })

  describe('calculateAttributes', () => {
    it('calculates correctly', () => {
      /* eslint-disable no-multi-spaces */
      const attributes = [
        { key: 'strength',   value: 0 }, // xp:   0
        { key: 'intellect',  value: 1 }, // xp:   5 = 5
        { key: 'confidence', value: 2 }, // xp:  13 = 2^3 + 5
        { key: 'agility',    value: 3 }, // xp:  40 = 3^3 + 2^3 + 5
        { key: 'acuity',     value: 4 }, // xp: 104 = 4^3 + 3^3 + 2^3 + 5
        { key: 'intuition',  value: 5 }, // xp: 229 = 5^3 + 4^3 + 3^3 + 2^3 + 5
        { key: 'ignore-me',  value: 5 }, // xp:   0 (ignored)
      ]
      const expected = 391 // 5 + 13 + 40 + 104 + 229

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
