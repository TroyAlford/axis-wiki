import ComponentBase      from '../application/ComponentBase'

let render_key = 0;

export default class Navigation extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      links: {}
    };

    XHR.get('/api/config/navigation', {
      success: this.handleLoad,
      failure: function(error) {
        if (error.status == 404)
          this.handle404();
      }.bind(this)
    })
  }

  handle404() {
    this.setState({
      links: {}
    });
  }
  handleLoad(response) {
    this.setState({ links: JSON.parse(response.message) })
  }

  render() {
    render_key = 0;
    return (
      <section className="navigation">
        {this.renderLinks(this.state.links || default_links)}
      </section>
    );
  }

  renderLink(link) {
    let is_current = link.url == window.location.pathname;
    return <li key={render_key++} className={is_current ? 'is-current' : ''}>
      {!link.url || is_current
        ? <b>{link.text}</b>
        : <a href={link.url}>{link.text}</a>
      }
      {this.renderLinks(link.children)}
    </li>;
  }
  renderLinks(links) {
    if (!links || !links.length) return '';
    return <ul key={render_key++}>{_.map(links, this.renderLink)}</ul>;
  }
}
