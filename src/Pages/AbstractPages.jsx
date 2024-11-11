import React, { Component } from 'react';

class AbstractPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  // Abstract method to fetch data, implemented in subclasses.
  fetchData() {
    console.log("fetching data");
    throw new Error('fetchData method must be implemented by subclass');
  }

  componentDidMount() {
    if (!this.state.hasFetchedData) {
      this.fetchData();
    }
  }
  

  render() {
    const { data, error } = this.state;
    return (
      <div>
        
        {error && <p>Error: {error}</p>}
        {data ? this.renderContent() : <p>Loading...</p>}
      </div>
    );
  }
}

export default AbstractPage;
