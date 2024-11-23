import { Component, ReactNode } from "react";
import HeaderBar from "../Components/NavBar/HeaderBar/HeaderBar"; // Adjust import path if needed
import { Box } from "@mui/material";
import SideBar from "../Components/NavBar/SideBar/SideBar";
import GlobalChat from "../Components/NavBar/GlobalChatBar/GlobalChat";

interface MainLayoutProps {
  children?: ReactNode; // Define children as ReactNode (or JSX.Element if you expect only JSX)
}

class MainLayout extends Component<MainLayoutProps> {
  render() {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 20vw", // 3 columns (sidebar, content, header + global chat)
          gridTemplateRows: "10vh auto 1fr", // Header and Global chat take auto height, content fills the remaining space
          gridTemplateAreas: `"sidebar contentheader header" "sidebar contentheader globalChat" "sidebar content globalChat"`, // Layout areas
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            gridArea: "sidebar",
            border: "0.1px solid #ccc", // Outline for segregation
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
          }}
        >
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            gridArea: "contentheader",
            overflowY: "auto",
            padding: 2,
            textAlign: "left",
            backgroundColor: "black",
            border: "0.1px solid #ccc", // Outline for segregation
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
          }}
        >
          <h2>HomePage</h2>
        </Box>
        <Box
          sx={{
            gridArea: "content",
            overflowY: "auto",
            padding: 2,
            backgroundColor: "black",
            border: "0 solid #ccc", // Outline for segregation
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
          }}
        >
          {this.props.children}
        </Box>

        {/* Header */}
        <Box
          sx={{
            gridArea: "header",
            backgroundColor: "#f0f0f0",
            border: "0.1px solid #ccc", // Outline for segregation
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
          }}
        >
          <HeaderBar />
        </Box>

        {/* Global Chat */}
        <Box
          sx={{
            gridArea: "globalChat",
            backgroundColor: "#e1e1e1",
            border: "0.1px solid #ccc", // Outline for segregation
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
          }}
        >
          <GlobalChat />
        </Box>
      </Box>
    );
  }
}

export default MainLayout;
