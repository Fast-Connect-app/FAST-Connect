import React from "react";
import AbstractButton, {
  AbstractButtonProps,
  AbstractButtonState,
} from "../../AbstractButton";
import { ListItemText } from "@mui/material";
import styles from "./SideBar-Button.module.css";

interface NavButtonProps extends AbstractButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void; // Action when button is clicked
}

class NavButton extends AbstractButton<NavButtonProps, AbstractButtonState> {
  renderButton() {
    const { icon, label, onClick } = this.props;
    return (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClick();
            }
          }}
        >
        <span className={styles.sideButtonIcon}>{icon}</span>
        <ListItemText
          primaryTypographyProps={{ fontSize: "0.8vw" }}
          className={styles.sideButtonText}
        >
          {label}
        </ListItemText>
      </div>
    );
  }
}

export default NavButton;
