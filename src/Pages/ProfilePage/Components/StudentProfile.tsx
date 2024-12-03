import { Card, Box, Button, CardContent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import styles from "./Common.module.css"; // Import the CSS module
import { Profile } from "../../../../Backend/Classes/Profile";

const StudentProfileCard = (props: { userProfile: Profile; onSave: (updatedProfile: Profile) => Promise<void> }) => {
  const [editing, setEditing] = useState(false);
  const [editingControlsEnabled, setEditingControlsEnabled] = useState(true);
  const [editable, setEditable] = useState([props.userProfile.userName, props.userProfile.rollNumber, props.userProfile.bio]);

  const userProfile = props.userProfile;
  const onEditConfirm = async () => {
    userProfile.bio = editable[2];
    userProfile.rollNumber = editable[1];
    userProfile.userName = editable[0];
    await props.onSave(userProfile);
  };
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card className={styles.contactCard}>
        <CardContent>
          <Box>
            {/* ID specifies if it should be editable and if so what its position is in the editable string array */}
            {[
              { label: "Full Name", id: 0, value: userProfile.userName },
              { label: "Email", id: -1, value: userProfile.email },
              { label: "Gender", id: -2, value: userProfile.gender.toUpperCase() },
              { label: "Roll No", id: 1, value: userProfile.rollNumber },
              { label: "Bio", id: 2, value: userProfile.bio },
            ].map((field, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: index === 0 ? 0 : 2,
                }}
              >
                <Typography variant="h6" className={styles.contactHeading} sx={{ flex: "0 0 1" }}>
                  {field.label}
                </Typography>
                {/* If its editing then its a textfield otherwise its a typography */}
                {editing && field.id >= 0 ? (
                  <TextField
                    value={editable[field.id]}
                    onChange={(e) => {
                      const temp = [...editable];
                      temp[field.id] = e.target.value;
                      setEditable(temp);
                    }}
                  />
                ) : (
                  <Typography>{field.value}</Typography>
                )}
              </Box>
            ))}
            {!editing ? (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mt: 2 }}
                disabled={!editingControlsEnabled}
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ mt: 2 }}
                  disabled={!editingControlsEnabled}
                  onClick={async () => {
                    setEditingControlsEnabled(false);
                    await onEditConfirm();
                    setEditingControlsEnabled(true);
                    setEditing(false);
                  }}
                >
                  OK
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ mt: 2 }}
                  disabled={!editingControlsEnabled}
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  CANCEL
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StudentProfileCard;
