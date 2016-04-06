import ComponentBase      from '../application/ComponentBase'
import Facebook           from './Facebook'

export default class Header extends ComponentBase {
  render() {
    return (
      <section className="app-header hero is-info">
        <div className="hero-header">
          <header className="header">
            <div className="header-left title">
              <strong>Axis</strong> Wiki
            </div>
            <nav className="navbar">
              <Facebook className="header-item" />
            </nav>
          </header>
        </div>
      </section>
    );
  }
}