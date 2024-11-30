import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import BaseSubDrawer from "../../../BaseSubDrawer";
import styles from "../SideBar-Button.module.css";

// List of random job details for now
const randomJobDetails = [
  {
    title: "Software Engineer",
    description: "Design, develop, and maintain software applications.",
    qualifications:
      "Bachelor's in Computer Science or related field, 2+ years experience.",
    workingConditions: "Hybrid, office 2-3 days a week.",
    employmentType: "Full-time",
  },
  {
    title: "Product Manager",
    description: "Oversee the product lifecycle from ideation to launch.",
    qualifications:
      "Bachelor's in Business or related field, 3+ years experience in product management.",
    workingConditions: "Office-based.",
    employmentType: "Full-time",
  },
  {
    title: "Data Scientist",
    description:
      "Analyze data to derive actionable insights and machine learning models.",
    qualifications:
      "Master's in Data Science or related field, experience with Python, R, and SQL.",
    workingConditions: "Remote",
    employmentType: "Full-time",
  },
  {
    title: "UX Designer",
    description:
      "Design user interfaces and ensure a seamless user experience.",
    qualifications: "Degree in Design or related field, 3+ years in UX design.",
    workingConditions: "Hybrid, office 3 days a week.",
    employmentType: "Full-time",
  },
  {
    title: "Frontend Developer",
    description:
      "Develop and maintain the front-end functionality of web applications.",
    qualifications:
      "Bachelor's in Computer Science, 2+ years experience with HTML, CSS, JavaScript.",
    workingConditions: "Remote",
    employmentType: "Full-time",
  },
  {
    title: "Backend Developer",
    description: "Develop and maintain server-side logic and databases.",
    qualifications:
      "Bachelor's in Computer Science, 3+ years experience with Node.js, Python, or Java.",
    workingConditions: "Office-based.",
    employmentType: "Full-time",
  },
];

interface JobSubDrawerState {
  jobs: typeof randomJobDetails;
  openDialog: boolean; // To manage dialog visibility
  selectedJob: (typeof randomJobDetails)[0] | null; // Selected job details
}

class JobSubDrawer extends BaseSubDrawer {
  state: JobSubDrawerState = {
    jobs: randomJobDetails,
    openDialog: false, // Initially dialog is closed
    selectedJob: null, // No job selected initially
  };

  handleJobClick = (index: number) => {
    const selectedJob = this.state.jobs[index];
    this.setState({
      openDialog: true, // Open dialog when a job is clicked
      selectedJob, // Set the selected job
    });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedJob: null }); // Close dialog
  };

  // Implement renderContent method for JobSubDrawer
  renderList() {
    const { jobs } = this.state;

    return (
      <List>
        {jobs.map((job, index) => (
          <ListItem
            key={index}
            className={styles.sideButtonText}
            component="li"
          >
            <ListItemButton onClick={() => this.handleJobClick(index)}>
              <ListItemText primary={job.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }

  renderContent() {
    const { openDialog, selectedJob } = this.state;

    return (
      <>
        {/* Directly render the content of the job list */}
        {this.renderList()}

        {/* Dialog for showing job details */}
        <Dialog
          open={openDialog}
          onClose={this.handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedJob?.title}</DialogTitle>
          <DialogContent>
            {selectedJob && (
              <Box>
                <p>
                  <strong>Description:</strong> {selectedJob.description}
                </p>
                <p>
                  <strong>Qualifications:</strong> {selectedJob.qualifications}
                </p>
                <p>
                  <strong>Working Conditions:</strong>{" "}
                  {selectedJob.workingConditions}
                </p>
                <p>
                  <strong>Employment Type:</strong> {selectedJob.employmentType}
                </p>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default JobSubDrawer;
