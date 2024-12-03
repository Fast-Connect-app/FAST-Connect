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

// Define the Post interface
interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  liked: boolean;
  mediaUrl: string; // URL of the picture or video
}

interface HomePageState extends AbstractPageState {
  posts: Post[];
  selectedPostId: number | null; // Track the post for which comments are open
  isAddPostOpen: boolean;
}

class HomePage extends AbstractPage<{}, HomePageState> {
  static contextType = PageTitleContext; // Correct contextType assignment
  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Home Page");
  }
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      posts: [
        {
          id: 1,
          author: "John Doe",
          avatar: "https://i.pravatar.cc/150?img=1",
          content:
            "Check out this amazing view! This view is absolutely beautiful and worth sharing with the world. 🌍",
          likes: 10,
          liked: false,
          mediaUrl: "https://via.placeholder.com/600x300", // Example image
        },
        {
          id: 2,
          author: "Jane Smith",
          avatar: "https://i.pravatar.cc/150?img=2",
          content:
            "Had a great day at the beach 🏖️. The sun was shining, the waves were perfect, and it was just an amazing experience.",
          likes: 20,
          liked: false,
          mediaUrl: "https://via.placeholder.com/600x300", // Example image
        },
      ],
      selectedPostId: null,
      isAddPostOpen: false,
    };
  }

  handleReplyClick = (id: number) => {
    this.setState((prevState) => ({
      selectedPostId: prevState.selectedPostId === id ? null : id,
    }));
  };

  // Handle the like button click
  handleLike = (id: number) => {
    this.setState((prevState) => ({
      posts: prevState.posts.map((post) =>
        post.id === id
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
  handleReadMore = (id: number) => {
    this.setState((prevState) => ({
      posts: prevState.posts.map((post) =>
        post.id === id
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
    this.setState({ isAddPostOpen: false });
  };

  // Add a new post
  handleAddPost = (mediaFile: File | null, content: string) => {
    if (mediaFile) {
      const newPost: Post = {
        id: this.state.posts.length + 1,
        author: "New User",
        avatar: "https://i.pravatar.cc/150?img=3",
        content,
        likes: 0,
        liked: false,
        mediaUrl: URL.createObjectURL(mediaFile), // Convert file to local URL for preview
      };

      this.setState((prevState) => ({
        posts: [newPost, ...prevState.posts],
        isAddPostOpen: false,
      }));
    }
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
              key={post.id}
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
                  flexBasis: selectedPostId === post.id ? "70%" : "50%",
                  maxWidth: "500px",
                  transition: "transform 0.3s ease",
                  transform:
                    selectedPostId === post.id
                      ? "translateX(-10%)"
                      : "translateX(0)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  className={styles["homepage-card-media"]}
                  style={{
                    backgroundImage: `url(${post.mediaUrl})`,
                    height: "200px", // Adjust as needed for media height
                  }}
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
                  <Box className={styles["homepage-action-buttons"]}>
                    <IconButton
                      color={post.liked ? "primary" : "default"}
                      onClick={() => this.handleLike(post.id)}
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
                      onClick={() => this.handleReplyClick(post.id)}
                    >
                      <ReplyIcon />
                    </IconButton>
                  </Box>
                </CardMedia>
                <CardContent className={styles["homepage-card-content"]}>
                  <Box padding={3} textAlign="left">
                    <Typography variant="body1">
                      {post.content.length > 100
                        ? `${post.content.slice(0, 100)}...`
                        : post.content}
                    </Typography>
                    {post.content.length > 100 && (
                      <Typography
                        variant="body2"
                        className={styles["homepage-read-more"]}
                        onClick={() => this.handleReadMore(post.id)}
                      >
                        Read More
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* Comments Section */}
              {selectedPostId === post.id && (
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
                  <Comments postId={post.id} />
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
