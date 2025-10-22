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
                        <NavButton className="sideNavButton" path="/chatHistory" text="Chat History" />
                        <NavButton className="sideNavButton" path="/smsHistory" text="SMS History" />
                        <NavButton className="sideNavButton" path="/contactManagement" text="Contact Management" />
                        <NavButton className="sideNavButton" path="/users" text="Users" />
                        <NavButton className="sideNavButton" path="/messageEngine" text="Message Engine" />
                        <NavButton className="sideNavButton" path="/callMessage" text="Call/Message" />
                    </li>
                </ul>
            </div>
        );
    }
}

export default withFuncProps(LeftNavBar);
