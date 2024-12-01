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
import { withMenuNavigation } from "../../../router";
import styles from "./SideBar-Drawer.module.css";

interface SideBarDrawerProps extends DrawerProps {
  handleMenuSelect: (route: string) => void;
}

interface SidebarDrawerState {
  openNestedDrawerIndex: number | null;
  hoverTimeout: NodeJS.Timeout | null; // Store timeout ID for hover
  isSidebarHovered: boolean; // Track if sidebar is being hovered
  isSubDrawerHovered: boolean; // Track if subdrawer is being hovered
}

class SideBarDrawer extends Component<SideBarDrawerProps, SidebarDrawerState> {
  constructor(props: SideBarDrawerProps) {
    super(props);
    this.state = {
      openNestedDrawerIndex: null,
      hoverTimeout: null,
      isSidebarHovered: false,
      isSubDrawerHovered: false,
    };
  }

  // Handle hover on sidebar items (opens subdrawer after delay)
  handleHover = (index: number | null) => () => {
    if (this.state.hoverTimeout) {
      clearTimeout(this.state.hoverTimeout); // Clear any existing timeout
    }

    const hoverTimeout = setTimeout(() => {
      // Open subdrawer only if the sidebar is still hovered
      if (this.state.isSidebarHovered) {
        this.setState({ openNestedDrawerIndex: index });
      }
    }, 1000); // Delay for 0.5 seconds

    this.setState({ hoverTimeout, isSidebarHovered: true });
  };

  // Handle mouse leave for sidebar (initiates closing of subdrawer with delay)
  handleMouseLeaveSidebar = () => {
    console.log("Mouse left the sidebar");

    // Clear hover timeout
    if (this.state.hoverTimeout) {
      clearTimeout(this.state.hoverTimeout);
    }

    // Reset hover states and close subdrawer if necessary
    this.setState({ isSidebarHovered: false });

    const hoverTimeout = setTimeout(() => {
      if (!this.state.isSubDrawerHovered) {
        this.setState({ openNestedDrawerIndex: null });
      }
    }, 500); // Delay for closing
    this.setState({ hoverTimeout });
  };

  // Handle mouse enter and leave for subdrawer
  handleMouseEnterSubDrawer = () => {
    console.log("inside the subbar");
    // Clear any hover timeout when mouse enters subdrawer
    if (this.state.hoverTimeout) {
      clearTimeout(this.state.hoverTimeout);
    }

    this.setState({ isSubDrawerHovered: true });
  };

  handleMouseLeaveSubDrawer = () => {
    console.log("Mouse left the subdrawer");

    // Set hover state to false
    this.setState({ isSubDrawerHovered: false });

    // Delay closing to account for hover transitions
    const hoverTimeout = setTimeout(() => {
      if (!this.state.isSidebarHovered) {
        this.setState({ openNestedDrawerIndex: null });
      }
    }, 500); // Delay before closing

    this.setState({ hoverTimeout });
  };

  renderContent() {
    const { openNestedDrawerIndex } = this.state;

    return (
      <Box
        className={styles.mainDrawerContent}
        onMouseLeave={this.handleMouseLeaveSidebar} // Detect when the mouse leaves the main drawer area
      >
        {/* Logo Section */}
        <Box className={styles.logoContainer}>
          <img src="vite.svg" alt="Company Logo" />
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
                  onClick={() => this.props.handleMenuSelect(item.route)} // onClick to open drawer
                  onMouseEnter={this.handleHover(index)} // onHover to open drawer after delay
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

    const route: string =
      openNestedDrawerIndex !== null
        ? navItems[openNestedDrawerIndex]?.route
        : "/";

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
          React.createElement(withMenuNavigation(SubDrawerComponent), {
            open: true,
            route: route,
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
            onMouseEnter: this.handleMouseEnterSubDrawer, // Make sure mouse enter works for subdrawer
            onMouseLeave: this.handleMouseLeaveSubDrawer, // Make sure mouse leave works for subdrawer as well
          })}
      </div>
    );
  }
}

export default withMenuNavigation(SideBarDrawer);
