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
import styles from "./HomePage.module.css";

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
}

class HomePage extends AbstractPage<{}, HomePageState> {
  // Initialize state in the constructor
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
    };
  }

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

  renderContent() {
    const { posts } = this.state;

    return (
      <div
        className={styles["homepage-container"]}
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   flexDirection: "column",
        // }}
      >
        {posts.map((post) => (
          <Card className={styles["homepage-card"]}>
            <CardMedia
              className={styles["homepage-card-media"]}
              style={{
                backgroundImage: `url(${post.mediaUrl})`,
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
                <IconButton color="default">
                  <ReplyIcon />
                </IconButton>
              </Box>
            </CardMedia>
            <CardContent className={styles["homepage-card-content"]}>
              {/* Description */}
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
        ))}
      </div>
    );
  }
}

export default HomePage;
