import Attribute          from '../sheet/Attribute'
import SectionHeader      from '../sheet/SectionHeader'

export default ({ name = '', header = [], attrs = [], children, onChange }) => 
  <div className={`${name} section`}>
    <div className="name">{name}</div>
    <SectionHeader items={header} />
    <div className="attributes">
      {attrs.map(attr =>
        <Attribute key={attr.name} attr={attr} cols={attr.cols || 1} />
      )}
    </div>
    {children}
  </div>