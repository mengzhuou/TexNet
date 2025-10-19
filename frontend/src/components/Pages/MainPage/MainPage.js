import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import styles from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";
import Callflow from "../Callflow/Callflow";

// ✅ Wrap navigation for class component
export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class MainPage extends Component {
    render() {
        return (
            <div className={styles.mainPageBody}>
                <div className={styles.mainPageContainer}>
                    <h1>📊 Main Page Dashboard</h1>
                    <Callflow />  {/* 👈 Integrated Callflow component */}
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MainPage));
