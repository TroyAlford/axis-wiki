import ComponentBase  from '../application/ComponentBase'
import Icon           from './Icon';
import ReactDOM       from 'react-dom';

export default class MenuButton extends ComponentBase {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (typeof this.props.onClick == 'function')
      this.props.onClick();
  }
  handleMouseDown() {
    if (typeof this.props.onMouseDown == 'function')
      this.props.onMouseDown();
  }

  render() {
    let icon = (typeof this.props.icon == 'object')
      ? <Icon name={this.props.icon.name} size={this.props.icon.size} />
      : '';

    return (
      <li className="cp-menuitem" onClick={this.handleClick} onMouseDown={this.handleMouseDown}>
        {icon}{this.props.caption}
        {this.props.children}
      </li>
    );
  }
}