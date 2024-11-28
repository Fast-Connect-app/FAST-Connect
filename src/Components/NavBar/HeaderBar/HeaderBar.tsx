// HeaderBar.tsx
import React, { Component } from "react";
import { Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./HeaderBar.module.css";
import { withMenuNavigation } from "../../../router";

// Define props interface to include handleMenuSelect
interface HeaderBarProps {
  handleMenuSelect: (route: string) => void; // This is the function to navigate
}

interface HeaderBarState {
  anchorEl: HTMLElement | null;
}

class HeaderBar extends Component<HeaderBarProps, HeaderBarState> {
  state: HeaderBarState = {
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
    const { handleMenuSelect } = this.props; // Access handleMenuSelect passed through props

    return (
      <div className={styles["header-bar"]}>
        {/* Profile section */}
        <Box className={styles["header-bar-box"]}>
          <Avatar
            alt="User Profile"
            src="https://www.w3schools.com/w3images/avatar2.png"
            onClick={this.handleMenuClick}
            className={styles["header-bar-avatar"]}
          />
          <Typography className={styles["header-bar-username"]}>
            John Doe
          </Typography>
        </Box>

        {/* Menu for Profile, Settings, and Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              this.handleMenuClose();
              handleMenuSelect("/profile"); // Use handleMenuSelect from props
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleMenuClose();
              handleMenuSelect("/"); // Use handleMenuSelect from props
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleMenuClose();
              handleMenuSelect("/"); // Use handleMenuSelect from props
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withMenuNavigation(HeaderBar);
