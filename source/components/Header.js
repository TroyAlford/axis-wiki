import React from 'react'
import FacebookWrapper from '../components/FacebookWrapper'
import SearchBox from '../components/SearchBox'

const Header = () => (
  <section className="app-header hero is-info">
    <div className="hero-head">
      <nav className="nav">
        <div className="nav-left">
          <span className="title is-3">Axis</span>
          <span className="subtitle is-3">RPG</span>
        </div>
        <div className="nav-right">
          <FacebookWrapper className="nav-item" />
          <SearchBox className="nav-item" />
        </div>
      </nav>
    </div>
  </section>
)

export default Header
