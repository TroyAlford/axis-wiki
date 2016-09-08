import { find } from 'lodash'

export default ({ key = '', tabs = [], onTabClicked = (() => {}), active = null }) => {
  if (tabs.length === 0)
    tabs.push({ key: 'blank', innerHTML: '' })

  if (!active) active = tabs[0].key

  let activeTab = find(tabs, { key: active }) || tabs[0]
  let renderedTab = null

  renderedTab = activeTab.innerHTML !== undefined
    ? <div className={`tab ${activeTab.key || ''}`}
        dangerouslySetInnerHTML={{ __html: activeTab.innerHTML }}
      />
    : <div className={`tab ${activeTab.key || ''}`}>
        {activeTab.contents || ''}
      </div>

  return (
    <div className={`tab-set ${key}`}>
      <ul className="tabs">
      {tabs.map((tab, index) =>
        <li key={index} className={`tab ${active == tab.key ? 'is-active' : ''} ${tab.key || ''}`}
            onClick={onTabClicked.bind(this, tab)}>{tab.caption}</li>
      )}
      </ul>
      {renderedTab}
    </div>
  )
}
