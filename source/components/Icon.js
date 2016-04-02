import React from 'react';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (typeof this.props.onClick == 'function')
      this.props.onClick();
  }

  render() {
    return (
      <span className={`icon is-${this.props.size}`}><i
        className={`icon-${this.props.name}`}
        onClick={this.handleClick}
      ></i></span>
    );
  }
}
Icon.defaultProps = {
  name: 'default',
  size: 'default'
};
