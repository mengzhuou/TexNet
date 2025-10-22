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
            <NavButton  className={styles.sideNavButton}  path="/callflow"  text="Callflow" />
          </li>
        </ul>
      </div>
    );
  }
}

export default withFuncProps(LeftNavBar);
