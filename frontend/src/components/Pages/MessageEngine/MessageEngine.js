import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import styles from "./MessageEngine.module.scss";
import { useNavigate } from "react-router-dom";

export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class MessageEngine extends Component {
    
    render() {
        return (
            <div className={styles.mainPageBody}>
                <div className={styles.mainPageContainer}>
                    <h1>MessageEngine</h1>
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MessageEngine));
