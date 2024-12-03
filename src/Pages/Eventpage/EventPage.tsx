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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import styles from "./EventPage.module.css"; // Import the CSS module
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout"; // Import context correctly
import {Events} from "../../../Backend/Classes/Events"; // Import the Events class
interface EventsPageState extends AbstractPageState {
  eventType: string;
  timeRange: string;
  events: Events[];
  filteredEvents: Events[];
  openDialog: boolean; // Track dialog visibility
  selectedEvent: Events | null; // Track selected event details
}

class Eventspage extends AbstractPage<{}, EventsPageState> {
  // Correctly set the contextType to the actual context
  static contextType = PageTitleContext; // Correct contextType assignment

  constructor(props: any) {
    super(props);
    this.state = {
      data: "null",
      error: "null",
      eventType: "all",
      timeRange: "any",
      events: [],
      filteredEvents: [],
      openDialog: false,
      selectedEvent: null,
    };
  }

  async componentDidMount() {
    // Correctly access context here
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Events Page"); // Set the title when the component is mounted
    //Get events from backend
    try{
      const eventsAdapter = Events.GetDatabaseAdapter();
      const data = await eventsAdapter.LoadAll()
      if(data!=null){
        if(data instanceof Array){
          const newEvents =data.map((event)=>Events.fromFirebaseJson(event));
          this.setState({
            events: newEvents,
            filteredEvents: newEvents,
          });
        }
    }
  }
    catch(error){
      if (error instanceof Error){
        console.log(error.message);
      }
      else{
        throw new Error("An unknown error occurred. Please try again.");
      }
    }
  }
  handleDialogOpen = (event: Events) => {
    this.setState({ openDialog: true, selectedEvent: event });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedEvent: null });
  };

  handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    this.setState({ timeRange: event.target.value });
  };

  filterEvents = () => {
    const { events, timeRange } = this.state;
    let filtered = events;

    if (timeRange !== "any") {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = event.dateOfOccurence;
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

  renderDialog() {
    const { openDialog, selectedEvent } = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={this.handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedEvent?.title || "Event Details"}</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <Typography>
                <strong>Date:</strong> {selectedEvent.dateOfOccurence.toDateString()}
              </Typography>
              <Typography>
                <strong>Description:</strong> {selectedEvent.description}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderContent() {
    console.log()
    return (
      <>
        {" "}
        <Box className={styles.pageContainer}>
          <Box className={styles.filtersSection}>
            <FormControl variant="outlined" sx={{ minWidth: 150 , color: 'white'}}>
              <InputLabel id="time-range-label" sx={{color : 'white'}}>At any time</InputLabel>
              <Select
                labelId="time-range-label"
                value={this.state.timeRange}
                onChange={this.handleTimeRangeChange}
                label="At any time"
                sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
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
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.eventID}>
                    <Card className={styles.card}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={event.picBase64Compressed}
                        alt={event.title}
                      />
                      <CardContent className={styles.cardContent}>
                        <Typography variant="h6" component="div" noWrap>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.dateOfOccurence.toDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => this.handleDialogOpen(event)} // Pass the event data
                        >
                          More Info
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
        {this.renderDialog()}
      </>
    );
  }
}

export default Eventspage;
