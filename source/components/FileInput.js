import ComponentBase        from '../application/ComponentBase'

export default class FileInput extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value.split(/(\\|\/)/g).pop()
    });
    if (this.props.onChange) this.props.onChange(event);
  }

  render() {
    return (
      <div className="file-input">
        <input type="file" 
          name={this.props.name}
          className={`input-file ${this.props.className}`}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          accept={this.props.accept}
        />
        <input type="text"
          tabIndex={-1}
          name={`${this.props.name}_filename`}
          value={this.state.value}
          className={`input-text ${this.props.className}`}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}