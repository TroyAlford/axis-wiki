import { connect }        from 'react-redux'
import { searchRequest }  from '../redux/actions/search'

export default connect(
  state => state.search
)(({ className, dispatch, term }) =>
  <div className={`search-box control has-icon ${className}`}>
    <input type="text" placeholder="Search..." value={term}
      onChange={event => dispatch(searchRequest(event.target.value))}
    />
    <i className="icon icon-search fa"></i>
  </div>
)