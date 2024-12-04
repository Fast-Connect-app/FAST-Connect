import { Card, Box, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Common.module.css"; // Import the CSS module
import { Profile } from "../../../../Backend/Classes/Profile";

const ViewProfileCard = (props: { userProfile: Profile}) => {
  
  const userProfile = props.userProfile;
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
                  <Typography>{field.value}</Typography>
              </Box>
            ))}            
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ViewProfileCard;
