export default ({ attr }) => 
  <div className={`attr cols-${attr.cols || 1}`}>
    <div className="name">{attr.name}</div>
    <div className="value">{attr.value}</div>
  </div>