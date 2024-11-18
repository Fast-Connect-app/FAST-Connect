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
              xs: "1vw",
              sm: "2vw",
              md: "4vw", // 6vw on medium screens and up
              lg: "6vw", // 8vw on large screens and up
              xl: "10vw",
            },
          },
        }}
      />
    );
  }
}

export default SideBar;
