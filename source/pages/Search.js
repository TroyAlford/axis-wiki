import PropTypes from 'prop-types'
import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { findIndex, includes } from 'lodash'

import ComponentBase from '../application/ComponentBase'

class Search extends ComponentBase {
  getDisplayData() {
    return this.props.results.map((article) => {
      const previews = (article.results || []).map((hit) => {
        const words = hit.text.split(' ')
        const index = findIndex(words, word => includes(
          word.toLowerCase(),
          this.props.term.toLowerCase()
        ))

        if (index < 0) { // not found
          return { html: hit.text, line: hit.line }
        }

        return {
          html: hit.text,
          line: hit.line,
        }
      })
      .filter(preview => preview !== null)

      return {
        key:      article.file,
        hits:     previews.length + article.aliases.length,
        image:    article.image,
        slug:     article.file,
        title:    article.title,
        subtitle: article.aliases.join(', '),
        previews,
      }
    })
  }

  render() {
    const results = this.getDisplayData()
    if (this.props.loading) return <div className="search page loading" />
    if (!results.length) return ( // eslint-disable-line curly
      <div className="search page">
        <div className="card no-results is-centered">
          <div className="card-content">
            <div className="content">No results found for this search term.</div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="search page">{ results.map(result =>
        <div key={result.key} className="card result"
          onClick={() => browserHistory.push(`/page/${result.slug}`)}
        >
          <div className="card-content">
            <div className="media">
              {result.image &&
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={result.image} alt={result.slug} disabled="disabled" />
                  </figure>
                </div>
              }
              <div className="media-content">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item is-6"><b>{result.title}</b></div>
                    <div className="level-item subtitle is-6"><i>{result.subtitle}</i></div>
                  </div>
                  <div className="level-right">
                    <div className="level-item subtitle is-6"><i>{result.hits} hits</i></div>
                  </div>
                </nav>
                {result.previews.slice(0, 3).map((preview, index) => (
                  <div key={index} // eslint-disable-line react/no-array-index-key
                    className="search-match"
                    dangerouslySetInnerHTML={{ __html: preview.html }} // eslint-disable-line
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}</div>
    )
  }
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    file:    PropTypes.string.isRequired,
    image:   PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
      line: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    title: PropTypes.string.isRequired,
    type:  PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  term: PropTypes.string.isRequired,
}
Search.defaultProps = {
  loading: true,
  results: [],
  term:    '',
}

export default connect(
  state => state.page
)(Search)
