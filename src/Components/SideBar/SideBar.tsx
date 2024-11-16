import React, { Component } from 'react';
import SideBarDrawer from './SideBar-Drawer';
import './SideBarStyle.css';

class SideBar extends Component {
  
  render() {
    return (
      <SideBarDrawer
        isOpen={true}
        variant="permanent"
        sx={{
          overflowY: 'hidden',
          '& .MuiDrawer-paper': {
            width: {
              md: '6vw',  // 6vw on medium screens and up
              lg: '8vw',  // 8vw on large screens and up
            },
          },
        }}
      />
    );
  }
}

export default SideBar;
