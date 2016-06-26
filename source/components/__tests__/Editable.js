jest.unmock('../Editable');

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Editable from '../Editable'

describe('Editable', () => {
  let parent    = null,
      component = null,
      rendered  = null

  function render(element) { ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    component = ReactDOM.render(<Editable />, parent)
    rendered = () => ReactDOM.findDOMNode(component)
  })

  it('renders classes properly', () => {
    render(<Editable className="test-class" />)
    expect(rendered().classList).toContain('editable')
    expect(rendered().classList).toContain('test-class')

    render(<Editable readonly={true} />)
    expect(rendered().classList).toContain('readonly')
  })

  it('renders checkboxes properly', () => {
    render(<Editable value={true} editing={true} />)
    expect(rendered().children.length).toEqual(1)

    let checkbox = rendered().children[0]
    expect(checkbox.tagName).toEqual('INPUT')
    expect(component.editor).toEqual('boolean')
    expect(checkbox.type).toEqual('checkbox')

    TestUtils.Simulate.change(checkbox, { target: { value: false }})
    expect(component.dirty).toEqual(true)
    expect(component.state.value).toEqual(false)
  })
})
