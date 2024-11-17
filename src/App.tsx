// App.tsx
import "./App.css";
//import About from "./Pages/About";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
//import HomePage from './Pages/HomePage';
//import Profile from './Pages/Profile';
//import Messages from './Pages/Messages';
import Events from "./Pages/EventPage";
//import JobListings from './Pages/JobListings';
//import StudyMaterials from './Pages/StudyMaterials';
//import Posts from './Pages/Posts';
//import GlobalChat from './Pages/GlobalChat';
import Register from './Pages/Signup';
import Login from './Pages/Login';
import Account from './Pages/Account';

// Define types for the state
interface AppState {
  data: string | null;
  error: string | null;
}

// Define types for the props (optional, based on usage in individual page components)
interface RouteProps {
  data: string | null;
  error: string | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      error: null,
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
    return (
      <Router>
        <MainLayout>
          <Routes>
            {/* <Route
              exact
              path="/"
              element={<HomePage data={data} error={error} />}
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/homepage" element={<HomePage data={data} error={error} />} />
            <Route path="/profile" element={<Profile data={data} error={error} />} />
            <Route path="/messages" element={<Messages data={data} error={error} />} /> */}
            <Route path="/events" element={<Events />} />
            {/* <Route path="/job-listings" element={<JobListings data={data} error={error} />} />
            <Route path="/study-materials" element={<StudyMaterials data={data} error={error} />} />
            <Route path="/posts" element={<Posts data={data} error={error} />} />
            <Route path="/global-chat" element={<GlobalChat data={data} error={error} />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
