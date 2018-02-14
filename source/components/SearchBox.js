import React from 'react'
import debounce from 'lodash/debounce'

const searchFor = debounce(term => window.routerHistory.push(`/search/${term}`), 500)

export default class SearchBox extends React.Component {
  static defaultProps = {
    className: '',
    placeholder: 'Search...',
    term: '',
  }

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
      <div className={`search-box ${className}`}>
        <input type="text"
          placeholder={placeholder}
          value={this.state.term}
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
