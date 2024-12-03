import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Send, Settings, Call, VideoCall } from "@mui/icons-material";
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { Group as MyGroup } from "../../../Backend/Classes/Group";
import styles from "./GroupPage.module.css";

const groupData: Group[] = [
  {
    id: "",
    groupName: "",
    groupDescription: "",
    messages: [],
  },
];

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  file?: string;
}

interface Group {
  id: string;
  groupName: string;
  groupDescription: string;
  messages: Message[];
}

interface GroupPageState extends AbstractPageState {
  selectedChat: Group;
  messages: Message[];
  newMessage: string;
  chats: Group[];
  open: boolean;
}

let groupAdapter = MyGroup.GetDatabaseAdapter();

class GroupPage extends AbstractPage<{}, GroupPageState> {
  static contextType = PageTitleContext;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      selectedChat: groupData[0],
      messages: groupData[0].messages,
      newMessage: "",
      chats: groupData,
      open: false,
    };
  }

  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("GroupChat Page");
    this.GetGroups();
  }

  handleChatSelect = (chatId: string) => {
    const chat = groupData.find((c) => c.id === chatId);
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

  async GetGroups() {
    let userId = UserAuthentication.GetInstance().GetCurrentUserId();
    if (!userId) return;

    let data = await groupAdapter.LoadForMember(userId);
    if (data === null) return;

    Array.isArray(data) && data.forEach((element: any) => {
      groupData.push({
        id: element.id,
        groupName: element.name,
        groupDescription: element.description,
        messages: [],
      });
    });

            // if (data){
        //     groups = data.map((group:any)=>{
        //         const groupData = group as {id:string, groupName:string, groupDescription:string}
        //         return {
        //             id : groupData.id,
        //             groupName: groupData.groupName,
        //             groupDescription: groupData.groupDescription
        //         }
        //     });
        // }
        // groups.forEach(async (group:any) => {
        //     let groupMessages = new GroupMessages(group.id);
        //     let groupMessagesAdapter = groupMessages.GetDatabaseAdapter();
        //     let messages = await groupMessagesAdapter.LoadAll();

        //     if(messages === null)
        //         return;
        //     let i = 0;
        //     groupData.forEach((groupDataElement) => {
        //         if(groupDataElement.id === group.id){
        //             let userName = Profile.GetDatabaseAdapter().LoadById(group.sender);
        //             groupDataElement.messages.push({
        //                 id:group.id,
        //                 sender: userName,
        //                 text: messages[i].text,
        //                 timestamp:messages[i].timeStamp,
        //             }as never);
        //         }
        //     });
        // });
    
  }

  async MakeGroup(nameInput:string, descInput:string){
    let name = document.getElementById(nameInput) as HTMLInputElement;
    let desc = document.getElementById(descInput) as HTMLInputElement;

    let userId = UserAuthentication.GetInstance().GetCurrentUserId();
    if(!userId)
        return;
    let group = new MyGroup(name.value,desc.value,[userId],userId);

    let docId:string = await groupAdapter.SaveObject(group.GetJsonData());

    if(docId !== ""){
        groupData.push({id:docId,
            groupName: group.name,
            groupDescription:group.description,
            messages:[]
        });
    }
    else{
        console.log("Couldnt Make Group!");
    }
}

  ShowDisplay() {
    const { open } = this.state;
    return (
      <Dialog open={open}>
        <DialogTitle>Create new Group</DialogTitle>
        <DialogContent>
          <input type="text" placeholder="Group Name" id="groupNameField" />
          <br />
          <input type="text" placeholder="Group Description" id="groupDescField" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ open: false })} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.setState({ open: false });
              this.MakeGroup("groupNameField", "groupDescField");
            }}
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderContent() {
    const { selectedChat, messages, newMessage } = this.state;

    return (
      <Box className={styles.pageContainer}>
        <Box className={styles.mainContainer}>
          <Box className={styles.sidebar}>
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              className={styles.searchInput}
            />
            <button
              id="createGroupButton"
              onClick={() => this.setState({ open: true })}
              className={styles.createGroupButton}
            >
              Create Group
            </button>
            <List className={styles.chatList}>
              {groupData.map((group) => (
                <ListItem
                  key={group.id}
                  onClick={() => this.handleChatSelect(group.id)}
                  className={`${styles.chatItem} ${
                    selectedChat.id === group.id ? styles.activeChat : ""
                  }`}
                >
                  <ListItemAvatar />
                  <ListItemText
                    primary={group.groupName}
                    secondary={group.messages[group.messages.length - 1]?.text || "No messages"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className={styles.chatArea}>
            <Box className={styles.chatHeader}>
              <Typography className={styles.chatName}>{selectedChat.groupName}</Typography>
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
            <Box className={styles.chatMessages}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  className={`${styles.messageBubble} ${
                    msg.sender === "You" ? styles.sentMessage : styles.receivedMessage
                  }`}
                >
                  <Typography>{msg.text}</Typography>
                  <Typography className={styles.timestamp}>{msg.timestamp}</Typography>
                </Box>
              ))}
            </Box>
            <Box className={styles.messageInputContainer}>
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => this.setState({ newMessage: e.target.value })}
                placeholder="Type your message and press enter..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") this.handleSendMessage();
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={this.handleSendMessage}>
                          <Send />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {this.ShowDisplay()}
      </Box>
    );
  }
}

export default GroupPage;
