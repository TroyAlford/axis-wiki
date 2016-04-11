import ComponentBase from '../application/ComponentBase'

export default class Message extends ComponentBase {
  render() {
    return (
      <div className={`message ${this.props.className}`}>
        <div className="message-header">{this.props.title || ''}</div>
        <div className="message-body">{this.props.children}</div>
      </div>
    );
  }
}