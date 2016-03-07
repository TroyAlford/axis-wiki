// modules/TopNavigation.js
import React from 'react';
import { Link } from 'react-router';
import { navigation } from '../../server/config.json'

export default class LeftNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: navigation.default_links
    };

    this.handle404 = this.handle404.bind(this);
    this.handleLoad = this.handleLoad.bind(this);

    this.renderLink = this.renderLink.bind(this);
    this.renderLinks = this.renderLinks.bind(this);

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
      links: navigation.default_links
    });
  }
  handleLoad(response) {
    this.setState({ links: JSON.parse(response.message) })
  }

  render() {
    return <section className="cp-leftnavigation">
      {this.renderLinks(this.state.links || default_links)}
    </section>;
  }

  renderLink(link) {
    return <li>
      {link.url ? <Link to={link.url}>{link.text}</Link> : link.text}
      {this.renderLinks(link.children)}
    </li>;
  }
  renderLinks(links) {
    if (!links || !links.length) return '';
    return <ul>{_.map(links, this.renderLink)}</ul>;
  }
}
