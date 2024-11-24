// App.tsx
//import About from "./Pages/About";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage/HomePage";
import Events from "./Pages/Eventpage/EventPage";
import ProfilePage from "./Pages/ProfilePage/Profile";
import JobPage from "./Pages/Jobpage/JobPage";
import SignUP from "./Pages/SignUpPage/Account";

class App extends Component {
  render() {
    return (
      <Router>
        <MainLayout>
          <ProfilePage></ProfilePage>
          <Routes>
            <Route path="/Homepage" element={<HomePage />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
