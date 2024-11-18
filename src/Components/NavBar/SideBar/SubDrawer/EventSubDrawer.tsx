import { ReactNode } from "react";
import { List, ListItem } from "@mui/material";
import BaseSubDrawer from "../../../BaseSubDrawer";

class EventSubDrawer extends BaseSubDrawer {
  renderContent() {
    return (
      <>
        <ListItem>Sub-Item 1</ListItem>
        <ListItem>Sub-Item 2</ListItem>
        <ListItem>Sub-Item 3</ListItem>
      </>
    );
  }
}

export default EventSubDrawer;
