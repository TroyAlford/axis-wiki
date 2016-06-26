export default ({
  className = '',
  name = '',
  size = 'default',
  onClick = (event => {})
}) => (
  <span className={`icon is-${size} ${className}`}><i
    className={`icon-${name}`}
    onClick={onClick}
  ></i></span>
)
