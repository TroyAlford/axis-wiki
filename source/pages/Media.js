import ComponentBase      from '../application/ComponentBase'
import ReactDOM           from 'react-dom'
import TinyMCE            from 'react-tinymce'
import { browserHistory } from 'react-router'

import Icon               from '../components/Icon'
import MenuButton         from '../components/MenuButton'
import MenuItem           from '../components/MenuItem'

import XHR                from '../helpers/XHR'

export default class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.default_state, {
      filename: this.props.params.filename
    });
    this.loadMedia(this.state.filename);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.params.filename != this.props.params.filename)
      this.loadMedia(newProps.params.filename);
  }

  get default_state() {
    return {
      filename: 'placeholder.png'
    }
  }

  loadMedia(filename) {
    XHR.get(`/api/media/${filename}`, {
      success: this.handleLoad,
      failure: this.handleLoad,
      done: function(response) {
        let regex = /[\w\d-_]{1,}$/;
        let response_slug = regex.exec(response.url)[0],
            current_slug = regex.exec(window.location.pathname)[0];
        if (response_slug != current_slug)
          browserHistory.replace(`/page/${response_slug}`);
      }
    })
  }

  handleDelete() {
    let filename = this.props.params.filename;
    XHR.delete(`/api/media/${filename}`, {
      done: (res) => {
        this.loadMedia(filename);
      }
    })
  }
  handleLoad(response) {
    this.setState(Object.assign(this.default_state, JSON.parse(response.message)));
  }
  handleSave() {
    XHR.post('/api/media/' + this.props.params.filename, {
      data: {
      },
      success: this.handleLoad,
      failure: function(res) {
        console.log('Save Error...', res);
      }
    });
  }

  render() {
     return (
      <div className={`media page`}>
        <div className={`media-container`}>
          <img src={`/media/full/${this.state.filename}`} />
        </div>
      </div>
    );
  }
}