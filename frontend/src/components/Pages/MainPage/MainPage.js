import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import styles from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class MainPage extends Component {
  render() {
    const balance = 1000.0;
    const data = [
      { day: "1", messages: 8000 },
      { day: "2", messages: 7500 },
      { day: "3", messages: 7169 },
      { day: "4", messages: 9000 },
      { day: "5", messages: 6800 },
      { day: "6", messages: 8500 },
      { day: "7", messages: 7600 },
    ];

    return (
      <div className={styles.mainPageBody}>
        <div className={styles.mainPageContainer}>
            <h2 className={styles.pageTitle}>Home</h2>

            <div className={styles.balanceSection}>
                <h3 className={styles.balanceTitle}>Current Balance</h3>
                <div className={styles.balanceBox}>${balance.toFixed(2)}</div>
            </div>

            <div className={styles.chartSection}>
                <h3 className={styles.chartTitle}>Messages in this Month</h3>
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withFuncProps(withNavigation(MainPage));
