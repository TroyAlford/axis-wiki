import React, { Fragment } from 'react'
import noop from '@utils/noop'

const DEFAULT_TAB = {
  id: 'blank',
  onClick: noop,
  renderTab: () => <div />,
  renderContents: () => <div />,
}

const TabSet = ({ activeTabId, buttons, onTabClicked = noop, showTabs = true, tabs = [] }) => {
  if (tabs.length === 0) tabs.push(DEFAULT_TAB)

  const activeId = activeTabId || tabs[0].id
  const activeTab = tabs.find(tab => tab.id === activeId) || tabs[0]
  const className = [
    'tab-set',
    !showTabs ? 'no-tabs' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {showTabs &&
        <Fragment>
          <ul className={`tabs ${activeTabId}`}>
            {tabs.map((tab) => {
              // eslint-disable-next-line no-param-reassign
              if (!tab.onClick) tab.onClick = () => onTabClicked(tab.id)

              const liClassName = [
                'tab',
                tab.className,
                tab.id,
                activeTab.id === tab.id && 'is-active',
              ].filter(Boolean).join(' ')

              return <li key={tab.id} className={liClassName} onClick={tab.onClick}>{tab.tab}</li>
            })}
            <li className="buttons">{buttons}</li>
          </ul>
        </Fragment>
      }
      <div className="tab-contents">
        {activeTab.contents}
      </div>
    </div>
  )
}

TabSet.displayName = 'TabSet'
export default TabSet
