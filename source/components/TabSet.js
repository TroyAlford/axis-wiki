import _ from 'lodash'

export default ({ className = '', tabs = [], tabClicked = (() => {}), active = 0 }) => {
  let active_tab = tabs[active];
  let rendered_tab = !active_tab ? null :
    active_tab.innerHTML
      ? <div className={`tab ${active_tab.className || ''}`} dangerouslySetInnerHTML={{ __html: active_tab.innerHTML }}></div>
      : <div className={`tab ${active_tab.className || ''}`}>{active_tab.contents}</div>
    ;

  return (
    <div className={`tab-set ${className}`}>
      <ul className="tabs">
      {tabs.map((tab, index) =>
        <li key={index} className={`${active == index ? 'is-active' : ''} ${tab.className || ''}`} 
            onClick={tabClicked.bind(this, { index, tab })}>{tab.caption}</li>
      )}
      </ul>
      {rendered_tab}
    </div>
  )
}