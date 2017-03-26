import { connect } from 'react-redux'
import {
  deleteMedia,
  loadMedia,
} from '../redux/page/actions-media'

import ComponentBase from '../application/ComponentBase'

class Media extends ComponentBase {
  constructor(props) {
    super(props)
    if (this.props.filename !== this.props.params.filename) {
      this.props.dispatch(loadMedia(this.props.params.filename))
    }
  }

  get DEFAULT_STATE() {
    return {
      filename: 'placeholder.png'
    }
  }

  handleDelete() {
    this.props.dispatch(deleteMedia(this.props.params.filename))
  }

  render() {
    let filename = this.props.params.filename || this.DEFAULT_STATE.filename
    return (
      <div className={`media page`}>
        <div className={`media-container`}>
          <img src={`/media/full/${filename}`} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => state.media
)(Media)
