// Profile.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">
        Here you can view and edit your profile information.
      </Typography>
      {/* Add form or profile details here */}
    </Box>
  );
};

export default Profile;
