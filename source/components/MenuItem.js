import ComponentBase  from '../application/ComponentBase'
import Icon           from './Icon';
import ReactDOM       from 'react-dom';

export default ({
  caption = '',
  children = null,
  className = "menu-item",
  onClick = () => {}
}) => (
  <li className={className} onClick={onClick}>
    <span className="caption">{caption}</span>
    {children}
  </li>
)