// GlobalChat.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const GlobalChat = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Global Chat
      </Typography>
      <Typography variant="body1">
        Join the conversation and connect with other community members in the global chat.
      </Typography>
      {/* Add chat interface and messages here */}
    </Box>
  );
};

export default GlobalChat;
