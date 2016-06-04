import _                  from 'lodash'
import { connect }        from 'react-redux'
import { 
  deleteArticle,
  loadArticle,
  loadedArticle,
  saveArticle
}                         from '../redux/actions/article'

import ComponentBase      from '../application/ComponentBase'
import ArticleChildren    from '../components/ArticleChildren'
import Icon               from '../components/Icon'
import TabSet             from '../components/TabSet'
import TagBar             from '../components/TagBar'
import TinyMCE            from 'react-tinymce'

import editor_config      from '../config/editor'

const tinyMCE = window.tinyMCE;

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.default_state;

    if (this.props.slug !== this.props.params.slug)
      this.props.dispatch(loadArticle(this.props.params.slug))

    this.isDirty = () => (
      !!this.state.aliases ||
      !!this.state.children ||
      !!this.state.data ||
      !!this.state.html ||
      !!this.state.tags
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.slug !== nextProps.params.slug)
      this.props.dispatch(loadArticle(nextProps.params.slug))
  }

  get default_state() {
    return {
      selected_tab: 0,

      aliases: null,
      children: null,
      data: null,
      html: null,
      tags: null
    }
  }
  
  handleDelete() {
    this.props.dispatch(deleteArticle(this.props.params.slug))
  }
  handleSave() {
    let article = {
      aliases:  this.state.aliases    || this.props.aliases,
      children: this.state.children   || this.props.children,
      data:     this.state.data       || this.props.data,
      html:     this.getCurrentHtml(),
      tags:     this.state.tags       || this.props.tags
    }

    this.props.dispatch(saveArticle(this.props.params.slug, article))
    this.setState(this.default_state)
  }

  handleHtmlChange() {
    let html = this.getCurrentHtml()
    this.setState({ html: html !== this.props.html ? html : null })
  }
  getCurrentHtml() {
    let html = '';
    switch (this.state.selected_tab) {
      case 0: /* Reading tab */
        html = this.state.html || this.props.html;
        break;
      case 1: /* TinyMCE tab */
        html = tinyMCE.activeEditor.getContent();
        break;
      case 2: /* HTML tab */
        html = this.refs.html.value;
        break;
      default:
        html = this.state.html || this.props.html;
        break;
    }
    return html;
  }
  handleTabClicked(clicked) {
    if (this.state.selected_tab == clicked.index) return;

    this.setState({
      html: clicked.index !== 0 ? this.props.html : this.state.html,
      selected_tab: clicked.index
    })
  }

  handleAliasChange(updated) {
    let aliases = _(updated).map(alias =>
      _.toLower(alias).replace(/[^\w\d/_]/g, '-').replace(/-{2,}/g, '-')
    ).sortBy().difference([this.props.params.slug]).uniq().value();
    this.setState({ aliases });
  }
  handleTagChange(updated) {
    let tags = _.sortBy(updated);
    if (_.xor(tags, this.props.tags).length)
      this.setState({ tags })
    else
      this.setState({ tags: null })
  }

  render() {
    let reader = 
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.html || this.props.html }}></div>
        <ArticleChildren articles={this.props.children} />
      </div>

    return (
      <div className="article page">
    { this.props.readonly
      ? <div className="readonly">{reader}</div>
      : <TabSet
          active={this.state.selected_tab}
          tabs={[{
            className: 'read',
            caption: <Icon name="read" size="small" />,
            contents: reader
          }, {
            className: 'edit',
            caption: <Icon name="edit" size="small" />,
            contents: 
              <TinyMCE ref="tinymce"
                config={editor_config} 
                content={this.state.html || this.props.html}
              />
          }, {
            className: 'html',
            caption: <Icon name="html" size="small" />,
            contents:
              <textarea ref="html"
                onChange={() => this.setState({ html: this.refs.html.value })}
                value={this.state.html || this.props.html}
              />
          }, {
            className: 'settings',
            caption: <Icon name="settings" size="small" />,
            contents:
              <div className="settings">
                <h5>Aliases:</h5>
                <div className="callout-info">Each entry below is used as an alternate name / redirect for this page.</div>
                <TagBar
                  className="aliases-editor tag-bar"
                  tags={this.state.aliases || this.props.aliases}
                  inputProps={{
                    className: 'alias-tag tag-bar-input',
                    placeholder: 'add alias'
                  }}
                  readonly={false}
                  onChange={this.handleAliasChange}
                  onlyUnique={true}
                />
                <h5>Danger</h5>
                <button className="button is-danger" onClick={this.handleDelete}>Delete this Article</button>
                <span className="button-label"><i>Warning: This cannot be undone!</i></span>
              </div>
          }]}
          tabClicked={this.handleTabClicked}
        />
      }
        <TagBar
          tags={this.state.tags || this.props.tags}
          readonly={this.props.readonly}
          onChange={this.handleTagChange}
          onlyUnique={true}
        />
        {!this.isDirty() ? '' :
          <button className="save button is-success" onClick={this.handleSave}>
             <Icon name="save" size="small" /><span>Save</span>
           </button>
        }
      </div>
    )
  }
}

export default connect(
  state => Object.assign(
    {}, state.article,
    { readonly: !state.user.privileges.includes('edit') }
  )
)(Article);
