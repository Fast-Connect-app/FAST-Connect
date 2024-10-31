import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                    FAST Connect
                </Typography>

                <Box>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                    <Button color="inherit" component={Link} to="/profile">
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/messages">
                        Messages
                    </Button>
                    <Button color="inherit" component={Link} to="/events">
                        Events
                    </Button>
                    <Button color="inherit" component={Link} to="/job-listings">
                        Job Listings
                    </Button>
                    <Button color="inherit" component={Link} to="/study-materials">
                        Study Materials
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
