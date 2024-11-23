// JobListings.js
import React from "react";
import { Box, Typography } from "@mui/material";

const JobListings = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Typography variant="body1">
        Explore job opportunities available for FAST students and alumni.
      </Typography>
      {/* Job listing component can be added here */}
    </Box>
  );
};

export default JobListings;
