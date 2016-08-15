import ComponentBase from '../application/ComponentBase'
import { connect } from 'react-redux'

import { debounce } from 'lodash'

import { searchRequest } from '../redux/search/actions'

class SearchBox extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = { term: props.term }
    this.debounced_search = debounce(this.search, 500)
  }

  componentWillReceiveProps(props) {
    this.state = { term: props.term }
  }

  search() {
    this.props.dispatch(searchRequest(this.state.term))
  }

  render() {
    return (
      <div className={`search-box control has-icon ${this.props.className}`}>
        <input type="text" placeholder="Search..." value={this.state.term}
          onChange={event => {
            this.setState({ term: event.target.value })
            this.debounced_search()
          }}
        />
        <i className="icon icon-search fa"></i>
      </div>
    )
  }
}

export default connect(
  state => state.search
)(SearchBox)
