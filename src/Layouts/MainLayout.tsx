import React, { ReactNode } from "react";
import SideBar from "../Components/NavBar/SideBar/Sidebar/SideBar";
import Footer from "../Components/Footer";

// Define the type for props, where children is a required ReactNode
interface MainLayoutProps {
  children: ReactNode;
}

class MainLayout extends React.Component<MainLayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <>
        <SideBar />
        <div className="App">{children}</div>
        <Footer />
      </>
    );
  }
}

export default MainLayout;
