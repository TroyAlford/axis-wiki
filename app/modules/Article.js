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
      data: [],
      html: '',
      missing_links: [],
      tags: [],

      mode: 'read'
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleMode = this.handleMode.bind(this);

    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleEditTag = this.handleEditTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: this.handleLoad
    })
  }

  tagify(tag) {
    return _.trim(_.lowerCase(tag.replace(/[\s]{2,}/g, ' ')));
  }

  handleAddTag(new_tag) {
    this.setState({
      tags: _.union(this.state.tags, [this.tagify(new_tag)])
    });
  }
  handleEditTag(old_tag, new_tag) {
    old_tag = this.tagify(old_tag);
    new_tag = this.tagify(new_tag);

    let tags = _.difference(this.state.tags, [old_tag]);
    if (new_tag.length)
      tags = _.union(tags, [new_tag]);

    this.setState({ tags: tags });
  }
  handleRemoveTag(removed_tag) {
    var tags = this.state.tags;
    this.setState({
      tags: _.difference(this.state.tags, [this.tagify(removed_tag)])
    });
  }

  handleLoad(response) {
    let msg = JSON.parse(response.message);
    this.setState({
      data: (msg.meta || {}).data || [],
      html: msg.html,
      missing_links: msg.missing_links || [],
      tags: _.map((msg.meta || {}).tags || [], this.tagify),

      mode: 'read'
    });
  }
  handleSave(event) {
    XHR.post('/api/w/' + this.props.params.slug, {
      data: {
        meta: {
          data: this.state.data || [],
          tags: this.state.tags || []
        },
        html: ReactDOM.findDOMNode(this.refs.editor).innerHTML
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
          'paste searchreplace table',
        readonly: this.state.mode == 'read',
        toolbar:
          'formatselect | bold italic underline | hr link anchor ' +
          '| alignleft aligncenter alignright alignjustify ' +
          '| image table | removeformat | undo redo'
      }}
      content={this.state.html}
      ref="editor"
    />;

    let tags = this.state.tags.map(function(tag) {
      return (
        <Tag key={tag} name={tag}
             onChange={this.handleEditTag}
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
              <Icon name="save" size="small" />Save
            </li>
            <li className={cn({ 'is-active': this.state.mode == 'read' })}>
              <a onClick={this.handleMode.bind(this, 'read')}><Icon name={'read'} size={'small'} />Read</a>
            </li>
            <li className={cn({ 'is-active': this.state.mode == 'edit' })}>
              <a onClick={this.handleMode.bind(this, 'edit')}><Icon name={'edit'} size={'small'} />Edit</a>
            </li>
          </ul>
        </div>
        <div className="wiki-content reader">{viewer}</div>
        <div className="wiki-content editor">{editor}</div>
        <div className="tags">
          <Icon name="tags" /> {tags}
          <Icon name="add" onClick={this.handleAddTag.bind(this, 'new tag')} />
        </div>
      </div>
    );
  }
}