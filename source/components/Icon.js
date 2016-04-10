import ComponentBase      from '../application/ComponentBase'

export default class Icon extends ComponentBase {
  handleClick() {
    if (typeof this.props.onClick == 'function')
      this.props.onClick();
  }

  render() {
    return (
      <span className={`icon is-${this.props.size} ${this.props.className}`}><i
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
