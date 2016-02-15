import React from 'react';
import ReactDOM from 'react-dom';

import Icon from './Icon';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name || 'new tag'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleKeyDown(event) {
    //ReactDOM.findDOMNode(this.refs.editor).focus();
    if (event.which == 9 || event.which == 13) {
      // 9 = Tab, 13 = Enter. Save.
      if (typeof this.props.onChange == 'function') {
        this.props.onChange(this.props.name, this.state.name);
        this.setState({ editing: false });
      }
    } else if (event.which == 27) {
      // 27 = Escape. Cancel.
      this.setState({
        editing: false,
        name: this.props.name
      });
    }
  }
  handleDoubleClick() {
    if (this.props.editable && !this.state.editing)
      this.setState({ editing: true });
  }
  handleRemove() {
    if (typeof this.props.onRemove == 'function')
      this.props.onRemove();
  }

  render() {
    var read = <span className="name" onDoubleClick={this.handleDoubleClick}>{this.props.name}</span>;
    var edit = <input type="text" className="name" value={this.state.name}
                      ref="editor"
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown} />;

    return (
      <span className="tag">
        <Icon name="tag" size="small" />
        {this.state.editing ? edit : read}
        {this.props.editable ? <Icon name="remove" size="small" onClick={this.handleRemove} /> : ''}
      </span>
    );
  }
}