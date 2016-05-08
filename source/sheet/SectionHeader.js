export default ({ items }) => 
  <div className="section-header">{items.map(item => 
    <div className="section-heading">{item}</div>
  )}</div>