import React from 'react';

import Icon from './Icon';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    }
  }

  render() {
    return (
      <span className="tag"><Icon name="tag" size="small" /> {this.props.name}</span>
    );
  }
}