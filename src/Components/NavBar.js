import { AppBar, Toolbar, Typography} from '@mui/material';


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

export default Navbar;