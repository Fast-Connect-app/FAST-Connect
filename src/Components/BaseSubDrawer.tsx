import React from "react";
import { Drawer, Box } from "@mui/material";
import BaseDrawer, { BaseDrawerProps } from "./BaseDrawer";
import { Close } from "@mui/icons-material";
import styles from "./NavBar/SideBar/SideBarStyle.module.css"; // Import CSS module

interface BaseSubDrawerProps extends BaseDrawerProps {
  sidebarWidth: number | string | object; // Width of the sidebar to adjust the position
}

abstract class BaseSubDrawer extends BaseDrawer<BaseSubDrawerProps> {
  static defaultProps = {
    ...BaseDrawer.defaultProps,
    sx: {
      zIndex: 1300, // Ensure it's above the sidebar
    },
    variant: "persistent" as "persistent",
  };

  render() {
    const {
      isOpen,
      onClose,
      sx,
      anchor = "left",
      sidebarWidth,
      ...restProps
    } = this.props;

    return (
      <Drawer
        {...restProps}
        open={isOpen}
        onClose={onClose}
        sx={{
          ...sx, // Include other styles
        }}
        PaperProps={{
          className: `${styles.subDrawerPaper}`,
          sx: {
            marginLeft: "2px",
            ...(anchor === "left"
              ? { left: sidebarWidth }
              : { right: sidebarWidth }),
          },
        }}
        anchor={anchor} // Automatically handle the positioning
      >
        <Box className={styles.subDrawerContent}>
          <Box sx={{ flexGrow: 1 }}>
            {this.renderContent()} {/* Render the content from BaseDrawer */}
          </Box>
        </Box>
      </Drawer>
    );
  }
}

export default BaseSubDrawer;
