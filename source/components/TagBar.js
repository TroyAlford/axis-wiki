import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
import Tag from '@components/Tag'
import { isEqual } from 'lodash'
import noop from '@utils/noop'
import { slugify } from '../../utility/Slugs'

const exclude = (list, exclusions) => list.filter(entry => exclusions.indexOf(entry) === -1)
const clean = (list, bans) => slugify(exclude(slugify(list), slugify(bans)))

export default class TagBar extends Component {
  static defaultProps = {
    banned: [],
    className: 'tag-bar',
    onChange: noop,
    readonly: false,
    onRemove: noop,
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


  handleRemoveClick = ({ target }) => {
    const tag = target.parentElement.textContent
    this.props.onRemove(tag)
  }

  renderTag = ({ className, key, tag }) => (
    <Tag
      className={`icon-tag ${className}`.trim()}
      key={key}
      linkTo={`/page/${tag}`}
      onClickRemove={this.handleRemoveClick}
      removable={!this.props.readonly}
      tag={tag}
    />
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
