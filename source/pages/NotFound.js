import ComponentBase from '../application/ComponentBase'
import Message       from '../components/Message'

export default class NotFound extends ComponentBase {
  render() {
    const parts = window.location.pathname.split('/'),
          slug = parts[parts.length - 1],
          url  = `/page/${slug}`

  	return (
      <div className="not-found page">
        <Message title="404">
          <p className="is-centered">
            Whoops, how'd you get here? Are you looking for <a href={url}>{url}</a>?
          </p>
        </Message>
      </div>
    );
  }
}
