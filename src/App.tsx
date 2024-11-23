// App.tsx
//import About from "./Pages/About";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage/HomePage";
import Events from "./Pages/EventPage";

class App extends Component {
  render() {
    return (
      <Router>
        <MainLayout>
          <HomePage></HomePage>
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
