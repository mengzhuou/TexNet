import React, { Component } from "react";
import styles from "./SmsHistory.module.scss";

class SmsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "2009-09-11",
      smsRecords: [
        { id: 1, time: "6:00pm", from: "123-444-5678", to: "123-444-5678", direction: "Outbound", message: "Hello! I want more info.", status: "Delivered", charge: "$2.15" },
        { id: 2, time: "7:00pm", from: "123-444-5678", to: "123-444-5678", direction: "Outbound", message: "Sure, of course", status: "Sent", charge: "$2.19" },
        { id: 3, time: "8:00pm", from: "123-444-5678", to: "123-444-5678", direction: "Outbound", message: "Thanks!", status: "Delivered", charge: "$124" },
        { id: 4, time: "9:00pm", from: "123-444-5678", to: "123-444-5678", direction: "Outbound", message: "No problem!", status: "Sent", charge: "$234" }
      ],
      currentPage: 1,
      totalPages: 45
    };
  }

  renderPagination = () => {
    return (
      <div className={styles.pagination}>
        <button>Previous</button>
        {[1, 2, 3, 4].map(num => (
          <button key={num} className={num === this.state.currentPage ? styles.active : ""}>{num}</button>
        ))}
        <span>...</span>
        <button>{this.state.totalPages}</button>
        <button>Next</button>
      </div>
    );
  };

  render() {
    const { smsRecords, selectedDate } = this.state;

    return (
      <div className={styles.smsHistoryContainer}>
        <h1 className={styles.title}>SMS History</h1>

        <div className={styles.dateSelector}>
          <label>Select Dates</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => this.setState({ selectedDate: e.target.value })}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>From</th>
              <th>To</th>
              <th>Direction</th>
              <th>Message</th>
              <th>Status</th>
              <th>Charge($)</th>
            </tr>
          </thead>
          <tbody>
            {smsRecords.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.time}</td>
                <td>{row.from}</td>
                <td>{row.to}</td>
                <td>{row.direction}</td>
                <td>{row.message}</td>
                <td>{row.status}</td>
                <td>{row.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.footer}>
          {this.renderPagination()}
          <button className={styles.exportBtn}>Export to CSV</button>
        </div>
      </div>
    );
  }
}

export default SmsHistory;
