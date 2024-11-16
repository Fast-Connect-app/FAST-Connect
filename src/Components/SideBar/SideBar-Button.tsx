import React from 'react';
import AbstractButton, { AbstractButtonProps, AbstractButtonState } from '../AbstractButton';
import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import "./SideBarStyle.css"

interface NavButtonProps extends AbstractButtonProps {
  label: string;
  icon: React.ReactNode;
  to: string; // Route path for navigation
}

class NavButton extends AbstractButton<NavButtonProps, AbstractButtonState> {
  renderButton() {
    const { icon, label, to } = this.props;
    return (
      <Link to={to} className="navButtonLink">
        <span className="navButtonIcon">{icon}</span>
        <ListItemText primaryTypographyProps={{fontSize: '0.8vw'}} className="navButtonText">{label} </ListItemText>
      </Link>
    );
  }
}

export default NavButton;
