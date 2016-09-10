import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { deleteArticle, loadArticle, loadedArticle, saveArticle } from '../redux/article/actions'
import { difference, includes, sortBy, uniq, xor } from 'lodash'

import ComponentBase from '../application/ComponentBase'
import ArticleChildren from '../components/ArticleChildren'
import Editable from '../components/Editable'
import Icon from '../components/Icon'
import JsonSheetFormatter from '../sheet/JsonFormatter'
import Sheet from './Sheet'
import Slug from '../../utility/Slugs'
import TabSet from '../components/TabSet'
import TagBar from '../components/TagBar'
import TinyMCE from 'react-tinymce'

import unboundEditorConfig from '../config/editor'

const tinyMCE = window.tinyMCE;

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.defaultState,
      sheet: props.sheet,
    };

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
      this.state.tags     !== null ||
      this.state.title    !== null
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
    if (this.props.params.slug !== nextProps.params.slug) {
      this.setState(this.defaultState)
      this.props.dispatch(loadArticle(nextProps.params.slug))
    }

    if (this.props.params.slug !== nextProps.slug) {
      // Probably a redirect from one slug to another
      browserHistory.push(`/page/${nextProps.slug}`)
    }

    this.setState({
      ...this.defaultState,
      sheet: nextProps.sheet,
      // selected_tab,
    })
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
      tags:     this.state.tags       || this.props.tags,
      title:    this.state.title      || this.props.title,
      sheet:    new JsonSheetFormatter(this.state.sheet).cleansed,
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
        <h1 key="title">{this.props.title}</h1>,
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
      contents: [
        <Sheet key="sheet" {...this.state.sheet}
          readonly={this.props.readonly}
          name={this.state.title || this.props.title}
          onChange={sheet => this.setState({
            sheet, title: sheet.name
          })}
          ref={self => this.sheet = self}
        />,
      ]
    })

    if (!this.props.readonly && this.state.selected_tab !== 'read')
      tabs.push(
        <li key="save" className="tab-button">
          <a className="icon icon-save button is-success"
             onClick={this.handleSave}>Save</a>
        </li>
      )

    if (!this.props.readonly) tabs.push({
      key: 'edit',
      caption: [
        <Icon key="icon" name="edit" />,
      ],
      contents: [
        <Editable key="title" className="title-editor"
          onChange={title => this.setState({ title })}
          placeholder="Page Title"
          value={this.state.title || this.props.title}
        />,
        <TinyMCE key="editor" config={this.editorConfig}
          content={this.state.html || this.props.html}
        />,
      ]
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
        <TabSet tabs={tabs}
          active={this.state.selected_tab}
          onTabClicked={this.handleTabClicked}
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

Article.propTypes = {
  aliases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  html: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired,
  readonly: React.PropTypes.bool.isRequired,
  sheet: React.PropTypes.object,
  slug: React.PropTypes.string.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: React.PropTypes.string,
}
Article.defaultProps = {
  aliases: [],
  children: [],
  html: '',
  loading: false,
  readonly: true,
  sheet: undefined,
  tags: [],
}

export default connect(
  state => ({
    ...state.article,
    readonly: !state.user.privileges.includes('edit'),
  })
)(Article);
