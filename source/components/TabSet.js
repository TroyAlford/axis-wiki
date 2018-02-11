import React from 'react'
import { find } from 'lodash'
import noop from '@utils/noop'

const renderTab = ({ key, innerHTML, contents }) => {
  const props = {}
  if (innerHTML !== undefined) props.dangerouslySetInnerHTML = { __html: innerHTML }

  return (
    <div className={`tab ${key || ''}`.trim()} {...props}>
      {innerHTML === undefined && (contents || '')}
    </div>
  )
}

export default ({ key = '', tabs = [], onTabClicked = noop, active = null }) => {
  if (tabs.length === 0) { tabs.push({ key: 'blank', innerHTML: '' }) }

  const activeKey = active || tabs[0].key
  const activeTab = find(tabs, { key: activeKey }) || tabs[0]
  const renderedTab = renderTab(activeTab)

  return (
    <div className={`tab-set ${key}`}>
      <ul className="tabs">
        {tabs.map((tab) => {
          if (!tab.onClick) {
            // eslint-disable-next-line no-param-reassign
            tab.onClick = () => onTabClicked(tab)
          }
          if (React.isValidElement(tab)) { return tab }

          const className = [
            'tab',
            tab.key,
            tab.className || '',
            activeTab.key === tab.key ? 'is-active' : '',
          ].join(' ').trim()

          return <li key={key} className={className} onClick={tab.onClick}>{tab.caption}</li>
        })}
      </ul>
      {renderedTab}
    </div>
  )
}
