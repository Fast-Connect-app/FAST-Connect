// BaseDrawer.tsx
import React, { Component } from 'react';
import { Drawer, Box } from '@mui/material';

export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right';
  sx?: object;
  variant?: 'temporary' | 'persistent' | 'permanent';
}

abstract class BaseDrawer<P = {}, S = {}> extends Component<BaseDrawerProps & P, S> {
  abstract renderContent(): React.ReactNode;

  static defaultProps: Partial<BaseDrawerProps> = {
    isOpen: false,
    onClose: () => {},
    anchor: 'left',
    variant: 'temporary'
  };

  render() {
    const { isOpen, onClose, anchor = 'left',sx ,variant} = this.props;

    return (
      <Drawer
        variant={variant}
        anchor={anchor}
        open={isOpen}
        onClose={onClose}
        sx={sx}
      >
        <Box sx={{marginTop:2, overflowY:'hidden'}}>{this.renderContent()}</Box>
      </Drawer>
    );
  }
}

export default BaseDrawer;
