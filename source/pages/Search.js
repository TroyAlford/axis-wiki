import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import findIndex from 'lodash/findIndex'
import includes from 'lodash/includes'

@observer export default class Search extends Component {
  getDisplayData = () => {
    const { results, term } = this.props.page
    return (
      results.map((article) => {
        const previews = (article.results || []).map((hit) => {
          const words = hit.text.split(' ')
          const index = findIndex(words, word => includes(
            word.toLowerCase(),
            term.toLowerCase()
          ))

          if (index < 0) { // not found
            return { html: hit.text, line: hit.line }
          }

          return {
            html: hit.text,
            line: hit.line,
          }
        }).filter(preview => preview !== null)

        return {
          key: article.file,
          hits: previews.length + article.aliases.length,
          image: article.image,
          slug: article.file,
          title: article.title,
          subtitle: article.aliases.join(', '),
          previews,
        }
      })
    )
  }

  renderResult = ({ key, slug, image, title, subtitle, hits, previews }) => {
    const classes = [
      'result card',
      image ? 'has-media' : 'no-media',
    ].join(' ')
    return (
      <Link className={classes} key={key} to={`/page/${slug}`}>
        {image && <div className="media" style={{ backgroundImage: `url(${image})` }} />}
        <div className="results">
          <div className="title"><b>{title}</b> <i>{subtitle}</i></div>
          {previews.slice(0, 3).map((preview, index) => (
            <div key={index} // eslint-disable-line react/no-array-index-key
              className="search-match"
              dangerouslySetInnerHTML={{ __html: preview.html }} // eslint-disable-line
            />
          ))}
        </div>
        <div className="hits"><i>{hits} hits</i></div>
      </Link>
    )
  }
  renderNoResults = () => (
    <div className="card no-results is-centered">
      <div className="content">No results found for this search term.</div>
    </div>
  )
  render() {
    if (this.props.page.loading) return <div className="search page loading" />

    const results = this.getDisplayData()
    return (
      <div className="search page">
        <h1>Search Results</h1>
        {results.length ? results.map(this.renderResult) : this.renderNoResults()}
      </div>
    )
  }
}
