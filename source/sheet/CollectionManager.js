import * as React from 'react'
import Collection from '../../utility/Collection'
import ComponentBase from '../application/ComponentBase'
import Icon from '../components/Icon'
import Section from './Section'
import { isEqual } from 'lodash'

export default class CollectionManager extends ComponentBase {
  constructor(props) {
    super(props)
    this.settings = props.settings
    this.collection = new Collection(props.items, this.settings)
    this.collection.onChange = this.handleCollectionChange.bind(this)
  }
  componentWillReceiveProps(newProps) {
    this.collection = new Collection(newProps.items, this.settings)
    this.collection.onChange = this.handleCollectionChange.bind(this)

    if (!isEqual(newProps.items, this.props.items))
      this.handleCollectionChange()
  }

  addItem() {
    this.collection.add(this.collection.applyTemplate({}))
  }

  handleCollectionChange() {
    this.props.onChange(this.collection)
  }

  handleChange(updated, previous) {
    this.collection.update(previous.id, updated)
  }
  handleEditEnd(item) {
    item.key === '' && this.collection.remove({ id: item.id })
  }

  renderItem(item) {
    return this.props.renderItem(item)
  }

  render() {
    const buttons = []
    if (this.props.allowAdd)
      buttons.push(
        <Icon key="btn-add" name="add" onClick={this.addItem.bind(this)} />
      )

    return (
      <Section className={this.props.title}
        title={[
          <span key="title">{this.props.title}</span>,
          <div key="buttons" className="buttons">{buttons}</div>
        ]}
        headers={this.props.headers}>
        {this.collection.map(this.renderItem)}
      </Section>
    )
  }
}

CollectionManager.propTypes = {
  allowAdd: React.PropTypes.bool.isRequired,
  headers: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ])),
  items: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  renderItem: React.PropTypes.func,
  settings: React.PropTypes.object.isRequired,
  title: React.PropTypes.string,
}
CollectionManager.defaultProps = {
  allowAdd: true,
  headers: [],
  items: [],
  onChange: () => {},
  renderItem: () => null,
  settings: {},
  title: '',
}
