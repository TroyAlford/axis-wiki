import { browserHistory } from 'react-router'
import ComponentBase      from '../application/ComponentBase'
import Icon               from '../components/Icon'
import ReactDOM           from 'react-dom'
import Slug               from '../../server/services/Slug'
import Tag                from '../components/Tag'
import TagBrowser         from '../components/TagBrowser'
import TinyMCE            from 'react-tinymce'
import XHR                from '../helpers/XHR'

export default class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.default_state;
    this.loadArticle(this.props.params.slug);
  }
  componentDidUpdate() {
    if (this.state.mode == 'edit')
      ReactDOM.findDOMNode(this.refs.editor).focus();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.params.slug != this.props.params.slug)
      this.loadArticle(newProps.params.slug);
  }

  get default_state() {
    return {
      aliases: [],
      children: [],
      data: [],
      html: '',
      missing_links: [],
      tags: [],

      mode: 'read'
    }
  }

  loadArticle(slug) {
    XHR.get(`/api/page/${slug}`, {
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

  tagify(tag) {
    return Slug.normalize(tag);
  }

  handleAddTag(new_tag) {
    this.setState({
      tags: _.union(this.state.tags, [this.tagify(new_tag)])
    });
  }
  handleAlias(event) {
    let slugs = _.map(_.split(_.toLower(event.target.value), ','), function(slug) {
      return slug.replace(/[^\w\d/_]/g, '-').replace(/-{2,}/g, '-');
    });
    this.setState({ aliases: slugs });
  }
  handleDelete() {
    let slug = this.props.params.slug;
    XHR.delete(`/api/page/${slug}`, {
      done: (res) => {
        this.loadArticle(slug);
      }
    })
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

  handleLoad(response) {
    let state = Object.assign(this.default_state, JSON.parse(response.message));
    state.tags = _.map(state.tags, this.tagify);
    this.setState(state);
  }
  handleMode(mode) {
    if (mode == this.state.mode) return;

    let html = this.state.html;
    if ('edit' == this.state.mode)
      html = window.tinyMCE.activeEditor.getContent();
    else if ('source' == this.state.mode)
      html = this.refs.source.value;

    this.setState({ html: html, mode: mode });
  }
  handleSave() {
    var html = '';
    if (this.state.mode == 'edit')
      html = window.tinyMCE.activeEditor.getContent();
    else
      html = this.refs.source.value;

    XHR.post('/api/page/' + this.props.params.slug, {
      data: {
        aliases: this.state.aliases || [],
        children: this.state.children || [],
        data: this.state.data || [],
        html: html,
        tags: this.state.tags || []
      },
      success: this.handleLoad,
      failure: function(res) {
        console.log('Save Error...', res);
      }
    });
  }

  render() {
    let viewer = <div>
      <div ref="viewer" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
      <TagBrowser articles={this.state.children} columns="4" />
    </div>;
    let source = <textarea ref="source" onChange={this.handleSourceChange} value={this.state.html} />;
    let editor = <TinyMCE ref="editor"
      config={{
        auto_focus: true,
        autosave_ask_before_unload: false,
        inline: true,
        fixed_toolbar_container: '.article.page > .tabs',
        formats: {
          aligncenter: {
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
            classes: 'is-text-centered'
          },
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
          'a[href|target|class|style],img[src|class|style|height|width],' +
          '@[class|colspan|rowspan|style],th,td,' +
          '@[class|style],' +
          '-h1,-h2,-h3,-h4,-h5,-h6,' +
          '-table,-tr,br,hr,-blockquote,' +
          '-div,-p,-ul,-ol,-li,-b/strong,-i/em,-u,-s/strike/del,-center,-sup,-sub'
      }}
      content={this.state.html}
    />;
    let settings = <div ref="settings">
      <h5>Settings</h5>
      <table className="settings">
       <tbody>
        <tr>
          <th>Aliases</th>
          <td>
            <div>
              <textarea ref="aliases" value={_.join(this.state.aliases, ',')}
                        onChange={this.handleAlias}></textarea>
            </div>
          </td>
        </tr>
        <tr>
          <th>Delete</th>
          <td>
            <button className="button is-danger" onClick={this.handleDelete}>Delete this Article</button>
            <p><i>Warning: This cannot be undone!</i></p>
          </td>
        </tr>
       </tbody>
      </table>
    </div>;

    let tags = this.state.tags.map((tag => {
      return (
        <Tag key={tag} name={tag}
             onChange={this.handleEditTag}
             onRemove={this.handleRemoveTag.bind(this, tag)}
             editable={this.state.mode != 'read'} />
      );
    }).bind(this));

    return (
      <div className={`article page mode-${this.state.mode}`}>
        <div className="tabs is-right is-boxed">
          <ul className="tab-set">
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
        <div className="tab reader content">{viewer}</div>
        <div className="tab editor content">{editor}</div>
        <div className="tab source">{source}</div>
        <div className="tab settings">{settings}</div>
        <div className="tag-bar">
          <Icon className="tag-bar-icon" name="tags" />
          {tags}
          <Icon className="btn-add" name="add" onClick={this.handleAddTag.bind(this, 'new tag')} />
        </div>
      </div>
    );
  }
}