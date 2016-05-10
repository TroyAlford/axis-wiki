import { connect }        from 'react-redux'
import { searchRequest }  from '../actions/search'

export default connect(
  state => state.search
)(({ dispatch, term }) =>
  <div className="search-box">
    <input type="text" placeholder="Search..." value={term}
      onChange={event => dispatch(searchRequest(event.target.value))}
    />
  </div>
)