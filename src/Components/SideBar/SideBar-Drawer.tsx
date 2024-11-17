import { Drawer, Box, Divider, List, ListItem } from "@mui/material";
import NavButton from "./SideBar-Button";
import { navItems } from "./SideBarItems"; // Import navItems correctly
import React from "react";
import BaseDrawer, { BaseDrawerProps } from "../BaseDrawer";

interface SidebarDrawerState {
  openNestedDrawerIndex: number | null;
}

class SideBarDrawer extends BaseDrawer<{}, SidebarDrawerState> {
  constructor(props: BaseDrawerProps) {
    super(props);
    this.state = {
      openNestedDrawerIndex: null,
    };
  }

  toggleNestedDrawer = (index: number | null) => () => {
    this.setState({ openNestedDrawerIndex: index });
  };

  renderContent() {
    console.log(this.props);
    console.log(this.state);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingBottom: 2 }}
        >
          <img
            src="your-logo.png"
            alt="Company Logo"
            style={{ width: "100px" }}
          />
        </Box>
        <Divider sx={{ marginBottom: -2 }} />
        <List
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <NavButton
                label={item.label}
                icon={item.icon}
                onClick={this.toggleNestedDrawer(index)}
                className="listItemButton"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  render() {
    return (
      <>
        {/* Main Sidebar Drawer */}
        <Drawer
          variant={this.props.variant}
          anchor={this.props.anchor}
          open={this.props.isOpen}
          sx={this.props.sx}
        >
          {this.renderContent()}
        </Drawer>

        {/* Render Subdrawer Outside the Drawer */}
        {this.state.openNestedDrawerIndex !== null &&
          navItems[this.state.openNestedDrawerIndex]?.BaseSubDrawer &&
          React.createElement(
            navItems[this.state.openNestedDrawerIndex]
              .BaseSubDrawer as React.ComponentType<{
              isOpen: boolean;
              onClose: () => void;
            }>,
            { isOpen: true, onClose: this.toggleNestedDrawer(null) }
          )}
      </>
    );
  }
}

export default SideBarDrawer;
