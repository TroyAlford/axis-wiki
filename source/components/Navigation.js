import ComponentBase from '../application/ComponentBase'
import fetch from 'isomorphic-fetch'

export default class Navigation extends ComponentBase {
  constructor(props) {
    super(props);

    this.render_key = 0;
    this.state = {
      links: {}
    };

    fetch('/api/config/navigation')
      .then(response => {
        if (response.status !== 200) return null
        return response.json()
      }).then(links => links && this.setState({ links }))
    ;
  }

  render() {
    this.render_key = 0;
    return (
      <section className="navigation">
        {this.renderLinks(this.state.links || default_links)}
      </section>
    );
  }

  renderLink(link) {
    let is_current = link.url == window.location.pathname;
    return <li key={this.render_key++} className={is_current ? 'is-current' : ''}>
      {!link.url || is_current
        ? <b>{link.text}</b>
        : <a href={link.url}>{link.text}</a>
      }
      {this.renderLinks(link.children)}
    </li>;
  }
  renderLinks(links) {
    if (!links || !links.length) return '';
    return <ul key={this.render_key++}>{links.map(this.renderLink)}</ul>;
  }
}
