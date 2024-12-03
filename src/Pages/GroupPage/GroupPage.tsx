import { Group as MyGroup } from "../../../Backend/Classes/Group"
import {GroupMessages} from "../../../Backend/Classes/GroupMessages"

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
  import { Send, Settings, Call, VideoCall, Group } from "@mui/icons-material";
  import AbstractPage, {AbstractPageState} from "../AbstractPages";
  import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
  import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { Profile } from "../../../Backend/Classes/Profile";
  
  // Mock chat data
  const groupData = [
    {
      id: "",
      groupName: "",
      groupDescription:"",
      messages: [],
    }
  ];

  interface Message{
      id: number;
      text: String;
      sender: String;
      timestamp: String;
      file?:string;
      parentMessage?:Message;
  }
  interface Group{
    id:string;
    groupName:string;
    groupDescription:string;
    messages:Message[];
  }
  
  interface GroupPageState extends AbstractPageState{
      selectedChat : Group;
      messages: Message[];
      newMessage: String;
      chats: Group[];
      open:boolean;
  }

    //connection from backend
    let groupAdapter = MyGroup.GetDatabaseAdapter();

  class GroupPage extends AbstractPage<{}, GroupPageState> {
    static contextType = PageTitleContext; // Correct contextType assignment
  
    componentDidMount() {
      const { setPageTitle } = this.context as PageTitleContextType;
      setPageTitle("Chat Page");

      this.GetGroups();
    }
  
      constructor(props: {}) {
          super(props);
          this.state = {
          data: null,
          error: null,
          selectedChat: groupData[0],
          messages: groupData[0].messages,
          newMessage: "",
          chats: groupData,
          open:false,
          };
      }
  
    // Handler to switch chat
    handleChatSelect = (chatId: string) => {
      const chat = groupData.find((c) => c.id === chatId);
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
    
    async GetGroups(){
        let userId = UserAuthentication.GetInstance().GetCurrentUserId();
        if(!userId)
            return;
        let data = await groupAdapter.LoadForMember(userId);

        if(data === null)
            return;
        data.forEach((element:any) => {
            groupData.push({
                id: element.id,
                groupName: element.name,
                groupDescription: element.description,
                messages:[]
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

    ShowDisplay(){
        const {open} = this.state;
        return(
            <Dialog open={open}>
            <DialogTitle>Create new Group</DialogTitle>
            <DialogContent>
                <input type="text" placeholder="Group Name" id="groupNameField"></input>
                <br/>
                <input type="text" placeholder="Group Description" id="groupDescField"></input>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=> {this.setState({open:false});}} color="secondary">
                Cancel
              </Button>
              <Button onClick={()=> {
                this.setState({open:false});
                this.MakeGroup("groupNameField","groupDescField");
                }} color="secondary">
                Submit
              </Button>
            </DialogActions>
            </Dialog>
        )
    }

    renderContent() {
      const { selectedChat: selectedGroup, messages, newMessage } = this.state;
  
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
              <button id="createGroupButton" onClick={ ()=>{ this.setState({open:true}); } }>Create Group</button>
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {groupData.map((group) => (
                  <ListItem
                    key={group.id}
                    component="div"
                    onClick={() => this.handleChatSelect(group.id)}
                    sx={{
                      padding: 1.5,
                      "&:hover": {
                        backgroundColor: "#dcdcdc",
                      },
                      backgroundColor: selectedGroup.id === group.id ? "#ddd" : "transparent",
                    }}
                  >
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={group.groupName}
                      secondary={group.messages[group.messages.length - 1]?.text || "No messages"}
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
                  <Typography sx={{ marginLeft: 1 }} variant="h6">
                    {selectedGroup.groupName}
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
                    <Typography variant="body2">{msg.sender}</Typography>
                    <hr/>  
                    <Typography variant="body2">{msg.file}</Typography>
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
  