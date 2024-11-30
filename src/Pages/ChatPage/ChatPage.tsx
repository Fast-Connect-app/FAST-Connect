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
import AbstractPage from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";


class ChatPage extends AbstractPage {
    static contextType = PageTitleContext; // Correct contextType assignment
    componentDidMount() {
        const { setPageTitle } = this.context as PageTitleContextType;
        setPageTitle("Chat Page");
    }
  
  renderContent() {
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
                {["Abdullah", "Raif", "Arham", "Zeeshan", "Bilal"].map(
                  (name, index) => (
                    <ListItem
                      key={index}
                      component="div"
                      sx={{
                        padding: 1.5,
                        "&:hover": {
                          backgroundColor: "#dcdcdc",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={name} src="" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={name}
                        secondary={"Last message preview"}
                        primaryTypographyProps={{
                          fontWeight: index === 0 ? "bold" : "normal",
                        }}
                      />
                      {index === 0 && (
                        <Typography
                          variant="body2"
                          color="red"
                          sx={{
                            backgroundColor: "red",
                            borderRadius: "50%",
                            color: "white",
                            width: 20,
                            height: 20,
                            textAlign: "center",
                            lineHeight: "20px",
                          }}
                        >
                          1
                        </Typography>
                      )}
                    </ListItem>
                  )
                )}
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
                  <Avatar alt="Abdullah" src="" />
                  <Typography sx={{ marginLeft: 1 }} variant="h6">
                    Abdullah
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
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    backgroundColor: "#e0e0e0",
                    borderRadius: 2,
                    padding: 1.5,
                    marginBottom: 1,
                    maxWidth: "60%",
                  }}
                >
                  <Typography variant="body2">Yo wassup lil dude</Typography>
                </Box>
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    backgroundColor: "#3f51b5",
                    color: "white",
                    borderRadius: 2,
                    padding: 1.5,
                    marginBottom: 1,
                    maxWidth: "60%",
                  }}
                >
                  <Typography variant="body2">
                    Well that's the shit for giggles for sure                  
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    backgroundColor: "#e0e0e0",
                    borderRadius: 2,
                    padding: 1.5,
                    maxWidth: "60%",
                  }}
                >
                  <Typography variant="body2">Hey Did you just ......</Typography>
                </Box>
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
                  placeholder="Type your message and press enter..."
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
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
        </Box>
      );
}
}

export default ChatPage;
