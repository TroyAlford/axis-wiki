import React from 'react';
import ReactDOM from 'react-dom';

import Icon from './Icon';

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
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