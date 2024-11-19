import { Component } from "react";
import HeaderBar from "../Components/NavBar/HeaderBar/HeaderBar"; // Adjust import path if needed
import { Box } from "@mui/material";
import SideBar from "../Components/NavBar/SideBar/SideBar";
import GlobalChat from "../Components/NavBar/GlobalChatBar/GlobalChat";

class MainLayout extends Component {
  render() {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "6vw 1fr 15vw", // 3 columns (sidebar, content, header + global chat)
          gridTemplateRows: "auto 1fr", // Header and Global chat take auto height, content fills the remaining space
          gridTemplateAreas: `"sidebar content header" "sidebar content globalChat"`, // Layout areas
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* Sidebar */}
        <Box sx={{ gridArea: "sidebar", backgroundColor: "#f4f4f4" }}>
          <SideBar></SideBar>
        </Box>

        {/* Main Content */}
        <Box sx={{ gridArea: "content", overflowY: "auto", padding: 2 }}>
          <h2>Main Content Area</h2>
          <p>Your content goes here.</p>
        </Box>

        {/* Header */}
        <Box sx={{ gridArea: "header", backgroundColor: "#f0f0f0" }}>
          <HeaderBar />
        </Box>

        {/* Global Chat */}
        <Box sx={{ gridArea: "globalChat", backgroundColor: "#e1e1e1" }}>
          {/* <GlobalChat></GlobalChat> */}
          <GlobalChat></GlobalChat>
        </Box>
      </Box>
    );
  }
}

export default MainLayout;
