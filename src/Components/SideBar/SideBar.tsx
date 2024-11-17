import React, { Component } from "react";
import SideBarDrawer from "./SideBar-Drawer";
import "./SideBarStyle.css";
import EventSubDrawer from "./SubDrawer/EventSubDrawer";

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
              md: "2vw", // 6vw on medium screens and up
              lg: "6vw", // 8vw on large screens and up
            },
          },
        }}
      />
    );
  }
}

export default SideBar;
