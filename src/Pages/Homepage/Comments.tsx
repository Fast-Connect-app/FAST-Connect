import React, { Component } from "react";
import { Box, Typography } from "@mui/material";

interface CommentsProps {
  postId: number;
}

interface CommentsState {
  comments: string[];
  newComment: string;
}

class Comments extends Component<CommentsProps, CommentsState> {
  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      comments: ["Great post!", "Amazing view!"], // Initial comments
      newComment: "", // Input field value
    };
  }

  // Method to handle adding a new comment
  handleAddComment = () => {
    const { newComment, comments } = this.state;
    if (newComment.trim()) {
      this.setState({
        comments: [...comments, newComment], // Add new comment to the list
        newComment: "", // Clear input field
      });
    }
  };

  // Method to handle input field changes
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newComment: event.target.value });
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <Box
        sx={{
          padding: 2,
          borderLeft: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <Box>
          {comments.map((comment, index) => (
            <Typography key={index} variant="body2" gutterBottom>
              {comment}
            </Typography>
          ))}
        </Box>
        <Box display="flex" marginTop={2}>
          <input
            type="text"
            value={newComment}
            onChange={this.handleInputChange}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={this.handleAddComment}
            style={{
              marginLeft: "8px",
              padding: "8px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </Box>
      </Box>
    );
  }
}

export default Comments;
