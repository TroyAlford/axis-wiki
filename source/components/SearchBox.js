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
  componentDidMount() { window.addEventListener('keyup', this.onKeyUp) }
  componentWillReceiveProps(props) {
    if (props.term !== this.state.term) this.setState({ term: props.term })
  }
  componentWillUnmount() { window.removeEventListener('keyup', this.onKeyUp) }

  onKeyUp = (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
      e.preventDefault()
      e.stopPropagation()
      this.input.focus()
    }
  }

  createRef = (input) => { this.input = input }
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
          ref={this.createRef}
        />
        <i className="icon icon-search fa" />
      </div>
    )
  }
}
