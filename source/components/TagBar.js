import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
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

  renderInput = ({ addTag, ...props }) => (
    this.props.readonly
      ? <input type="text" ref={this.setInput} {...props} />
      : <span ref={this.setInput} />
  )
  renderTag = props => (
    <span key={props.key} className={props.className}>
      <a className="icon icon-tag" href={`/page/${props.tag}`}>{props.tag}</a>
      {!this.props.readonly &&
        <button className={this.props.tagSettings.classNameRemove}
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            return props.onRemove(props.key)
          }}
        />}
    </span>
  )
  render() {
    const { className, tags, readonly, inputSettings, tagSettings } = this.props

    return (
      <TagsInput
        className={className}
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
