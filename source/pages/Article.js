import JsxParser from 'react-jsx-parser'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import ArticleChildren from '@components/ArticleChildren'
// import Editable from '../components/Editable'
// import TinyMCE from 'react-tinymce'
import Favorite from '@components/Favorite'
import Icon from '@components/Icon'
import HtmlEditor from '@components/HtmlEditor'
import Sheet from '@components/Sheet'
import Tab from '@components/Tab'
import TabSet from '@components/TabSet'
import TagBar from '@components/TagBar'
import WysiwygEditor from '@components/WysiwygEditor'

// const { tinyMCE } = window
const JsxLink = ({ href, ...props }) => <Link to={href} {...props} />
JsxLink.displayName = 'JsxLink'

@observer export default class Article extends Component {
  state = { activeTabId: 'read' };

  handleAddSheet = () => {
    this.props.page.data.createCharacterData()
    this.setState({ activeTabId: 'sheet' })
  }
  handleTabClicked = (activeTabId) => {
    if (activeTabId === 'add-sheet') return
    this.setState({ activeTabId })
  }

  readerTab = ({ html, children }) => ({
    id: 'reader',
    tab: <Tab caption="Article" icon="read" />,
    contents: (
      <Fragment>
        <JsxParser components={{ a: JsxLink }} jsx={html} />
        <ArticleChildren articles={children} />
      </Fragment>
    ),
  })
  sheetTab = ({ data }) => {
    const { characterData: sheet } = data

    if (sheet) {
      return {
        id: 'sheet',
        tab: <Tab caption="Sheet" icon="sheet" onRemoveClick={data.removeCharacterData} removable />,
        contents: <Sheet character={sheet.toJSON()} onChange={data.setCharacterData} />,
      }
    }
    return { id: 'add-sheet', tab: <Tab icon="add" onClick={this.handleAddSheet} /> }
  }
  editorTab = ({ html, setHTML }) => ({
    id: 'wysiwyg',
    tab: <Icon name="edit" />,
    contents: <WysiwygEditor html={html} onChange={setHTML} />,
  })
  htmlTab = ({ html, setHTML }) => ({
    id: 'html',
    tab: <Icon name="html" />,
    contents: <HtmlEditor html={html} onChange={setHTML} />,
  })
  render() {
    const { page } = this.props

    if (page.loading) return <div className="article page loading" />

    return (
      <div className="article page">
        <header className="title">
          {page.displayName}
          <Favorite value={page.isFavorite} onToggle={page.toggleFavorite} />
        </header>
        <div className="contents">
          <TabSet
            activeTabId={this.state.activeTabId}
            onTabClicked={this.handleTabClicked}
            showTabs={page.data.characterData || !page.readonly}
            tabs={[
              this.readerTab(page),
              this.sheetTab(page),
              !page.readonly && this.editorTab(page),
              !page.readonly && this.htmlTab(page),
            ].filter(Boolean)}
          />
        </div>
        <TagBar
          onChange={page.setTags}
          onRemove={page.removeTag}
          readonly={page.readonly}
          tags={page.tags}
        />
      </div>
    )
  }
}
// if (!this.props.readonly && window.tinyMCE) {
//   tabs.push({
//     key: 'edit',
//     className: 'right',
//     caption: <Icon key="icon" name="edit" />,
//     contents: [
//       <Editable
//         key="title"
//         className="title-editor"
//         onChange={title => this.setState({ title })}
//         placeholder="Page Title"
//         value={this.state.title || this.props.title}
//       />,
//       <TinyMCE
//         key="editor"
//         config={this.editorConfig}
//         onClick={interceptEditorLinks}
//         content={this.state.html || this.props.html}
//       />,
//     ],
//   })
// }
