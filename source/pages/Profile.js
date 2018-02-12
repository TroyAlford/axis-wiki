import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ChildArticle from '@models/ChildArticle'
import ArticleChildren from '../components/ArticleChildren'

@observer export default class Profile extends Component {
  render = () => {
    const { favorites = [], id, name } = this.props.page

    return (
      <div className="profile page">
        <h1 className="name">{name}</h1>
        <div className="picture">
          <img alt="Profile Portrait" src={`//graph.facebook.com/${id}/picture?type=square&height=200`} />
        </div>

        <ArticleChildren
          articles={favorites.map(slug => ChildArticle.create({ slug }))}
          caption="Favorites"
          iconName="favorite-on"
        />
      </div>
    )
  }
}
