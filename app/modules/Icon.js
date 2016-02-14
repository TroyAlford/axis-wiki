import React from 'react';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className={`icon is-${this.props.size}`}><i className={`icon-${this.props.name}`}></i></span>
    );
  }
}
Icon.defaultProps = {
  name: 'default',
  size: 'default'
};
