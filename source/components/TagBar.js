import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import { isEqual } from 'lodash'
import { slugify } from '../../utility/Slugs'

const exclude = (list, exclusions) => list.filter(entry => exclusions.indexOf(entry) === -1)
const clean = (list, bans) => slugify(exclude(slugify(list), slugify(bans)))

export default class TagBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: clean(props.tags, props.banned || []),
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: clean(nextProps.tags, nextProps.banned || []),
    })
  }

  render() {
    const {
      className, tags, readonly, onChange,
      inputSettings, tagSettings,
    } = this.props

    return (
      <TagsInput onlyUnique readonly={readonly} value={tags}
        className={className} inputProps={inputSettings} tagProps={tagSettings}
        renderInput={({ addTag, ...props }) => (!readonly
          ? <input type="text" ref="input" {...props} />
          : <span ref="input" />
        )}
        renderTag={props =>
          <span key={props.key} className={props.className}>
            <a className="icon icon-tag" href={`/page/${props.tag}`}>{props.tag}</a>
            { !readonly &&
              <a className={tagSettings.classNameRemove}
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                  return props.onRemove(props.key)
                }}
              /> }
          </span>
        }
        onChange={(updated) => {
          const cleaned = clean(updated, this.props.banned)
          if (!isEqual(cleaned, this.state.tags)) onChange(cleaned)
        }}
      />
    )
  }
}

TagBar.propTypes = {
  banned:    PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onChange:  PropTypes.func.isRequired,
  readonly:  PropTypes.bool.isRequired,
  tags:      PropTypes.arrayOf(PropTypes.string).isRequired,

  inputSettings: PropTypes.shape({
    className:   PropTypes.string,
    placeholder: PropTypes.string,
  }),
  tagSettings: PropTypes.shape({
    className:       PropTypes.string,
    classNameRemove: PropTypes.string,
  }),
}
TagBar.defaultProps = {
  banned:    [],
  className: 'tag-bar',
  onChange:  () => {},
  readonly:  false,
  tags:      [],

  inputSettings: {
    className:   'tag-bar-input',
    placeholder: 'add tag',
  },
  tagSettings: {
    className:       'tag',
    classNameRemove: 'remove',
  },
}
