import * as React from 'react'
import Collection from '../../utility/Collection'
import ComponentBase from '../application/ComponentBase'
import Section from './Section'

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
  }

  handleCollectionChange() {
    this.setState({}) // Force update
    this.props.onChange()
  }

  handleChange(updated, previous) {
    this.collection.update(previous.id, {
      ...updated,
      id: previous.id
    })
  }
  handleEditEnd(item) {
    item.key === '' && this.collection.remove({ id: item.id })
  }

  renderItem(item) {
    return (this.props.renderItem || this.renderItem || (() => null)).apply()
  }

  render() {
    return (
      <Section name={this.props.headline} header={this.props.headers}>
        {this.collection.sorted.map(this.renderItem)}
      </Section>
    )
  }
}

CollectionManager.propTypes = {
  headers: React.PropTypes.arrayOf(React.PropTypes.string),
  headline: React.PropTypes.string,
  items: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  renderItem: React.PropTypes.func,
  settings: React.PropTypes.object.isRequired,
}
CollectionManager.defaultProps = {
  items: [],
  onChange: () => {},
  renderItem: () => null,
  settings: {},
}
