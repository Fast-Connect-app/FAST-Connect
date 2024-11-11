// App.js
import './App.css';
import About from "./Pages/About";
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import MainLayout from './Layouts/MainLayout';
import Profile from './Pages/Profile';
import Messages from './Pages/Messages';
import Events from './Pages/Events';
import JobListings from './Pages/JobListings';
import StudyMaterials from './Pages/StudyMaterials';
import Posts from './Pages/Posts';
import GlobalChat from './Pages/GlobalChat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null
    };
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // fetchData() {
  //   fetch("http://localhost:5000/api/get_data")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.setState({ data: data[0].name });
  //     })
  //     .catch(error => this.setState({ error: error.message }));
  // }

  render() {
    const { data, error } = this.state;
    const MemoizedEvents = React.memo(Events)

    return (
      
      <Router>
        <MainLayout>
          <Routes>
            <Route
              exact
              path="/"
              element={<HomePage data={data} error={error} />}
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/homepage" element={<HomePage data={data} error={error} />} />
            <Route path="/profile" element={<Profile data={data} error={error} />} />
            <Route path="/messages" element={<Messages data={data} error={error} />} />
            <Route path="/events" element={<MemoizedEvents />} />
            <Route path="/job-listings" element={<JobListings data={data} error={error} />} />
            <Route path="/study-materials" element={<StudyMaterials data={data} error={error} />} />
            <Route path="/posts" element={<Posts data={data} error={error} />} />
            <Route path="/global-chat" element={<GlobalChat data={data} error={error} />} />
          </Routes>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
