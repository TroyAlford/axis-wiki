import ComponentBase from '../application/ComponentBase'
import Editable from '../components/Editable'

export default class SheetHeader extends ComponentBase {
  render() {
    return (
      <div className="sheet-header">
        <span className="CharacterName">{this.props.name}</span>
        <span className="name">Experience: </span>
        <Editable className="xp" value={this.props.xp} />
        <span className="name">RP Points: </span>
        <Editable className="rp" value={this.props.rp} />
        <span className="name">Total Power: </span>
        <Editable className="power" value={this.props.power} />
      </div>
    )
  }
}
