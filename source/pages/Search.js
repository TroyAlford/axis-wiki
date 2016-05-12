import _                  from 'lodash'
import { browserHistory } from 'react-router'
import { connect }        from 'react-redux'

import { loadArticle }    from '../actions/article'
import { searchRequest, searchReset } from '../actions/search'
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
    return _(this.props.results).map((article, index) => {
      let previews = article.results.map(hit => {
          let words = hit.text.split(' '),
              index = _.findIndex(words, word => _.includes(
                word.toLowerCase(), 
                this.props.term.toLowerCase()
              ));
          
          if (!index) 
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
    return (
      <div className="search page">
        {this.getDisplayData().map(search_result =>
          <div key={search_result.key} className="search-result" onClick={() => this.props.dispatch(loadArticle(search_result.slug))}>
            {!search_result.image ? '' :
              <div className="preview-image" style={{
                'background-image': `url(${search_result.image})`
              }}></div>
            }
            <b>{search_result.title} ({search_result.hits} hits)</b>
            {search_result.previews.map((preview, index) => (
              <div key={index}
                className="search-match" 
                dangerouslySetInnerHTML={{ __html: preview.html }}
              ></div>
            ))}
          </div>
        ).value()}
      </div>
    )
  }
}

export default connect(
  state => state.search
)(Search)