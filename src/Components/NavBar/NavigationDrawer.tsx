import React, { Component } from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';
import MenuButton from './Menu-button';

interface NavigationDrawerProps {
  isOpen: boolean;
  toggleDrawer: (isOpen: boolean) => () => void;
  navItems: { label: string; path: string }[];
}

// Define a wrapper for the Link component to make it compatible with ListItem
const ListItemLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

class NavigationDrawer extends Component<NavigationDrawerProps> {
  
  handleDrawerClose = () => {
    this.props.toggleDrawer(false)();
  };

  render() {
    const { isOpen, navItems } = this.props;

    return (
      <Drawer anchor="left" open={isOpen} onClose={this.handleDrawerClose}>
        <Box
          role="presentation"
          onClick={this.handleDrawerClose}
          onKeyDown={this.handleDrawerClose}
          sx={{ width: 250 }}
        >
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={ListItemLink}
                  to={item.path}
                  onClick={this.handleDrawerClose}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    );
  }
}

export default NavigationDrawer;
