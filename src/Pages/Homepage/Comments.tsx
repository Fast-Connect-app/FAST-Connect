import React, { Component } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import styles from "./Comments.module.css";

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
  replyIndex: number | null;
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

  renderReplies = (replies: Reply[]) => (
    <Box className={styles.repliesContainer}>
      {replies.map((reply, replyIndex) => (
        <Box key={replyIndex} className={styles.commentHeader}>
          <Avatar src={reply.avatar} alt="avatar" className={styles.avatar} />
          <Typography variant="body2">
            <strong>{reply.username}:</strong> {reply.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  renderCommentInput = () => (
    <Box className={styles.inputSection}>
      <input
        type="text"
        value={this.state.newComment}
        onChange={this.handleInputChange}
        placeholder="Add a comment..."
        className={styles.inputField}
      />
      <button
        onClick={this.handleAddCommentOrReply}
        className={styles.postButton}
      >
        Post
      </button>
    </Box>
  );

  renderComments = () =>
    this.state.comments.map((comment, index) => (
      <Box key={index} className={styles.commentContainer}>
        <Box className={styles.commentHeader}>
          <Avatar src={comment.avatar} alt="avatar" className={styles.avatar} />
          <Typography variant="body2">
            <strong>{comment.username}:</strong> {comment.text}
          </Typography>
        </Box>
        <Box className={styles.actions}>
          <Button
            variant="text"
            size="small"
            onClick={() => this.startReply(index)}
          >
            Reply
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => this.toggleReplies(index)}
          >
            {comment.expanded ? "Hide Replies" : "View Replies"}
          </Button>
        </Box>
        {comment.expanded && this.renderReplies(comment.replies)}
      </Box>
    ));

  render() {
    return (
      <Box className={styles.container}>
        <Box className={styles.commentsSection}>{this.renderComments()}</Box>
        {this.renderCommentInput()}
      </Box>
    );
  }
}

export default Comments;
