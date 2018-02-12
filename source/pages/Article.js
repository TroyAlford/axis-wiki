import JsxParser from 'react-jsx-parser'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import TinyMCE from 'react-tinymce'
import { isEqual } from 'lodash'
import { deleteArticle, saveArticle } from '../redux/page/actions-article'

import ArticleChildren from '../components/ArticleChildren'
import Editable from '../components/Editable'
import Favorite from '../components/Favorite'
import Icon from '../components/Icon'
import HtmlEditor from '../components/HtmlEditor'
import TabSet from '../components/TabSet'
import TagBar from '../components/TagBar'

import unboundEditorConfig from '../config/editor'

const { tinyMCE } = window
const JsxLink = ({ href, ...props }) => <Link to={href} {...props} />
JsxLink.displayName = 'JsxLink'

@observer export default class Article extends Component {
  static defaultProps = {
    page: {
      aliases: [],
      children: [],
      html: '',
      loading: false,
      readonly: true,
      tags: [],
      title: null,
    },
  }

  render() {
    const { page } = this.props

    if (page.loading) return <div className="article page loading" />

    return (
      <div className="article page">
        <header className="title">
          {page.displayName}
          <Favorite value={page.isFavorite} onToggle={page.toggleFavorite} />
        </header>
        <JsxParser
          components={{ a: JsxLink }}
          jsx={page.html || ''}
        />
        <ArticleChildren articles={page.children} />
      </div>
    )

    // const { template } = this.state.data || {}

    // if (template === 'character') {
    //   tabs.push({
    //     key: 'sheet',
    //     className: 'left',

    //     caption: [
    //       <Icon key="icon" name="sheet" />,
    //       <span key="text">Sheet</span>,
    //     ],
    //     contents: [
    //       <Sheet
    //         key="sheet"
    //         {...this.state.data}
    //         readonly={this.props.readonly}
    //         name={this.state.title || this.props.title}
    //         onChange={sheet => this.setState({
    //           data: {
    //             ...this.state.data,
    //             ...sheet,
    //           },
    //           title: sheet.name,
    //         })}
    //         ref={(self) => { this.sheet = self }}
    //       />,
    //     ],
    //   })
    // }

    // tabs.push({
    //   key: 'read',
    //   className: 'left',
    //   caption: [
    //     <Icon key="icon" name="read" />,
    //     <span key="text">Article</span>,
    //   ],
    //   contents: [
    //     <h1 key="title">
    //       <Favorite size="small" />
    //       {this.props.title}
    //     </h1>,
    //     <JsxParser key="viewer" jsx={this.props.html || ''} />,
    //     <ArticleChildren key="children" articles={this.props.children} />,
    //   ],
    // })

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

    // if (!this.props.readonly) {
    //   tabs.push({
    //     key: 'html',
    //     className: 'right',
    //     caption: <Icon key="icon" name="html" />,
    //     contents: <HtmlEditor
    //       html={this.state.html || this.props.html}
    //       onChange={html => this.setState({ html })}
    //       readonly={this.props.readonly}
    //     />,
    //   })
    // }

    // tabs.push({
    //   key: 'settings',
    //   className: 'right',
    //   caption: [
    //     <Icon key="icon" name="settings" />,
    //   ],
    //   contents: (
    //     <div className="settings">
    //       {this.props.readonly ? [] : [
    //         <h5 key="header">Template</h5>,
    //         <span key="dropdown" className="select">
    //           <select onChange={this.handleTemplateChange} value={this.state.data.template}>
    //             {[undefined, 'character', 'creature', 'world'].map(tmplName =>
    //               <option key={tmplName || 'undefined'} value={tmplName}>{tmplName}</option>)}
    //           </select>
    //         </span>,
    //       ]}
    //       <h5>Aliases</h5>
    //       <div className="callout-info">
    //         Each entry below is used as an alternate name / redirect for this page.
    //       </div>
    //       <TagBar
    //         className="aliases-editor tag-bar"
    //         tags={this.state.aliases || this.props.aliases || []}
    //         inputProps={{
    //           className: 'alias-tag tag-bar-input',
    //           placeholder: 'add alias',
    //         }}
    //         readonly={this.props.readonly}
    //         onChange={aliases => this.setState({ aliases })}
    //         onlyUnique
    //       />
    //       {this.props.readonly ? [] : [
    //         <h5 key="label">Danger</h5>,
    //         <button
    //           key="button"
    //           className="button is-danger"
    //           onClick={this.handleDelete}
    //         >Delete this Article
    //         </button>,
    //         <span key="warning" className="button-label">
    //           <i>Warning: This cannot be undone!</i>
    //         </span>,
    //       ]}
    //     </div>
    //   ),
    // })

    // return (
    //   <div className="article page">
    //     <TabSet
    //       tabs={tabs}
    //       active={this.state.tab}
    //       onTabClicked={this.handleTabClicked}
    //     />
    //     <div className="bottom-bar">
    //       <TagBar
    //         tags={this.state.tags || this.props.tags}
    //         readonly={this.props.readonly}
    //         onChange={tags => this.setState({ tags })}
    //         onlyUnique
    //       />
    //       {!this.props.readonly && this.dirty &&
    //         <div className="buttons">
    //           <button className="icon icon-save button is-success" onClick={this.handleSave}>
    //             Save
    //           </button>
    //           <button className="button is-link" onClick={this.handleReset}>
    //             Reset
    //           </button>
    //         </div>
    //       }
    //     </div>
    //   </div>
    // )
  }
}
