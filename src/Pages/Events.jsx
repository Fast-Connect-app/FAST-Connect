// Events.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Events = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Typography variant="body1">
        Here you can find all upcoming events and activities organized by FAST.
      </Typography>
      {/* Event listing can be added here */}
    </Box>
  );
};

export default Events;
