import { ReactNode } from "react";
import { List, ListItem } from "@mui/material";
import BaseSubDrawer from "../../../BaseSubDrawer";
import styles from "../SideBarStyle.module.css";

class JobSubDrawer extends BaseSubDrawer {
  renderContent() {
    return (
      <>
        <ListItem className={styles.sideButtonText}>SubJob-Item 1</ListItem>
        <ListItem className={styles.sideButtonText}>SubJob-Item 2</ListItem>
        <ListItem className={styles.sideButtonText}>SubJob-Item 3</ListItem>
      </>
    );
  }
}

export default JobSubDrawer;
