import { Box, Card, CardContent, Avatar, Typography, Button, Link, TextField } from "@mui/material";
import { GitHub as GitHubIcon, Twitter as TwitterIcon, Instagram as InstagramIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import styles from "./Profile.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import { PageTitleContext, PageTitleContextType } from "../../Layouts/MainLayout";
import { Profile } from "../../../Backend/Classes/Profile";
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { auth } from "../../../Backend/FirebaseApp";
interface ProfilePageState extends AbstractPageState {
  user: Profile | null;
  loading: boolean;
  editing: boolean;
  editingControlsEnabled: boolean;
  editable: [string, string];
}

class ProfilePage extends AbstractPage<object, ProfilePageState> {
  static contextType = PageTitleContext; // Correct contextType assignment
  async componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Profile");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userAuth = UserAuthentication.GetInstance();
        const userProfile: Profile | null = await userAuth.GetCurrentUserProfile();
        if (userProfile != null) {
          this.setState({
            user: userProfile,
            editable: [userProfile.GetUserName(), userProfile.GetRollNumber()],
            loading: false,
          });
        }
      } else {
        console.log("No user is signed in.");
      }
    });
  }
  constructor(props: object) {
    super(props);
    this.state = {
      data: null,
      error: null,
      user: null,
      loading: true,
      editing: false,
      editingControlsEnabled: true,
      editable: ["", ""],
    };
  }

  initializeEdit() {}
  async confirmEdit(): Promise<void> {
    try {
      const newName = this.state.editable[0];
      const newRollNo = this.state.editable[1];
      const userAuth = UserAuthentication.GetInstance();
      const userID: string | undefined = userAuth.GetCurrentUserId();
      const userProfile: Profile | null = await userAuth.GetCurrentUserProfile();
      if (typeof userID === "string" && userProfile instanceof Profile) {
        const profileAdapter = Profile.GetDatabaseAdapter();
        userProfile.SetRollNumber(newRollNo);
        userProfile.SetUserName(newName);
        await profileAdapter.Modify(userID, userProfile.GetJsonData());
        this.setState({
          user: userProfile,
        });
      }
      return;
    } catch (error) {
      if (error instanceof Error) {
        return;
      }
    }
  }

  renderContent() {
    const { user, loading } = this.state;

    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    if (!user) {
      return <Typography>Error: User not found</Typography>;
    }

    return (
      <Box className={styles.pageContainer}>
        <Grid container spacing={3} sx={{ width: "100%", maxHeight: "100%" }}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className={styles.profileCard}>
              <CardContent>
                <Box className={styles.profileCardContent}>
                  <Avatar className={styles.avatar} alt={user.GetUserName()} src={user.GetProfilePic() || undefined} sx={{ width: 100, height: 100 }} />
                  <Box className={styles.followMessageButtons}>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                      Follow
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      Message
                    </Button>
                  </Box>
                </Box>
              </CardContent>{" "}
            </Card>
          </Grid>

          {/* Contact Details Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className={styles.contactCard}>
              <CardContent>
                <Box>
                  {/* ID specifies if it should be editable and if so what its position is in the editable string array */}
                  {[
                    { label: "Full Name", id: 0, value: user.GetUserName() },
                    { label: "Email", id: -1, value: user.GetEmail() },
                    { label: "Roll No", id: 1, value: user.GetRollNumber() },
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
                      {this.state.editing && field.id >= 0 ? (
                        <TextField
                          value={this.state.editable[field.id]}
                          onChange={(e) => {
                            const newobj = this.state.editable;
                            newobj[field.id] = e.target.value;
                            this.setState({ editable: newobj });
                          }}
                        ></TextField>
                      ) : (
                        <Typography>{field.value}</Typography>
                      )}
                    </Box>
                  ))}
                  {!this.state.editing ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ mt: 2 }}
                      disabled={!this.state.editingControlsEnabled}
                      onClick={() => {
                        this.setState({ editing: true });
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
                        disabled={!this.state.editingControlsEnabled}
                        onClick={async () => {
                          this.setState({ editingControlsEnabled: false });
                          await this.confirmEdit();
                          this.setState({ editingControlsEnabled: true });
                          this.setState({ editing: false });
                        }}
                      >
                        OK
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ mt: 2 }}
                        disabled={!this.state.editingControlsEnabled}
                        onClick={() => {
                          this.setState({ editing: false });
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
        </Grid>
      </Box>
    );
  }
}

export default ProfilePage;
