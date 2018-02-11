import React from 'react'
import { startCase } from 'lodash'
import Icon from './Icon'

const ArticleChildren = ({ articles = [], caption = 'Child Articles', iconName = 'tag', numberOfColumns = 4 }) => {
  if (!articles || !Array.isArray(articles) || !articles.length) {
    return <div className="tag-browser is-hidden" />
  }

  const childWidth = `${100 / numberOfColumns}%`
  const childStyle = {
    maxWidth: childWidth,
    minWidth: childWidth,
    width: childWidth,
  }

  const links = articles
    .map((item) => {
      if (!item) return null
      if (typeof item === 'string') return { slug: item, title: startCase(item) }
      if (!item.slug) return null
      if (!item.title) return { slug: item.slug, title: startCase(item.slug) }
      return item
    })
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(({ slug, title }) =>
      <div key={slug} className="article-link" style={childStyle}><a href={`/page/${slug}`}>{title}</a></div>
    )

  const rows = Math.ceil(links.length / numberOfColumns)
  const containerStyle = {
    height: `${(rows * 1.5) + 1}rem`,
  }

  return (
    <div className="article-children message is-info">
      <div className="message-header header">
        <Icon name={iconName} /> {caption}
      </div>
      <div className="container message-body" style={containerStyle}>
        {links}
      </div>
    </div>
  )
}

ArticleChildren.displayName = 'ArticleChildren'
export default ArticleChildren
