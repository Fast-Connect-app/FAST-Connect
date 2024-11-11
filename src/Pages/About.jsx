// About.js
import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';

class About extends Component {
  fetchData(){
    return(<>
    <h1>fuck you</h1>
    </>)
  }


  render() {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          About FAST Connect
        </Typography>
        <Typography variant="body1">
          FAST Connect is a platform designed for students and alumni to connect, collaborate, and grow together.
          Our mission is to foster a community where knowledge sharing and networking thrive.
        </Typography>
      </Box>
    );
  }
}

export default About;
