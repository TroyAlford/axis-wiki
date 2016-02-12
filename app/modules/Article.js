// modules/Article.js
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';

import XHR from '../helpers/XHR';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'view',
      html: ''
    }
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleToggleMode = this.handleToggleMode.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: function(response) {
        console.log(response);
        if (response.status == 200) {
          this.setState({ html: response.message });
        }
      }.bind(this)
    })
  }

  handleEditorChange() {

  }
  handleToggleMode() {
    this.setState({ mode: this.state.mode == 'view' ? 'edit' : 'view' })
  }

  render() {
    var display;
    //if (this.state.mode == 'view') {
    //  display = (
    //    <div className="wiki-viewer"
    //      dangerouslySetInnerHTML={{ __html: this.state.html }}>
    //    </div>
    //  );
    //} else if (this.state.mode == 'edit') {
      display = (
        <TinyMCE
          content={this.state.html}
          config={{
            readonly: this.state.mode == 'view',
            inline: true,
            plugins: 'autolink link image lists',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
          }}
          onChange={this.handleEditorChange}
        />
      );
    //}

    return (
      <div className="wiki-content">
        <a href="#" onClick={this.handleToggleMode}>Toggle</a>
        {display}
      </div>
    )
  }
}