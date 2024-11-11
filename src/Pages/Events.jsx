import React from 'react';
import AbstractPage from './AbstractPages';
import { Box, Typography } from '@mui/material';

class Events extends AbstractPage {
  fetchData() {
    console.log("Fetching data...");
    fetch('http://localhost:5000/api/get_data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update state with fetched data
        this.setState({ data: data[0].name });
        sessionStorage.setItem('hasFetchedData', 'true');
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  renderContent() {
    const { data } = this.state;  // Use state data here
    console.log("Rendering data:", data);

    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Upcoming Events
        </Typography>
        <Typography variant="body1">
          Here you can find all upcoming events and activities organized by FAST.
        </Typography>
        <Typography variant="body2">{data}</Typography> {/* Displaying fetched data */}
      </Box>
    );
  }
}

export default Events;
