import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box } from '@mui/material';

// Navbar Component
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          FAST Connect
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

// Event Card Component
const EventCard = () => (
  <Card sx={{ maxWidth: 345, margin: '10px' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Event Title
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Details of the event go here. Date, time, venue, etc.
      </Typography>
    </CardContent>
    <Button size="small">Learn More</Button>
  </Card>
);

// Post Card Component
const PostCard = () => (
  <Card sx={{ maxWidth: 345, margin: '10px' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Post Title
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Post description or any relevant information. User posts, updates, etc.
      </Typography>
    </CardContent>
    <Button size="small">View More</Button>
  </Card>
);

// Job Card Component
const JobCard = () => (
  <Card sx={{ maxWidth: 345, margin: '10px' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Job Title
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Job description, requirements, and application links here.
      </Typography>
    </CardContent>
    <Button size="small">Apply Now</Button>
  </Card>
);

// Footer Component
const Footer = () => (
  <Box sx={{ bgcolor: 'text.secondary', p: 2, marginTop: '20px' }}>
    <Typography variant="body2" color="white" align="center">
      &copy; {new Date().getFullYear()} FAST Connect. All rights reserved.
    </Typography>
  </Box>
);

// Homepage Component
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container>
        {/* Events Section */}
        <Typography variant="h4" sx={{ my: 4 }}>Upcoming Events</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <EventCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EventCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EventCard />
          </Grid>
        </Grid>

        {/* Posts and Jobs Section */}
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h4" sx={{ my: 2 }}>Recent Posts</Typography>
            <PostCard />
            <PostCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h4" sx={{ my: 2 }}>Jobs Available</Typography>
            <JobCard />
            <JobCard />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
