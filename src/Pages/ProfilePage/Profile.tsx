import React from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  LinearProgress,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Profile.module.css"; // Import the CSS module
import AbstractPage from "../AbstractPages";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";

class ProfilePage extends AbstractPage {
  static contextType = PageTitleContext; // Correct contextType assignment
  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Profile");
  }
  renderContent() {
    return (
      <Box className={styles.pageContainer}>
        <Grid container spacing={3} sx={{ width: "100%", maxHeight: "100%" }}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className={styles.profileCard}>
              <CardContent>
                <Box className={styles.profileCardContent}>
                  <Avatar className={styles.avatar} alt="John Doe" src="" />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Full Stack Developer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bay Area, San Francisco, CA
                  </Typography>
                  <Box className={styles.followMessageButtons}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Follow
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      Message
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Details Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className={styles.contactCard}>
              <CardContent>
                <Box className={styles.contactCardContent}>
                  <Typography variant="h6" className={styles.contactHeading}>
                    Full Name
                  </Typography>
                  <Typography>John Doe</Typography>
                  <Typography
                    variant="h6"
                    className={styles.contactHeading}
                    sx={{ mt: 2 }}
                  >
                    Email
                  </Typography>
                  <Typography>fip@jukmuh.al</Typography>
                  <Typography
                    variant="h6"
                    className={styles.contactHeading}
                    sx={{ mt: 2 }}
                  >
                    Phone
                  </Typography>
                  <Typography>(239) 816-9029</Typography>
                  <Typography
                    variant="h6"
                    className={styles.contactHeading}
                    sx={{ mt: 2 }}
                  >
                    Mobile
                  </Typography>
                  <Typography>(320) 380-4539</Typography>
                  <Typography
                    variant="h6"
                    className={styles.contactHeading}
                    sx={{ mt: 2 }}
                  >
                    Address
                  </Typography>
                  <Typography>Bay Area, San Francisco, CA</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Social Links Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className={styles.socialLinksCard}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Social Links
                </Typography>
                <Box className={styles.socialLinksContent}>
                  {[
                    "Website",
                    "Github",
                    "Twitter",
                    "Instagram",
                    "Facebook",
                  ].map((platform) => (
                    <Link
                      key={platform}
                      href="#"
                      target="_blank"
                      rel="noopener"
                      sx={{
                        marginX: 1,
                        color: "primary.main",
                        textDecoration: "none",
                        alignSelf: "flex-start",
                        marginY: 2,
                      }}
                    >
                      {platform}
                    </Link>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Project Status Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className={styles.projectCard}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Project Status
                </Typography>
                {[
                  "Web Design",
                  "Website Markup",
                  "One Page",
                  "Mobile Template",
                  "Backend API",
                ].map((project, index) => (
                  <Box key={index} className={styles.projectCardContent}>
                    <Typography variant="body2" className={styles.projectTitle}>
                      {project}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(index + 1) * 20}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ProfilePage;
