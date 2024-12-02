// HeaderBar.tsx
import React, { Component } from "react";
import { Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./HeaderBar.module.css";
import { withMenuNavigation } from "../../../router";

// Define props interface to include handleMenuSelect
interface HeaderBarProps {
  handleMenuSelect: (route: string) => void; // This is the function to navigate
  name: string;
  picURL: string;
}

interface HeaderBarState {
  anchorEl: HTMLElement | null; //
}

class HeaderBar extends Component<HeaderBarProps, HeaderBarState> {
  constructor(props: HeaderBarProps) {
    super(props);
    this.state= {
      anchorEl: null,
    };
  }
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
    const { handleMenuSelect,name,picURL } = this.props; // Access handleMenuSelect passed through props
    return (
      <div className={styles["header-bar"]}>
        {/* Profile section */}
        <Box className={styles["header-bar-box"]}>
          <Avatar
            alt={name}
            src={picURL}
            onClick={this.handleMenuClick}
            className={styles["header-bar-avatar"]}
          />
          <Typography
          
          onClick={this.handleMenuClick} 
          className={styles["header-bar-username"]}>
            {name}
          
          </Typography>
        </Box>

        {/* Menu for Profile, Settings, and Logout */}
        <Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              this.handleMenuClose();
              handleMenuSelect("/Profile"); // Use handleMenuSelect from props
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
        </Box>
      </div>
    );
  }
}

const EnhancedHeaderBar = withMenuNavigation(HeaderBar);
export default EnhancedHeaderBar;
