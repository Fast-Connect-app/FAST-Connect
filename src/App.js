import './App.css';
import About from "./Pages/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './Pages/Homepage';
import MainLayout from './Layouts/MainLayout';
import Profile from './Pages/Profile';
import Messages from './Pages/Messages';
import Events from './Pages/Events';
import JobListings from './Pages/JobListings';
import StudyMaterials from './Pages/StudyMaterials';


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/get_data")  // The URL for the flask API
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        setData(data[0].name)
      }) // Set the data in state
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route exact path="/"
              element={
                <>
                  <h1>Database Data</h1>
                  {data ? <p>{data}</p> : <p>Loading...</p>}
                </>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/events" element={<Events />} />
            <Route path="/job-listings" element={<JobListings />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
}

export default App;
