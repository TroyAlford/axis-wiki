import JsxParser from 'react-jsx-parser'
import PropTypes from 'prop-types'
import React from 'react'
import TinyMCE from 'react-tinymce'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { deleteArticle, saveArticle } from '../redux/page/actions-article'

import ComponentBase from '../application/ComponentBase'
import ArticleChildren from '../components/ArticleChildren'
import Editable from '../components/Editable'
import Favorite from '../components/Favorite'
import Icon from '../components/Icon'
import HtmlEditor from '../components/HtmlEditor'
import Sheet from './Sheet'
import TabSet from '../components/TabSet'
import TagBar from '../components/TagBar'

import unboundEditorConfig from '../config/editor'

const tinyMCE = window.tinyMCE

function interceptEditorLinks(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault()
    event.stopPropagation()
  }
}

class Article extends ComponentBase {
  constructor(props) {
    super(props)
    this.state = this.defaultState(props)

    this.editorConfig = unboundEditorConfig

    Object.defineProperty(this, 'dirty', { get: () => (
      this.state.tab === 'edit' ||
      this.props.html !== this.draft ||
      !isEqual(this.props.aliases, this.state.aliases) ||
      !isEqual(this.props.data, this.state.data) ||
      !isEqual(this.props.tags, this.state.tags) ||
      !isEqual(this.props.title, this.state.title)
    ) })
    Object.defineProperty(this, 'draft', { get: () => {
      if (this.state.tab === 'edit' && tinyMCE && tinyMCE.activeEditor) {
        return tinyMCE.activeEditor.getContent()
      }

      return this.state.html || this.props.html
    } })
  }

  componentWillReceiveProps(props) {
    this.setState(this.defaultState(props))
  }

  defaultState(props = this.props) {
    return ({
      aliases: props.aliases,
      data:    props.data || {},
      html:    props.html,
      tags:    props.tags,
      title:   props.title,

      tab: 'read',
    })
  }

  handleDelete() {
    this.props.dispatch(deleteArticle(this.props.params.slug))
  }
  handleSave() {
    if (!this.dirty) return // Only save if there's something to save.

    const article = {
      aliases:  this.state.aliases || this.props.aliases,
      children: this.state.children || this.props.children,
      data:     this.state.data || this.props.data || undefined,
      html:     this.draft,
      tags:     this.state.tags || this.props.tags,
      title:    this.state.title || this.props.title,
    }

    this.props.dispatch(saveArticle(this.props.params.slug, article))
  }
  handleReset() {
    this.setState(this.defaultState())
  }

  handleTabClicked(clicked) {
    if (this.state.tab === clicked.key) return true

    this.setState({
      html: this.dirty ? this.draft : null,
      tab:  clicked.key,
    })

    return true
  }

  handleTemplateChange(event) {
    const template = event.target.value
    this.setState({
      data: {
        ...this.state.data,
        template,
      },
    })
  }

  render() {
    if (this.props.loading) return <div className="article page loading" />

    const tabs = []
    const { template } = this.state.data || {}

    if (template === 'character') {
      tabs.push({
        key:       'sheet',
        className: 'left',

        caption: [
          <Icon key="icon" name="sheet" />,
          <span key="text">Sheet</span>,
        ],
        contents: [
          <Sheet
            key="sheet" {...this.state.data}
            readonly={this.props.readonly}
            name={this.state.title || this.props.title}
            onChange={sheet => this.setState({
              data: {
                ...this.state.data,
                ...sheet,
              },
              title: sheet.name,
            })}
            ref={(self) => { this.sheet = self }}
          />,
        ],
      })
    }

    tabs.push({
      key:       'read',
      className: 'left',
      caption:   [
        <Icon key="icon" name="read" />,
        <span key="text">Article</span>,
      ],
      contents: [
        <h1 key="title">
          <Favorite size="small" />
          {this.props.title}
        </h1>,
        <JsxParser key="viewer" jsx={this.props.html || ''} />,
        <ArticleChildren key="children" articles={this.props.children} />,
      ],
    })

    if (!this.props.readonly && window.tinyMCE) {
      tabs.push({
        key:       'edit',
        className: 'right',
        caption:   <Icon key="icon" name="edit" />,
        contents:  [
          <Editable
            key="title" className="title-editor"
            onChange={title => this.setState({ title })}
            placeholder="Page Title"
            value={this.state.title || this.props.title}
          />,
          <TinyMCE
            key="editor" config={this.editorConfig}
            onClick={interceptEditorLinks}
            content={this.state.html || this.props.html}
          />,
        ],
      })
    }

    if (!this.props.readonly) {
      tabs.push({
        key:       'html',
        className: 'right',
        caption:   <Icon key="icon" name="html" />,
        contents:  <HtmlEditor
          html={this.state.html || this.props.html}
          onChange={html => this.setState({ html })}
          readonly={this.props.readonly}
        />,
      })
    }

    tabs.push({
      key:       'settings',
      className: 'right',
      caption:   [
        <Icon key="icon" name="settings" />,
      ],
      contents: (
        <div className="settings">
          {this.props.readonly ? [] : [
            <h5 key="header">Template</h5>,
            <span key="dropdown" className="select">
              <select onChange={this.handleTemplateChange}>
                {[undefined, 'character', 'creature', 'world'].map(tmplName =>
                  <option
                    key={tmplName || 'undefined'} value={tmplName}
                    selected={this.state.data.template === tmplName}
                  >{tmplName}</option>
                )}
              </select>
            </span>,
          ]}
          <h5>Aliases</h5>
          <div className="callout-info">
            Each entry below is used as an alternate name / redirect for this page.
          </div>
          <TagBar
            className="aliases-editor tag-bar"
            tags={this.state.aliases || this.props.aliases || []}
            inputProps={{
              className:   'alias-tag tag-bar-input',
              placeholder: 'add alias',
            }}
            readonly={this.props.readonly}
            onChange={aliases => this.setState({ aliases })}
            onlyUnique
          />
          {this.props.readonly ? [] : [
            <h5 key="label">Danger</h5>,
            <button
              key="button" className="button is-danger"
              onClick={this.handleDelete}
            >Delete this Article</button>,
            <span key="warning" className="button-label">
              <i>Warning: This cannot be undone!</i>
            </span>,
          ]}
        </div>
      ),
    })

    return (
      <div className="article page">
        <TabSet
          tabs={tabs}
          active={this.state.tab}
          onTabClicked={this.handleTabClicked}
        />
        <div className="bottom-bar">
          <TagBar
            tags={this.state.tags || this.props.tags}
            readonly={this.props.readonly}
            onChange={tags => this.setState({ tags })}
            onlyUnique
          />
          {!this.props.readonly && this.dirty &&
            <div className="buttons">
              <button className="icon icon-save button is-success" onClick={this.handleSave}>
                Save
              </button>
              <button className="button is-link" onClick={this.handleReset}>
                Reset
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

Article.propTypes = {
  aliases:  PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      slug:  PropTypes.string,
      title: PropTypes.string,
    }),
  ])),
  html:     PropTypes.string.isRequired,
  loading:  PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
  tags:     PropTypes.arrayOf(PropTypes.string).isRequired,
  title:    PropTypes.string,
}
Article.defaultProps = {
  aliases:  [],
  children: [],
  html:     '',
  loading:  false,
  readonly: true,
  tags:     [],
  title:    null,
}

export default connect(
  state => ({
    ...state.page,
    readonly: !(state.page.privileges || []).includes('edit'),
  })
)(Article)
