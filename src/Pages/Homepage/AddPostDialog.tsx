import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Post } from "../../../Backend/Classes/Post";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (mediaFile: any, content: string) => void;
}

interface AddPostDialogState {
  mediaFile: any;
  mediaPreview: string | null;
  content: string;
}

class AddPostDialog extends Component<AddPostDialogProps, AddPostDialogState> {
  constructor(props: AddPostDialogProps) {
    super(props);
    this.state = {
      mediaFile: null,
      mediaPreview: null,
      content: "",
    };
  }

  imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
  
        const mediaFile = await this.imageToBase64(file);
        console.log(mediaFile);
        this.setState({
          mediaFile: mediaFile,
          mediaPreview: mediaFile,
        });
    } else {
      this.setState({ mediaFile: null, mediaPreview: null });
    }
  };

  handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = async () => {
    const { mediaFile, content } = this.state;
    this.props.onSubmit(mediaFile, content);
    let userId = UserAuthentication.GetInstance().GetCurrentUserId();
    if (userId) {
      let newPost = new Post(userId, 0, content, mediaFile);
      await Post.GetDatabaseAdapter().SaveObject(newPost.GetJsonData());
    }
    this.setState({ mediaFile: null, mediaPreview: null, content: "" }); // Reset form fields
  };

  render() {
    const { open, onClose } = this.props;
    const { mediaPreview, content } = this.state;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <Typography variant="body2">Upload a picture</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleFileChange}
              style={{ margin: "8px 0" }}
            />
            {mediaPreview && (
              <Box
                component="img"
                src={mediaPreview}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            )}
          </Box>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={content}
            onChange={this.handleContentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            color="primary"
            disabled={!content} // Disable button if fields are empty
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddPostDialog;
