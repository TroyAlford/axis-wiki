import ComponentBase     from '../application/ComponentBase'

import { connect }       from 'react-redux'
import { searchRequest } from '../actions/search'

class Search extends ComponentBase {
  componentDidMount() {
    if (this.props.term !== this.props.params.term)
      this.props.dispatch(searchRequest(this.props.params.term))
  }

  render() {
    return (
      <div className="search page">
        {_(this.props.results).map(article =>
          <div className="article">
            <a href={`/page/${article.file}`}>{article.file} ({article.results.length} hits)</a>
          </div>
        ).value()}
      </div>
    )
  }
}

export default connect(
  state => state.search
)(Search)