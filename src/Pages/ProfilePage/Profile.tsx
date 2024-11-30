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
import {
  GitHub as GitHubIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import styles from "./Profile.module.css"; // Import the CSS module
import AbstractPage, {AbstractPageState} from "../AbstractPages";
import {
  PageTitleContext,
  PageTitleContextType,
} from "../../Layouts/MainLayout";

interface UserProfile {
  fullName: string;
  avatar: string;
  jobTitle: string;
  location: string;
  email: string;
  contact: string;
  rollNo: string;
  university: string;
  socialLinks: { platform: string; url: string }[];
  projects: { name: string; progress: number }[];
};

interface ProfilePageState extends AbstractPageState {
  user: UserProfile | null;
  loading: boolean;
};

class ProfilePage extends AbstractPage <{}, ProfilePageState>{
  static contextType = PageTitleContext; // Correct contextType assignment
  componentDidMount() {
    const { setPageTitle } = this.context as PageTitleContextType;
    setPageTitle("Profile");
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
      user: null,
      loading: true,
    };
    // Simulate fetching user data from an API
    setTimeout((): void => {
      this.setState({
        user: {
          fullName: "John Doe",
          avatar: "https://i.pravatar.cc/150?img=1",
          jobTitle: "Full Stack Developer",
          location: "Bay Area, San Francisco, CA",
          email: "",
          contact: "(239) 816-9029",
          rollNo: "123456",
          university: "Stanford University",
          socialLinks: [
            { platform: "Website", url: "#" },
            { platform: "Github", url: "#" },
            { platform: "Twitter", url: "#" },
            { platform: "Instagram", url: "#" },
            { platform: "Facebook", url: "#" },
          ],
          projects: [
            { name: "Web Design", progress: 20 },
            { name: "Website Markup", progress: 40 },
            { name: "One Page", progress: 60 },
            { name: "Mobile Template", progress: 80 },
            { name: "Backend API", progress: 100 },
          ],
        },
        loading: false,
      });
    }, 10); // Mock API delay
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
                  <Avatar
                    className={styles.avatar}
                    alt={user.fullName}
                    src={user.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.location}
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
              </CardContent>            </Card>
          </Grid>

          {/* Contact Details Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className={styles.contactCard}>
            <CardContent>
                <Box>
                  {[
                    { label: "Full Name", value: user.fullName },
                    { label: "Email", value: user.email },
                    { label: "Phone", value: user.contact },
                    { label: "Roll No", value: user.rollNo },
                    { label: "University", value: user.university },
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
                      <Typography
                        variant="h6"
                        className={styles.contactHeading}
                        sx={{ flex: "0 0 1" }}
                      > 
                        {field.label}
                      </Typography>
                      <Typography>{field.value}</Typography>
                    </Box>
                  ))}
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

          {/* Project Status Card */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card className={styles.projectCard}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Project Status
                </Typography>
                {user.projects.map((project, index) => (
                  <Box key={index} className= {styles.projectCardContent}>
                    <Typography variant="body2">{project.name}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
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
