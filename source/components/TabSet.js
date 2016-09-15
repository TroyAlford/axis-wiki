import * as React from 'react'
import { find } from 'lodash'

export default ({ key = '', tabs = [], onTabClicked = (() => {}), active = null }) => {
  if (tabs.length === 0)
    tabs.push({ key: 'blank', innerHTML: '' })

  if (!active) active = tabs[0].key

  const activeTab = find(tabs, { key: active }) || tabs[0]

  const renderedTab = activeTab.innerHTML !== undefined
    ? <div className={`tab ${activeTab.key || ''}`}
        dangerouslySetInnerHTML={{ __html: activeTab.innerHTML }}
      />
    : <div className={`tab ${activeTab.key || ''}`}>
        {activeTab.contents || ''}
      </div>

  return (
    <div className={`tab-set ${key}`}>
      <ul className="tabs">
      {tabs.map((tab, index) => React.isValidElement(tab) ? tab :
        <li key={index} className={`tab ${activeTab.key == tab.key ? 'is-active' : ''} ${tab.key || ''}`}
            onClick={onTabClicked.bind(null, tab)}>{tab.caption}</li>
      )}
      </ul>
      {renderedTab}
    </div>
  )
}
