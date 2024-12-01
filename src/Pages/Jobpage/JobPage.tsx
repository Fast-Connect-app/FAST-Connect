import React, { Component, ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./JobPage.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";

interface Job {
  id: number;
  title: string;
  location: string;
  category: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Data Science Engineer, Geospatial",
    location: "Boston",
    category: "Data Science",
  },
  {
    id: 2,
    title: "Release Automation Engineer (Kubernetes)",
    location: "Boston",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    location: "Boston",
    category: "Engineering",
  },
  {
    id: 4,
    title: "Growth Marketer",
    location: "Boston",
    category: "Marketing",
  },
  {
    id: 5,
    title: "Marketing and Sales Content Lead",
    location: "Boston",
    category: "Marketing",
  },
  {
    id: 6,
    title: "Customer Facing Data Scientist",
    location: "Japan",
    category: "Data Science",
  },
  {
    id: 7,
    title: "Software Engineer (BI & Automation)",
    location: "Kiev",
    category: "Engineering",
  },
  {
    id: 8,
    title: "Print & Branding Designer",
    location: "Kiev",
    category: "Marketing",
  },
  {
    id: 9,
    title: "Federal - Customer Facing Data Scientist",
    location: "Washington",
    category: "Data Science",
  },
];

interface JobPageState extends AbstractPageState {
  selectedCategory: string;
  selectedLocation: string;
  openDialog: boolean; // Track dialog visibility
  selectedJob: Job | null; // Track selected event details
}

class JobPage extends AbstractPage<{}, JobPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      error: null,
      selectedCategory: "All Positions",
      selectedLocation: "All locations",
      openDialog: false,
      selectedJob: null,
    };
  }
  static contextType = PageTitleContext; // Correct contextType assignment

  componentDidMount() {
    // Correctly access context here
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Job Page");
  }

  handleCategoryChange = (_: React.ChangeEvent<{}>, value: string) => {
    this.setState({ selectedCategory: value });
  };

  handleLocationChange = (event: SelectChangeEvent<string>) => {
    this.setState({ selectedLocation: event.target.value as string });
  };
  handleDialogOpen = (event: Job) => {
    console.log("fucking open");
    this.setState({ openDialog: true, selectedJob: event });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedJob: null });
  };
  renderDialog() {
    const { openDialog, selectedJob } = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={this.handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedJob?.title || "Event Details"}</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Box>
              <Typography>
                <strong>Location:</strong> {selectedJob.location}
              </Typography>
              <Typography>
                <strong>Category:</strong> {selectedJob.category}
              </Typography>
              <Typography>
                <strong>Description:</strong> This is a placeholder description
                for the job.
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
    const { selectedCategory, selectedLocation } = this.state as {
      selectedCategory: string;
      selectedLocation: string;
    };

    const categories = [
      "All Positions",
      "Data Science",
      "Engineering",
      "Marketing",
    ];

    const filteredJobs = jobs.filter(
      (job) =>
        (selectedCategory === "All Positions" ||
          job.category === selectedCategory) &&
        (selectedLocation === "All locations" ||
          job.location === selectedLocation)
    );

    return (
      <>
        {" "}
        <Box className={styles.pageContainer}>
          {/* Header */}
          <Typography variant="h4" className={styles.header}>
            Open positions in{" "}
            <Select
              value={selectedLocation}
              onChange={this.handleLocationChange}
              className={styles.locationSelect}
            >
              <MenuItem value="All locations">All locations</MenuItem>
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="Kiev">Kiev</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="Washington">Washington</MenuItem>
            </Select>
          </Typography>

          {/* Filter Tabs */}
          <Tabs
            value={selectedCategory}
            onChange={this.handleCategoryChange}
            centered
            className={styles.filterTabs}
          >
            {categories.map((category) => (
              <Tab key={category} value={category} label={category} />
            ))}
          </Tabs>

          {/* Job Grid */}
          <Grid container spacing={4} className={styles.jobGrid}>
            {filteredJobs.map((job) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job.id}>
                <Card className={styles.jobCard}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 16px",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      className={styles.applyButton}
                      sx={{ flex: 1, marginRight: "8px" }}
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={styles.infoButton}
                      sx={{ flex: 1 }}
                      onClick={() => this.handleDialogOpen(job)}
                    >
                      Info
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {this.renderDialog()}
      </>
    );
  }
}

export default JobPage;
