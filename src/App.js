import './App.css';
import Header from "./Components/Header";
import { Footer } from "./Components/Footer";
import { About } from "./Components/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './Components/Homepage';

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
        setData(JSON.stringify(data))
      }) // Set the data in state
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Header title="My Todos List" searchBar={false} />
          <Routes>
            <Route exact path="/" element={() => {
              return (
                <>
                  <h1>Database Data</h1>
                  {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
                </>)
            }} />

            <Route exact path="/about" element={<About />} />
            <Route exact path='/homepage' element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
