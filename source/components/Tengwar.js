import React from 'react'
import Loadable from 'react-loadable'

const Tengwar = Loadable({
  loader: () => import(/* webpackChunkName: "Glaemscribe" */ './dynamic/Glaemscribe'),
  loading: () => <i>(loading tengwar)</i>,
  render: ({ default: Glaemscribe }, props) => <Glaemscribe {...props} />,
})

Tengwar.displayName = 'Tengwar'
export default Tengwar
