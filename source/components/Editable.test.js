import * as React from 'react'
import * as ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Editable from './Editable'

jest.unmock('./Editable')

describe('Editable', () => {
  let parent = null
  let component = null
  let rendered = null

  const Simulate = TestUtils.Simulate

  function render(element) { ReactDOM.render(element, parent) }

  beforeEach(() => {
    parent = document.createElement('div')
    component = ReactDOM.render(<Editable />, parent)
    // eslint-disable-next-line react/no-find-dom-node
    rendered = () => ReactDOM.findDOMNode(component)
  })

  it('renders classes properly', () => {
    render(<Editable className="test-class" />)
    expect(rendered().classList.contains('editable')).toEqual(true)
    expect(rendered().classList.contains('test-class')).toEqual(true)

    render(<Editable readonly />)
    expect(rendered().classList.contains('readonly')).toEqual(true)
  })

  it('raises change events properly', () => {
    const changing = jest.genMockFunction()
    const change = jest.genMockFunction()

    render(<Editable value="first" editing onChanging={changing} onChange={change} />)
    Simulate.change(rendered().children[0], { target: { value: 'second' } })
    expect(changing).toBeCalledWith('second', 'first')
    expect(change).toBeCalledWith('second', 'first')

    Simulate.change(rendered().children[0], { target: { value: 'third' } })
    expect(changing).toBeCalledWith('third', 'second')
    expect(change).toBeCalledWith('third', 'second')
  })

  it('handles cancellation of changes properly', () => {
    const cancel = jest.genMockFunction().mockReturnValue(false)
    const none = jest.genMockFunction()

    render(<Editable value="first" editing onChanging={cancel} onChange={none} />)
    Simulate.change(rendered().children[0], { target: { value: 'second' } })
    expect(cancel).toBeCalledWith('second', 'first')
    expect(none).not.toBeCalled()
  })

  it('renders checkboxes properly', () => {
    function validateCheckbox() {
      expect(rendered().children.length).toEqual(1)
      const checkbox = rendered().children[0]
      expect(checkbox.tagName).toEqual('INPUT')
      expect(checkbox.type).toEqual('checkbox')
      return checkbox
    }

    // eslint-disable-next-line react/jsx-boolean-value
    render(<Editable value={true} editing />)
    expect(component.editorType).toEqual('boolean')
    validateCheckbox()

    render(<Editable value="test" type="boolean" editing />)
    expect(component.editorType).toEqual('boolean')
    const checkbox = validateCheckbox()

    Simulate.change(checkbox, { target: { value: false } })
    expect(component.dirty).toEqual(true)
    expect(rendered().classList.contains('dirty')).toEqual(true)
    expect(component.state.value).toEqual(false)
  })
})
