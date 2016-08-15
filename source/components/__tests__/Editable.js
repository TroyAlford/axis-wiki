jest.unmock('../Editable');

import * as React from 'react'
import * as ReactDOMfrom 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Editable from '../Editable'

describe('Editable', () => {
  let parent    = null,
      component = null,
      rendered  = null

  const Simulate  = TestUtils.Simulate

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

  it('raises change events properly', () => {
    const changing = jest.genMockFunction()
    const change = jest.genMockFunction()

    render(<Editable value='first' editing={true} onChanging={changing} onChange={change} />)
    Simulate.change(rendered().children[0], { target: { value: 'second' }})
    expect(changing).toBeCalledWith('second', 'first')
    expect(change).toBeCalledWith('second', 'first')

    Simulate.change(rendered().children[0], { target: { value: 'third' }})
    expect(changing).toBeCalledWith('third', 'second')
    expect(change).toBeCalledWith('third', 'second')
  })

  it('handles cancellation of changes properly', () => {
    const cancel = jest.genMockFunction().mockReturnValue(false)
    const none   = jest.genMockFunction()

    render(<Editable value='first' editing={true} onChanging={cancel} onChange={none} />)
    Simulate.change(rendered().children[0], { target: { value: 'second' }})
    expect(cancel).toBeCalledWith('second', 'first')
    expect(none).not.toBeCalled()
  })

  it('renders checkboxes properly', () => {
    function validateCheckbox() {
      expect(rendered().children.length).toEqual(1)
      let checkbox = rendered().children[0]
      expect(checkbox.tagName).toEqual('INPUT')
      expect(checkbox.type).toEqual('checkbox')
      return checkbox
    }

    render(<Editable value={true} editing={true} />)
    expect(component.editorType).toEqual('boolean')
    validateCheckbox()

    render(<Editable value='test' type='boolean' editing={true} />)
    expect(component.editorType).toEqual('boolean')
    let checkbox = validateCheckbox()

    Simulate.change(checkbox, { target: { value: false }})
    expect(component.dirty).toEqual(true)
    expect(rendered().classList).toContain('dirty')
    expect(component.state.value).toEqual(false)
  })
})
