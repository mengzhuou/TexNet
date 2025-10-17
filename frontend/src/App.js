import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterCode from "./components/Pages/EnterCode/EnterCode";
import MainPage from "./components/Pages/MainPage/MainPage";
import CreateClient from "./components/Pages/CreateClient";
import EditExistingClient from "./components/Pages/EditExistingClient";
import Draft from './components/Pages/DraftPage/DraftPage';
import LeftNavBar from "./components/Functions/LeftNavBar/LeftNavBar";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import Callflow from './components/Pages/Callflow/Callflow';
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
                <Route path="/" element={<EnterCode />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/draft" element={<Draft />} />
                <Route path="/callflow" element={<Callflow />} />
                <Route path="/create-client" element={<CreateClient />} />
                <Route path="/edit-existing-client" element={<EditExistingClient />} />
              </Routes>
            </div>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
