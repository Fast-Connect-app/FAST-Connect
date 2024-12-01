import React, { Component, ReactNode } from "react";
import HeaderBar from "../Components/NavBar/HeaderBar/HeaderBar";
import { Box, IconButton } from "@mui/material";
import SideBar from "../Components/NavBar/SideBar/SideBar";
import GlobalChat from "../Components/NavBar/GlobalChatBar/GlobalChat";
import { Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children?: ReactNode;
}

interface MainLayoutState {
  pageTitle: string;
  isChatOpen: boolean;
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
      pageTitle: "HomePage",
      isChatOpen: false, // Chat is initially closed
    };
  }

  setPageTitle = (title: string) => {
    this.setState({ pageTitle: title });
  };

  toggleChat = () => {
    this.setState((prevState) => ({ isChatOpen: !prevState.isChatOpen }));
  };

  render() {
    const { isChatOpen } = this.state;

    return (
      <PageTitleContext.Provider value={{ setPageTitle: this.setPageTitle }}>
        <Box
          className={`${styles["main-layout"]} ${
            isChatOpen
              ? styles["chat-open-layout"]
              : styles["chat-closed-layout"]
          }`}
        >
          {/* Sidebar */}
          <Box className={styles.sidebar}>
            <SideBar />
          </Box>

          {/* Content Header */}
          <Box className={styles.contentheader}>
            <h2>{this.state.pageTitle}</h2>
          </Box>

          {/* Main Content */}
          <Box
            className={styles.content}
            sx={{
              transition: "grid-column 0.3s ease", // Smooth transition for resizing
            }}
          >
            <Outlet context={{ setPageTitle: this.setPageTitle }} />
          </Box>

          {/* Header */}
          <Box className={styles.header}>
            <HeaderBar />
          </Box>

         
        </Box>
      </PageTitleContext.Provider>
    );
  }
}

export default MainLayout;
