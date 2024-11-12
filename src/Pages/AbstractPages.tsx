import React, { Component } from 'react';

// Define types for the state
interface AbstractPageState {
  data: any;  // Adjust this type depending on the structure of the data
  error: string | null;
}

// Abstract Props interface (for potential subclass props)
interface AbstractPageProps {
  // You can define common props for the abstract page here
  // For example:
  title?: string;
}

// Abstract class for the page components
abstract class AbstractPage<P extends AbstractPageProps = AbstractPageProps, S extends AbstractPageState=AbstractPageState> extends Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      data: null,
      error: null,
    } as S; // Ensures the state conforms to AbstractPageState
  }

  // Abstract method to fetch data, to be implemented in subclasses
  abstract fetchData(): void;

  componentDidMount() {
    this.fetchData()
  }

  renderContent(): JSX.Element {
    // This method will be implemented in subclasses
    return <div>Abstract content</div>;
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
