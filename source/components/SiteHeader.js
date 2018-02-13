import React from 'react'
import { Link } from 'react-router-dom'
import Facebook from '../components/Facebook'
import SearchBox from '../components/SearchBox'

const SiteHeader = ({ user }) => (
  <header className="site-header">
    <Link className="logo icon-axis" to="/">
      <span className="name"><b>Axis</b>RPG</span>
    </Link>
    <SearchBox />
    <Facebook user={user} />
  </header>
)

SiteHeader.displayName = 'Header'
export default SiteHeader
