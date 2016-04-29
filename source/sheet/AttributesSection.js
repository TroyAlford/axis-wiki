import _                  from 'lodash'
import Attribute          from '../sheet/Attribute'

export default ({ attrs, onChange }) => {
  let map = {};
  attrs.forEach(attr => map[attr.name] = attr.value);
  attrs.get = name => { return _.find(attrs, { name: name }) };

  return (
    <div className="Attributes section">
      <div className="name">Attributes</div>
      <div className="attributes">
        <div className="placeholder attr"></div>
        <Attribute attr={{
          name: "body", 
          value: Math.floor(map['strength'] + map['agility'] + map['fitness'] / 3)
        }} />
        <Attribute attr={{
          name: "Mind",
          value: Math.floor(map['intellect'] + map['acuity'] + map['focus'] / 3)
        }} />
        <Attribute attr={{
          name: "Spirit",
          value: Math.floor(map['confidence'] + map['intuition'] + map['devotion'] / 3)
        }} />

        <Attribute attr={{
          name: "Potency",
          value: Math.floor(map['strength'] + map['intellect'] + map['confidence'] / 3)
        }} />
        <Attribute attr={attrs.get('strength')} />
        <Attribute attr={attrs.get('intellect')} />
        <Attribute attr={attrs.get('confidence')} />

        <Attribute attr={{
          name: "Reflex",
          value: Math.floor(map['agility'] + map['acuity'] + map['intuition'] / 3)}
        }/>
        <Attribute attr={attrs.get('agility')} />
        <Attribute attr={attrs.get('acuity')} />
        <Attribute attr={attrs.get('focus')} />

        <Attribute attr={{
          name: "Resilience",
          value: Math.floor(map['fitness'] + map['focus'] + map['devotion'] / 3)
        }} />
        <Attribute attr={attrs.get('confidence')} />
        <Attribute attr={attrs.get('intuition')} />
        <Attribute attr={attrs.get('devotion')} />
      </div>
    </div>
  );
}