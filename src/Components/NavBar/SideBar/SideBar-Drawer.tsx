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
  hoverTimeout: NodeJS.Timeout | null;
  isSidebarHovered: boolean;
  isSubDrawerHovered: boolean;
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

  // Manage hover events for main sidebar
  handleSidebarHover = (index: number | null) => () => {
    const { hoverTimeout } = this.state;

    // Clear existing hover timeout
    if (hoverTimeout) clearTimeout(hoverTimeout);

    const newTimeout = setTimeout(() => {
      if (this.state.isSidebarHovered) {
        this.setState({ openNestedDrawerIndex: index });
      }
    }, 1000); // Hover delay for subdrawer opening

    this.setState({ hoverTimeout: newTimeout, isSidebarHovered: true });
  };

  handleSidebarMouseLeave = () => {
    const { hoverTimeout } = this.state;

    if (hoverTimeout) clearTimeout(hoverTimeout);

    const newTimeout = setTimeout(() => {
      if (!this.state.isSubDrawerHovered) {
        this.setState({ openNestedDrawerIndex: null });
      }
    }, 500); // Delay before subdrawer closes

    this.setState({ isSidebarHovered: false, hoverTimeout: newTimeout });
  };

  // Manage hover events for subdrawer
  handleSubDrawerHover = (isEntering: boolean) => () => {
    const { hoverTimeout } = this.state;

    if (hoverTimeout) clearTimeout(hoverTimeout);

    this.setState({ isSubDrawerHovered: isEntering });

    if (!isEntering) {
      const newTimeout = setTimeout(() => {
        if (!this.state.isSidebarHovered) {
          this.setState({ openNestedDrawerIndex: null });
        }
      }, 500); // Delay before subdrawer closes
      this.setState({ hoverTimeout: newTimeout });
    }
  };

  // Render navigation items
  renderNavItems() {
    const { handleMenuSelect } = this.props;
    const { openNestedDrawerIndex } = this.state;

    return (
      <List className={styles.sideList}>
        {navItems.map((item, index) => {
          const isActive = openNestedDrawerIndex === index;

          return (
            <ListItem key={index} disablePadding>
              <NavButton
                label={item.label}
                icon={item.icon}
                onClick={() => handleMenuSelect(item.route)}
                onMouseEnter={this.handleSidebarHover(index)}
                className={`${styles.listItemButton} ${
                  isActive ? styles.active : ""
                }`}
              />
            </ListItem>
          );
        })}
      </List>
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

    const subDrawerRoute =
      openNestedDrawerIndex !== null
        ? navItems[openNestedDrawerIndex]?.route
        : "/";

    return (
      <div style={{ width: "fit-content" }}>
        {/* Main Sidebar */}
        <Drawer
          variant={variant}
          anchor={anchor}
          open={open}
          sx={sx}
          onMouseLeave={this.handleSidebarMouseLeave}
        >
          <Box className={styles.mainDrawerContent}>
            <Box className={styles.logoContainer}>
              <img src="vite.svg" alt="Company Logo" />
            </Box>
            <Divider sx={{ marginBottom: 0 }} />
            {this.renderNavItems()}
          </Box>
        </Drawer>

        {/* Subdrawer */}
        {SubDrawerComponent &&
          React.createElement(withMenuNavigation(SubDrawerComponent), {
            open: true,
            route: subDrawerRoute,
            sidebarWidth,
            variant: "persistent",
            sx: {
              marginLeft: sidebarWidth,
              width: "20vw",
              "& .MuiDrawer-paper": {
                left: sidebarWidth,
                width: "20vw",
              },
            },
            onMouseEnter: this.handleSubDrawerHover(true),
            onMouseLeave: this.handleSubDrawerHover(false),
          })}
      </div>
    );
  }
}

export default withMenuNavigation(SideBarDrawer);
