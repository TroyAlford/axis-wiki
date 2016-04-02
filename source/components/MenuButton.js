import React from 'react';
import ReactDOM from 'react-dom';

import MenuItem from './MenuItem';

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
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