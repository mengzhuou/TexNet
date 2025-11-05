import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton";
import styles from "./LeftNavBar.module.scss";
import { 
  FiHome, FiUser, FiMessageSquare, FiMail, FiUsers, 
  FiSettings, FiPhone, FiSend 
} from 'react-icons/fi';

class LeftNavBar extends Component {
  render() {
    if (window.location.pathname === "/") {
      return <div className={styles.sideNavBar}></div>;
    }

    const currentPath = window.location.pathname;

    return (
      <div className={styles.sideNavBar}>
        <ul className={styles.sideNavList}>
          <li className={styles.sideNavItem}>
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/mainPage" ? styles.active : ""}`} icon={<FiHome />} path="/mainPage" text="Home" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/profile" ? styles.active : ""}`} icon={<FiUser />} path="/profile" text="Profile" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/chatHistory" ? styles.active : ""}`} icon={<FiMessageSquare />} path="/chatHistory" text="Chat History" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/smsHistory" ? styles.active : ""}`} icon={<FiMail />} path="/smsHistory" text="SMS History" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/contactManagement" ? styles.active : ""}`} icon={<FiUsers />} path="/contactManagement" text="Contact Management" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/users" ? styles.active : ""}`} icon={<FiUsers />} path="/users" text="Users" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/callflow" ? styles.active : ""}`} icon={<FiSettings />} path="/callflow" text="Callflow" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/messageEngine" ? styles.active : ""}`} icon={<FiSend />} path="/messageEngine" text="Message Engine" />
            <NavButton className={`${styles.sideNavButton} ${currentPath === "/callMessage" ? styles.active : ""}`} icon={<FiPhone />} path="/callMessage" text="Call/Message" />
          </li>
        </ul>
      </div>
    );
  }
}

export default withFuncProps(LeftNavBar);
