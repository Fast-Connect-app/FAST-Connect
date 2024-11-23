import React, { Component } from "react";
import { Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./HeaderBar.module.css";

class HeaderBar extends Component {
  state = {
    anchorEl: null, // Used to anchor the menu
  };

  handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget }); // Open the menu on click
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null }); // Close the menu
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div
        // style={{
        //   top: 0,
        //   height: "100%",
        //   background: "black",
        // }}
        className={styles["header-bar"]}
      >
        {/* Profile section */}
        <Box
          // display="flex"
          // alignItems="center"
          // paddingLeft="20px"
          // height="100%"
          className={styles["header-bar-box"]}
        >
          <Avatar
            alt="User Profile"
            src="https://www.w3schools.com/w3images/avatar2.png" // Placeholder image URL
            onClick={this.handleMenuClick}
            className={styles["header-bar-avatar"]}
          />
          <Typography className={styles["header-bar-username"]}>
            John Doe {/* Replace with dynamic username */}
          </Typography>
        </Box>

        {/* Menu for Profile, Settings, and Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default HeaderBar;
