import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const EventsPage: React.FC = () => {
  const [eventType, setEventType] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("any");

  const events = [
    {
      id: 1,
      title: "Phil Collins: This Is The Day",
      date: "10 Aug - 21 Oct 2018",
      image: "https://via.placeholder.com/300x200",
      type: "Exhibition",
    },
    {
      id: 2,
      title: "Swing, Soul, and Showsongs",
      date: "16 Oct 2018",
      image: "https://via.placeholder.com/300x200",
      type: "Music",
    },
    {
      id: 3,
      title: "Chapter & Verse (Chorus Verse)",
      date: "17 Oct 2018",
      image: "https://via.placeholder.com/300x200",
      type: "Music",
    },
  ];
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleEventTypeChange = (event: SelectChangeEvent<string>) => {
    setEventType(event.target.value as string);
  };

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by event type
    if (eventType !== "all") {
      filtered = filtered.filter(
        (event) => event.type.toLowerCase() === eventType.toLowerCase()
      );
    }

    // Filter by time range (for simplicity, assuming today, this-week, this-month)
    if (timeRange !== "any") {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date.split(" ")[0]); // Extract the first date part for simplicity
        if (timeRange === "today") {
          return eventDate.toDateString() === today.toDateString();
        } else if (timeRange === "this-week") {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        } else if (timeRange === "this-month") {
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        }
        return true;
      });
    }

    setFilteredEvents(filtered);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#ffffff", // White background color
        minHeight: "100vh", // Ensures the page spans the full viewport height
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {/* Filters Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
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

        <Button variant="contained" color="primary" onClick={filterEvents}>
          Find Events
        </Button>
      </Box>

      {/* Events Grid */}
      <Box
        sx={{
          flexGrow: 1, // Ensures that the grid takes up all available space
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "155vh",
        }}
      >
        <Grid container spacing={3}>
          {filteredEvents.length === 0 ? (
            <Box sx={{ width: "150vh", textAlign: "center" }}>
              <Typography variant="h6">No events found</Typography>
            </Box>
          ) : (
            filteredEvents.map((event) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                  <CardContent sx={{ flex: "1 1 auto", overflow: "hidden" }}>
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
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default EventsPage;
