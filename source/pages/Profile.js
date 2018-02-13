import React, { Component } from 'react'
import { observer } from 'mobx-react'
import unique from '@utils/unique'
import ArticleChildren from '@components/ArticleChildren'
import ChildArticle from '@models/ChildArticle'
import Tag from '@components/Tag'

@observer export default class Profile extends Component {
  render = () => {
    const {
      articles = [],
      favorites = [],
      id,
      name,
      privileges = [],
      tags,
    } = this.props.page

    const ownerOf = unique([...articles, ...tags]).sort()

    return (
      <div className="profile page">
        <h1 className="user-name">{name}</h1>
        <div className="profile">
          <div className="user-picture">
            <img alt="Profile Portrait" src={`//graph.facebook.com/${id}/picture?type=square&height=200`} />
          </div>
          <div className="privileges">
            <div><b>Privileges</b></div>
            {privileges.map(tag => <Tag key={tag} tag={tag} className="icon-settings" />)}
          </div>
          <div className="can-edit">
            <div><b>Owner Of</b></div>
            {ownerOf.map(tag => <Tag key={tag} tag={tag} className="icon-tag" />)}
          </div>
        </div>

        <ArticleChildren
          articles={favorites.map(slug => ChildArticle.create({ slug }))}
          caption="Favorites"
          className="favorites"
          iconName="favorite-on"
        />
      </div>
    )
  }
}
