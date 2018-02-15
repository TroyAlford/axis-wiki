import React from 'react'
import Loadable from 'react-loadable'

const HtmlEditor = Loadable({
  loader: () => import(/* webpackChunkName: "AceEditor" */ './dynamic/AceEditor'),
  loading: () => <div className="loading" />,
  render: ({ default: AceEditor }, { html, readonly, ...props }) => (
    <AceEditor {...props} value={html} readOnly={readonly} />
  ),
})

HtmlEditor.displayName = 'HtmlEditor'
export default HtmlEditor
