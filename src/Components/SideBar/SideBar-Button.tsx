import React from "react";
import AbstractButton, {
  AbstractButtonProps,
  AbstractButtonState,
} from "../AbstractButton";
import { ListItemText } from "@mui/material";
import "./SideBarStyle.css";

interface NavButtonProps extends AbstractButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void; // Action when button is clicked
}

class NavButton extends AbstractButton<NavButtonProps, AbstractButtonState> {
  renderButton() {
    const { icon, label, onClick } = this.props;
    return (
      <div onClick={onClick}>
        <span className="navButtonIcon">{icon}</span>
        <ListItemText
          primaryTypographyProps={{ fontSize: "0.8vw" }}
          className="navButtonText"
        >
          {label}
        </ListItemText>
      </div>
    );
  }
}

export default NavButton;
