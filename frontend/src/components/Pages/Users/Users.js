import React, { Component } from "react";
import styles from "./Users.module.scss";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [
        { id: "0000", name: "0000" },
        { id: "1111", name: "1111" },
        { id: "123321", name: "123321" },
        { id: "1234", name: "1234" },
        { id: "2221", name: "2221" },
        { id: "2222", name: "2222" },
        { id: "3321", name: "3321" },
        { id: "3322", name: "3322" },
        { id: "3323", name: "3323" },
        { id: "3325", name: "3325" },
        { id: "3326", name: "3326" },
        { id: "3328", name: "3328" },
        { id: "3329", name: "3329" },
        { id: "4444", name: "4444" },
        { id: "AABB", name: "AABB" },
        { id: "Pppp", name: "Pppp" },
        { id: "test", name: "test" }
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
          {agents.map((agent, index) => (
            <div className={styles.userCard} key={index}>
              <div className={styles.userIcon}></div>
              <div className={styles.userInfo}>
                {agent.name} ({agent.id})
              </div>
            </div>
          ))}

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
