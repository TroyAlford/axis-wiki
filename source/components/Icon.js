export default ({
  className = '',
  name = '',
  size = 'default',
  onClick = (event => {})
}) => (
  <span
    className={`icon is-${size} ${className}`}
    onClick={onClick}
  ><i className={`icon-${name}`}></i></span>
)
