import React, { Component } from 'react';
import errImg from "../../../Image/404.png";
import { withFuncProps } from "../../Functions/withFuncProps";
import styles from './NotFound.module.scss';

class NotFound extends Component {
    handleLogin = () => {
        this.props.navigate("/");
    };

    render() {
        return (
            <div className={styles.notFoundWrapper}>
                
                <div className={styles.sideNavBar}>
                        <button className={styles.authButton} onClick={this.handleLogin}>
                            Login
                        </button>
                    </div>

                <div className={styles.errorContent}>
                    <img className={styles.errorImage} src={errImg} alt="Not Found" />
                </div>
            </div>
        );
    }
}

export default withFuncProps(NotFound);
