import React                           from 'react'
import { Reactor, Store, toImmutable } from 'nuclear-js'

const reactor = new Reactor();

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