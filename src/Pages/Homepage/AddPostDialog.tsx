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

interface AddPostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (mediaFile: File | null, content: string) => void;
}

interface AddPostDialogState {
  mediaFile: File | null;
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

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          mediaFile: file,
          mediaPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file); // Convert file to Base64 string for preview
    } else {
      this.setState({ mediaFile: null, mediaPreview: null });
    }
  };

  handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = () => {
    const { mediaFile, content } = this.state;
    this.props.onSubmit(mediaFile, content);
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
            disabled={!this.state.mediaFile || !content} // Disable button if fields are empty
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddPostDialog;
