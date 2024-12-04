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
import {DirectMessages} from "../../../Backend/Classes/DirectMessages";
import {UserContactSave} from "../../../Backend/Classes/UserContactSave";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import {auth} from "../../../Backend/FirebaseApp";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  messages: DirectMessages;
}

interface ChatPageState extends AbstractPageState {
  selectedChat: Chat | null;
  directMessages: DirectMessages |null;
  newMessage: String;
  chats: Chat[];
}

class ChatPage extends AbstractPage<{}, ChatPageState> {
  static contextType = PageTitleContext;

  async componentDidMount() {
    try{
      const { setPageTitle } = this.context as PageTitleContextType;
      setPageTitle("Chat Page");
      auth.onAuthStateChanged(async (user: unknown) => {
        const userContacts = UserContactSave.GetDatabaseAdapter();
        const userID = user.uid;
        if (userID === undefined) throw new Error("User not logged in");
        const data = await userContacts.LoadByName("userID", userID);
        if(data === null) throw new Error("No contacts found");
        const contacts: UserContactSave[] = data.map((contact) => UserContactSave.fromFirebaseJson(contact));
        console.log(contacts);
       contacts.forEach(async (contact) => {
         let userToUserID;
         if(contact.savedUserId === undefined) throw new Error("No saved user id found");
        if(userID<contact.savedUserId){
          userToUserID = userID + contact.savedUserId;
        }
        else{
          userToUserID = contact.savedUserId + userID;
        }
        const directMsg:DirectMessages = new DirectMessages(userToUserID, []);
        const directMessageAdapter = directMsg.GetDatabaseAdapter();
        const messageData = await directMessageAdapter.LoadAll();
        if(messageData === null) throw new Error("No messages found");
        const messages = messageData.map((message) => DirectMessages.fromFirebaseJson(message));
        const chat: Chat = {
          id: contact.savedUserId,
          name: contact.savedUserName,
          avatar: "",
          messages: messages[0],
        };
        this.setState({
          chats: [...this.state.chats, chat],
        });
          if(data === null) throw new Error("No messages found");
       });});
      
    }
    catch(e){
      if (e instanceof Error){
        console.log(e.message);
      }
      else{
        throw new Error("An error occurred");
      }
    }
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      selectedChat: null,
      directMessages: null,
      newMessage: "",
      chats: [],
    };
  }

  handleChatSelect = (chatId: number) => {
    const chat = this.state.chats.find((c) => c.id === chatId);
    if (chat) {
      this.setState({
        selectedChat: chat,
        directMessages: chat.messages,
      });
    }
  };

  handleSendMessage = () => {
    const { newMessage, directMessages } = this.state;
    if(directMessages === null) return;
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: directMessages.messages.length + 1,
      text: newMessage,
      sender: "You",
      timestamp: "Just now",
    };

    this.setState({
      newMessage: "",
    });
  };

  renderContent() {
    const { selectedChat, directMessages, newMessage,chats } = this.state;

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
              {
              (chats!==null && chats.length>0)
              ?
              chats.map((chat) => (
                <ListItem
                  key={chat.id}
                  component="div"
                  onClick={()=>{
                    this.handleChatSelect(chat.id);
                  }}
                  className={`${styles.chatItem} ${
                    selectedChat.id === chat.id ? styles.activeChat : ""
                  }`}
                >
                  <ListItemAvatar>
                    <Avatar alt={chat.name} src={chat.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={chat.messages.messages[chat.messages.messages.length - 1]?.text || "No messages"}
                  />
                </ListItem>
              ))
              : (<ListItem>
                No Chats
              </ListItem>)
              }
            </List>
          </Box>

          {/* Chat Area */}
          <Box className={styles.chatArea}>
            {/* Chat Header */}
            {selectedChat === null ?
              <Box className={styles.chatHeader}>
              <Box className={styles.chatHeaderDetails}>
                <Avatar alt="NoChats"/>
                <Typography className={styles.chatName}>No chat</Typography>
              </Box>
            </Box>
            :
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
            }

            {/* Chat Messages */}
            <Box className={styles.chatMessages}>
              {directMessages?.messages.map((msg) => (
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
