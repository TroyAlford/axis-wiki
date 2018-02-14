import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
import { observer, Observer } from 'mobx-react'
import isEqual from 'lodash/isEqual'
import Tag from '@components/Tag'
import noop from '@utils/noop'
import { slugify } from '../../utility/Slugs'

const exclude = (list, exclusions) => list.filter(entry => exclusions.indexOf(entry) === -1)
const clean = (list, bans) => slugify(exclude(slugify(list), slugify(bans)))

@observer export default class TagBar extends Component {
  static defaultProps = {
    banned: [],
    className: '',
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

  handleTagClickRemove = (which) => {
    this.props.onRemove(which)
    this.forceUpdate() // workaround for TagsInput not being observable
  }

  renderTag = ({ className, key, tag }) => (
    <Tag
      className={`icon-tag ${className}`.trim()}
      key={key}
      linkTo={`/page/${tag}`}
      onClickRemove={this.handleTagClickRemove}
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
    const { className, inputSettings, readonly, tags, tagSettings } = this.props
    const classNames = [
      'tag-bar',
      className,
      readonly ? 'readonly' : '',
    ].filter(Boolean)

    return (
      <TagsInput
        className={classNames.join(' ')}
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
