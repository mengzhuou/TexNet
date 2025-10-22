import React, { Component } from "react";
import styles from "./Users.module.scss";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [
        { id: "0000", name: "0000", status: "offline" },
        { id: "1111", name: "1111", status: "online" },
        { id: "123321", name: "123321", status: "online" },
        { id: "1234", name: "1234", status: "online" },
        { id: "2221", name: "2221", status: "online" },
        { id: "2222", name: "2222", status: "online" },
        { id: "3321", name: "3321", status: "online" },
        { id: "3322", name: "3322", status: "online" },
        { id: "3323", name: "3323", status: "online" },
        { id: "3325", name: "3325", status: "online" },
        { id: "3326", name: "3326", status: "online" },
        { id: "3328", name: "3328", status: "online" },
        { id: "3329", name: "3329", status: "online" },
        { id: "4444", name: "4444", status: "online" },
        { id: "AABB", name: "AABB", status: "online" },
        { id: "Pppp", name: "Pppp", status: "online" },
        { id: "test", name: "test", status: "offline" },
      ],
    };
  }

  render() {
    const { agents } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Users</h1>
          <div className={styles.refreshIcon}>⟳</div>
        </div>

        <h3 className={styles.agentListTitle}>Agent List</h3>

        <div className={styles.userGrid}>
          {agents.map((agent, idx) => (
            <div className={styles.userCard} key={idx}>
              <div className={styles.userIcon}></div>
              <div className={styles.userInfo}>
                {agent.name}({agent.id})
              </div>
              <span
                className={`${styles.statusDot} ${
                  agent.status === "online" ? styles.online : styles.offline
                }`}
              ></span>
            </div>
          ))}

          {/* Add Agent Button */}
          <div className={styles.userCardAdd}>
            <div className={styles.addUserIcon}>+</div>
            <div className={styles.userInfo}>Add Agent</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
