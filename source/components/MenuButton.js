import ComponentBase      from '../application/ComponentBase'
import MenuItem           from './MenuItem';

let expanded = false;

export default ({
  align = 'right',
  caption = '',
  children = null,
  className = "menu-button button menu-item",
  onClick = () => {}
}) => {
  return (
    <div className={className}>
      <span className="caption" onClick={onClick}>{caption}</span>
      <ul className={`menu align-${align}`}>{children}</ul>
    </div>
  );
}