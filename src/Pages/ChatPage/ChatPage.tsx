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
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
import styles from "./ChatPage.module.css";

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
  // Add additional chat data as needed
  {
    id : 2,
    name : "Raef",
    avatar : "",
    messages: [{id:1, text: "Hey Babe", sender : "Raef", timestamp : "10:00PM"}]
  }
];

interface Message {
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

interface ChatPageState extends AbstractPageState {
  selectedChat: Chat;
  messages: Message[];
  newMessage: String;
  chats: Chat[];
}

class ChatPage extends AbstractPage<{}, ChatPageState> {
  static contextType = PageTitleContext;

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

  handleChatSelect = (chatId: number) => {
    const chat = chatData.find((c) => c.id === chatId);
    if (chat) {
      this.setState({
        selectedChat: chat,
        messages: chat.messages,
      });
    }
  };

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
      <Box className={styles.pageContainer}>
        <Box className={styles.mainContainer}>
          {/* Left Sidebar - Chat List */}
          <Box className={styles.sidebar}>
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              className={styles.searchInput}
            />
            <List className={styles.chatList}>
              {chatData.map((chat) => (
                <ListItem
                  key={chat.id}
                  component="div"
                  onClick={() => this.handleChatSelect(chat.id)}
                  className={`${styles.chatItem} ${
                    selectedChat.id === chat.id ? styles.activeChat : ""
                  }`}
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
          <Box className={styles.chatArea}>
            {/* Chat Header */}
            <Box className={styles.chatHeader}>
              <Box className={styles.chatHeaderDetails}>
                <Avatar alt={selectedChat.name} src={selectedChat.avatar} />
                <Typography className={styles.chatName}>{selectedChat.name}</Typography>
              </Box>
              <Box className={styles.chatHeaderActions}>
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
            <Box className={styles.chatMessages}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  className={`${styles.messageBubble} ${
                    msg.sender === "You" ? styles.sentMessage : styles.receivedMessage
                  }`}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography className={styles.timestamp}>{msg.timestamp}</Typography>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box className={styles.messageInputContainer}>
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => this.setState({ newMessage: e.target.value })}
                placeholder="Type your message and press enter..."
                onKeyDown={(e) => {
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
