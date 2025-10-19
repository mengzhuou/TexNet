import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton";
import "./LeftNavBar.css";

class LeftNavBar extends Component {
    render() {
        if (window.location.pathname === "/") {
            return <div className="sideNavBar"></div>;
        }
        return (
            <div className="sideNavBar">
                <ul className="sideNavList">
                    <li className="sideNavItem">
                        <NavButton className="sideNavButton" path="/callflow" text="Callflow" />
                        <NavButton className="sideNavButton" path="/profile" text="Profile" />
                    </li>
                </ul>
            </div>
        );
    }
}

export default withFuncProps(LeftNavBar);
