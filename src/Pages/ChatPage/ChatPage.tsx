import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Send, Settings, Call, VideoCall } from "@mui/icons-material";
import AbstractPage, {AbstractPageState} from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";

// Mock chat data
const chatData = [
  {
    id: 1,
    name: "Abdullah",
    avatar: "",
    messages: [
      { id: 1, text: "Yo wassup lil dude", sender: "Abdullah", timestamp: "10:00 AM" },
      { id: 2, text: "Well that's the shit for giggles for sure", sender: "You", timestamp: "10:01 AM" },
      { id: 3, text: "Hey Did you just ......", sender: "Abdullah", timestamp: "10:02 AM" },
    ],
  },
  {
    id: 2,
    name: "Raif",
    avatar: "",
    messages: [
      { id: 1, text: "Hey, how's it going?", sender: "Raif", timestamp: "Yesterday, 9:00 PM" },
    ],
  },
  {
    id: 3,
    name: "Arham",
    avatar: "",
    messages: [{ id: 1, text: "Let's meet tomorrow!", sender: "Arham", timestamp: "Yesterday, 8:30 PM" }],
  },
];

interface Message{
    id: number;
    text: String;
    sender: String;
    timestamp: String;
}
interface Chat {
    id: number;
    name: string;
    avatar: string;
    messages: Message[]; 
}

interface ChatPageState extends AbstractPageState{
    selectedChat : Chat;
    messages: Message[];
    newMessage: String;
    chats: Chat[];
}
class ChatPage extends AbstractPage<{}, ChatPageState> {
  static contextType = PageTitleContext; // Correct contextType assignment

  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Chat Page");
  }

    constructor(props: {}) {
        super(props);
        this.state = {
        data: null,
        error: null,
        selectedChat: chatData[0],
        messages: chatData[0].messages,
        newMessage: "",
        chats: chatData,
        };
    }

  // Handler to switch chat
  handleChatSelect = (chatId: number) => {
    const chat = chatData.find((c) => c.id === chatId);
    if (chat) {
      this.setState({
        selectedChat: chat,
        messages: chat.messages,
      });
    }
  };

  // Simulate sending a new message
  handleSendMessage = () => {
    const { newMessage, messages } = this.state;
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      timestamp: "Just now",
    };

    this.setState({
      messages: [...messages, newMsg],
      newMessage: "",
    });
  };

  renderContent() {
    const { selectedChat, messages, newMessage } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#282c34",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          {/* Left Sidebar - Chat List */}
          <Box
            sx={{
              width: "25%",
              backgroundColor: "#e8e8e8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              sx={{
                margin: 1,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <List sx={{ flexGrow: 1, overflowY: "auto" }}>
              {chatData.map((chat) => (
                <ListItem
                  key={chat.id}
                  component="div"
                  onClick={() => this.handleChatSelect(chat.id)}
                  sx={{
                    padding: 1.5,
                    "&:hover": {
                      backgroundColor: "#dcdcdc",
                    },
                    backgroundColor: selectedChat.id === chat.id ? "#ddd" : "transparent",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={chat.name} src={chat.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={chat.messages[chat.messages.length - 1]?.text || "No messages"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Chat Area */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
                borderBottom: "1px solid #ddd",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar alt={selectedChat.name} src={selectedChat.avatar} />
                <Typography sx={{ marginLeft: 1 }} variant="h6">
                  {selectedChat.name}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <Call />
                </IconButton>
                <IconButton>
                  <VideoCall />
                </IconButton>
                <IconButton>
                  <Settings />
                </IconButton>
              </Box>
            </Box>

            {/* Chat Messages */}
            <Box
              sx={{
                flexGrow: 1,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                backgroundColor: "#f9f9f9",
              }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                    backgroundColor: msg.sender === "You" ? "#3f51b5" : "#e0e0e0",
                    color: msg.sender === "You" ? "white" : "black",
                    borderRadius: 2,
                    padding: 1.5,
                    marginBottom: 1,
                    maxWidth: "60%",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: msg.sender === "You" ? "right" : "left",
                    }}
                  >
                    {msg.timestamp}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                padding: 1,
                display: "flex",
                borderTop: "1px solid #ddd",
              }}
            >
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => this.setState({ newMessage: e.target.value })}
                placeholder="Type your message and press enter..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") this.handleSendMessage();
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleSendMessage}>
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ChatPage;
