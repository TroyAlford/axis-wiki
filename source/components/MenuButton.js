import ComponentBase      from '../application/ComponentBase'
import MenuItem           from './MenuItem';
import ReactDOM           from 'react-dom';

export default class MenuButton extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  handleMouseDown(event) {
    if (!this.state.expanded) {
      this.setState({ expanded: true, expanding: true });
    }
  }
  handleClick(event) {
    if (this.state.expanded && !this.state.expanding) {
      this.setState({ expanded: false, expanding: false });
    } else {
      this.setState({expanding: false});
    }
  }

  render() {
    return (
      <ul className={`cp-menubutton button ${this.state.expanded ? 'cp-menu-expanded' : ''}`}>
        <MenuItem icon={this.props.icon} caption={this.caption}
                  onMouseDown={this.handleMouseDown} onClick={this.handleClick}>
          <ul>{this.props.children}</ul>
        </MenuItem>
      </ul>
    )
  }
}