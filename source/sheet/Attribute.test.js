jest.unmock('./Attribute')
jest.unmock('../components/Editable')

/* eslint-disable import/first,react/no-find-dom-node */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Attribute from './Attribute'

describe('Attribute', () => {
  let parent = null
  let component = null
  let rendered = null

  function render(element) { ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    component = ReactDOM.render(<Attribute />, parent)
    rendered = () => ReactDOM.findDOMNode(component)
  })

  it('renders classes properly', () => {
    render(<Attribute className="test-class" />)
    expect(rendered().classList.contains('attribute')).toBeTruthy()
    expect(rendered().classList.contains('test-class')).toBeTruthy()
  })
})
