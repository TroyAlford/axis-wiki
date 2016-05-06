import ComponentBase from '../application/ComponentBase'

default export class Header extends ComponentBase {
  render() {
    <div className="header">
      <Editable className="xp" label="XP" value={this.props.xp} />
      <Editable className="rp" label="RP" value={this.props.rp} />
      <Editable className="power" label="Power" value={this.props.power} />
      <Editable className="name" label="Name" value={this.props.name}
    </div>
  }
}