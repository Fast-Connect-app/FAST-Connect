import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import styles from "./Common.module.css"; // Import the CSS module
import { Job, AlumniProfile } from "../../../../Backend/Classes/AlumniProfile";

const AlumniProfileCard = (props: { alumniProfile: AlumniProfile; onSave: (updatedProfile: AlumniProfile) => Promise<void> }) => {
  const alumniProfile = props.alumniProfile;
  const [editing, setEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobStartDate, setJobStartDate] = useState(new Date());
  const [jobEndDate, setJobEndDate] = useState(new Date());
  const [jobErrorMsg, setJobErrorMsg] = useState("");
  const [graduationDate, setGraduationDate] = useState(alumniProfile.dateOfGraduation instanceof Date && !isNaN(alumniProfile.dateOfGraduation.getTime()) ? alumniProfile.dateOfGraduation : new Date());
  const [mainEditingControlsEnabled, setMainEditingControlsEnabled] = useState(true);
  const [editable, setEditable] = useState([props.alumniProfile.jobHistory]);

  const onEditConfirm = async () => {
    alumniProfile.jobHistory = editable[0] as Job[];
    alumniProfile.dateOfGraduation = graduationDate as Date;
    await props.onSave(alumniProfile);
  };

  const handleDialogueOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogueClose = () => {
    setDialogOpen(false);
  };

  const handleAddJob = () => {
    if (jobStartDate > jobEndDate || jobStartDate > new Date() || jobEndDate > new Date()) {
      setJobErrorMsg("Invalid dates. Please ensure the start date is before the end date and both dates are not in the future.");
      return;
    }
    const newJob: Job = new Job(jobTitle, jobCompany, jobStartDate, jobEndDate);

    setEditable((prev) => {
      if (prev[0] != null) {
        const updatedJobs = [...(prev[0] as Job[]), newJob];
        return [updatedJobs, prev[1]];
      } else {
        const updatedJobs = [newJob];
        return [updatedJobs, prev[1]];
      }
    });
    handleDialogueClose();
  };

  const deleteJob = (index: unknown) => {
    try {
      const updatedJobs = editable[0];
      if (Array.isArray(updatedJobs)) {
        updatedJobs.splice(index as number, 1);
        setEditable([updatedJobs, editable[1]]);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Dialog open={dialogOpen} onClose={handleDialogueClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Job</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the job details.</DialogContentText>
          <TextField autoFocus margin="dense" id="jobTitle" label="Job Title" type="text" fullWidth value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          <TextField margin="dense" id="companyName" label="Company Name" type="text" fullWidth value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} />
          <TextField margin="dense" id="startDate" label="Start Date" type="date" fullWidth value={jobStartDate.toISOString().split("T")[0]} onChange={(e) => setJobStartDate(new Date(e.target.value))} />
          <TextField margin="dense" id="endDate" label="End Date" type="date" fullWidth value={jobEndDate.toISOString().split("T")[0]} onChange={(e) => setJobEndDate(new Date(e.target.value))} />
          {jobErrorMsg != "" && (
            <Typography margin="dense" id="error" className={styles.error}>
              {jobErrorMsg}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogueClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddJob} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Container className={styles.bigCardContainer}>
        <div className={styles.graduationDiv}>
          <Card className={styles.contactCard}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography className={styles.cardLabel} variant="h6">
                Date of Graduation:
              </Typography>
              {editing ? (
                <TextField margin="dense" id="gradDate" label="Graduation Date" type="date" fullWidth value={graduationDate.toISOString().split("T")[0]} onChange={(e) => setGraduationDate(new Date(e.target.value))} />
              ) : (
                <Typography className={styles.cardValue}>{alumniProfile.dateOfGraduation instanceof Date ? alumniProfile.dateOfGraduation.toISOString().split("T")[0] : <div>Unassigned</div>}</Typography>
              )}
            </Box>
          </Card>
          {editing ? (
            <Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mt: 2 }}
                onClick={async () => {
                  setMainEditingControlsEnabled(false);
                  await onEditConfirm();
                  setMainEditingControlsEnabled(true);
                  setEditing(false);
                }}
                disabled={!mainEditingControlsEnabled}
              >
                OK
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => {
                  setEditing(false);
                }}
                disabled={!mainEditingControlsEnabled}
              >
                CANCEL
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => {
                setEditing(true);
              }}
              disabled={!mainEditingControlsEnabled}
            >
              EDIT
            </Button>
          )}
        </div>
        <Card className={(styles.contactCard, styles.secondCard)}>
          <Box className={styles.jobHistoryTitleCard}>
            {editing && (
              <Button style={{ margin: "10px" }} variant="contained" color="secondary" size="small" onClick={handleDialogueOpen} disabled={!mainEditingControlsEnabled}>
                ADD
              </Button>
            )}
            <Typography variant="h6" style={{ textAlign: "center", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Job History
            </Typography>
          </Box>
          {editable[0]?.map((job: Job, index: unknown) => (
            <Card key={index} className={styles.jobCard}>
              <Typography>{job.jobTitle}</Typography>
              <Typography>{job.companyName}</Typography>
              <Typography>{job.startDate.toDateString()}</Typography>
              <Typography>{job.endDate.toDateString()}</Typography>
              {editing && (
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={!mainEditingControlsEnabled}
                  onClick={() => {
                    deleteJob(index);
                  }}
                >
                  Delete
                </Button>
              )}
            </Card>
          ))}
        </Card>
      </Container>
    </Grid>
  );
};

export default AlumniProfileCard;
