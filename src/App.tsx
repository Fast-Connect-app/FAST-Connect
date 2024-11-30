import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage/HomePage";
import Events from "./Pages/Eventpage/EventPage";
import ProfilePage from "./Pages/ProfilePage/Profile";
import JobPage from "./Pages/Jobpage/JobPage";
import StudyPage from "./Pages/StudyMaterial/StudyMaterialPage";
import ChatPage from "./Pages/ChatPage/ChatPage";

class App extends Component {
  render() {
    return (
      <Routes>
        {/* Routes that use MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="HomePage" element={<HomePage />} />
          <Route path="EventPage" element={<Events />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="JobPage" element={<JobPage />} />
          <Route path="StudyPage" element={<StudyPage />} />
          <Route path="ChatPage" element={<ChatPage />} />
        </Route>
        {/* Routes without MainLayout */}
      </Routes>
    );
  }
}

export default App;
