import { browserHistory } from 'react-router'
import ComponentBase      from '../application/ComponentBase'
import Icon               from '../components/Icon'
import TabSet             from '../components/TabSet'
import Tag                from '../components/Tag'
import TagBrowser         from '../components/TagBrowser'
import TinyMCE            from 'react-tinymce'
import editor_config      from '../config/editor'
import XHR                from '../helpers/XHR'

import { connect }        from 'react-redux'

let tinyMCE = window.tinyMCE;

class Article extends ComponentBase {
  constructor(props) {
    super(props);
    this.state = {
      selected_tab: 0
    }
  }

  render() {
    return (
      <div className="article page">
        <TabSet
          active={this.state.selected_tab}
          tabs={[{
            className: 'read',
            caption: <Icon name="read" size="small" />,
            innerHTML: this.props.html
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
      </div>
    )
  }
}

export default connect(state => {
  return state.article;
})(Article);
