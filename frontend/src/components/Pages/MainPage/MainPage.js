import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import styles from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";
import Callflow from "../Callflow/Callflow";
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
            console.log("Loaded balance from cache");
            return;
        }

        try {
            const balanceData = await getAccountBalance();
            const balance = balanceData.data.balance;
            console.log("Fetched balance from API:", balance);

            this.setState({ balance });
            localStorage.setItem("telnyx_balance", balance);
        } catch (error) {
            console.error("Failed to load balance:", error);
        }
    }

    render() {
        const { balance } = this.state;
        return (
            <div className={styles.mainPageBody}>
                <div className={styles.mainPageContainer}>
                    <h1>📊 Main Page Dashboard</h1>
                    {balance !== null ? `$${balance}` : "Loading balance..."}
                    <Callflow />
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MainPage));
