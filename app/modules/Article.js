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
    console.log('save!!!')
  }
  handleSetMode(mode) {
   this.setState({ mode: mode });
  }

  render() {
    return (
      <div className="wiki-content">
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
        <TinyMCE
          config={{
            auto_focus: true,
            inline: true,
            fixed_toolbar_container: '.wiki-content > .tabs',
            menubar: false,
            plugins: 'autolink link image lists save wordcount',
            readonly: this.state.mode == 'read',
            save_onsavecallback: this.handleSave,
            setup: function(editor) {
              editor.on('blur', function(ev) {
                ev.stopPropagation();
                ev.preventDefault();
              });
            },
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | save'
          }}
          content={this.state.html}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}