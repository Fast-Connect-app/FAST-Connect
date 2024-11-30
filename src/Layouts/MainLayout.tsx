import React, { Component, ReactNode } from "react";
import HeaderBar from "../Components/NavBar/HeaderBar/HeaderBar"; // Adjust import path if needed
import { Box } from "@mui/material";
import SideBar from "../Components/NavBar/SideBar/SideBar";
import GlobalChat from "../Components/NavBar/GlobalChatBar/GlobalChat";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children?: ReactNode;
}

interface MainLayoutState {
  pageTitle: string;
}

export interface PageTitleContextType {
  setPageTitle: (title: string) => void;
}

export const PageTitleContext = React.createContext<
  PageTitleContextType | undefined
>(undefined);

class MainLayout extends Component<MainLayoutProps, MainLayoutState> {
  constructor(props: MainLayoutProps) {
    super(props);
    this.state = {
      pageTitle: "HomePage", // Default title
    };
  }

  setPageTitle = (title: string) => {
    this.setState({ pageTitle: title });
  };

  render() {
    return (
      <PageTitleContext.Provider value={{ setPageTitle: this.setPageTitle }}>
        <Box className={styles["main-layout"]}>
          {/* Sidebar */}
          <Box className={styles.sidebar}>
            <SideBar />
          </Box>

          {/* Main Content */}
          <Box className={styles.contentheader}>
            <h2>{this.state.pageTitle}</h2>
          </Box>
          <Box className={styles.content}>
            <Outlet context={{ setPageTitle: this.setPageTitle }} />
          </Box>

          {/* Header */}
          <Box className={styles.header}>
            <HeaderBar />
          </Box>

          {/* Global Chat */}
          <Box className={styles["global-chat"]}>
            <GlobalChat />
          </Box>
        </Box>
      </PageTitleContext.Provider>
    );
  }
}

export default MainLayout;
