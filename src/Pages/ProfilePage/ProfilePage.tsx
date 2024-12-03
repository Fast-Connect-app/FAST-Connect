import { Box, Card, CardContent, Avatar, Typography, Button, Link } from "@mui/material";
import { GitHub as GitHubIcon, Twitter as TwitterIcon, Instagram as InstagramIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import styles from "./Profile.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
import { Profile } from "../../../Backend/Classes/Profile";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { auth } from "../../../Backend/FirebaseApp";
import ProfileCard from "./Components/ProfileCard";
import StudentProfileCard from "./Components/StudentProfile";
import AlumniProfileCard from "./Components/AlumniProfile";
import { AlumniProfile } from "../../../Backend/Classes/AlumniProfile";
import { StudentProfile } from "../../../Backend/Classes/StudentProfile";
interface ProfilePageState extends AbstractPageState {
  user: Profile | null;
  alumni: AlumniProfile | null;
  student: StudentProfile | null;
  loading: boolean;
}

class ProfilePage extends AbstractPage<object, ProfilePageState> {
  static contextType = PageTitleContext; // Correct contextType assignment
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
    this.onProfileEdit = this.onProfileEdit.bind(this);
    this.onAlumniProfileEdit = this.onAlumniProfileEdit.bind(this);
    this.onStudentProfileEdit = this.onStudentProfileEdit.bind(this);
  }

  async componentDidMount() {
    try {
      const { setPageTitle } = this.context as PageTitleContextType;
      setPageTitle("Profile");
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userAuth = UserAuthentication.GetInstance();
          const userProfile: Profile | null = await userAuth.GetCurrentUserProfile();
          let _alumni = null;
          let _student = null;
          if (userProfile != null) {
            if (userProfile.type == "alumni") {
              const alumniDatabaseAdapter = AlumniProfile.GetDatabaseAdapter();
              const alumniJSON = await alumniDatabaseAdapter.LoadById(userProfile.userId);
              _alumni = AlumniProfile.fromFirebaseJson(alumniJSON);
            } else {
              const studentDatabaseAdapter = StudentProfile.GetDatabaseAdapter();
              const studentJson = await studentDatabaseAdapter.LoadById(userProfile.userId);
              _student = StudentProfile.FromFirebaseJson(studentJson);
            }
            this.setState({
              user: userProfile,
              alumni: _alumni,
              student: _student,
              loading: false,
            });
          }
        } else {
          console.log("No user is signed in.");
        }
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  async onProfileEdit(userProfile: Profile): Promise<void> {
    try {
      const userAuth = UserAuthentication.GetInstance();
      const userID: string | undefined = userAuth.GetCurrentUserId();
      if (typeof userID === "string" && userProfile instanceof Profile) {
        const profileAdapter = Profile.GetDatabaseAdapter();
        await profileAdapter.Modify(userID, userProfile.GetJsonData());
        this.setState({
          user: userProfile,
        });
      }
      return;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  async onAlumniProfileEdit(alumniProfile: AlumniProfile): Promise<void> {
    try {
      const userAuth = UserAuthentication.GetInstance();
      const userID: string | undefined = userAuth.GetCurrentUserId();
      if (typeof userID === "string" && alumniProfile instanceof AlumniProfile) {
        const alumniProfileAdapter = AlumniProfile.GetDatabaseAdapter();
        await alumniProfileAdapter.Modify(userID, alumniProfile.GetJsonData());
        this.setState({
          alumni: alumniProfile,
        });
      }
      return;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  async onStudentProfileEdit(studentProfile: StudentProfile): Promise<void> {
    try {
      const userAuth = UserAuthentication.GetInstance();
      const userID: string | undefined = userAuth.GetCurrentUserId();
      if (typeof userID === "string" && studentProfile instanceof StudentProfile) {
        const studentProfileAdapter = StudentProfile.GetDatabaseAdapter();
        await studentProfileAdapter.Modify(userID, studentProfile.GetJsonData());
        this.setState({
          student: studentProfile,
        });
      }
      return;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.split(",")[1];
        try {
          const userAuth = UserAuthentication.GetInstance();
          const userID: string | undefined = userAuth.GetCurrentUserId();
          if (typeof userID === "string") {
            const profileAdapter = Profile.GetDatabaseAdapter();
            const userProfile = this.state.user;
            if (userProfile != null) {
              userProfile.profilePic = base64String;
              await profileAdapter.Modify(userID, userProfile.GetJsonData());
              this.setState({
                user: userProfile,
              });
            }
          }
          return;
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };
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
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className={styles.profileCard}>
              <CardContent>
                <Box className={styles.profileCardContent}>
                  <Avatar className={styles.avatar} alt={user.userName} src={user.profilePic || undefined} sx={{ width: 100, height: 100 }} />
                  <Typography>{user.userName}</Typography>
                  <Box className={styles.followMessageButtons}>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                      Follow
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      Message
                    </Button>
                  </Box>
                  <Button variant="contained" component="label" color="primary" size="small" sx={{ mt: 2 }}>
                    Upload Profile Picture
                    <input type="file" accept="image/*" hidden onChange={this.handleFileChange} />
                  </Button>
                </Box>
              </CardContent>{" "}
            </Card>
          </Grid>
          <ProfileCard userProfile={user} onSave={this.onProfileEdit}></ProfileCard>
          {/* Social Links Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className={styles.socialLinksCard}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Social Links
                </Typography>
                <Box>
                  {[
                    { platform: "Website", url: "https://example.com", icon: "🌐" },
                    { platform: "GitHub", url: "https://github.com", icon: <GitHubIcon /> },
                    { platform: "Twitter", url: "https://twitter.com", icon: <TwitterIcon /> },
                    { platform: "Instagram", url: "https://instagram.com", icon: <InstagramIcon /> },
                    { platform: "Facebook", url: "https://facebook.com", icon: <FacebookIcon /> },
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
                      <Box sx={{ mr: 11 }}>{link.icon}</Box>

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
          {user.type == "alumni" ? <AlumniProfileCard alumniProfile={alumni} onSave={this.onAlumniProfileEdit}></AlumniProfileCard> : <StudentProfileCard studentProfile={student} onSave={this.onStudentProfileEdit}></StudentProfileCard>}
        </Grid>
      </Box>
    );
  }
}

export default ProfilePage;
