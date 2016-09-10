import * as React from 'react'
import TagsInput from 'react-tagsinput'
import { difference, isEqual, orderBy } from 'lodash'

export default class TagBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: this.clean(props.tags, props),
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: this.clean(nextProps.tags, nextProps),
    })
  }

  clean(list, props = this.props) {
    let tags = difference(list, props.banned)
    if (props.unique) tags = orderBy(tags)
    return tags
  }

  render() {
    const {
      className, tags, readonly, unique,
      inputSettings, tagSettings, onChange,
    } = this.props

    return (
      <TagsInput
        className={className} value={tags} readonly={readonly}
        inputProps={inputSettings} tagProps={tagSettings}
        renderInput={props => !readonly &&
          <input type="text" ref="input" {...props}
            className={props.className}
            placeholder={props.placeholder}
          />
        }
        renderTag={props =>
          <span key={props.key} className={props.className}>
            <a className="icon icon-tag" href={`/page/${props.tag}`}>{props.tag}</a>
            { !readonly && <a className={tagSettings.classNameRemove} onClick={() => props.onRemove(props.key)} /> }
          </span>
        }
        onChange={updated => {
          let clean = this.clean(updated)
          if (!isEqual(clean, this.state.tags))
            this.props.onChange(clean)
        }}
        onlyUnique={unique}
      />
    )
  }
}

TagBar.propTypes = {
  banned: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  readonly: React.PropTypes.bool.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  unique: React.PropTypes.bool.isRequired,

  input: React.PropTypes.shape({
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  }),
  tagSettings: React.PropTypes.shape({
    className: React.PropTypes.string,
    classNameRemove: React.PropTypes.string,
  }),
}
TagBar.defaultProps = {
  banned: [],
  className: 'tag-bar',
  onChange: () => {},
  readonly: false,
  tags: [],
  unique: true,

  inputSettings: {
    className: 'tag-bar-input',
    placeholder: 'add tag'
  },
  tagSettings: {
    className: 'tag',
    classNameRemove: 'remove'
  },
}
