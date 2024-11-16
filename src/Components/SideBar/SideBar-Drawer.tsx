import { Box, Divider, List, ListItem } from '@mui/material';
import NavButton from './SideBar-Button';
import { navItems } from './SideBarItems';
import React from 'react';
import BaseDrawer, { BaseDrawerProps } from '../BaseDrawer';

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
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
          <img src="your-logo.png" alt="Company Logo" style={{ width: '100px' }} />
        </Box>
        <Divider sx={{ marginBottom: -2 }} />
        <List
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <NavButton
                label={item.label}
                icon={item.icon}
                to={item.path}
                onClick={() => {
                  this.toggleNestedDrawer(index)();
                }}
                className="listItemButton"
              />
              {this.state.openNestedDrawerIndex === index && item.BaseSubDrawer && (
                // Dynamically render the subdrawer component
                React.createElement(item.BaseSubDrawer, {
                  isOpen: this.state.openNestedDrawerIndex === index,
                  onClose: this.toggleNestedDrawer(null)
                })
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
}

export default SideBarDrawer;
