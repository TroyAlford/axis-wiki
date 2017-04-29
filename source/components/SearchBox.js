import * as React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

const searchFor = debounce(term => browserHistory.push(`/search/${term}`), 500)

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: props.term }
  }
  componentWillReceiveProps(props) {
    if (props.term !== this.state.term) this.setState({ term: props.term })
  }

  render() {
    const { className, placeholder } = this.props
    return (
      <div className={`search-box control has-icon ${className}`}>
        <input type="text" placeholder={placeholder} value={this.state.term}
          onChange={(event) => {
            this.setState({ term: event.target.value })
            searchFor(event.target.value)
          }}
        />
        <i className="icon icon-search fa" />
      </div>
    )
  }
}

SearchBox.defaultProps = {
  className:   '',
  placeholder: 'Search...',
  term:        '',
}
SearchBox.propTypes = {
  className:   PropTypes.string,
  placeholder: PropTypes.string,
  term:        PropTypes.string,
}

export default connect(
  state => ({ term: state.page.term })
)(SearchBox)
