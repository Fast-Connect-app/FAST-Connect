import React, { Component } from "react";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ReplyIcon from "@mui/icons-material/Reply";
import AbstractPage from "./AbstractPages";

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

interface HomePageState {
  data: any; // Adjust this type depending on the structure of the data
  error: string | null;
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
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {posts.map((post) => (
          <Card sx={{ width: 400, marginBottom: "30px" }} key={post.id}>
            <CardContent sx={{ padding: 0 }}>
              {/* Media Area */}
              <Box
                sx={{
                  position: "relative",
                  height: 300,
                  backgroundImage: `url(${post.mediaUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  position="absolute"
                  display="flex"
                  padding={2}
                  alignItems="center"
                >
                  <Avatar src={post.avatar} alt={post.author} />
                  <Typography variant="subtitle1" marginLeft={2}>
                    {post.author}
                  </Typography>
                </Box>
                <Box
                  position="absolute"
                  right={0}
                  bottom={0}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <IconButton
                    color={post.liked ? "primary" : "default"}
                    onClick={() => this.handleLike(post.id)}
                    disableRipple
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "&:focus": {
                        outline: "none", // Remove the default focus outline
                        boxShadow: "none", // Remove box shadow on focus
                      },
                      "&:active": {
                        backgroundColor: "transparent", // Customize as needed
                      },
                    }}
                  >
                    <Typography variant="overline" padding={0}>
                      {post.likes}
                    </Typography>
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton color="default">
                    <ShareIcon />
                  </IconButton>
                  <IconButton color="default">
                    <ReplyIcon />
                  </IconButton>
                </Box>
              </Box>

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
                    color="primary"
                    sx={{ cursor: "pointer" }}
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
