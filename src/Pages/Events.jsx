// Events.js
import React from 'react';
import AbstractPage from './AbstractPages';
import { Box, Typography } from '@mui/material';

class Events extends AbstractPage{
  renderContent(){
    //const{data}=this.state
    const { data } = this.props;  // Access data via props
    console.log("renderContent in Events is being called with data:", data);
    return(
      <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Typography variant="body1">
        Here you can find all upcoming events and activities organized by FAST.
      </Typography>
      {/* Event listing can be added here */}
    </Box>
    )

  }


}

export default Events;