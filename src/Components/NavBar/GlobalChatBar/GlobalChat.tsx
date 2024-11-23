import React, { Component } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

class GlobalChat extends Component {
  state = {
    messages: ["Welcome to the Global Chat!"], // Example initial messages
    newMessage: "",
  };

  handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSendMessage = () => {
    const { newMessage, messages } = this.state;
    if (newMessage.trim() !== "") {
      this.setState({
        messages: [...messages, newMessage],
        newMessage: "", // Clear input after sending
      });
    }
  };

  render() {
    const { messages, newMessage } = this.state;

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        bgcolor="#f9f9f9"
        height="100%"
        width="100%" // Ensures it fills the allocated width in the grid
        sx={{
          maxWidth: "100%", // Ensure no overflow
          marginLeft: 0, // Remove left margin
          marginRight: 0, // Remove right margin
        }}
      >
        <Paper
          style={{
            width: "100%", // Ensures it respects the container width
            height: "90%",
            overflowY: "auto",
          }}
        >
          <h4>Global Chat</h4>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box
          display="flex"
          width="100%"
          gap="10px"
          height="20%"
          alignItems="center"
        >
          <TextField
            label="Type your message"
            variant="outlined"
            value={newMessage}
            onChange={this.handleMessageChange}
            fullWidth
            sx={{
              marginLeft: "10px",
              height: 32, // Further reduce the height of the text field
              "& .MuiInputBase-root": {
                height: "100%", // Ensures that the input field height is consistent
                padding: "4px 6px", // Reduce the padding inside the input field
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem", // Smaller label font
              },
            }}
            InputLabelProps={{
              shrink: true, // Force the label to remain above the text field
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSendMessage}
            sx={{
              height: 32, // Reduce button height to match the text field
              fontSize: "0.75rem", // Smaller font size for the button
              padding: "6px 10px", // Reduce padding to make the button smaller
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  }
}

export default GlobalChat;
