// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Icon from './Icon';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import Tag from './Tag';

import XHR from '../helpers/XHR';

let cn = classNames;

export default class TagBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      html: null
    };

    this.handle404 = this.handle404.bind(this);
    this.handleLoad = this.handleLoad.bind(this);

    this.loadTag = this.loadTag.bind(this);

    this.loadTag(this.props.params.tag);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.tag != this.props.params.tag)
      this.loadTag(newProps.params.tag);
  }

  loadTag(slug) {
    XHR.get(`/api/search/tagged/${slug}`, {
      success: this.handleLoad,
      failure: function(error) {
        if (error.status == 404)
          this.handle404();
      }.bind(this)
    })
  }

  handle404() {
    this.setState({
      articles: [],
      html: null
    });
  }
  handleLoad(response) {
    let results = JSON.parse(response.message) || [];
    this.setState({
      articles: results.links,
      html: results.html
    });
  }

  render() {
    let colcount = 4;
    let articles   = this.state.articles,
        columns    = [],
        size       = Math.ceil(articles.length / colcount)
    ;
    for (let i = 0; i < colcount; i++) {
      let slice = this.state.articles.slice(i * size, (i * size) + size);
      columns[i] =
        <div key={`column-${i}`} className="column is-3">{
          _.map(slice, function(el) {
            return <div><Link key={el} to={`/w/${el}`}>{_.startCase(el)}</Link></div>;
          })
        }</div>;
    }

    return (
      <div className="cp-tagbrowser">
        <p dangerouslySetInnerHTML={{ __html: this.state.html ? this.state.html : '' }}></p>
        <h1>Articles tagged: <Icon name="tag" />{_.startCase(this.props.params.tag)}</h1>
        <div className="columns">{columns}</div>
      </div>
    );
  }
}