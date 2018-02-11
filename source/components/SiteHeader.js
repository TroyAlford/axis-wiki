import React from 'react'
import Facebook from '../components/Facebook'
import SearchBox from '../components/SearchBox'

const SiteHeader = ({ user }) => (
  <header className="site-header">
    <div className="logo icon-axis"><b>Axis</b>RPG</div>
    <SearchBox />
    <Facebook user={user} />
  </header>
)

SiteHeader.displayName = 'Header'
export default SiteHeader
