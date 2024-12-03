import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage/HomePage";
import Events from "./Pages/Eventpage/EventPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import JobPage from "./Pages/Jobpage/JobPage";
import StudyPage from "./Pages/StudyMaterial/StudyMaterialPage";
import ChatPage from "./Pages/ChatPage/ChatPage";
import Account from "./Pages/SignUpPage/Account";
import GroupPage from "./Pages/GroupPage/GroupPage";
import SavedPage from "./Pages/SavedPage/SavedPage";

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
          <Route path="SavedPage" element={<SavedPage />} />
          <Route path="GroupPage" element={<GroupPage />} />
        </Route>
        <Route path="/Login" element={<Account />} />
        {/* Routes without MainLayout */}
      </Routes>
    );
  }
}

export default App;
