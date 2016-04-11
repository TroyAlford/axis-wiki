import React                           from 'react'

function autoBind(object) {
  var proto = object.constructor.prototype;
  var names = Object.getOwnPropertyNames(proto).filter(key => {
    return key != 'constructor' && key != 'render' 
        && typeof proto[key] == 'function';  
  })
  
  names.push('setState');
  names.forEach(key => {
    object[key] = object[key].bind(object);
  });
  
  return object;
}

export default class ComponentBase extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
}