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

  addSheetButton = () => (
    <button className="icon-add" onClick={this.handleAddSheet}>Add Sheet</button>
  )
  saveButton = page => (
    <button className="icon-save" onClick={page.save}>Save</button>
  )

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
    if (!sheet) return null

    return {
      id: 'sheet',
      tab: <Tab caption="Sheet" icon="sheet" onRemoveClick={data.removeCharacterData} removable />,
      contents: <Sheet character={sheet.toJSON()} onChange={data.setCharacterData} />,
    }
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
            buttons={!page.readonly &&
              <Fragment>
                {!page.data.characterData && this.addSheetButton()}
                {this.saveButton(page)}
              </Fragment>
            }
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
