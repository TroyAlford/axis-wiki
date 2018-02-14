import React from 'react'
import ReactDOM from 'react-dom'
import { Simulate } from 'react-dom/test-utils'
import Editable from './Editable'

describe('Editable', () => {
  let parent = null
  let component = null
  let rendered = null

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
    const onChange = jest.genMockFunction()

    render(<Editable value="first" onChange={onChange} />)
    component.handleToggleEditing()

    const editor = rendered().children[0]
    expect(editor.value).toEqual('first')
    Simulate.change(editor, { target: { value: 'second' } })
    Simulate.blur(editor)
    expect(onChange).toBeCalledWith('second', 'first')
  })

  it('renders checkboxes properly', () => {
    const onChange = jest.fn()

    function validateCheckbox() {
      expect(rendered().children.length).toEqual(1)
      const checkbox = rendered().children[0]
      expect(checkbox.tagName).toEqual('INPUT')
      expect(checkbox.type).toEqual('checkbox')
      return checkbox
    }

    // eslint-disable-next-line react/jsx-boolean-value
    render(<Editable value={true} onChange={onChange} />)
    expect(component.getEditorType()).toEqual('boolean')
    validateCheckbox()

    render(<Editable value="test" type="boolean" onChange={onChange} />)
    expect(component.getEditorType()).toEqual('boolean')
    const checkbox = validateCheckbox()

    Simulate.change(checkbox, { target: { value: false } })
    expect(onChange).toBeCalledWith(false, 'test')
  })
})
