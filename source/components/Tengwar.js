import React from 'react'
import Loadable from 'react-loadable'

const Tengwar = Loadable({
  loader: () => import(/* webpackChunkName: "Glaemscribe" */ './dynamic/Glaemscribe'),
  loading: () => <div className="loading" />,
  render: ({ default: Glaemscribe }, props) => <Glaemscribe {...props} />,
})

Tengwar.displayName = 'Tengwar'
export default Tengwar
