import Editable         from '../sheet/Editable'

export default ({ attr = [], className = '' }) => 
  <div className={`attr cols-${attr.cols || 1} ${className}`}>
    <Editable className="name" value={attr.name.replace(/[_-]/g, ' ')} />
    <Editable className="value" value={attr.value} />
    <Editable className="theory" value={attr.theory} />
    <Editable classname="mastery" value={attr.mastery} />
  </div>