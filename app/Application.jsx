import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='application'>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('application'));