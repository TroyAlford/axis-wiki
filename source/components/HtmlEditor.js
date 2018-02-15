import React from 'react'
import Loadable from 'react-loadable'
import noop from '@utils/noop'

const AceEditor = Loadable({
  loader: () => import(/* webpackChunkName: "AceEditor" */ './AceEditor'),
  loading: () => <div className="loading" />,
})

const HtmlEditor = ({ html = '', onChange = noop, readonly = false }) => (
  <AceEditor onChange={onChange} readOnly={readonly} value={html} />
)

HtmlEditor.displayName = 'HtmlEditor'
export default HtmlEditor
