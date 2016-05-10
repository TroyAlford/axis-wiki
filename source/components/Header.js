import ComponentBase      from '../application/ComponentBase'
import Facebook           from '../components/Facebook'
import SearchBox          from '../components/SearchBox'

export default ({}) =>
  <section className="app-header hero is-info">
    <div className="hero-header">
      <header className="header">
        <div className="header-left title">
          <strong>Axis</strong> Wiki
        </div>
        <nav className="navbar">
          <SearchBox />
          <div className="spacer"></div>
          <Facebook className="header-item" />
        </nav>
      </header>
    </div>
  </section>
