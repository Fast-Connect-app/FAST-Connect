import { Card, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import styles from "./Common.module.css"; // Import the CSS module
import { StudentProfile } from "../../../../Backend/Classes/StudentProfile";

const StudentProfileCard = (props: { studentProfile: StudentProfile; onSave: (updatedProfile: StudentProfile) => Promise<void> }) => {
  const studentProfile = props.studentProfile;
  const [editing, setEditing] = useState(false);
  const [editingControlsEnabled, setEditingControlsEnabled] = useState(true);
  const [resume, setResume] = useState(typeof studentProfile.resume == "string" ? studentProfile.resume : "");
  const [dateOfAdmission, setDateOfAdmission] = useState(studentProfile.dateOfAdmission instanceof Date && !isNaN(studentProfile.dateOfAdmission.getTime()) ? studentProfile.dateOfAdmission : new Date());
  const [errorMsg, setErrorMsg] = useState("");
  const onEditConfirm = async () => {
    if (dateOfAdmission > new Date()) {
      setErrorMsg("Date of admission cannot be in the future.");
      setEditingControlsEnabled(true);
      return;
    }
    setErrorMsg("");
    studentProfile.resume = resume;
    studentProfile.dateOfAdmission = dateOfAdmission;
    await props.onSave(studentProfile);
    setEditingControlsEnabled(true);
    setEditing(false);
  };

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Box className={(styles.graduationDiv, styles.studentCardContainer)}>
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
              <TextField margin="dense" id="gradDate" label="Graduation Date" type="date" value={dateOfAdmission.toISOString().split("T")[0]} onChange={(e) => setDateOfAdmission(new Date(e.target.value))} />
            ) : (
              <Typography className={styles.cardValue}>{studentProfile.dateOfAdmission instanceof Date ? studentProfile.dateOfAdmission.toISOString().split("T")[0] : <Box>Unassigned</Box>}</Typography>
            )}
          </Box>
        </Card>
        <Card sx={{ marginTop: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography className={styles.cardLabel} variant="h6">
              Resume:
            </Typography>
            {editing ? (
              <TextField
                multiline
                fullWidth
                rows={10}
                value={resume}
                onChange={(e) => {
                  setResume(e.target.value);
                }}
              ></TextField>
            ) : (
              <Box className={styles.resumeLines}>
                {resume.split("\n").map((paragraph, index) => (
                  <Typography key={index} className={styles.cardValue} component="p">
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Card>
        {editing ? (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mt: 2, marginRight: 5 }}
              onClick={async () => {
                setEditingControlsEnabled(false);
                await onEditConfirm();
              }}
              disabled={!editingControlsEnabled}
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
                setErrorMsg("");
              }}
              disabled={!editingControlsEnabled}
            >
              CANCEL
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => {
                setEditing(true);
              }}
              disabled={!editingControlsEnabled}
            >
              EDIT
            </Button>
          </Box>
        )}
        {errorMsg != "" && (
          <Typography className={styles.error} sx={{ textAlign: "center", marginY: 2, display: "inline-block" }}>
            {errorMsg}
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default StudentProfileCard;
