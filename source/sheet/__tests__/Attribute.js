jest.unmock('../Attribute')
jest.unmock('../../components/Editable')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Attribute from '../Attribute'

describe('Attribute', () => {
  let parent    = null,
      component = null,
      rendered  = null

  const Simulate  = TestUtils.Simulate

  function render(element) { ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    component = ReactDOM.render(<Attribute />, parent)
    rendered = () => ReactDOM.findDOMNode(component)
  })

  describe('parseName', () => {
    const parse = new Attribute().parseName

    it('parses 3-part text properly', () => {
      expect(parse('Category: Name (Notes)')).toEqual(['Category', 'Name', 'Notes'])
      expect(parse('Category:Name(Notes)')).toEqual(['Category', 'Name', 'Notes'])
      expect(parse(' Cat3 G0ry :   Na m3  (N0t   es  )')).toEqual(['Cat3 G0ry', 'Na m3', 'N0t es'])
    })
    it('parses 2-part text [category, name] properly', () => {
      expect(parse('Category: Name')).toEqual(['Category', 'Name', ''])
      expect(parse('Category:  Name    ')).toEqual(['Category', 'Name', ''])
      expect(parse('   Cat3 G0ry :  Na m3   ')).toEqual(['Cat3 G0ry', 'Na m3', ''])
    })
    it('parses 2-part text [name, notes] properly', () => {
      expect(parse('Name(Notes)')).toEqual(['', 'Name', "Notes"])
      expect(parse('Name   ( Notes ) ')).toEqual(['', 'Name', 'Notes'])
      expect(parse('  N4  m3  (N0  tez) ')).toEqual(['', 'N4 m3', 'N0 tez'])
    })
    it('parses 2-part text [category, notes] properly', () => {
      expect(parse('Category:(Notes)')).toEqual(['Category', '', 'Notes'])
      expect(parse(' Category : (Notes) ')).toEqual(['Category', '', 'Notes'])
      expect(parse('  C4t3g 0ry :     ( N0  t3z )')).toEqual(['C4t3g 0ry', '', 'N0 t3z'])
    })
    it('returns invalid input, unchanged', () => {
      expect(parse(null)).toEqual(null)
      expect(parse(undefined)).toEqual(undefined)
      expect(parse([])).toEqual([])
      let fn = jest.genMockFunction()
      expect(parse(fn)).toEqual(fn)
    })
  })

  it('renders classes properly', () => {
    render(<Attribute className="test-class" />)
    expect(rendered().classList).toContain('attribute')
    expect(rendered().classList).toContain('test-class')
  })

  // it('raises change events properly', () => {
  //   const changing = jest.genMockFunction()
  //   const change = jest.genMockFunction()

  //   render(<Attribute value='first' editing={true} onChanging={changing} onChange={change} />)
  //   Simulate.change(rendered().children[0], { target: { value: 'second' }})
  //   expect(changing).toBeCalledWith('first', 'second')
  //   expect(change).toBeCalledWith('first', 'second')

  //   Simulate.change(rendered().children[0], { target: { value: 'third' }})
  //   expect(changing).toBeCalledWith('second', 'third')
  //   expect(change).toBeCalledWith('second', 'third')
  // })

  // it('handles cancellation of changes properly', () => {
  //   const cancel = jest.genMockFunction().mockReturnValue(false)
  //   const none   = jest.genMockFunction()

  //   render(<Attribute value='first' editing={true} onChanging={cancel} onChange={none} />)
  //   Simulate.change(rendered().children[0], { target: { value: 'second' }})
  //   expect(cancel).toBeCalledWith('first', 'second')
  //   expect(none).not.toBeCalled()
  // })

  // it('renders checkboxes properly', () => {
  //   function validateCheckbox() {
  //     expect(rendered().children.length).toEqual(1)
  //     let checkbox = rendered().children[0]
  //     expect(checkbox.tagName).toEqual('INPUT')
  //     expect(checkbox.type).toEqual('checkbox')
  //     return checkbox
  //   }

  //   render(<Attribute value={true} editing={true} />)
  //   expect(component.editor).toEqual('boolean')
  //   validateCheckbox()

  //   render(<Attribute value='test' type='boolean' editing={true} />)
  //   expect(component.editor).toEqual('boolean')
  //   let checkbox = validateCheckbox()

  //   Simulate.change(checkbox, { target: { value: false }})
  //   expect(component.dirty).toEqual(true)
  //   expect(rendered().classList).toContain('dirty')
  //   expect(component.state.value).toEqual(false)
  // })
})
