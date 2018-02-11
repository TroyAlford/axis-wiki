import React from 'react'
import { Link } from 'react-router-dom'
import Facebook from '../components/Facebook'
import SearchBox from '../components/SearchBox'

const SiteHeader = ({ user }) => (
  <header className="site-header">
    <div className="logo icon-axis">
      <Link to="/"><b>Axis</b>RPG</Link>
    </div>
    <SearchBox />
    <Facebook user={user} />
  </header>
)

SiteHeader.displayName = 'Header'
export default SiteHeader
