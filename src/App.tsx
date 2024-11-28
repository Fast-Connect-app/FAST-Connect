import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage/HomePage";
import Events from "./Pages/Eventpage/EventPage";
import ProfilePage from "./Pages/ProfilePage/Profile";
import JobPage from "./Pages/Jobpage/JobPage";

class App extends Component {
  render() {
    return (
      <Routes>
        {/* Routes that use MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="HomePage" element={<HomePage />} />
          <Route path="EventPage" element={<Events />} />
          <Route path="JobPage" element={<JobPage />} />
        </Route>

        {/* Routes without MainLayout */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    );
  }
}

export default App;
