import React from "react";
import { Drawer, Box } from "@mui/material";
import { BaseDrawerProps } from "./BaseDrawer";
import BaseDrawer from "./BaseDrawer";

abstract class BaseSubDrawer extends BaseDrawer<BaseDrawerProps> {
  static defaultProps = {
    ...BaseDrawer.defaultProps,
    sx: {
      width: 240, // Set subdrawer width
      zIndex: 1300, // Ensure it's above the sidebar
    },
    variant: "persistent" as "persistent",
  };

  render() {
    const { isOpen, onClose, sx, anchor = "left", ...restProps } = this.props;

    return (
      <Drawer
        {...restProps}
        open={isOpen}
        onClose={onClose}
        sx={{
          ...sx, // Spread the sx prop to include other default styles
          zIndex: 1300, // Ensure it's above the sidebar
        }}
        PaperProps={{
          sx: {
            left: 100,
            width: "30vw",
            outline: "2px solid black",
            background: "rgba(255,255,255,0.2)",
          },
        }}
        anchor={anchor} // Let the Drawer component handle the anchor prop positioning automatically
      >
        <Box
          sx={{
            marginTop: 2,
            overflowY: "auto",
            height: "100%", // Ensure the content stretches to fill the height
            padding: 2,
          }}
        >
          {this.renderContent()}{" "}
          {/* This will call the renderContent method from BaseDrawer */}
        </Box>
      </Drawer>
    );
  }
}

export default BaseSubDrawer;
