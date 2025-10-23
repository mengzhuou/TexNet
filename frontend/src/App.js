import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftNavBar from "./components/Functions/LeftNavBar/LeftNavBar";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import "./App.css";

// Pages
import MainPage from "./components/Pages/MainPage/MainPage";
import Profile from "./components/Pages/Profile/Profile";
import ChatHistory from './components/Pages/ChatHistory/ChatHistory';
import SmsHistory from './components/Pages/SmsHistory/SmsHistory';
import ContactManagement from './components/Pages/ContactManagement/ContactManagement';
import Users from './components/Pages/Users/Users';
import MessageEngine from './components/Pages/MessageEngine/MessageEngine';
import Callflow from './components/Pages/Callflow/Callflow';
import CallMessage from './components/Pages/CallMessage/CallMessage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-layout">
          <TopNavBar />
          <LeftNavBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/MainPage" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chatHistory" element={<ChatHistory />} />
              <Route path="/smsHistory" element={<SmsHistory />} />
              <Route path="/contactManagement" element={<ContactManagement />} />
              <Route path="/users" element={<Users />} />
              <Route path="/messageEngine" element={<MessageEngine />} />
              <Route path="/callflow" element={<Callflow />} />
              <Route path="/callMessage" element={<CallMessage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
