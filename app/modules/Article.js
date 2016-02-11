// modules/Article.js
import React from 'react';

import XHR from '../helpers/XHR';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'view',
      html: ''
    }
    XHR.get('/api/w/' + this.props.params.slug, {
      success: function(response) {
        console.log(response);
        if (response.status == 200) {
          this.setState({ html: response.message });
        }
      }.bind(this)
    })
  }

  render() {
    if (this.state.mode == 'view') {
      return (
        <div className="wiki-viewer"
          dangerouslySetInnerHTML={{ __html: this.state.html }}>
        </div>
      );
    } else if (this.state.mode == 'edit') {
      return (
        <div className="wiki-editor">
          {this.state.textile}
        </div>
      );
    }
  }
}