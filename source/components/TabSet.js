export default ({ className = '', tabs = [], tabClicked = (() => {}), active = 0 }) => {
  let activeTab = tabs[active] || { className: '', innerHTML: '' }
  let renderedTab = null

  renderedTab = activeTab.innerHTML !== undefined
    ? <div className={`tab ${activeTab.className || ''}`}
        dangerouslySetInnerHTML={{ __html: activeTab.innerHTML }}
      />
    : <div className={`tab ${activeTab.className || ''}`}>
        {activeTab.contents || ''}
      </div>

  return (
    <div className={`tab-set ${className}`}>
      <ul className="tabs">
      {tabs.map((tab, index) =>
        <li key={index} className={`${active == index ? 'is-active' : ''} ${tab.className || ''}`}
            onClick={tabClicked.bind(this, { index, tab })}>{tab.caption}</li>
      )}
      </ul>
      {renderedTab}
    </div>
  )
}
