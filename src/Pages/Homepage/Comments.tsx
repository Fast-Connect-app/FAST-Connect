import React, { Component } from "react";
import { Box, Typography, Avatar, Button, TextField } from "@mui/material";

interface CommentsProps {
  postId: number;
}

interface Reply {
  username: string;
  text: string;
  avatar: string;
}

interface Comment {
  username: string;
  text: string;
  avatar: string;
  replies: Reply[];
  expanded: boolean;
}

interface CommentsState {
  comments: Comment[];
  newComment: string;
  replyIndex: number | null; // Tracks which comment the user is replying to
}

class Comments extends Component<CommentsProps, CommentsState> {
  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      comments: [
        {
          username: "Alice",
          text: "Great post!",
          avatar: "https://i.pravatar.cc/40?img=1",
          replies: [
            {
              username: "Bob",
              text: "I agree!",
              avatar: "https://i.pravatar.cc/40?img=2",
            },
          ],
          expanded: false,
        },
        {
          username: "Charlie",
          text: "Amazing view!",
          avatar: "https://i.pravatar.cc/40?img=3",
          replies: [],
          expanded: false,
        },
      ],
      newComment: "",
      replyIndex: null,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newComment: event.target.value });
  };

  handleAddCommentOrReply = () => {
    const { newComment, comments, replyIndex } = this.state;
    if (!newComment.trim()) return;

    // Check if the input starts with @username and if replyIndex is set
    if (
      replyIndex !== null &&
      newComment.startsWith(`@${comments[replyIndex].username}`)
    ) {
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push({
        username: "Guest",
        text: newComment
          .replace(`@${comments[replyIndex].username}`, "")
          .trim(),
        avatar: "https://i.pravatar.cc/40?img=5",
      });

      this.setState({
        comments: updatedComments,
        newComment: "",
        replyIndex: null,
      });
    } else {
      // Add as a new comment
      this.setState({
        comments: [
          ...comments,
          {
            username: "Guest",
            text: newComment,
            avatar: "https://i.pravatar.cc/40?img=4",
            replies: [],
            expanded: false,
          },
        ],
        newComment: "",
      });
    }
  };

  startReply = (index: number) => {
    this.setState({
      replyIndex: index,
      newComment: `@${this.state.comments[index].username} `,
    });
  };

  toggleReplies = (index: number) => {
    this.setState((prevState) => ({
      comments: prevState.comments.map((comment, i) =>
        i === index ? { ...comment, expanded: !comment.expanded } : comment
      ),
    }));
  };

  render() {
    const { comments, newComment } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          borderLeft: "1px solid #ddd",
        }}
      >
        {/* Comments Section */}
        <Box
          sx={{
            flex: 1,
            maxHeight: "260px", // Restrict height of the comments section
            overflowY: "auto", // Enable scrolling when content exceeds maxHeight
            marginBottom: 2,
          }}
        >
          {comments.map((comment, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Avatar
                  src={comment.avatar}
                  alt="avatar"
                  sx={{ marginRight: 1.5, width: "24px", height: "24px" }}
                />
                <Typography variant="body2" gutterBottom>
                  <strong>{comment.username}:</strong> {comment.text}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, marginLeft: "30px" }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => this.startReply(index)}
                  sx={{ fontSize: "0.75rem" }}
                >
                  Reply
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => this.toggleReplies(index)}
                  sx={{ fontSize: "0.75rem" }}
                >
                  {comment.expanded ? "Hide Replies" : "View Replies"}
                </Button>
              </Box>
              {comment.expanded && (
                <Box
                  sx={{
                    marginLeft: 4,
                    marginTop: 1,
                    borderLeft: "1px solid #ddd",
                    paddingLeft: 2,
                  }}
                >
                  {comment.replies.map((reply, replyIndex) => (
                    <Box
                      key={replyIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <Avatar
                        src={reply.avatar}
                        alt="avatar"
                        sx={{
                          marginRight: 1.5,
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <Typography variant="body2">
                        <strong>{reply.username}:</strong> {reply.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Input Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 2,
            borderTop: "1px solid #ddd",
          }}
        >
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
            onClick={this.handleAddCommentOrReply}
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
