import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/Pages/MainPage/MainPage";
import LeftNavBar from "./components/Functions/LeftNavBar/LeftNavBar";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import Callflow from './components/Pages/Callflow/Callflow';
import CallMessage from './components/Pages/CallMessage/CallMessage';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopNavBar />
          <div className="content-layout">
            <div className="left-section">
              <LeftNavBar />
            </div>
            <div className="right-section">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/callflow" element={<Callflow />} />
                <Route path="/call_message" element={<CallMessage />} />
              </Routes>
            </div>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
