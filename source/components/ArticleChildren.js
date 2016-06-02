import ComponentBase      from '../application/ComponentBase'
import Icon               from './Icon';
import { Link }           from 'react-router';

export default class ArticleChildren extends ComponentBase {
  render() {
    let
      articles   = _.sortBy(this.props.articles),
      col_count  = this.props.columns || 4,
      columns    = [],
      col_size   = Math.ceil(articles.length / col_count),
      classes    = `column is-${Math.floor(12 / col_count)}`
    ;
    for (let i = 0; i < col_count; i++) {
      let
        first = i * col_size,
        last = (i * col_size) + col_size,
        list = articles.slice(first, last)
      ;
      columns[i] =
        <div key={i} className={classes}>{
          _.map(list, function(slug) {
            return (
              <div key={slug}>
                <Link to={`/page/${slug}`}>{_.startCase(slug)}</Link>
              </div>
            )
          })
        }</div>;
    }

    return (
      <div className={`tag-browser message is-info ${this.props.articles.length ? '' : 'is-hidden'}`}>
        <div className="message-header"><Icon name="tag" /> Child Articles:</div>
        <div className="columns message-body">{columns}</div>
      </div>
    );
  }
}