import React, { Component } from "react";
import styles from "./ChatHistory.module.scss";

class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "09/11/2009",
      chatRecords: [
        { id: 1, date: "09/11/2009", start: "6:00pm", end: "6:00pm", to: "123-444-5678", direction: "Outbound", time: "60min", charge: "$2.15", recording: "Link" },
        { id: 2, date: "09/11/2009", start: "7:00pm", end: "7:00pm", to: "123-444-5678", direction: "Outbound", time: "60min", charge: "$2.19", recording: "Link" },
        { id: 3, date: "09/11/2009", start: "8:00pm", end: "8:00pm", to: "123-444-5678", direction: "Outbound", time: "60min", charge: "$124",   recording: "Link" },
        { id: 4, date: "09/11/2009", start: "9:00pm", end: "9:00pm", to: "123-444-5678", direction: "Outbound", time: "60min", charge: "$234",   recording: "Link" }
      ],
      currentPage: 1,
      totalPages: 45
    };
  }

  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value });
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <div className={styles.pagination}>
        <button>Previous</button>
        {[1, 2, 3, 4].map(num => (
          <button key={num} className={currentPage === num ? styles.active : ""}>{num}</button>
        ))}
        <span>...</span>
        <button>{totalPages}</button>
        <button>Next</button>
      </div>
    );
  };

  render() {
    const { chatRecords, selectedDate } = this.state;

    return (
      <div className={styles.chatHistoryContainer}>
        <h1 className={styles.title}>Chat History</h1>

        <div className={styles.dateSelector}>
          <label>Select Dates</label>
          <input type="date" value={selectedDate} onChange={this.handleDateChange} />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>To</th>
              <th>Direction</th>
              <th>Time</th>
              <th>Charge($)</th>
              <th>Recording</th>
            </tr>
          </thead>
          <tbody>
            {chatRecords.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.start}</td>
                <td>{row.end}</td>
                <td>{row.to}</td>
                <td>{row.direction}</td>
                <td>{row.time}</td>
                <td>{row.charge}</td>
                <td><a href="#">{row.recording}</a></td>
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

export default ChatHistory;
