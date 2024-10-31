// StudyMaterials.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const StudyMaterials = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Study Materials
      </Typography>
      <Typography variant="body1">
        Access a repository of study materials to help you succeed in your courses.
      </Typography>
      {/* Study material listing can be added here */}
    </Box>
  );
};

export default StudyMaterials;
