import { Card, Box, Button, CardContent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import styles from "./Common.module.css"; // Import the CSS module
import { Job, AlumniProfile } from "../../../../Backend/Classes/AlumniProfile";

const AlumniProfileCard = (props: { alumniProfile: AlumniProfile; onSave: (updatedProfile: AlumniProfile) => Promise<void> }) => {
  const [editing, setEditing] = useState(false);
  const [editingControlsEnabled, setEditingControlsEnabled] = useState(true);
  const [editable, setEditable] = useState([props.alumniProfile.jobHistory, props.alumniProfile.dateOfGraduation]);

  const alumniProfile = props.alumniProfile;
  const onEditConfirm = async () => {
    alumniProfile.jobHistory = editable[0] as Job[];
    alumniProfile.dateOfGraduation = editable[1] as Date;
    await props.onSave(alumniProfile);
  };
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card className={styles.contactCard}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Date of Graduation</Typography>
          <Typography>{new Date().toDateString()}</Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default AlumniProfileCard;
