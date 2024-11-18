import { Component } from "react";
import SideBarDrawer from "./SideBar-Drawer";
import "./SideBarStyle.module.css";

class SideBar extends Component {
  render() {
    return (
      <SideBarDrawer
        isOpen={true}
        variant="permanent"
        anchor="left"
        sx={{
          overflowY: "hidden",
          "& .MuiDrawer-paper": {
            width: {
              xs: "60px", // small screen
              sm: "60px", // small medium screen
              md: "60px", // medium screens and up
              lg: "6vw", // 8vw on large screens and up
              xl: "6vw", // desktop screen
            },
          },
        }}
      />
    );
  }
}

export default SideBar;
