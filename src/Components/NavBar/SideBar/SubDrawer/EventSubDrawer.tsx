import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import BaseSubDrawer from "../../../BaseSubDrawer";
import styles from "../SideBar-Button.module.css";

// List of random Event details for now
const randomEventDetails = [
  {
    name: "Tech Conference 2024",
    description: "A conference about the latest in tech.",
    venue: "Tech Center, San Francisco",
    host: "TechWorld Inc.",
  },
  {
    name: "Art Expo",
    description: "An exhibition showcasing modern art.",
    venue: "Art Gallery, New York",
    host: "Modern Art Society",
  },
  {
    name: "Music Festival",
    description: "A celebration of live music and performances.",
    venue: "City Park, Los Angeles",
    host: "Live Nation",
  },
];

interface EventSubDrawerState {
  Events: typeof randomEventDetails;
  openDialog: boolean; // To manage dialog visibility
  selectedEvent: (typeof randomEventDetails)[0] | null; // Selected Event details
}

class EventSubDrawer extends BaseSubDrawer {
  state: EventSubDrawerState = {
    Events: randomEventDetails,
    openDialog: false, // Initially dialog is closed
    selectedEvent: null, // No Event selected initially
  };

  handleEventClick = (index: number) => {
    const selectedEvent = this.state.Events[index];
    this.setState({
      openDialog: true, // Open dialog when a Event is clicked
      selectedEvent, // Set the selected Event
    });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedEvent: null }); // Close dialog
  };

  // Implement renderContent method for EventSubDrawer
  renderList() {
    const { Events } = this.state;

    return (
      <List>
        {Events.map((Event, index) => (
          <ListItem
            key={index}
            className={styles.sideButtonText}
            component="li"
          >
            <ListItemButton onClick={() => this.handleEventClick(index)}>
              <ListItemText primary={Event.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }

  renderContent() {
    const { openDialog, selectedEvent } = this.state;

    return (
      <>
        {/* Directly render the content of the Event list */}
        {this.renderList()}

        {/* Dialog for showing Event details */}
        <Dialog
          open={openDialog}
          onClose={this.handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedEvent?.name}</DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Box>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <p>
                  <strong>Host:</strong> {selectedEvent.host}
                </p>
                <p>
                  <strong>Venue:</strong> {selectedEvent.venue}
                </p>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default EventSubDrawer;
