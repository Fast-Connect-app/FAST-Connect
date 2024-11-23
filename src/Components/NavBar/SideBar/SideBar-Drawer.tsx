import React, { Component } from "react";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  DrawerProps,
} from "@mui/material";
import NavButton from "./SideBar-Button";
import { navItems } from "./SideBarItems";
import styles from "./SideBar-Drawer.module.css"; // Import the CSS module or use a CSS file

interface SidebarDrawerState {
  openNestedDrawerIndex: number | null;
}

class SideBarDrawer extends Component<DrawerProps, SidebarDrawerState> {
  // static defaultProps: Partial<BaseDrawerProps> = {
  //   variant: "persistent",
  //   anchor: "left",
  //   sx: {
  //     width: 240,
  //     zIndex: 1300,
  //   },
  // };

  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      openNestedDrawerIndex: null,
    };
  }

  toggleNestedDrawer = (index: number | null) => () => {
    const newIndex = this.state.openNestedDrawerIndex === index ? null : index;
    this.setState({ openNestedDrawerIndex: newIndex });
  };

  renderContent() {
    const { openNestedDrawerIndex } = this.state;

    return (
      <Box className={styles.mainDrawerContent}>
        {/* Logo Section */}
        <Box className={styles.logoContainer}>
          <img src="your-logo.png" alt="Company Logo" />
        </Box>

        {/* Divider */}
        <Divider sx={{ marginBottom: 0 }} />

        {/* Navigation Items */}
        <List className={styles.sideList}>
          {navItems.map((item, index) => {
            const isActive = openNestedDrawerIndex === index;
            return (
              <ListItem key={index} disablePadding>
                <NavButton
                  label={item.label}
                  icon={item.icon}
                  onClick={this.toggleNestedDrawer(index)}
                  className={`${styles.listItemButton} ${
                    isActive ? styles.active : ""
                  }`}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  }

  render() {
    const { variant, anchor, open, sx } = this.props;
    const { openNestedDrawerIndex } = this.state;

    const SubDrawerComponent =
      openNestedDrawerIndex !== null &&
      navItems[openNestedDrawerIndex]?.BaseSubDrawer;

    const sidebarWidth =
      (
        sx as { ["& .MuiDrawer-paper"]?: { width?: string | number | object } }
      )?.["& .MuiDrawer-paper"]?.width ?? 240;

    return (
      <div style={{ width: "fit-content" }}>
        {/* Main Sidebar Drawer */}
        <Drawer variant={variant} anchor={anchor} open={open} sx={sx}>
          {this.renderContent()}
        </Drawer>

        {/* Subdrawer */}
        {SubDrawerComponent &&
          React.createElement(SubDrawerComponent, {
            open: true,
            onClose: this.toggleNestedDrawer(null),
            sidebarWidth, // Pass the dynamically extracted sidebar width
            variant: "persistent",
            sx: {
              marginLeft: sidebarWidth,
              width: "20vw", // Pass the width in sx
              "& .MuiDrawer-paper": {
                left: sidebarWidth,
                width: "20vw", // Reuse the same width for MuiDrawer-paper
              },
            },
          })}
      </div>
    );
  }
}

export default SideBarDrawer;
