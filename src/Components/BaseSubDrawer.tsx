import React from 'react';
import { Drawer, Box } from '@mui/material';
import { BaseDrawerProps } from './BaseDrawer';
import BaseDrawer from './BaseDrawer';

abstract class BaseSubDrawer extends BaseDrawer<BaseDrawerProps> {
  static defaultProps = {
    ...BaseDrawer.defaultProps,
    sx: { width: 300 },  // Set a default width for subdrawer
    variant: 'temporary' as 'temporary', // Enforce 'temporary' variant for sub drawers
  };

  // Abstract method for the content specific to the sub drawer

  render() {
    const { isOpen, onClose, sx, ...restProps } = this.props; // Deconstruct props to get isOpen and onClose
    const subDrawerSx = {
      width: 300,  // Set your custom width for the subdrawer
      ...sx,  // Apply any additional sx overrides
    };

    return (
      <Drawer
        {...restProps}
        open={isOpen}   // Ensure open is set to isOpen
        onClose={onClose}
        sx={subDrawerSx}
      >
        {/* Wrap the content with a Box component */}
        <Box
          sx={{
            marginTop: 2,
            overflowY: 'auto',  // Make the content scrollable if it's too long
            height: '100%',  // Take full height inside the drawer
            padding: 2,  // Add some padding inside the Box
          }}
        >
          {this.renderContent()}
        </Box>
      </Drawer>
    );
  }
}

export default BaseSubDrawer;
