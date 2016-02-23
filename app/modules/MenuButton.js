import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import MenuItem from './MenuItem';

let cn = classNames;

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
      <ul className={cn({ 'cp-menubutton': true, 'button': true, 'cp-menu-expanded': this.state.expanded })}>
        <MenuItem icon={this.props.icon} caption={this.caption}
                  onMouseDown={this.handleMouseDown} onClick={this.handleClick}>
          <ul>{this.props.children}</ul>
        </MenuItem>
      </ul>
    )
  }
}