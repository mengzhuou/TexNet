import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import TokenVerification from "./components/Functions/TokenVerification";
import ProtectedRoute from "./components/Functions/ProtectedRoute";
import styles from "./App.module.scss";

// Layout Components
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import LeftNavBar from "./components/Functions/LeftNavBar/LeftNavBar";

// Pages
import Login from "./components/Pages/Login/Login";
import MainPage from "./components/Pages/MainPage/MainPage";
import Profile from "./components/Pages/Profile/Profile";
import ChatHistory from "./components/Pages/ChatHistory/ChatHistory";
import SmsHistory from "./components/Pages/SmsHistory/SmsHistory";
import ContactManagement from "./components/Pages/ContactManagement/ContactManagement";
import Users from "./components/Pages/Users/Users";
import MessageEngine from "./components/Pages/MessageEngine/MessageEngine";
import Callflow from "./components/Pages/Callflow/Callflow";
import CallMessage from "./components/Pages/CallMessage/CallMessage";
import NotFound from "./components/Pages/NotFound/NotFound";

class App extends Component {
  state = {
    isAuthenticated: false,
  };

  handleLoginSuccess = () => this.setState({ isAuthenticated: true });
  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Provider store={store}>
        <Router>
          <TokenVerification />

          {isAuthenticated ? (
            <div className={styles.appLayout}>
              <TopNavBar onLogout={this.handleLogout} />
              <LeftNavBar onLogout={this.handleLogout} />

              <div className={styles.mainContent}>
                <Routes>
                  <Route path="/mainPage" element={<ProtectedRoute element={<MainPage />} />} />
                  <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                  <Route path="/chatHistory" element={<ProtectedRoute element={<ChatHistory />} />} />
                  <Route path="/smsHistory" element={<ProtectedRoute element={<SmsHistory />} />} />
                  <Route path="/contactManagement" element={<ProtectedRoute element={<ContactManagement />} />} />
                  <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
                  <Route path="/messageEngine" element={<ProtectedRoute element={<MessageEngine />} />} />
                  <Route path="/callflow" element={<ProtectedRoute element={<Callflow />} />} />
                  <Route path="/callMessage" element={<ProtectedRoute element={<CallMessage />} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </Provider>
    );
  }
}

export default App;
