import { Card, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Common.module.css"; // Import the CSS module
import { StudentProfile } from "../../../../Backend/Classes/StudentProfile";

const ViewStudentProfileCard = (props: { studentProfile: StudentProfile}) => {
  const studentProfile = props.studentProfile;

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
              <Typography className={styles.cardValue}>{studentProfile.dateOfAdmission instanceof Date ? studentProfile.dateOfAdmission.toISOString().split("T")[0] : <Box>Unassigned</Box>}</Typography>
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
            
              <Box className={styles.resumeLines}>
                {studentProfile.resume?.split("\n").map((paragraph, index) => (
                  <Typography key={index} className={styles.cardValue} component="p">
                    {paragraph}
                  </Typography>))}
                </Box>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default ViewStudentProfileCard;
