// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';

import XHR from '../helpers/XHR';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      html: ''
    }
    this.handleSave = this.handleSave.bind(this);
    this.handleSetMode = this.handleSetMode.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: function(response) {
        if (response.status == 200) {
          this.setState({ html: response.message });
        }
      }.bind(this)
    })
  }

  handleSave() {
    this.refs.
    console.log('save!!!')
  }
  handleSetMode(mode) {
   this.setState({ mode: mode });
  }

  render() {
    return (
      <div className="cp-article wiki-container">
        <div className="tabs is-right is-boxed">
          <ul>
            <li className={classNames({ 'is-active': this.state.mode == 'read' })}>
              <a href="#" className={new classNames()} 
                 onClick={this.handleSetMode.bind(this, 'read')}>Read</a>
            </li>
            <li className={classNames({ 'is-active': this.state.mode == 'edit' })}>
              <a href="#" onClick={this.handleSetMode.bind(this, 'edit')}>Edit</a>
            </li>
          </ul>
        </div>
        <div className={classNames({ 'wiki-content': true, [`mode-${this.state.mode}`]: true })}>
          <TinyMCE
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
              setup: function(editor) {
                editor.on('blur', function(ev) {
                  ev.stopPropagation();
                  ev.preventDefault();
                });
              },
              toolbar:
                'styleselect | bold italic underline | hr link anchor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'image table | removeformat | undo redo | print save'
              //toolbar: false
            }}
            content={this.state.html}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}