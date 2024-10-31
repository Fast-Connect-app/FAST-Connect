import React from 'react';
import { Typography, Container, Card, CardContent, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';


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
    <Card sx={{ display: 'flex', margin: '10px', flexDirection: 'row', width: '95%' }}>
    {/* Text Content */}
    <Box sx={{ display: 'flex', flexDirection: 'column', width:'49vw' }}>
      <CardContent>
        <Typography variant="h5">Post Title</Typography>
        <Typography variant="body2" color="text.secondary">
          Post description or relevant text information goes here. 
        </Typography>
      </CardContent>
    </Box>
  </Card>
);

// Job Card Component
const JobCard = () => (
  <Card sx={{ maxWidth: 310, margin: '10px' }}>
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


// Homepage Component
const HomePage = () => {
  return (
    <>
      <Container>
        {/* Events Section */}
        <Typography variant="h4" sx={{ my: 4 }}>Upcoming Events</Typography>
        <Grid container spacing={2}>
          <Grid item size = {{xs:12, sm:6, md:4}} >
            <EventCard />
          </Grid>
          <Grid item size = {{xs:12, sm:6, md:4}}>
            <EventCard />
          </Grid>
          <Grid item size = {{xs:12, sm:6, md:4}}>
            <EventCard />
          </Grid>
        </Grid>

        {/* Posts and Jobs Section */}
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h4" sx={{ my: 2 }}>Recent Posts</Typography>
            <PostCard />
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
    </>
  );
};

export default HomePage;
