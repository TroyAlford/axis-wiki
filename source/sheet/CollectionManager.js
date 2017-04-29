import * as React from 'react'
import PropTypes from 'prop-types'
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
    if (!this.props.readonly && this.props.allowAdd)
      buttons.push(
        <Icon key="btn-add" name="add" onClick={this.addItem.bind(this)} />
      )

    let classes = []
    if (Array.isArray(this.props.title))
      classes = this.props.title.filter(title => typeof title === 'string')
    else
      classes = [this.props.title.toString()]

    return (
      <Section className={classes.join(' ')}
        title={[
          <span key="title">{this.props.title}</span>,
          <div key="buttons" className="buttons">{buttons}</div>,
        ]}
        headers={this.props.headers}>
        {this.collection.map(item => this.renderItem(item))}
      </Section>
    )
  }
}

CollectionManager.propTypes = {
  allowAdd: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ])),
  items: PropTypes.array.isRequired,
  readonly: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ])),
  ]),

  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
}
CollectionManager.defaultProps = {
  allowAdd: true,
  headers: [],
  items: [],
  readonly: false,
  settings: {},
  title: '',

  onChange: () => {},
  renderItem: () => null,
}
