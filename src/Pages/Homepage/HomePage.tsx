import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  Avatar,
  CardMedia,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ReplyIcon from "@mui/icons-material/Reply";
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import Comments from "./Comments";
import styles from "./HomePage.module.css";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";
import AddPostDialog from "./AddPostDialog";
import { Post as MyPost } from "../../../Backend/Classes/Post";
import { Profile } from "../../../Backend/Classes/Profile";

// Define the Post interface
interface Post {
  postID: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  liked: boolean;
  mediaUrl: string | null; // URL of the picture or video
}

interface HomePageState extends AbstractPageState {
  posts: Post[];
  selectedPostId: string | null; // Track the post for which comments are open
  isAddPostOpen: boolean;
}

class HomePage extends AbstractPage<{}, HomePageState> {
  static contextType = PageTitleContext; // Correct contextType assignment
  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Home Page");
    this.UpdateData();
  }
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      posts: [],
      selectedPostId: null,
      isAddPostOpen: false,
    };
  }

  async getprofile(authorId: string) {
    let data = await Profile.GetDatabaseAdapter().LoadById(authorId);
    const profileData = data as { userName: string; profilePic: string };
    return {
      userName: profileData.userName,
      avatar: profileData.profilePic,
    };
  }

  async UpdateData() {
    let data = await MyPost.GetDatabaseAdapter().LoadAll();

    if (Array.isArray(data)) {
      const posts = await Promise.all(
        data.map(async (post) => {
          const postData = post as {
            id: string;
            authorid: string;
            likes: number;
            content: string;
            base64encoded: string;
          };

          console.log("authorId")
          console.log(postData.authorid)
          // Await the result of getprofile (ensure it resolves before destructuring)
          const profileData = await this.getprofile(postData.authorid);

          console.log("profileData");
          console.log(profileData);

            // Destructure after promise resolves
            const { userName, avatar } = profileData;

            // Use a dummy avatar if avatar is null or undefined
            const finalAvatar = avatar || "https://www.w3schools.com/w3images/avatar2.png";

          return {
            postID: postData.id,
            author: userName, // Assign userName to author
            avatar: finalAvatar, // Assign avatar to avatar
            likes: postData.likes,
            liked: false,
            content: postData.content,
            mediaUrl: postData.base64encoded,
          };
        })
      );

      // Set the posts state
      this.setState({ posts });
    }
  }

  handleReplyClick = (postID: string) => {
    this.setState((prevState) => ({
      selectedPostId: prevState.selectedPostId === postID ? null : postID,
    }));
  };

  // Handle the like button click
  handleLike = (postID: string) => {
    this.setState((prevState) => ({
      posts: prevState.posts.map((post) =>
        post.postID === postID
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      ),
    }));
  };

  // Handle read more action
  handleReadMore = (postID: string) => {
    this.setState((prevState) => ({
      posts: prevState.posts.map((post) =>
        post.postID === postID
          ? {
              ...post,
              content: post.content + " (Read more...)", // You can adjust this as per your need
            }
          : post
      ),
    }));
  };

  // Open the Add Post dialog
  handleOpenAddPost = () => {
    console.log("open");
    this.setState({ isAddPostOpen: true });
  };

  // Close the Add Post dialog
  handleCloseAddPost = () => {
    console.log("calling this");
    this.setState({ isAddPostOpen: false });
  };

  // Add a new post
  handleAddPost = (mediaFile: string | null, content: string) => {
   
      const newPost: Post = {
        postID: this.state.posts.length + "1",
        author: "New User",
        avatar: "https://i.pravatar.cc/150?img=3",
        content: content,
        likes: 0,
        liked: false,
        mediaUrl: mediaFile ? mediaFile : null , // Convert file to local URL for preview
      };

      this.setState((prevState) => ({
        posts: [newPost, ...prevState.posts],
        isAddPostOpen: false,
      }));
    };

  renderContent() {
    const { posts, selectedPostId, isAddPostOpen } = this.state;

    return (
      <Box position="relative" width="100%">
        {/* Add Post Button */}
        <Box
          position="sticky"
          top="24x" // Adjust this value to control vertical placement
          right="24px" // Adjust this value to control horizontal placement
          style={{
            zIndex: 1000, // Ensure it stays on top
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            color="primary"
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              width: "24px",
              height: "24px",
              borderRadius: "50%", // Make it circular
            }}
            onClick={this.handleOpenAddPost}
          >
            +
          </IconButton>
        </Box>
        {/* Add Post Dialog */}
        <AddPostDialog
          open={isAddPostOpen}
          onClose={this.handleCloseAddPost}
          onSubmit={this.handleAddPost}
        />
        {/* Existing Posts */}
        <div className={styles["homepage-container"]}>
          {posts.map((post) => (
            <Box
              key={post.postID}
              display="flex"
              justifyContent="center"
              alignItems="stretch" // Ensure both children (Post and Comments) match height
              marginBottom={4}
              style={{ width: "100%" }}
            >
              {/* Post Section */}
              <Card
                className={styles["homepage-card"]}
                style={{
                  flexBasis: selectedPostId === post.postID ? "70%" : "50%",
                  maxWidth: "500px",
                  transition: "transform 0.3s ease",
                  transform:
                    selectedPostId === post.postID
                      ? "translateX(-10%)"
                      : "translateX(0)",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardMedia
                  className={styles["homepage-card-media"]}
                  // style={{
                  // backgroundImage: `url(${post.mediaUrl})`,
                  // height: "200px", // Adjusted for smaller media height
                  // backgroundSize: "contain", // Ensure the image fits within the box
                  // backgroundRepeat: "no-repeat",
                  // backgroundPosition: "centre",
                  // }}
                >
                  <Box className={styles["homepage-author-info"]}>
                  <Avatar
                    src={post.avatar}
                    alt={post.author}
                    className={styles["homepage-author-avatar"]}
                  />
                  <Typography variant="subtitle1" marginLeft={2}>
                    {post.author} 
                  </Typography>
                  </Box>
                  <Box className={styles["homepage-card-content"]}>
                    
                  <Typography variant="body1">
                      {post.content.length > 100
                        ? `${post.content.slice(0, 100)}...`
                        : post.content}
                    </Typography>
                    {post.content.length > 100 && (
                      <Typography
                        variant="body2"
                        className={styles["homepage-read-more"]}
                        onClick={() => this.handleReadMore(post.postID)}
                      >
                        Read More
                      </Typography>
                    )}
                  <hr></hr>
                  </Box>
                  <Box className={styles["homepage-action-buttons"]}>
                  <IconButton
                    color={post.liked ? "primary" : "default"}
                    onClick={() => this.handleLike(post.postID)}
                    disableRipple
                    className={styles["homepage-icon-button"]}
                  >
                    <Typography variant="overline">{post.likes}</Typography>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton color="default">
                    <ShareIcon />
                  </IconButton>
                    <IconButton
                    color="default"
                    onClick={() => this.handleReplyClick(post.postID)}
                    >
                    <ReplyIcon />
                    </IconButton>
                    </Box>
                    {post.mediaUrl && (
                        <Box padding={3} display="flex" justifyContent="center">
                        <CardMedia
                        component="img"
                        image={post.mediaUrl}
                        alt="Media"
                        className={styles["homepage-media"]}
                        style={{
                        maxHeight: "250px",
                        marginBottom : "10px",
                        width: "auto", // Adjust width to fit the image size
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                        border: "2px solid black", // Add border
                        borderRadius: "8px", // Add border radius for rounded corners
                        boxShadow: "0 14px 18px rgba(0, 0, 0, 0.1)", // Add shadow for frame effect
                        }}
                        onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        }}
                        />
                        </Box>
                    )}
                </CardMedia>
                <CardContent className={styles["homepage-card-content"]}>
               
                </CardContent>
              </Card>

              {/* Comments Section */}
              {selectedPostId === post.postID && (
                <Box
                  style={{
                    flexBasis: "30%",
                    marginLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxHeight: "100%", // Match parent height
                    overflow: "hidden", // Prevent overflow
                  }}
                >
                  <Comments postId={post.postID} />
                </Box>
              )}
            </Box>
          ))}
        </div>
      </Box>
    );
  }
}

export default HomePage;
