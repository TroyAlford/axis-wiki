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

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <ul className={cn({ 'cp-menubutton': true, 'button': true, 'cp-menu-expanded': this.state.expanded })}>
        <MenuItem icon={this.props.icon} caption={this.caption} onMouseDown={this.handleToggle}>
          <ul>{this.props.children}</ul>
        </MenuItem>
      </ul>
    )
  }
}