import React, { Component } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Link,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import styles from "./ViewProfile.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";
import { Profile } from "../../../Backend/Classes/Profile";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { auth } from "../../../Backend/FirebaseApp";
import ViewProfileCard from "./Components/ViewProfileCard";
import ViewStudentProfileCard from "./Components/ViewStudentProfile";
import ViewAlumniProfileCard from "./Components/ViewAlumniProfile";
import { AlumniProfile } from "../../../Backend/Classes/AlumniProfile";
import { StudentProfile } from "../../../Backend/Classes/StudentProfile";

interface ViewProfilePageState extends AbstractPageState {
  user: Profile | null;
  alumni: AlumniProfile | null;
  student: StudentProfile | null;
  loading: boolean;
}

let uid: string = "";
export function SetUserId(_uid: string) {
  uid = _uid;
  console.log(uid);
}

class ViewProfilePage extends AbstractPage<object, ViewProfilePageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: null,
      error: null,
      user: null,
      alumni: null,
      student: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      while (uid == "");
      let data = await Profile.GetDatabaseAdapter().LoadById(uid);
      let user = Profile.fromFirebaseJson(data);

      this.setState({ user: user, loading: false });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  }

  render() {
    const { user, loading } = this.state;
    let { alumni, student } = this.state;
    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    if (!user) {
      return <Typography>Error: User not found</Typography>;
    }

    if (alumni == null) {
      alumni = new AlumniProfile(null, null);
    }
    if (student == null) {
      student = new StudentProfile(null, null);
    }

    return (
      <Box className={styles.pageContainer}>
        <Grid container spacing={3} sx={{ width: "100%", maxHeight: "100%" }}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card className={styles.profileCard}>
              <CardContent>
                <Box className={styles.profileCardContent}>
                  <Avatar
                    className={styles.avatar}
                    alt={user.userName}
                    src={user.profilePic || undefined}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography>{user.userName}</Typography>
                  <Box className={styles.followMessageButtons}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      Message
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Block
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      Add to Group
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <ViewProfileCard userProfile={user}></ViewProfileCard>
          {/* Social Links Card */}
          <Grid item xs={12} md={4}>
            <Card className={styles.socialLinksCard}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Social Links
                </Typography>
                <Box>
                  {[
                    {
                      platform: "Website",
                      url: "https://example.com",
                      icon: "🌐",
                    },
                    {
                      platform: "GitHub",
                      url: "https://github.com",
                      icon: <GitHubIcon />,
                    },
                    {
                      platform: "Twitter",
                      url: "https://twitter.com",
                      icon: <TwitterIcon />,
                    },
                    {
                      platform: "Instagram",
                      url: "https://instagram.com",
                      icon: <InstagramIcon />,
                    },
                    {
                      platform: "Facebook",
                      url: "https://facebook.com",
                      icon: <FacebookIcon />,
                    },
                  ].map((link, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        color: "text.primary",
                      }}
                    >
                      {/* Icon */}
                      <Box sx={{ mr: 2 }}>{link.icon}</Box>

                      {/* Link */}
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          color: "primary.main",
                          textDecoration: "none",
                          ":hover": { textDecoration: "underline" },
                        }}
                      >
                        {link.platform}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {user.type === "alumni" ? (
            <ViewAlumniProfileCard
              alumniProfile={alumni}
            ></ViewAlumniProfileCard>
          ) : (
            <ViewStudentProfileCard
              studentProfile={student}
            ></ViewStudentProfileCard>
          )}
        </Grid>
      </Box>
    );
  }
}

export default ViewProfilePage;
