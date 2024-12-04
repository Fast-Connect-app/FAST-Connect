import React, { Component } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

type Message = {
  text: string;
  avatar: string;
  isUserMessage: boolean;
};
interface GlobalChatState {
  messages: Message[];
  newMessage: string;
}

class GlobalChat extends Component<{}, GlobalChatState> {
  state: GlobalChatState = {
    messages: [], // Start with an empty list of messages
    newMessage: "", // No initial input message
  };
  handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSendMessage = () => {
    const { newMessage, messages } = this.state;
    if (newMessage.trim() !== "") {
      this.setState({
        messages: [
          ...messages,
          {
            text: newMessage,
            avatar: "U", // Example avatar for user
            isUserMessage: true,
          },
        ],
        newMessage: "",
      });
    }
  };
  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      this.handleSendMessage();
      event.preventDefault(); // Prevents any unintended behavior like form submission
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
        width="100%"
        sx={{
          maxWidth: "100%",
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        <Paper
          style={{
            width: "100%",
            height: "90%",
            overflowY: "auto",
            backgroundColor: "var(--background-color)",
          }}
        >
          <Typography variant="h6" align="center" sx={{ padding: "10px 0", color : "white" }}> Global Chat </Typography>
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  padding: "0px 16px", // Reduce overall padding
                  alignItems: "center", // Align items vertically
                  gap: 0,
                  color : "white",
                  justifyContent: message.isUserMessage
                    ? "flex-end"
                    : "flex-start", // Align based on user message flag
                }}
              >
                <Avatar
                  sx={{
                    width: 28, // Adjust the width of the avatar
                    height: 28, // Adjust the height of the avatar
                    fontSize: "0.75rem", // Adjust font size inside the avatar
                    marginRight: message.isUserMessage ? 0 : 2, // Adjust margin for user message
                    marginLeft: message.isUserMessage ? 2 : 0, // Adjust margin for other messages
                  }}
                >
                  {message.avatar}
                </Avatar>

                <ListItemText
                  sx={{
                    textAlign: message.isUserMessage ? "right" : "left", // Align text based on sender
                  }}
                  primary={message.text}
                />
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
            onKeyDown={this.handleKeyPress}
            fullWidth
            sx={{
              marginLeft: "10px",
              "& .MuiInputBase-root": {
                height: 32, // Set height for consistency
                display: "flex",
                alignItems: "center", // Ensure content is vertically aligned
                padding: "4px 6px", // Reduce padding for a compact look
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem", // Adjust label font size
                top: "-10px", // Shift the label upward
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)", // Ensure consistent outline color
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSendMessage}
            sx={{
              height: 32,
              fontSize: "0.75rem",
              padding: "6px 10px",
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
