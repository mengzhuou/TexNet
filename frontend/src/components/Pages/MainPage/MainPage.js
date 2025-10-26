import React, { Component } from "react";
import { withFuncProps } from "../../Functions/withFuncProps.js";
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
import { getAccountBalance } from "../../../connector.js";

export function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: localStorage.getItem("telnyx_balance") || null,
        };
    }

    async componentDidMount() {
        if (localStorage.getItem("telnyx_balance")) {
          return;
        }
      
        try {
          const balanceData = await getAccountBalance();
          
          const balance = balanceData?.balance;
          
          console.log("API raw response:", balance);
          if (balance !== undefined && balance !== null) {
            console.log("Fetched balance from API:", balance);
            this.setState({ balance });
            localStorage.setItem("telnyx_balance", balance);
          } else {
            console.warn("Balance not found in API response");
            this.setState({ balance: 0 });
          }
        } catch (error) {
          console.error("Failed to load balance:", error);
          this.setState({ balance: 0 });
        }
      }
      
  render() {
    const { balance } = this.state;
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
                <div className={styles.balanceBox}>{balance === null ? "Loading balance..." : `$${balance}`}</div>
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
