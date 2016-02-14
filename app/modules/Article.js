// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';

import XHR from '../helpers/XHR';

let cn = classNames;

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      html: ''
    }
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleMode = this.handleMode.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: this.handleLoad
    })
  }

  handleLoad(response) {
    this.setState({
      html: response.message,
      mode: 'read'
    });
  }
  handleSave() {
    XHR.post('/api/w/' + this.props.params.slug, {
      data: { html: ReactDOM.findDOMNode(this.refs.editor).innerHTML },
      success: this.handleLoad,
      failure: function(res) {
        console.log('error...', res);
      }
    });
  }
  handleMode(mode) {
    this.setState({ mode: mode });
  }

  render() {
    var viewer = <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>;
    var editor = <TinyMCE
      config={{
        auto_focus: true,
        inline: true,
        fixed_toolbar_container: '.wiki-content > .tabs',
        menubar: false,
        plugins:
          'anchor autosave fullscreen hr image link lists ' +
          'paste print save searchreplace table',
        readonly: this.state.mode == 'read',
        save_onsavecallback: this.handleSave,
        toolbar:
          'styleselect | bold italic underline | hr link anchor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'image table | removeformat | undo redo | print save'
      }}
      content={this.state.html}
      onChange={this.handleEditorChange}
      ref="editor"
    />;

    return (
      <div className={`cp-article wiki-container mode-${this.state.mode}`}>
        <div className="tabs is-right is-boxed">
          <ul>
            <li className={cn({ 'is-active': this.state.mode == 'read' })}>
              <a href="#" onClick={this.handleMode.bind(this, 'read')}>Read</a>
            </li>
            <li className={cn({ 'is-active': this.state.mode == 'edit' })}>
              <a href="#" onClick={this.handleMode.bind(this, 'edit')}>Edit</a>
            </li>
          </ul>
        </div>
        <div className="wiki-content reader">{viewer}</div>
        <div className="wiki-content editor">{editor}</div>
      </div>
    );
  }
}