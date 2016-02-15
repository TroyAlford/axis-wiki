import React from 'react';

import Icon from './Icon';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    if (typeof this.props.onRemove == 'function')
      this.props.onRemove();
  }

  render() {
    return (
      <span className="tag">
        <Icon name="tag" size="small" />
        {this.props.name}
        {this.props.editable ? <Icon name="remove" size="small" onClick={this.handleRemove} /> : ''}
      </span>
    );
  }
}