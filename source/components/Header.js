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
          <Facebook className="header-item" />
          <div className="spacer"></div>
          <SearchBox />
        </nav>
      </header>
    </div>
  </section>
