import { connect }        from 'react-redux'
import { browserHistory } from 'react-router'
import {
  deleteArticle,
  loadArticle,
  loadedArticle,
  saveArticle
}                         from '../redux/article/actions'
import { slugify }        from '../utility/Slugs'
import difference         from 'lodash/difference'
import sortBy             from 'lodash/sortBy'
import uniq               from 'lodash/uniq'
import xor                from 'lodash/xor'

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
      this.state.aliases  !== null ||
      this.state.children !== null ||
      this.state.data     !== null ||
      this.state.html     !== null ||
      this.state.tags     !== null
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slug !== this.props.slug // New Article is loading
      && nextProps.slug !== nextProps.params.slug) // & the page location doesn't show it
      browserHistory.push(`/page/${nextProps.slug}`)

    if (this.props.params.slug !== nextProps.params.slug) {
      this.setState(this.default_state)
      this.props.dispatch(loadArticle(nextProps.params.slug))
    }
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
  handleReset() {
    if (!this.isDirty()) return;
    this.setState(this.default_state)
  }
  handleSave() {
    if (!this.isDirty()) return; // Only save if there's something to save.

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
    switch (this.state.selected_tab) {
      case 1: /* TinyMCE tab */
        return tinyMCE.activeEditor.getContent();
      case 2: /* HTML tab */
        return this.refs.html.value;
      case 0: /* Reading tab */
      default:
        return this.state.html !== null ? this.state.html : this.props.html;
    }
  }
  handleKeyDown(event) {
    if (!event.ctrlKey) return; // Only handle Ctrl+[key] events
    switch (event.key.toLowerCase()) {
      case 's':
        this.handleSave()
        break;
      default:
        return; // Default doesn't prevent anything.
    }
    event.stopPropagation()
    event.preventDefault()
  }
  handleTabClicked(clicked) {
    if (this.state.selected_tab == clicked.index) return;

    this.setState({
      html: this.getCurrentHtml(),
      selected_tab: clicked.index
    })
  }

  handleAliasChange(updated) {
    let aliases = uniq(difference(
      sortBy(updated.map(slugify)),
      [this.props.params.slug]
    ))
    this.setState({ aliases });
  }
  handleTagChange(updated) {
    let tags = sortBy(updated);
    if (xor(tags, this.props.tags).length)
      this.setState({ tags })
    else
      this.setState({ tags: null })
  }

  render() {
    let reader =
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.html !== null ? this.state.html : this.props.html }}></div>
        <ArticleChildren articles={this.props.children} />
      </div>

    return (
      <div className={`article page ${this.props.loading ? 'loading' : ''}`} onKeyDown={this.handleKeyDown}>
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
                content={this.state.html !== null ? this.state.html : this.props.html}
              />
          }, {
            className: 'html',
            caption: <Icon name="html" size="small" />,
            contents:
              <textarea ref="html"
                onChange={() => this.setState({ html: this.refs.html.value })}
                value={this.state.html !== null ? this.state.html : this.props.html}
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
        {this.isDirty() &&
          <div className="buttons">
            <button className="save button is-success" onClick={this.handleSave}>
              <Icon name="save" size="small" /><span>Save</span>
            </button>
            <button className="reset button is-danger" onClick={this.handleReset}>
              <Icon name="undo" size="small" /><span>Reset</span>
            </button>
          </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.article,
    readonly: !state.user.privileges.includes('edit'),
  })
)(Article);
