import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@components/Icon'

const ArticleChildren = ({ articles = [], caption = 'Child Articles', iconName = 'tag', numberOfColumns = 4 }) => {
  const children = articles.toJSON()
  if (!children.length) return <div className="tag-browser is-hidden" />

  const links = articles
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .map(({ slug, displayName }) => (
      <Link key={slug} to={`/page/${slug}`}>{displayName}</Link>
    ))

  return (
    <div className="article-children">
      <header><Icon name={iconName} /> {caption}</header>
      <div className="link-list">{links}</div>
    </div>
  )
}

ArticleChildren.displayName = 'ArticleChildren'
export default ArticleChildren
