import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NavigationDrawer from './NavigationDrawer';
import { navItems } from './NavItems';
import MenuButton from './Menu-button';

interface NavbarProps {}

interface NavbarState {
  isDrawerOpen: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  toggleDrawer = (isOpen: boolean) => () => {
    this.setState({ isDrawerOpen: isOpen });
  };

  render() {
    const { isDrawerOpen } = this.state;
    const appBarHeight = 64;
    
    return (
      <>
        <AppBar position="fixed" sx={{ height: appBarHeight }}>
          <Toolbar>
          <MenuButton onClick={this.toggleDrawer(true)} />
            <Typography variant="h6"sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>FAST Connect</Typography>
          </Toolbar>
        </AppBar>

        <NavigationDrawer
          isOpen={isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
          navItems={navItems}
        />
      </>
    );
  }
}

export default Navbar;
