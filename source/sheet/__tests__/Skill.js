jest.unmock('../Skill')
jest.unmock('../../components/Editable')

import * as React from 'react'
import * as ReactDOMfrom 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Skill from '../Skill'

describe('Skill', () => {
  let parent    = null,
      component = null,
      rendered  = null

  const Simulate  = TestUtils.Simulate

  function render(element) { ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    component = ReactDOM.render(<Skill />, parent)
    rendered = () => ReactDOM.findDOMNode(component)
  })

  describe('parseName', () => {
    const parse = Skill.parseName

    it('parses 3-part text properly', () => {
      const expected = { category: 'Cat3g0ry T3st', name: 'N4me', note: 'No7e' }
      expect(parse('Cat3g0ry T3st: N4me (No7e)')).toEqual(expected)
      expect(parse('Cat3g0ry T3st:N4me(No7e)')).toEqual(expected)
      expect(parse(' Cat3g0ry T3st   :   N4me  ( No7e  )')).toEqual(expected)
    })
    it('parses 2-part text [category, name] properly', () => {
      const expected = { category: 'Cat3g0ry T3st', name: 'N4me', note: '' }
      expect(parse('Cat3g0ry T3st: N4me')).toEqual(expected)
      expect(parse('Cat3g0ry T3st:N4me')).toEqual(expected)
      expect(parse('  Cat3g0ry T3st  :  N4me  ')).toEqual(expected)
    })
    it('parses 2-part text [name, notes] properly', () => {
      const expected = { category: '', name: 'N4me', note: 'No7e' }
      expect(parse('N4me   ( No7e ) ')).toEqual(expected)
      expect(parse('N4me(No7e)')).toEqual(expected)
      expect(parse('  N4me  (No7e) ')).toEqual(expected)
    })
    it('parses 2-part text [category, notes] properly', () => {
      const expected = { category: 'Category', name: '', note: 'Notes' }
      expect(parse('Category:(Notes)')).toEqual(expected)
      expect(parse(' Category : (Notes) ')).toEqual(expected)
      expect(parse('  Category :     ( Notes )')).toEqual(expected)
    })
    it('returns invalid input, unchanged', () => {
      const expected = { category: '', name: '', note: '' }
      expect(parse(null)).toEqual(expected)
      expect(parse(undefined)).toEqual(expected)
      expect(parse([])).toEqual(expected)
      expect(parse(() => {})).toEqual(expected)
    })
  })

  it('renders classes properly', () => {
    render(<Skill className="test-class" />)
    expect(rendered().classList).toContain('skill')
    expect(rendered().classList).toContain('test-class')
  })
})
