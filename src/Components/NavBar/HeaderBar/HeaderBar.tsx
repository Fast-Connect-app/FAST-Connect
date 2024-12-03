// HeaderBar.tsx
import React, { Component } from "react";
import { Box, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./HeaderBar.module.css";
import { withMenuNavigation } from "../../../router";
import { UserAuthentication } from "../../../../Backend/UserAuth/UserAuthentication";
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
    this.state = {
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

  async logoutUser(): Promise<void> {
    try {
      const userAuth: UserAuthentication = UserAuthentication.GetInstance();
      await userAuth.SignUserOut();
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw new Error("An unknown error occurred. Please try again.");
      }
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { handleMenuSelect, name, picURL } = this.props; // Access handleMenuSelect passed through props
    return (
      <div className={styles["header-bar"]}>
        {/* Profile section */}
        <Box className={styles["header-bar-box"]}>
          <Avatar alt={name} src={picURL} onClick={this.handleMenuClick} className={styles["header-bar-avatar"]} />
          <Typography onClick={this.handleMenuClick} className={styles["header-bar-username"]}>
            {name}
          </Typography>
        </Box>

        {/* Menu for Profile, Settings, and Logout */}
        <Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
            <MenuItem
              onClick={() => {
                this.handleMenuClose();
                handleMenuSelect("/ProfilePage"); // Use handleMenuSelect from props
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
              onClick={async () => {
                this.handleMenuClose();
                await this.logoutUser();
                handleMenuSelect("/Login"); // Use handleMenuSelect from props
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
