import _                  from 'lodash'
import { browserHistory } from 'react-router'
import ComponentBase      from '../application/ComponentBase'
import ArticleChildren    from '../components/ArticleChildren'
import Icon               from '../components/Icon'
import TabSet             from '../components/TabSet'
import TagsInput          from 'react-tagsinput'
import TinyMCE            from 'react-tinymce'
import editor_config      from '../config/editor'

import { loadArticle }    from '../actions/article'

import { connect }        from 'react-redux'

let tinyMCE = window.tinyMCE;

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = {
      selected_tab: 0  
    }
    this.isDirty = () => (
      !!this.state.html ||
      !!this.state.tags ||
      !!this.state.children
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.slug !== nextProps.params.slug)
      this.props.dispatch(loadArticle(nextProps.params.slug));
  }

  handleSourceChange() {

  }
  handleTagChange(tags) {
    this.setState({ tags: _.sortBy(tags) });
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
              <div dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
              <ArticleChildren articles={this.props.children} />
            </div>
          }, {
            className: 'edit',
            caption: <Icon name="edit" size="small" />,
            contents: <TinyMCE config={editor_config} content={this.props.html} />
          }, {
            className: 'html',
            caption: <Icon name="html" size="small" />,
            contents: 
              <textarea 
                onChange={this.handleSourceChange} 
                value={this.props.html}
              />
          }]}
          tabClicked={clicked => this.setState({ selected_tab: clicked.index })}
        />
        <TagsInput 
          value={this.state.tags || this.props.tags} 
          inputProps={{ 
            className: 'react-tagsinput-input', 
            placeholder: 'add tag'
          }}
          onChange={this.handleTagChange} 
          onlyUnique={true}
        />
        {this.isDirty()
         ? <a className="save button is-success">
             <Icon name="save" size="small" /><span>Save</span>
           </a>
         : ''}
      </div>
    )
  }
}

export default connect(state => {
  return state.article;
})(Article);
