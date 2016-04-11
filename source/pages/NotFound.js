import _             from 'lodash'
import ComponentBase from '../application/ComponentBase'
import Message       from '../components/Message'

export default class NotFound extends ComponentBase {
  render() {
    let pathname = `/page/${_(window.location.pathname.split('/')).last()}`,
        link     = <a href={pathname}>{pathname}</a>;
  	return (
      <div className="not-found page">
        <Message title="404">
          <p className="is-centered">
            Whoops, how'd you get here? Are you looking for {link}?
          </p>
        </Message>
      </div>
    );
  }
}