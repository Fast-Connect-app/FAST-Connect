import Navbar from '../Components/NavBar';
import { Footer } from '../Components/Footer';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="App">
        {children}
      </div>
      <Box display="flex" flexDirection="column" minHeight="100vh" > 
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
