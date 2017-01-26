import ComponentBase from '../application/ComponentBase'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class Navigation extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = {
      current: window.location.pathname
    }
  }

  componentDidMount() {
    browserHistory.listen(this.routeChanged)
  }

  routeChanged(route) {
    this.setState({ current: route.pathname })
  }

  renderLink(link, index) {
    const active = this.state.current === link.url

    return (
      <li key={index} className={active ? 'is-current' : ''}>
      {!link.url || active
        ? <b>{link.text}</b>
        : <a href={link.url}>{link.text}</a>
      }
        {this.renderChildren(link.children)}
      </li>
    )
  }

  renderChildren(children) {
    if (!children || !children.length) return ''
    return (
      <ul>{children.map(this.renderLink)}</ul>
    )
  }

  render() {
    return (
      <section className="navigation">
        {this.renderChildren(this.props.links)}
      </section>
    );
  }
}

Navigation.defaultProps = {
  links: []
}

export default connect(
  state => ({ links: state.navigation })
)(Navigation)
