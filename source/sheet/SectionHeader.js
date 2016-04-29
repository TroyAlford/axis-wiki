export default ({ items }) => 
  <div className="header">{items.map(item => {
    switch (typeof item) {
      case 'string':
        return <div className="header-item">{item}</div>;
      case 'object':
        return <div className={`header-item col-${item.cols}`}>{item.name}</div>
    }
  })}</div>