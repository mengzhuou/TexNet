import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import NavButton from "../../Button/NavButton/NavButton";
import styles from "./TopNavBar.module.scss";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDroppedDown: false,
      animationClass: "",
      isAnimating: false,
    };
    this.menuRef = React.createRef();
    this.iconRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("click", this.closeDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  }

  closeDropdown = (e) => {
    if (
      this.menuRef.current &&
      e.target !== this.menuRef.current &&
      this.iconRef.current &&
      !this.iconRef.current.contains(e.target) &&
      !this.state.isAnimating
    ) {
      this.setState({
        animationClass: "dropdownContainerHide",
        isAnimating: true,
      });
      setTimeout(
        () =>
          this.setState({ isDroppedDown: false, isAnimating: false }),
        200
      );
    }
  };

  toggleDropdown = (e) => {
    if (this.state.isAnimating) return;
    if (this.state.isDroppedDown) {
      this.setState({
        animationClass: "dropdownContainerHide",
        isAnimating: true,
      });
      setTimeout(
        () =>
          this.setState({ isDroppedDown: false, isAnimating: false }),
        200
      );
    } else {
      this.setState({
        animationClass: "dropdownContainerShow",
        isDroppedDown: true,
        isAnimating: true,
      });
      setTimeout(() => this.setState({ isAnimating: false }), 200);
    }
  };

  render() {
    if (window.location.pathname === "/") {
      return <div className={styles.navBarTop}></div>;
    }
    return (
      <div className={styles.navBarTop}>
        <div className={styles.navBarLeft}>
          <NavButton
            className={styles.navTitle}
            path="/MainPage"
            text="T e x N e x"
          />
        </div>
      </div>
    );
  }
}

export default withFuncProps(TopNavBar);