import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { deleteArticle, loadArticle, saveArticle } from '../redux/article/actions'
import JsxParser from 'react-jsx-parser'

import ComponentBase from '../application/ComponentBase'
import ArticleChildren from '../components/ArticleChildren'
import Editable from '../components/Editable'
import Icon from '../components/Icon'
import HtmlEditor from '../components/HtmlEditor'
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
      tab: 'read',
    };

    if (this.props.slug !== this.props.params.slug)
      this.props.dispatch(loadArticle(this.props.params.slug))

    this.editorConfig = unboundEditorConfig

    Object.defineProperty(this, 'dirty', { get: () => (
      this.state.tab      === 'edit' ||
      this.props.html     !== this.draft ||
      this.state.aliases  !== null ||
      this.state.children !== null ||
      this.state.data     !== null ||
      this.state.tags     !== null ||
      this.state.title    !== null ||
      (!this.props.sheet && this.state.sheet)
    ) })
    Object.defineProperty(this, 'draft', { get: () => {
      switch (this.state.tab) {
        case 'edit': /* TinyMCE tab */
          if (tinyMCE && tinyMCE.activeEditor)
            return tinyMCE.activeEditor.getContent()
        default:
          return this.state.html || this.props.html
      }
    } })
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.slug

    if (this.props.params.slug !== slug)
      browserHistory.replace(`/page/${slug}`)
      // Probably a redirect from one slug to another

    if (this.props.params.slug !== nextProps.params.slug) {
      // Switching to a new Article
      this.setState({ ...this.defaultState, tab: 'read' })
      this.props.dispatch(loadArticle(nextProps.params.slug))
      return;
    }

    this.setState({
      ...this.defaultState,
      sheet: nextProps.loading
        ? this.state.sheet
        : nextProps.sheet,
    })
  }

  get defaultState() {
    return {
      aliases: null,
      children: null,
      data: null,
      html: null,
      tags: null,
      title: null,
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
      sheet:    !this.state.sheet ? false :
        new JsonSheetFormatter(this.state.sheet).cleansed,
    }

    this.props.dispatch(saveArticle(this.props.params.slug, article))
  }

  handleTabClicked(clicked) {
    if (this.state.tab === clicked.key) return;

    this.setState({
      html: this.dirty ? this.draft : null,
      tab: clicked.key
    })
  }

  render() {
    const tabs = []

    if (this.state.sheet) {
      tabs.push({
        key: 'sheet',
        className: 'left',
        caption: [
          <Icon key="icon" name="sheet" />,
          <span key="text">Sheet</span>,
          !this.props.readonly && <i key="btn-remove" className="icon icon-remove"
            onClick={() => this.setState({ sheet: undefined, tab: 'read' })}
          />,
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
    } else if (!this.props.readonly) {
      tabs.push(
        <li key="add-sheet" className="tab-button sheet left">
          <a className="icon icon-add button is-info"
             onClick={() => this.setState({
              sheet: Sheet.defaultProps,
              tab: 'sheet',
            })}
          >Add Sheet</a>
        </li>
      )
    }

    tabs.push({
      key: 'read',
      className: 'left',
      caption: [
        <Icon key="icon" name="read" />,
        <span key="text">Article</span>,
      ],
      contents: [
        <h1 key="title">{this.props.title}</h1>,
        <JsxParser key="viewer" jsx={this.props.html || ''} />,
        <ArticleChildren key='children' articles={this.props.children} />
      ]
    })

    if (!this.props.readonly && this.dirty) tabs.push(
      <li key="save" className="tab-button save center">
        <a className="icon icon-save button is-success"
           onClick={this.handleSave}>Save</a>
      </li>
    )

    if (!this.props.readonly && window.tinyMCE) tabs.push({
      key: 'edit',
      className: 'right',
      caption: <Icon key="icon" name="edit" />,
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

    if (!this.props.readonly) tabs.push({
      key: 'html',
      className: 'right',
      caption: <Icon key="icon" name="html" />,
      contents: <HtmlEditor
        html={this.state.html || this.props.html}
        onChange={html => this.setState({ html })}
        readonly={this.props.readonly}
      />,
    })

    tabs.push({
      key: 'settings',
      className: 'right',
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
            readonly={this.props.readonly}
            onChange={aliases => this.setState({ aliases })}
            onlyUnique={true}
          />
        {this.props.readonly ? [] : [
          <h5 key="label">Danger</h5>,
          <button key="button" className="button is-danger" onClick={this.handleDelete}>Delete this Article</button>,
          <span key="warning" className="button-label"><i>Warning: This cannot be undone!</i></span>,
        ]}
        </div>
    })

    return (
      <div className={['article', 'page', this.props.loading ? 'loading' : ''].join(' ')}>
        <TabSet tabs={tabs}
          active={this.state.tab}
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
  children: React.PropTypes.arrayOf(React.PropTypes.string),
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
  title: null,
}

export default connect(
  state => ({
    ...state.article,
    readonly: !state.user.privileges.includes('edit'),
  })
)(Article);
