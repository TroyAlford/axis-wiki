// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import XHR from '../helpers/XHR';

import Icon from './Icon';
import Tag from './Tag';
import TinyMCE from 'react-tinymce';

let cn = classNames;

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      meta: {
        data: [],
        tags: []
      },

      mode: 'read'
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleMode = this.handleMode.bind(this);

    this.handleRemoveTag = this.handleRemoveTag.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: this.handleLoad
    })
  }

  handleRemoveTag(removed_tag) {
    var tags = this.state.meta.tags;
    console.log(JSON.stringify(tags));
    console.log('removing ' + removed_tag);
    this.setState({ meta: Object.assign({}, this.state.meta, {
      tags: tags.filter(function (tag) {
        return tag.toLowerCase() != removed_tag.toLowerCase();
      })
    })});
    console.log(JSON.stringify(this.state.meta.tags));
  }
  handleLoad(response) {
    let msg = JSON.parse(response.message);
    this.setState({
      html: msg.html,
      meta: Object.assign({}, { data: [], tags: [] }, msg.meta),

      mode: 'read'
    });
  }
  handleSave(event) {
    XHR.post('/api/w/' + this.props.params.slug, {
      data: {
        html: ReactDOM.findDOMNode(this.refs.editor).innerHTML,
        meta: this.state.meta
      },
      success: this.handleLoad,
      failure: function(res) {
        console.log('Save Error...', res);
      }
    });
  }
  handleMode(mode) {
    this.setState({ mode: mode });
  }

  render() {
    let viewer = <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>;
    let editor = <TinyMCE
      config={{
        auto_focus: true,
        inline: true,
        fixed_toolbar_container: '.wiki-container > .tabs',
        menubar: false,
        plugins:
          'anchor autosave fullscreen hr image link lists ' +
          'paste print searchreplace table',
        readonly: this.state.mode == 'read',
        toolbar:
          'styleselect | bold italic underline | hr link anchor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'image table | removeformat | undo redo | print'
      }}
      content={this.state.html}
      ref="editor"
    />;

    let tags = this.state.meta.tags.map(function(tag) {
      return (
        <Tag key={tag} name={tag}
             onRemove={this.handleRemoveTag.bind(this, tag)}
             editable={this.state.mode == 'edit'} />
      );
    }.bind(this));

    return (
      <div className={`cp-article wiki-container mode-${this.state.mode}`}>
        <div className="tabs is-right is-boxed">
          <ul>
            <li className={cn({
                  'button': true,
                  'is-pulled-right': true,
                  'is-hidden': this.state.mode == 'read'
                })}
                onClick={this.handleSave}>
              <Icon name="save" size="small" /> Save
            </li>
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
        <div className="tags">
          <Icon name="tags" /> {tags}
        </div>
      </div>
    );
  }
}