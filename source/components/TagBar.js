import TagsInput from 'react-tagsinput'

let TagBar = ({
  className = 'tag-bar',
  inputProps = {
    className: 'tag-bar-input', 
    placeholder: 'add tag'
  },
  tagProps = {
    className: 'tag',
    classNameRemove: 'remove'
  },
  readonly = false,
  tags = [],
  onChange = () => {},
  onlyUnique = true
}) => 
  <TagsInput
    className={className}
    value={tags}
    inputProps={inputProps} tagProps={tagProps}
    readonly={readonly}
    renderInput={props => !readonly && <input type="text" {...props} />}
    renderTag={props => 
      <span key={props.key} {...props}>
        <a className="icon icon-tag" href={`/page/${props.tag}`}>{props.tag}</a>
        { !readonly && <a className={tagProps.classNameRemove} onClick={() => props.onRemove(props.key)} /> }
      </span>
    }
    onChange={onChange}
    onlyUnique={onlyUnique}
  />

export default TagBar