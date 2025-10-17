import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import "./MainPage.css";
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
            <div className="main-page-body">
                <div className="main-page-container">
                    <h1>📊 Main Page Dashboard</h1>
                    <Callflow />  {/* 👈 Integrated Callflow component */}
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MainPage));
