import _                  from 'lodash'
import { browserHistory } from 'react-router'
import ComponentBase      from '../application/ComponentBase'
import ArticleChildren    from '../components/ArticleChildren'
import Icon               from '../components/Icon'
import MenuButton         from '../components/MenuButton'
import MenuItem           from '../components/MenuItem'
import TabSet             from '../components/TabSet'
import TagsInput          from 'react-tagsinput'
import TinyMCE            from 'react-tinymce'
import editor_config      from '../config/editor'

import { connect }        from 'react-redux'
import { 
  loadArticle,
  loadedArticle 
}                         from '../actions/article'

const tinyMCE = window.tinyMCE;
const parser  = document.createElement('a');

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = this.default_state;

    this.isDirty = () => (
      !!this.state.aliases ||
      !!this.state.children ||
      !!this.state.data ||
      !!this.state.html ||
      !!this.state.tags
    );
  }

  componentWillReceiveProps(nextProps) {
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
    let slug = this.props.params.slug;
    XHR.delete(`/api/page/${slug}`, {
      done: response => {
        this.setState(this.default_state)
        this.props.dispatch(loadArticle(slug))
      }
    })
  }

  handleHtmlChange() {
    let html = '';
    switch (this.state.selected_tab) {
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
    this.setState({ html: html !== this.props.html ? html : null })
  }
  handleTabClicked(clicked) {
    if (this.state.selected_tab == clicked.index) return;

    this.handleHtmlChange();
    this.setState({ selected_tab: clicked.index })
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

  handleSave() {
    let { aliases, children, data, html, tags } = this.props;

    XHR.post('/api/page/' + this.props.params.slug, {
      data: {
        aliases: this.state.aliases || aliases,
        children: this.state.children || children,
        data: this.state.data || data,
        html: this.state.html || html,
        tags: this.state.tags || tags
      },
      success: (response) => {
        parser.href = response.url;
        let slug    = _(parser.pathname).split('/').last(),
            article = JSON.parse(response.message);

        this.props.dispatch(loadedArticle(slug, article))
        this.setState(this.default_state)
      },
      failure: function(response) {
        console.log('Save Error...', response);
      }
    });
  }

  render() {
    return (
      <div className="article page">
        <TabSet
          active={this.state.selected_tab}
          tabs={[{
            className: 'read',
            caption: <Icon name="read" size="small" />,
            contents: <div>
              <div dangerouslySetInnerHTML={{ __html: this.state.html || this.props.html }}></div>
              <ArticleChildren articles={this.props.children} />
            </div>
          }, {
            className: 'edit',
            caption: <Icon name="edit" size="small" />,
            contents: 
              <TinyMCE ref="tinymce"
                config={editor_config} 
                content={this.state.html || this.props.html}
                onChange={this.handleHtmlChange}
              />
          }, {
            className: 'html',
            caption: <Icon name="html" size="small" />,
            contents:
              <textarea ref="html"
                onChange={this.handleHtmlChange} 
                value={this.state.html || this.props.html}
              />
          }, {
            className: 'settings',
            caption: <Icon name="settings" size="small" />,
            contents:
              <div className="settings">
                <h5>Aliases:</h5>
                <div className="callout-info">Each entry below is used as an alternate name / redirect for this page.</div>
                <TagsInput
                  className="aliases-editor react-tagsinput"
                  value={this.state.aliases || this.props.aliases}
                  inputProps={{
                    className: 'alias-tag',
                    placeholder: 'add alias'
                  }}
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
        <TagsInput
          className="tags-editor react-tagsinput"
          value={this.state.tags || this.props.tags} 
          inputProps={{ 
            className: 'react-tagsinput-input', 
            placeholder: 'add tag'
          }}
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

export default connect(state => {
  return state.article;
})(Article);
