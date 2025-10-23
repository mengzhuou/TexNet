import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton";
import styles from "./LeftNavBar.module.scss";

class LeftNavBar extends Component {
  render() {
    if (window.location.pathname === "/") {
      return <div className={styles.sideNavBar}></div>;
    }
    return (
      <div className={styles.sideNavBar}>
        <ul className={styles.sideNavList}>
          <li className={styles.sideNavItem}>
            <NavButton className={styles.sideNavButton} path="/mainPage" text="Home" />
            <NavButton className={styles.sideNavButton} path="/profile" text="Profile" />
            <NavButton className={styles.sideNavButton} path="/chatHistory" text="Chat History" />
            <NavButton className={styles.sideNavButton} path="/smsHistory" text="SMS History" />
            <NavButton className={styles.sideNavButton} path="/contactManagement" text="Contact Management" />
            <NavButton className={styles.sideNavButton} path="/users" text="Users" />
            <NavButton className={styles.sideNavButton} path="/callflow" text="Callflow" />
            <NavButton className={styles.sideNavButton} path="/messageEngine" text="Message Engine" />
            <NavButton className={styles.sideNavButton} path="/callMessage" text="Call/Message" />
          </li>
        </ul>
      </div>
    );
  }
}

export default withFuncProps(LeftNavBar);