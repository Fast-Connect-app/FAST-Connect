import { Component } from "react";
import SideBarDrawer from "./SideBar-Drawer";

class SideBar extends Component {
  render() {
    // Define the width once
    const drawerWidth = {
      xs: "60px", // small screen
      sm: "60px", // small medium screen
      md: "60px", // medium screens and up
      lg: "6vw", // large screens and up
      xl: "6vw", // desktop screen
    };

    return (
      <SideBarDrawer
        open={true}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth, // Use the same width for the drawer
          overflowY: "hidden",
          "& .MuiDrawer-paper": {
            width: drawerWidth, // Reuse the same width for MuiDrawer-paper
          },
        }}
      />
    );
  }
}

export default SideBar;
