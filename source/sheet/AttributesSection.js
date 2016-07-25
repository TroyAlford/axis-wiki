import _                  from 'lodash'
import Attribute          from '../sheet/Attribute'

export default ({ attributes, onChange }) => {
  return (
    <div className="Attributes section">
      <div className="name">Attributes</div>
      <div className="attributes">
        <div className="placeholder attribute"></div>
        <Attribute className="th" attribute={attributes{
          name: "body",
          value: Math.floor(map['strength'] + map['agility'] + map['fitness'] / 3)
        }} />
        <Attribute className="th" attribute={{
          name: "Mind",
          value: Math.floor(map['intellect'] + map['acuity'] + map['focus'] / 3)
        }} />
        <Attribute className="th" attribute={{
          name: "Spirit",
          value: Math.floor(map['confidence'] + map['intuition'] + map['devotion'] / 3)
        }} />

        <Attribute className="th" attribute={{
          name: "Potency",
          value: Math.floor(map['strength'] + map['intellect'] + map['confidence'] / 3)
        }} />
        <Attribute attribute={attributes.get('strength')} />
        <Attribute attribute={attributes.get('intellect')} />
        <Attribute attribute={attributes.get('confidence')} />

        <Attribute className="th" attribute={{
          name: "Reflex",
          value: Math.floor(map['agility'] + map['acuity'] + map['intuition'] / 3)}
        }/>
        <Attribute attribute={attributes.get('agility')} />
        <Attribute attribute={attributes.get('acuity')} />
        <Attribute attribute={attributes.get('focus')} />

        <Attribute className="th" attribute={{
          name: "Resilience",
          value: Math.floor(map['fitness'] + map['focus'] + map['devotion'] / 3)
        }} />
        <Attribute attribute={attributes.get('confidence')} />
        <Attribute attribute={attributes.get('intuition')} />
        <Attribute attribute={attributes.get('devotion')} />
      </div>
    </div>
  );
}
