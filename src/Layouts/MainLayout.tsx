import { Component, ReactNode } from "react";
import HeaderBar from "../Components/NavBar/HeaderBar/HeaderBar"; // Adjust import path if needed
import { Box } from "@mui/material";
import SideBar from "../Components/NavBar/SideBar/SideBar";
import GlobalChat from "../Components/NavBar/GlobalChatBar/GlobalChat";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children?: ReactNode; // Define children as ReactNode (or JSX.Element if you expect only JSX)
}

class MainLayout extends Component<MainLayoutProps> {
  render() {
    return (
      <Box className={styles["main-layout"]}>
        {/* Sidebar */}
        <Box className={styles.sidebar}>
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box className={styles.contentheader}>
          <h2>HomePage</h2>
        </Box>
        <Box className={styles.content}>
          <Outlet />
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
    );
  }
}

export default MainLayout;
