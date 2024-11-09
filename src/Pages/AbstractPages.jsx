// AbstractPage.js
import React, { Component } from 'react';

class AbstractPage extends Component {
  // Abstract method: This must be implemented by the subclasses.
  renderContent() {
    throw new Error('renderContent method must be implemented by subclass');
  }

  render() {
    const { data, error } = this.props;

    return (
      <div>
        {error && <p>Error: {error}</p>}
        {data ? this.renderContent() : <p>Loading...</p>}
      </div>
    );
  }
}

export default AbstractPage;
