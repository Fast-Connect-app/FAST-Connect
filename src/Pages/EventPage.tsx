import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

const EventsPage: React.FC = () => {
  const [eventType, setEventType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('any');

  const events = [
    {
      id: 1,
      title: 'Phil Collins: This Is The Day',
      date: '10 Aug - 21 Oct 2018',
      image: 'https://via.placeholder.com/300x200',
      type: 'Exhibition',
    },
    {
      id: 2,
      title: 'Swing, Soul, and Showsongs',
      date: '16 Oct 2018',
      image: 'https://via.placeholder.com/300x200',
      type: 'Music',
    },
    {
      id: 3,
      title: 'Chapter & Verse (Chorus Verse)',
      date: '17 Oct 2018',
      image: 'https://via.placeholder.com/300x200',
      type: 'Music',
    },
  ];

  const handleEventTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEventType(event.target.value as string);
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeRange(event.target.value as string);
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#ffffff', // White background color
        minHeight: '100vh', // Ensures the page spans the full viewport height
      }}
    >
      {/* Filters Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="event-type-label">Show me</InputLabel>
          <Select
            labelId="event-type-label"
            value={eventType}
            onChange={handleEventTypeChange}
            label="Show me"
          >
            <MenuItem value="all">All Events</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="exhibition">Exhibition</MenuItem>
            <MenuItem value="theatre">Theatre</MenuItem>
            <MenuItem value="dance">Dance</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="time-range-label">At any time</InputLabel>
          <Select
            labelId="time-range-label"
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="At any time"
          >
            <MenuItem value="any">At any time</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="this-week">This Week</MenuItem>
            <MenuItem value="this-month">This Month</MenuItem>
            <MenuItem value="date-range">Date Range</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary">
          Find Events
        </Button>
      </Box>


      {/* Events Grid */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
            <Card
              sx={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Card Media */}
              <CardMedia
                component="img"
                height="140"
                image={event.image}
                alt={event.title}
              />

              {/* Card Content */}
              <CardContent sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
                <Typography variant="h6" component="div" noWrap>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
              </CardContent>

              {/* Card Actions */}
              <CardActions>
                <Button size="small" color="primary">
                  More Info
                </Button>
                <Button size="small" color="secondary">
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default EventsPage;
