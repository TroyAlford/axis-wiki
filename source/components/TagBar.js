import React, { Component, Fragment } from 'react'
import TagsInput from 'react-tagsinput'
import { Link } from 'react-router-dom'
import { isEqual } from 'lodash'
import { slugify } from '../../utility/Slugs'

const exclude = (list, exclusions) => list.filter(entry => exclusions.indexOf(entry) === -1)
const clean = (list, bans) => slugify(exclude(slugify(list), slugify(bans)))

export default class TagBar extends Component {
  static defaultProps = {
    banned: [],
    className: 'tag-bar',
    onChange: () => { },
    readonly: false,
    tags: [],

    inputSettings: {
      className: 'tag-bar-input',
      placeholder: 'add tag',
    },
    tagSettings: {
      className: 'tag',
      classNameRemove: 'remove',
    },
  }

  componentDidMount = () => this.cleanTags(this.props)
  componentWillReceiveProps = this.cleanTags

  setInput = (self) => { this.input = self }

  cleanTags = ({ tags, banned }) => {
    this.setState({ tags: clean(tags.toJSON(), banned) || [] })
  }

  handleInputChange = (updated) => {
    const cleaned = clean(updated, this.props.banned)
    if (!isEqual(cleaned, this.state.tags)) this.props.onChange(cleaned)
  }


  handleRemoveClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    return this.props.onRemove()
  }

  renderTagEditable = tag => (
    <Fragment>
      <span>{tag}</span>
      <span className="remove" onClick={this.handleRemoveClick} />
    </Fragment>
  )
  renderTagReadonly = tag => (
    <Link to={`/page/${tag}`}>{tag}</Link>
  )
  renderTag = ({ className, key, tag }) => (
    <span key={key} className={`${className} icon-tag`.trim()}>
      {this.props.readonly ? this.renderTagReadonly(tag) : this.renderTagEditable(tag)}
    </span>
  )
  renderInput = ({ addTag, ...props }) => (
    this.props.readonly
      ? <span ref={this.setInput} />
      : <input type="text" ref={this.setInput} {...props} />
  )

  render() {
    const { className, tags, readonly, inputSettings, tagSettings } = this.props

    return (
      <TagsInput
        className={`${className} ${readonly && 'readonly'}`.trim()}
        inputProps={inputSettings}
        onChange={this.handleInputChange}
        onlyUnique
        readonly={readonly}
        renderInput={this.renderInput}
        renderTag={this.renderTag}
        tagProps={tagSettings}
        value={tags}
      />
    )
  }
}
