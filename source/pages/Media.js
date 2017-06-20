import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteMedia } from '../redux/page/actions-media'

const DEFAULT_STATE = {
  filename: 'placeholder.png',
}

const noPropagation = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

class Media extends Component {
  handleDelete = () => {
    this.props.dispatch(deleteMedia(this.props.params.filename))
  }

  render() {
    const filename = this.props.params.filename || DEFAULT_STATE.filename

    return (
      <div className={'media page'}>
        <div className={'media-container'}>
          <img alt={filename} src={`/media/full/${filename}`} onClick={noPropagation} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => state.page
)(Media)
