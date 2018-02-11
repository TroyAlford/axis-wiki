import React from 'react'
import Helmet from 'react-helmet'
import { observer } from 'mobx-react'

const HtmlMetadata = ({ config, page }) => (
  <Helmet
    meta={[{ name: 'keywords', content: page.keywords }]}
    title={page.title || 'Welcome'}
    titleTemplate={`%s - ${config.application.name}`}
  />
)

HtmlMetadata.displayName = 'HtmlMetadata'
export default observer(HtmlMetadata)
