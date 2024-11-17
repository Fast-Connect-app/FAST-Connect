// BaseDrawer.tsx
import React, { Component } from "react";
import { Drawer, Box } from "@mui/material";

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  anchor?: "left" | "right";
  sx?: object;
  variant?: "temporary" | "persistent" | "permanent";
}

abstract class BaseDrawer<P = {}, S = {}> extends Component<
  BaseDrawerProps & P,
  S
> {
  abstract renderContent(): React.ReactNode;

  static defaultProps: Partial<BaseDrawerProps> = {
    isOpen: false,
    onClose: () => {},
  };

  render() {
    const { isOpen, onClose, anchor, sx, variant } = this.props;

    return (
      <Drawer
        variant={variant}
        anchor={anchor}
        open={isOpen}
        onClose={onClose}
        sx={sx}
      >
        {this.renderContent()}
      </Drawer>
    );
  }
}

export default BaseDrawer;
