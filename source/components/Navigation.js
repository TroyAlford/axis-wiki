import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

@observer export default class Navigation extends Component {
  static defaultProps = {
    menuItems: [],
    current: {},
  }

  renderMenuItem = ({ children, text, url }) => {
    const active = this.props.current.pathname === url

    return (
      <li key={text} className={active ? 'is-current' : ''}>
        {!url || active ? <b>{text}</b> : <Link to={url} tabIndex="-1">{text}</Link>}
        {children.length ? <ul>{children.map(this.renderMenuItem)}</ul> : ''}
      </li>
    )
  }

  render = () => (
    <ul className="navigation">
      {this.props.menuItems.map(this.renderMenuItem)}
    </ul>
  )
}
