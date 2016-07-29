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

  it('renders classes properly', () => {
    render(<Attribute className="test-class" />)
    expect(rendered().classList).toContain('attribute')
    expect(rendered().classList).toContain('test-class')
  })
})
