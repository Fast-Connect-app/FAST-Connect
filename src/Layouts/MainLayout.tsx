import React, { ReactNode } from 'react';
import Navbar from '../Components/NavBar/NavBar';
import Footer from '../Components/Footer';

// Define the type for props, where children is a required ReactNode
interface MainLayoutProps {
  children: ReactNode;
}

class MainLayout extends React.Component<MainLayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <>
        <Navbar />
        <div className="App">
          {children}
        </div>
        <Footer />
      </>
    );
  }
}

export default MainLayout;
