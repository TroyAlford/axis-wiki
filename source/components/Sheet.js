import React from 'react'
import Loadable from 'react-loadable'

const Sheet = Loadable({
  loader: () => import(/* webpackChunkName: "Sheetforge" */ './dynamic/Sheetforge'),
  loading: () => <div className="loading" />,
  render: ({ default: SfSheet }, props) => <SfSheet {...props} />,
})

// const Sheet = props => <SfSheet {...props} />

Sheet.displayName = 'Sheet'
export default Sheet
