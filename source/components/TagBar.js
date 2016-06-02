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
    renderInput={(props) => {
      let { onChange, value, ...other } = props
      return readonly ? '' : 
        <input type='text' onChange={onChange} value={value} {...other} />
    }}
    renderTag={(props) => {
      let { tag, key, onRemove, ...other } = props
      return (
        <span key={key} {...other}>
          <a href={`/page/${tag}`}>{tag}</a>
          { readonly ? '' : <a className={tagProps.classNameRemove} onClick={(e) => onRemove(key)} /> }
        </span>
      )
    }}
    onChange={onChange}
    onlyUnique={onlyUnique}
  />

export default TagBar