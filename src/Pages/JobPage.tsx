import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Job {
  id: number;
  title: string;
  location: string;
  category: string;
}

const jobs: Job[] = [
  { id: 1, title: 'Data Science Engineer, Geospatial', location: 'Boston', category: 'Data Science' },
  { id: 2, title: 'Release Automation Engineer (Kubernetes)', location: 'Boston', category: 'Engineering' },
  { id: 3, title: 'Senior Software Engineer', location: 'Boston', category: 'Engineering' },
  { id: 4, title: 'Growth Marketer', location: 'Boston', category: 'Marketing' },
  { id: 5, title: 'Marketing and Sales Content Lead', location: 'Boston', category: 'Marketing' },
  { id: 6, title: 'Customer Facing Data Scientist', location: 'Japan', category: 'Data Science' },
  { id: 7, title: 'Software Engineer (BI & Automation)', location: 'Kiev', category: 'Engineering' },
  { id: 8, title: 'Print & Branding Designer', location: 'Kiev', category: 'Marketing' },
  { id: 9, title: 'Federal - Customer Facing Data Scientist', location: 'Washington', category: 'Data Science' },
];

const JobPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Positions');
  const [selectedLocation, setSelectedLocation] = useState<string>('all locations');

  const categories = ['All Positions', 'Data Science', 'Engineering', 'Marketing'];

  const filteredJobs = jobs.filter((job) =>
    (selectedCategory === 'All Positions' || job.category === selectedCategory) &&
    (selectedLocation === 'all locations' || job.location === selectedLocation)
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header */}
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
        Open positions in{' '}
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          sx={{ fontWeight: 'bold', ml: 1 }}
        >
          <MenuItem value="all locations">all locations</MenuItem>
          <MenuItem value="Boston">Boston</MenuItem>
          <MenuItem value="Kiev">Kiev</MenuItem>
          <MenuItem value="Japan">Japan</MenuItem>
          <MenuItem value="Washington">Washington</MenuItem>
        </Select>
      </Typography>

      {/* Filter Tabs */}
      <Tabs
        value={selectedCategory}
        onChange={(e, value) => setSelectedCategory(value)}
        centered
        sx={{ mb: 4 }}
      >
        {categories.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      {/* Job Grid */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid size = {{ xs : 12 , sm : 6 , md : 4}} key={job.id}>
            <Card sx={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" noWrap>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '0px 0px 4px 4px',
                }}
              >
                Apply Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobPage;
