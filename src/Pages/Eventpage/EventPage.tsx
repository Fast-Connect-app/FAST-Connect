import React from "react";
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
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import styles from "./EventPage.module.css"; // Import the CSS module

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  type: string;
}

interface EventsPageState extends AbstractPageState {
  eventType: string;
  timeRange: string;
  events: Event[];
  filteredEvents: Event[];
}

class Eventspage extends AbstractPage<{}, EventsPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "null",
      error: "null",
      eventType: "all",
      timeRange: "any",
      events: [
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
      ],
      filteredEvents: [],
    };
  }

  componentDidMount() {
    this.setState({ filteredEvents: this.state.events });
  }

  handleEventTypeChange = (event: SelectChangeEvent<string>) => {
    this.setState({ eventType: event.target.value });
  };

  handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    this.setState({ timeRange: event.target.value });
  };

  filterEvents = () => {
    const { events, eventType, timeRange } = this.state;
    let filtered = events;

    if (eventType !== "all") {
      filtered = filtered.filter(
        (event) => event.type.toLowerCase() === eventType.toLowerCase()
      );
    }

    if (timeRange !== "any") {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date.split(" ")[0]);
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

    this.setState({ filteredEvents: filtered });
  };

  renderContent() {
    return (
      <Box className={styles.pageContainer}>
        <Box className={styles.filtersSection}>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="event-type-label">Show me</InputLabel>
            <Select
              labelId="event-type-label"
              value={this.state.eventType}
              onChange={this.handleEventTypeChange}
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
              value={this.state.timeRange}
              onChange={this.handleTimeRangeChange}
              label="At any time"
            >
              <MenuItem value="any">At any time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this-week">This Week</MenuItem>
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="date-range">Date Range</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={this.filterEvents}
          >
            Find Events
          </Button>
        </Box>

        <Box className={styles.eventsGridContainer}>
          <Grid container spacing={3}>
            {this.state.filteredEvents.length === 0 ? (
              <Box className={styles.noEventsBox}>
                <Typography variant="h6">No events found</Typography>
              </Box>
            ) : (
              this.state.filteredEvents.map((event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                  <Card className={styles.card}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image}
                      alt={event.title}
                    />
                    <CardContent className={styles.cardContent}>
                      <Typography variant="h6" component="div" noWrap>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.date}
                      </Typography>
                    </CardContent>
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
  }
}

export default Eventspage;
