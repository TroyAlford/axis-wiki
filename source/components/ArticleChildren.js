import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import Icon from './Icon'

const range = (start, stop) => Array.from(new Array((stop - start) + 1), (_, i) => i + start)

const ArticleChildren = ({ articles = [], numberOfColumns = 4 }) => {
  if (!articles || !Array.isArray(articles) || !articles.length) {
    return <div className={'tag-browser is-hidden'} />
  }

  const sorted = articles.sort()
  const columnSize = Math.ceil(sorted.length / numberOfColumns)
  const classes = `column is-${Math.floor(12 / numberOfColumns)}`

  const columns = range(0, numberOfColumns).map((index) => {
    const first = index * columnSize
    const last = (index * columnSize) + columnSize
    const list = sorted.slice(first, last)

    return (
      <div key={index} className={classes}>{list.map(slug =>
        <div key={slug}><a href={`/page/${slug}`}>{startCase(slug)}</a></div>
      )}</div>
    )
  })

  return (
    <div className="tag-browser message is-info">
      <div className="message-header"><Icon name="tag" /> Child Articles:</div>
      <div className="columns message-body">{columns}</div>
    </div>
  )
}
ArticleChildren.defaultProps = {
  articles:        [],
  numberOfColumns: 4,
}
ArticleChildren.propTypes = {
  articles:        PropTypes.arrayOf(PropTypes.string),
  numberOfColumns: PropTypes.number,
}

export default ArticleChildren
