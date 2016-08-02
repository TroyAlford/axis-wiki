import ComponentBase      from '../application/ComponentBase'
import Dropzone           from 'react-dropzone'

import fetch              from 'isomorphic-fetch'
import { slugify }        from '../../utility/Slugs'

export default class UploadPage extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = {
      uploading: [],
      uploaded:  [],
      failed:    []
    }
  }

  onDrop(files) {
    let form = new FormData(),
        uploading = this.state.uploading

    files.forEach(file => {
      let { name, preview, size, type, lastModifiedDate } = file
      uploading.push({
        name: slugify(name),
        preview, size, type, lastModifiedDate
      })
      form.append('file', file)
    })

    this.setState({ uploading })

    fetch('/media', {
      credentials: 'include',
      method: 'POST',
      body: form
    })
    .then(response => response.json())
    .then(json => {
      const
        files     = _.map(this.state.uploading, file =>
          Object.assign({}, json[file.name], file)
        ),
        uploading = _.filter(files, file => !json[file.name]),
        processed = _.filter(files, file => json[file.name]),
        uploaded  = _.filter(processed, file => file.errors.length == 0),
        failed    = _.filter(processed, file => file.errors.length != 0)

      this.setState({
        uploading,
        uploaded: _.uniqBy([...this.state.uploaded, ...uploaded], 'name'),
        failed:   _.uniqBy([...this.state.failed,   ...failed],   'name')
      })
    })
  }

  renderFiles(files, actionText, className) {
    return <div className={`message ${className} files`}>
      <div className="message-header">{actionText}: {files.length} files</div>
      <div className="message-body">{_.map(files, (file, index) =>
        <div key={index} className="file">
          <span className="name">{file.name}</span>
          <span className="link">{file.small ? <a href={file.small}>View</a> : null}</span>
          {!file.errors ? null : _.map(file.errors, (error, index) =>
            <div key={index} className="error icon icon-warning">{error}</div>
          )}
        </div>
      )}</div>
    </div>
  }

  render() {
    const { uploading, uploaded, failed } = this.state

    return (
      <div className="upload page">
        <Dropzone onDrop={this.onDrop} style={{}} activeStyle={{}}
          className="cp-file-dropzone" activeClassName="active">
          <span>
            <b>Click here</b> to browse & upload media files,<br/>
            or drag and drop into this container
          </span>
        </Dropzone>
        {uploading.length && this.renderFiles(uploading, 'Uploading', 'is-info')}
        {uploaded.length  && this.renderFiles(uploaded, 'Uploaded', 'is-success')}
        {failed.length    && this.renderFiles(failed, 'Failed', 'is-danger')}
      </div>
    );
  }
}
