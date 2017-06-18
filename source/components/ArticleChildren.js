import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import Icon from './Icon'

const STYLE = {
  CONTAINER: {
    display:       'flex',
    flexDirection: 'column',
    flexWrap:      'wrap',
    padding:       '.25rem .5rem',
  },
  CHILD: {
    height:     '1.5rem',
    fontSize:   '1rem',
    lineHeight: '1rem',
    padding:    '.25rem 0',
  },
}

const ArticleChildren = ({ articles = [], numberOfColumns = 4 }) => {
  if (!articles || !Array.isArray(articles) || !articles.length) {
    return <div className={'tag-browser is-hidden'} />
  }

  const childStyle = {
    ...STYLE.CHILD,
    maxWidth: `${100 / numberOfColumns}%`,
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
      <div key={slug} style={childStyle}><a href={`/page/${slug}`}>{title}</a></div>
    )

  const rows = Math.ceil(links.length / numberOfColumns)
  const containerStyle = {
    ...STYLE.CONTAINER,
    height: `${(rows * 1.5) + 1}rem`,
  }

  return (
    <div className="tag-browser message is-info">
      <div className="message-header"><Icon name="tag" /> Child Articles:</div>
      <div className="columns message-body" style={containerStyle}>{links}</div>
    </div>
  )
}
ArticleChildren.defaultProps = {
  articles:        [],
  numberOfColumns: 4,
}
ArticleChildren.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      slug:  PropTypes.string,
      title: PropTypes.string,
    }),
    PropTypes.string,
  ])),
  numberOfColumns: PropTypes.number,
}

export default ArticleChildren
