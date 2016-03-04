// modules/Article.js
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';
import { browserHistory } from 'react-router';

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
      aliases: [],
      data: [],
      html: '',
      missing_links: [],
      tags: [],

      mode: 'read'
    };

    this.loadArticle = this.loadArticle.bind(this);

    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleSetAliases = this.handleSetAliases.bind(this);
    this.handleEditTag = this.handleEditTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);

    this.handleLinks = this.handleLinks.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.loadArticle(this.props.params.slug);
  }
  componentDidMount() {
    var viewer = ReactDOM.findDOMNode(this.refs.viewer);
    if (viewer.addEventListener)
      viewer.addEventListener('click', this.handleLinks, false);
    else if (el.attachEvent)
      viewer.attachEvent('onclick', this.handleLinks);
    else
      viewer['onclick'] = this.handleLinks;
  }
  componentDidUpdate() {
    if (this.state.mode == 'edit')
      ReactDOM.findDOMNode(this.refs.editor).focus();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.params.slug != this.props.params.slug)
      this.loadArticle(newProps.params.slug);
  }

  loadArticle(slug) {
    XHR.get(`/api/w/${slug}`, {
      success: this.handleLoad,
      failure: function(error) {
        if (error.status == 404)
          this.handleNew();
      }.bind(this),
      done: function(response) {
        let regex = /[\w\d-_]{1,}$/;
        let response_slug = regex.exec(response.url)[0],
            current_slug = regex.exec(window.location.pathname)[0];
        if (response_slug != current_slug)
          browserHistory.replace(`/w/${response_slug}`);
      }
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
  handleSetAliases(event) {
    let slugs = _.map(_.split(_.toLower(event.target.value), ','), function(slug) {
      return slug.replace(/[^\w\d/_]/g, '-').replace(/-{2,}/g, '-');
    });
    this.setState({ aliases: slugs });
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
  handleSourceChange(event) {
    this.setState({ html: event.target.value })
  }

  handleLinks(event) {
    if (event.which == 1 && event.target.nodeName == "A" && event.target.hostname == window.location.hostname) {
      event.preventDefault();
      browserHistory.push(event.target.pathname);
    }
  }
  handleLoad(response, b, c, d) {
    let msg = JSON.parse(response.message);
    this.setState({
      aliases: (msg.meta || {}).aliases || [],
      data: (msg.meta || {}).data || [],
      html: msg.html,
      missing_links: msg.missing_links || [],
      tags: _.map((msg.meta || {}).tags || [], this.tagify),

      mode: 'read'
    });
  }
  handleMode(mode) {
    this.setState({ mode: mode });
  }
  handleNew() {
    this.setState({
      aliases: [],
      data: [],
      html: 
        `<h1>${_.startCase(this.props.params.slug)}</h1>\n` +
        `<p>This article does not exist! Click <strong>edit</strong> to create it!</p>`
      ,
      missing_links: [],
      tags: []
    });
  }
  handleSave() {
    var html = '';
    if (this.state.mode == 'edit')
      html = window.tinyMCE.activeEditor.getContent();
    else
      html = this.refs.source.value;

    XHR.post('/api/w/' + this.props.params.slug, {
      data: {
        meta: {
          aliases: this.state.aliases || [],
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

  render() {
    let viewer = <div ref="viewer" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>;
    let source = <textarea ref="source" onChange={this.handleSourceChange} value={this.state.html} />;
    let editor = <TinyMCE ref="editor"
      config={{
        auto_focus: true,
        autosave_ask_before_unload: false,
        inline: true,
        fixed_toolbar_container: '.wiki-container > .tabs',
        formats: {
          underline: { inline: 'u', exact: true }
        },
        menubar: false,
        plugins:
          'anchor advlist autosave fullscreen hr image ' +
          'link lists paste table',
        toolbar:
          'formatselect | bold italic underline | bullist numlist ' +
          '| hr link anchor | alignleft aligncenter alignright alignjustify ' +
          '| image table | removeformat | undo redo',
        valid_elements:
          'a[href|target|class|style],img[src|class|style],' +
          '@[class|style],' +
          '-h1,-h2,-h3,-h4,-h5,-h6,' +
          '-table,-tr,th,td,br,hr,-blockquote,' +
          '-div,-p,-ul,-ol,-li,-b/strong,-i/em,-u,-s/strike'
      }}
      content={this.state.html}
    />;
    let settings = <div ref="settings">
      <h5>Settings</h5>
      <table className="settings">
        <tr>
          <th>Aliases</th>
          <td>
            <div>
              <textarea ref="aliases" value={_.join(this.state.aliases, ',')}
                          onChange={this.handleSetAliases}></textarea>
            </div>
          </td>
        </tr>
      </table>
    </div>;

    let tags = this.state.tags.map(function(tag) {
      return (
        <Tag key={tag} name={tag}
             onChange={this.handleEditTag}
             onRemove={this.handleRemoveTag.bind(this, tag)}
             editable={this.state.mode != 'read'} />
      );
    }.bind(this));

    return (
      <div className={`cp-article wiki-container mode-${this.state.mode}`}>
        <div className="tabs is-right is-boxed">
          <ul>
            <li className={`button is-primary ${this.state.mode == 'read' ? 'is-hidden' : ''}`}
                onClick={this.handleSave}>
              <Icon name="save" size="small" />
            </li>
            <li className={this.state.mode == 'read' ? 'is-active' : ''}>
              <a title="Read" onClick={this.handleMode.bind(this, 'read')}><Icon name="read" size="small" /></a>
            </li>
            <li className={this.state.mode == 'edit' ? 'is-active' : ''}>
              <a title="Editor" onClick={this.handleMode.bind(this, 'edit')}><Icon name="edit" size="small" /></a>
            </li>
            <li className={this.state.mode == 'source' ? 'is-active' : ''}>
              <a title="Source" onClick={this.handleMode.bind(this, 'source')}><Icon name="html" size="small" /></a>
            </li>
            <li className={this.state.mode == 'settings' ? 'is-active' : ''}>
              <a title="Settings" onClick={this.handleMode.bind(this, 'settings')}><Icon name="settings" size="small" /></a>
            </li>
          </ul>
        </div>
        <div className="wiki-article-tab reader">{viewer}</div>
        <div className="wiki-article-tab editor">{editor}</div>
        <div className="wiki-article-tab source">{source}</div>
        <div className="wiki-article-tab settings">{settings}</div>
        <div className="tags">
          <Icon name="tags" /> {tags}
          <Icon name="add" onClick={this.handleAddTag.bind(this, 'new tag')} />
        </div>
      </div>
    );
  }
}