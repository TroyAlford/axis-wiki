import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import uniqBy from 'lodash/uniqBy'

import { slugify } from '../../utility/Slugs'

export default class UploadPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: [],
      uploaded: [],
      failed: [],
    }
  }

  onDrop = (files) => {
    const form = new FormData()
    const { uploading } = this.state

    files.forEach((file) => {
      const { name, preview, size, type, lastModifiedDate } = file
      uploading.push({
        name: slugify(name),
        lastModifiedDate,
        preview,
        size,
        type,
      })
      form.append('file', file)
    })

    this.setState({ uploading })

    fetch('/media', {
      credentials: 'include',
      method: 'POST',
      body: form,
    }).then(response => response.json())
      .then((json) => {
        const files = this.state.uploading.map(file =>
          Object.assign({}, json[file.name], file)
        )
        const uploading = files.filter(file => !json[file.name])
        const processed = files.filter(file => json[file.name])
        const uploaded = processed.filter(file => file.errors.length === 0)
        const failed = processed.filter(file => file.errors.length !== 0)

        this.setState({
          uploading,
          uploaded: uniqBy([...this.state.uploaded, ...uploaded], 'name'),
          failed: uniqBy([...this.state.failed, ...failed], 'name'),
        })
      })
  }

  renderFiles = (files, actionText, className) => (
    <div className={`message ${className} files`}>
      <div className="message-header">{actionText}: {files.length} files</div>
      <div className="message-body">{files.map((file, index) => (
        <div key={index} className="file">
          <span className="name">{file.name}</span>
          <span className="link">{file.small ? <a href={file.small}>View</a> : null}</span>
          {!file.errors ? null : file.errors.map((error, ix) =>
            <div key={ix} className="error icon icon-warning">{error}</div>
          )}
        </div>
      ))}
      </div>
    </div>
  )

  render() {
    const { uploading, uploaded, failed } = this.state

    return (
      <div className="upload page">
        <Dropzone onDrop={this.onDrop}
          style={{}}
          activeStyle={{}}
          className="cp-file-dropzone"
          activeClassName="active"
        >
          <span>
            <b>Click here</b> to browse & upload media files,<br />
            or drag and drop into this container
          </span>
        </Dropzone>
        {uploading.length !== 0 && this.renderFiles(uploading, 'Uploading', 'is-info')}
        {uploaded.length !== 0 && this.renderFiles(uploaded, 'Uploaded', 'is-success')}
        {failed.length !== 0 && this.renderFiles(failed, 'Failed', 'is-danger')}
      </div>
    )
  }
}
