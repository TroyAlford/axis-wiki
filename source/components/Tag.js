import ComponentBase      from '../application/ComponentBase'
import Icon               from './Icon'
import ReactDOM           from 'react-dom'

export default class Tag extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name || 'new tag'
    };
  }

  handleBlur() {
    // Treat this as a Cancel.
    this.setState({ editing: false, name: this.props.name });
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleKeyDown(event) {
    if (event.which == 9 || event.which == 13) {
      // 9 = Tab, 13 = Enter. Save.
      if (typeof this.props.onChange == 'function') {
        this.props.onChange(this.props.name, this.state.name);
        this.setState({ editing: false });
      }
      event.stopPropagation();
      event.preventDefault();
    } else if (event.which == 27) {
      // 27 = Escape. Cancel.
      this.handleBlur();
    }
  }
  handleClick() {
    if (this.props.editable && !this.state.editing)
      this.setState({ editing: true });
  }

  handleRemove() {
    if (typeof this.props.onRemove == 'function')
      this.props.onRemove();
  }

  componentDidUpdate() {
    var editor = ReactDOM.findDOMNode(this.refs.editor);
    if (this.state.editing && editor !== document.activeElement) {
      editor.focus();
      editor.select();
    }
  }

  render() {
    var read = this.props.editable
      ? <span className="name" onClick={this.handleClick}>{this.props.name}</span>
      : <a href={`/page/${this.props.name}`}>{this.props.name}</a>
    ;
    var edit = <input type="text" className="name" value={this.state.name}
                      ref="editor"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown} />;

    return (
      <span className={`tag ${this.props.editable ? 'editable' : ''}`}>
        <Icon name="tag" size="small" />
        {this.state.editing ? edit : read}
        {this.props.editable ? <Icon name="remove" size="small" onClick={this.handleRemove} /> : ''}
      </span>
    );
  }
}