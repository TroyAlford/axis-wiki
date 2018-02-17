import JsxParser from 'react-jsx-parser'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import ArticleChildren from '@components/ArticleChildren'
import Editable from '@components/Editable'
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
  state = { activeTabId: 'sheet' };

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
  deleteArticleButton = () => (
    <button className="danger" onClick={this.props.page.delete}>Delete</button>
  )
  saveButton = () => (
    <button className="icon-save" onClick={this.props.page.save}>Save</button>
  )

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
  sheetTab = ({ data, readonly }) => {
    const { characterData: sheet } = data
    if (!sheet) return null

    return {
      id: 'sheet',
      tab: (
        <Tab
          caption="Sheet"
          icon="sheet"
          onRemoveClick={data.removeCharacterData}
          removable={!readonly}
        />
      ),
      contents: (
        <Sheet
          character={sheet.toJSON()}
          onChange={data.setCharacterData}
          readonly={readonly}
        />
      ),
    }
  }
  renderButtons = () => {
    const { page, viewport } = this.props
    const { activeTabId } = this.state

    return (
      <Fragment>
        {!page.data.characterData && this.addSheetButton()}
        {(!viewport.isSmall || activeTabId === 'sheet') && this.saveButton()}
        {page.privileges.includes('admin') && this.deleteArticleButton()}
      </Fragment>
    )
  }

  render() {
    const { page } = this.props
    const hideTagBar = !page.tags.length && page.readonly

    if (page.loading) return <div className="article page loading" />

    const classes = [
      'article page',
      hideTagBar ? 'no-tagbar' : '',
      page.readonly ? 'readonly' : '',
    ].filter(Boolean).join(' ')

    return (
      <div className={classes}>
        <header className="title">
          {<Editable value={page.displayName} onChange={page.setTitle} readonly={page.readonly} />}
          {!page.readonly && <Favorite value={page.isFavorite} onToggle={page.toggleFavorite} />}
        </header>
        <div className="contents">
          <TabSet
            activeTabId={this.state.activeTabId}
            onTabClicked={this.handleTabClicked}
            showTabs={page.data.characterData || !page.readonly}
            buttons={!page.readonly && this.renderButtons()}
            tabs={[
              this.readerTab(page),
              this.sheetTab(page),
              !page.readonly && this.editorTab(page),
              !page.readonly && this.htmlTab(page),
            ].filter(Boolean)}
          />
        </div>
        {hideTagBar ||
          <TagBar
            onChange={page.setTags}
            onRemove={page.removeTag}
            readonly={page.readonly}
            tags={page.tags}
          />
        }
      </div>
    )
  }
}
