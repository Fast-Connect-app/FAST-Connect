import {  Card, Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Common.module.css"; // Import the CSS module
import { Job, AlumniProfile } from "../../../../Backend/Classes/AlumniProfile";

const ViewAlumniProfileCard = (props: { alumniProfile: AlumniProfile}) => {
  const alumniProfile = props.alumniProfile;

 
  return (
    <Grid size={{ xs: 12, md: 8 }}>
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
              <Typography className={styles.cardValue}>{alumniProfile.dateOfGraduation instanceof Date ? alumniProfile.dateOfGraduation.toISOString().split("T")[0] : <div>Unassigned</div>}</Typography>           
            </Box>
          </Card>         
        </div>
        <Card className={(styles.contactCard, styles.secondCard)}>
          <Box className={styles.jobHistoryTitleCard}>
            <Typography variant="h6" style={{ textAlign: "center", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Job History
            </Typography>
          </Box>
          {alumniProfile.jobHistory?.map((job: Job, index: unknown) => (
            <Card key={index} className={styles.jobCard}>
              <Typography>{job.jobTitle}</Typography>
              <Typography>{job.companyName}</Typography>
              <Typography>{job.startDate.toDateString()}</Typography>
              <Typography>{job.endDate.toDateString()}</Typography>
             </Card>
          ))}
        </Card>
      </Container>
    </Grid>
  );
};

export default ViewAlumniProfileCard;
