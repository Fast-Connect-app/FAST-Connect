import { Box, Card, CardContent, Avatar, Typography, Button, LinearProgress, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Grid container spacing={1} sx={{ maxWidth: 1200, maxHeight : 1000 }}>
        {/* Profile Card */}
        <Grid size = {{xs : 12, md : 4}}>
          <Card sx={{ height: '55vh', width : '22vw',  boxShadow : '3', marginTop : '2rem', marginLeft : '4rem' }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{ width: 150, height: 170, marginBottom: 2, backgroundColor: "primary.main" }}
                  alt="John Doe"
                  src=""
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  John Doe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full Stack Developer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bay Area, San Francisco, CA
                </Typography>
                <Box sx={{ mt: 2, marginTop: '2rem' }}>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
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
        <Grid size = {{xs : 12, md : 8}}>
          <Card sx={{ width : '50vw',  boxShadow : '3', marginLeft : '2rem', marginTop : '2rem'}}>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection : "column", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", alignSelf : "flex-start" }}>
                Full Name
              </Typography>
              <Typography>John Doe</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, alignSelf : "flex-start" }}>
                Email
              </Typography>
              <Typography>fip@jukmuh.al</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, alignSelf : "flex-start" }}>
                Phone
              </Typography>
              <Typography>(239) 816-9029</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, alignSelf : "flex-start" }}>
                Mobile
              </Typography>
              <Typography>(320) 380-4539</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, alignSelf : "flex-start" }}>
                Address
              </Typography>
              <Typography>Bay Area, San Francisco, CA</Typography>
              <Button variant="contained" color="secondary" size="small" sx={{ mt: 2 }}>
                Edit
              </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Links Card */}
        <Grid size = {{xs : 12, md : 4}}>
          <Card sx={{ height: '50vh', width : '22vw',  boxShadow : '3', marginBottom : '3rem', marginLeft : '4rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Social Links
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-evenly", flexDirection : 'column' , mb:2 }}>
                {["Website", "Github", "Twitter", "Instagram", "Facebook"].map((platform) => (
                  <Link
                    key={platform}
                    href="#"
                    target="_blank"
                    rel="noopener"
                    sx={{
                      marginX: 1,
                      color: "primary.main",
                      textDecoration: "none",
                      alignSelf : "flex-start",
                      marginY : 2
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
        <Grid size = {{xs : 12, md : 6}}>
          <Card sx={{ height: '45vh', width : '50vw',  boxShadow : '3', marginTop: '2rem',  marginLeft : '2rem'}}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Project Status
              </Typography>
              {["Web Design", "Website Markup", "One Page", "Mobile Template", "Backend API"].map(
                (project, index) => (
                  <Box key={index} sx={{ mb: 2 , display : 'flex', flexDirection : 'column', marginY : '1.5rem',justifyContent : 'space-between'}}>
                    <Typography variant="body2" sx={{ fontWeight: "bold", alignSelf : "flex-start" }}>
                      {project}
                    </Typography>
                    <LinearProgress variant="determinate" value={(index + 1) * 20} />
                  </Box>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
