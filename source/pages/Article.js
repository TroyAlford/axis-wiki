import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { deleteArticle, loadArticle, loadedArticle, saveArticle } from '../redux/article/actions'
import { difference, sortBy, uniq, xor } from 'lodash'

import ComponentBase from '../application/ComponentBase'
import ArticleChildren from '../components/ArticleChildren'
import Icon from '../components/Icon'
import TabSet from '../components/TabSet'
import TagBar from '../components/TagBar'
import TinyMCE from 'react-tinymce'
import Sheet from './Sheet'
import Slug from '../../utility/Slugs'

import unboundEditorConfig from '../config/editor'

const tinyMCE = window.tinyMCE;

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.defaultState;

    if (this.props.slug !== this.props.params.slug)
      this.props.dispatch(loadArticle(this.props.params.slug))

    this.editorConfig = {
      ...unboundEditorConfig,
      toolbar: 'save | ' + unboundEditorConfig.toolbar,
      setup: editor => {
        if (typeof unboundEditorConfig.setup === 'function')
          unboundEditorConfig.setup(editor)

        editor.addButton('save', {
          icon: ' icon icon-save',
          text: 'Save',
          onclick: this.handleSave
        })
      }
    }

    Object.defineProperty(this, 'dirty', { get: () => (
      this.props.html     !== this.draft ||
      this.state.aliases  !== null ||
      this.state.children !== null ||
      this.state.data     !== null ||
      this.state.tags     !== null
    ) })
    Object.defineProperty(this, 'draft', { get: () => {
      switch (this.state.selected_tab) {
        case 'edit': /* TinyMCE tab */
          return tinyMCE.activeEditor.getContent()
        default:
          return this.state.html || this.props.html
      }
    } })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slug !== this.props.slug // New Article is loading
      && nextProps.slug !== nextProps.params.slug) // & the page location doesn't show it
      browserHistory.push(`/page/${nextProps.slug}`)

    if (this.props.params.slug !== nextProps.params.slug) {
      this.setState(this.defaultState)
      this.props.dispatch(loadArticle(nextProps.params.slug))
    }

    if (!this.props.readonly && nextProps.readonly)
      this.setState(this.defaultState)
  }

  get defaultState() {
    return {
      selected_tab: 'read',

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
    if (!this.dirty) return; // Only save if there's something to save.

    let article = {
      aliases:  this.state.aliases    || this.props.aliases,
      children: this.state.children   || this.props.children,
      data:     this.state.data       || this.props.data,
      html:     this.draft,
      tags:     this.state.tags       || this.props.tags
    }

    this.props.dispatch(saveArticle(this.props.params.slug, article))
    this.setState(this.defaultState)
  }

  handleTabClicked(clicked) {
    if (this.state.selected_tab === clicked.key) return;

    this.setState({
      html: this.dirty ? this.draft : null,
      selected_tab: clicked.key
    })
  }

  render() {
    const tabs = [{
      key: 'read',
      caption: [
        <Icon key="icon" name="read" />,
        <span key="text">Article</span>,
      ],
      contents: [
        <div key='html' dangerouslySetInnerHTML={{ __html: this.props.html }} />,
        <ArticleChildren key='children' articles={this.props.children} />
      ]
    }]

    if (this.props.sheet) tabs.push({
      key: 'sheet',
      caption: [
        <Icon key="icon" name="sheet" />,
        <span key="text">Sheet</span>,
      ],
      contents: <Sheet readonly={this.props.readonly}
                                {...this.props.sheet} />
    })

    if (!this.props.readonly) tabs.push({
      key: 'edit',
      caption: [
        <Icon key="icon" name="edit" />,
      ],
      contents:
        <TinyMCE ref="tinymce"
          config={this.editorConfig}
          content={this.state.html || this.props.html}
        />
    })

    tabs.push({
      key: 'settings',
      caption: [
        <Icon key="icon" name="settings" />,
      ],
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
            onChange={aliases => this.setState({ aliases })}
            onlyUnique={true}
          />
          <h5>Danger</h5>
          <button className="button is-danger" onClick={this.handleDelete}>Delete this Article</button>
          <span className="button-label"><i>Warning: This cannot be undone!</i></span>
        </div>
    })

    return (
      <div className={['article', 'page', this.props.loading ? 'loading' : ''].join(' ')}>
        <TabSet
          active={this.state.selected_tab}
          tabs={tabs}
          tabClicked={this.handleTabClicked}
        />
        <TagBar
          tags={this.state.tags || this.props.tags}
          readonly={this.props.readonly}
          onChange={tags => this.setState({ tags })}
          onlyUnique={true}
        />
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
