import Navbar from '../Components/NavBar';
import { Footer } from '../Components/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="App">
        {children}
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
