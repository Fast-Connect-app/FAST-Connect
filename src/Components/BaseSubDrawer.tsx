import React, { Component } from "react";
import { Drawer, Box, Button, DrawerProps } from "@mui/material";
import styles from "./BaseSubDrawer.module.css"; // Import CSS module

export interface BaseSubDrawerProps extends DrawerProps {
  sidebarWidth: number | string | object; // Width of the sidebar to adjust the position
  handleMenuSelect: (route: string) => void;
  route: string;
}

abstract class BaseSubDrawer extends Component<BaseSubDrawerProps> {
  abstract renderContent(): React.ReactNode;

  render() {
    const {
      open,
      onClose,
      sx,
      variant,
      anchor = "left",
      route,
      handleMenuSelect,
    } = this.props;
    return (
      <Drawer
        open={open}
        onClose={onClose}
        sx={sx}
        variant={variant}
        anchor={anchor} // Automatically handle the positioning
        PaperProps={{
          className: styles.subDrawerPaper,
          onMouseEnter: this.props.onMouseEnter, // Attach onMouseEnter here
          onMouseLeave: this.props.onMouseLeave, // Attach onMouseLeave here
        }}
      >
        <Box className={styles.subDrawerContent}>
          <Box sx={{ flexGrow: 1 }}>
            {this.renderContent()} {/* Render the content from BaseDrawer */}
          </Box>
          <Button
            onClick={() => {
              handleMenuSelect(route); // Navigate to the selected route
              if (onClose) onClose({}, "backdropClick"); // Close the Drawer
            }}
            fullWidth
          >
            ShowMeMore
          </Button>
        </Box>
      </Drawer>
    );
  }
}

export default BaseSubDrawer;
