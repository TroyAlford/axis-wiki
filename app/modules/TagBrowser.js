// modules/Article.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Icon from './Icon';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import Tag from './Tag';

import XHR from '../helpers/XHR';

export default class TagBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let
      articles   = this.props.articles,
      col_count  = this.props.columns || 4,
      columns    = [],
      col_size   = Math.ceil(articles.length / col_count),
      classes    = `column is-${Math.floor(12 / col_count)}`
    ;
    for (let i = 0; i < col_count; i++) {
      let
        first = i * col_size,
        last = (i * col_size) + col_size,
        list = this.props.articles.slice(first, last)
      ;
      columns[i] =
        <div key={`column-${i}`} className={classes}>{
          _.map(list, function(slug) {
            return <div><Link key={slug} to={`${slug}`}>{_.startCase(slug)}</Link></div>;
          })
        }</div>;
    }

    return (
      <div className={`cp-tagbrowser ${this.props.articles.length ? '' : 'is-hidden'}`}>
        <h1><Icon name="tag" /> Child Articles:</h1>
        <div className="columns">{columns}</div>
      </div>
    );
  }
}