import React from 'react'
import Helmet from 'react-helmet'
import { observer } from 'mobx-react'
import CONFIG from '../../config/config'

const HtmlMetadata = ({ page }) => (
  <Helmet
    meta={[{ name: 'keywords', content: page.keywords }]}
    title={page.title || 'Welcome'}
    titleTemplate={`%s - ${CONFIG.applicationName}`}
  />
)

HtmlMetadata.displayName = 'HtmlMetadata'
export default observer(HtmlMetadata)
