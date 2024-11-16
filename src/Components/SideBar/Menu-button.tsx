import React from 'react';
import { IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';
import './NavbarStyle.css'


class MenuButton extends AbstractButton{
  constructor(props: AbstractButtonProps) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  renderButton() {
    return <MenuIcon />;
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ isClicked: !this.state.isClicked });

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    return (
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={this.handleClick}
        disableRipple
        className='menuButton'
        {...this.props} // Pass any additional props
      >
        {this.renderButton()}
      </IconButton>
    );
  }
}

export default MenuButton;
