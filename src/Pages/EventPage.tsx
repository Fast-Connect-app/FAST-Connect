import React from 'react';
import AbstractPage, { AbstractPageState } from './AbstractPages';
import { Box, Typography } from '@mui/material';

// Define the state interface for the Events component
interface EventsState extends AbstractPageState {
  fetchdata: boolean;
}

class Events extends AbstractPage<{}, EventsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      fetchdata:true
    };
  }

  fetchData() {
    console.log('Fetching data...');
    fetch('http://localhost:5000/api/get_data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: { name: string }[]) => {
        // Update state with fetched data
        this.setState({ data: data[0].name });
        sessionStorage.setItem('hasFetchedData', 'true');
      })
      .catch((error: Error) => {
        this.setState({ error: error.message });
      });
  }

  renderContent() {
    const { data } = this.state; // Use state data here
    console.log('Rendering data:', data);

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
