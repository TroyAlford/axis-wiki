// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';

import Icon from './Icon';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import Tag from './Tag';

import XHR from '../helpers/XHR';

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

    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleEditTag = this.handleEditTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);

    this.handleNew = this.handleNew.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleMode = this.handleMode.bind(this);

    this.handleAliasMenu = this.handleAliasMenu.bind(this);
    this.handleRenameMenu = this.handleRenameMenu.bind(this);
    this.handleRedirectMenu = this.handleRedirectMenu.bind(this);

    XHR.get('/api/w/' + this.props.params.slug, {
      success: this.handleLoad,
      failure: function(error) {
        if (error.status == 404)
          this.handleNew();
      }.bind(this)
    })
  }
  componentDidUpdate() {
    if (this.state.mode == 'edit')
      ReactDOM.findDOMNode(this.refs.editor).focus();
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
  handleNew() {
    this.setState({
      data: [],
      html: "\
        <h1>" + _.startCase(this.props.params.slug) + "</h1>\
        <p>This article does not exist! Click <strong>edit</strong> to create it!</p>\
      ",
      missing_links: [],
      tags: []
    });
  }
  handleSave(event) {
    var html = window.tinyMCE.activeEditor.getContent();
      //ReactDOM.findDOMNode(this.refs.editor).innerHTML;

    XHR.post('/api/w/' + this.props.params.slug, {
      data: {
        meta: {
          data: this.state.data || [],
          tags: this.state.tags || []
        },
        html: html
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

  handleAliasMenu() {
    console.log('Alias clicked.');
  }
  handleRenameMenu() {
    console.log('Rename clicked.');
  }
  handleRedirectMenu() {
    console.log('Redirect clicked.');
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
          'anchor advlist autosave fullscreen hr image ' +
          'link lists paste table',
        toolbar:
          'formatselect | bold italic underline | bullist numlist ' +
          '| hr link anchor | alignleft aligncenter alignright alignjustify ' +
          '| image table | removeformat | undo redo',
        valid_elements:
          '@[class|style],-h1,-h2,-h3,-h4,-h5,-h6,br,hr,-p,-b/strong,-i/em,' +
          'table,-tr,th,td,-ul,-ol,-li'
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
            <li>
              <MenuButton icon={{ name: 'settings', size: 'small' }}>
                <MenuItem caption="Aliases" onClick={this.handleAliasMenu} />
                <MenuItem caption="Rename..." onClick={this.handleRenameMenu} />
                <MenuItem caption="Redirect to..." onClick={this.handleRedirectMenu} />
              </MenuButton>
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