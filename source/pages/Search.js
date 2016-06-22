import _                  from 'lodash'
import { browserHistory } from 'react-router'
import { connect }        from 'react-redux'

import { loadArticle }    from '../redux/actions/article'
import { 
  searchRequest, 
  searchReset
}                         from '../redux/actions/search'

import ComponentBase      from '../application/ComponentBase'

class Search extends ComponentBase {
  componentDidMount() {
    if (this.props.term !== this.props.params.term)
      this.props.dispatch(searchRequest(this.props.params.term))
  }
  componentWillReceiveProps(newProps) {
    if (newProps.term !== this.props.term)
      browserHistory.replace(`/search/${newProps.term}`)
  }
  componentWillUnmount() {
    this.props.dispatch(searchReset())
  }

  getDisplayData() {
    return _.map(this.props.results, (article, index) => {
      let previews = article.results.map(hit => {
          let words = hit.text.split(' '),
              index = _.findIndex(words, word => _.includes(
                word.toLowerCase(), 
                this.props.term.toLowerCase()
              ));
          
          if (0 > index) // not found
            return { html: hit.text, line: hit.line }

          let start = index - 4 > 0 ? index - 4 : 0

          return {
            html: [
              index ? '&hellip;' : '',
              ...words.slice(start, index),
              `<span class="highlight">${words[index]}</span>`,
              ...words.slice(index + 1)
            ].join(' '),
            line: hit.line
          }
        }).filter(preview => preview !== null)

      return {
        key:   index,
        hits:  previews.length,
        image: article.image,
        slug:  article.file,
        title: article.title,
        previews
      }
    })
  }

  render() {
    let results = this.getDisplayData()
    return (
      <div className={`search page ${this.props.loading ? 'loading' : ''}`}>
       { results.length
       ? _.map(results, search_result =>
          <div key={search_result.key} className="card result"
               onClick={() => browserHistory.push(`/page/${search_result.slug}`)}>
            <div className="card-content">
              <div className="media">
                {!search_result.image ? '' :
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={search_result.image} alt="image" disabled="disabled" />
                    </figure>
                  </div>
                }
                <div className="media-content">
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item title is-6"><b>{search_result.title}</b></div>
                    </div>
                    <div className="level-right">
                      <div className="level-item subtitle is-6"><i>{search_result.hits} hits</i></div>
                    </div>
                  </nav>
                  {search_result.previews.slice(0,3).map((preview, index) => (
                    <div key={index}
                      className="search-match" 
                      dangerouslySetInnerHTML={{ __html: preview.html }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
       : <div className="card no-results is-centered">
           <div className="card-content">
             <div className="content">
               No results found for this search term.
             </div>
           </div>
         </div>
       }
      </div>
    )
  }
}

export default connect(
  state => state.search
)(Search)