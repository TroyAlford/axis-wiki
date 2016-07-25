import Attribute          from '../sheet/Attribute'
import SectionHeader      from '../sheet/SectionHeader'

export default ({
  attributes = [],
  className = '',
  header = [],
  name = '',
  children,
  onChange
}) =>
  <div className={`${name} section ${className}`}>
    <div className="name">{name}</div>
    <SectionHeader items={header} />
    <div className="attributes">
      {attributes.map(attr =>
        <Attribute key={attr.name} attr={attr} cols={attr.cols || 1} />
      )}
    </div>
    {children}
  </div>
