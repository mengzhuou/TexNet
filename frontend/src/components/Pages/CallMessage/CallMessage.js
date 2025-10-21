import React, { Component } from "react";
import { getOwnedPhoneNumbers } from "../../../connector.js";
import styles from "./CallMessage.module.scss";

class CallMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedPhoneNumbers: JSON.parse(localStorage.getItem("telnyx_owned_numbers")) || [],
            selectedNumber: "111-111-1111",
            customerPhoneNumbers: [
                { number: "111-111-1111", lastMsg: "Sure, of course", time: "09/10 6:30pm" },
                { number: "999-999-9999", lastMsg: "Missed call", time: "09/10 6:30pm" },
                { number: "123-444-6666", lastMsg: "Hi! I’ll like to purchase your ad.", time: "09/10 6:30pm" },
            ],
            chatMessages: [
                { from: "user", text: "Hi, I'll like to purchase your ad, but I want to know more information.", time: "09/10 6:30pm" },
                { from: "me", text: "Sure, of course", time: "09/10 6:32pm" }
            ],
        };
    }

    fetchOwnedNumbers = async () => {
        try {
            const response = await getOwnedPhoneNumbers();
            const numbers = response.data || [];


            this.setState({ ownedPhoneNumbers: numbers });
            localStorage.setItem("telnyx_owned_numbers", JSON.stringify(numbers));
        } catch (error) {
            console.error("Error fetching owned Telnyx numbers:", error);
        }
    };

    async componentDidMount() {
        if (!localStorage.getItem("telnyx_owned_numbers")) {
            await this.fetchOwnedNumbers();
        }
    }

    render() {
        const { ownedPhoneNumbers, customerPhoneNumbers, chatMessages, selectedNumber } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h3>Call/Message</h3>
                    <select>
                    <option>Default 123-444-5678</option>
                    </select>
                </div>

                <div className={styles.phoneList}>
                    {customerPhoneNumbers.map((item, idx) => (
                    <div
                        key={idx}
                        className={`${styles.phoneItem} ${item.number === selectedNumber ? styles.active : ""}`}
                    >
                        <div className={styles.phoneNumber}>{item.number}</div>
                        <div className={styles.lastMsg}>{item.lastMsg}</div>
                        <div className={styles.time}>{item.time}</div>
                    </div>
                    ))}
                </div>
                </div>

                <div className={styles.chatSection}>
                <div className={styles.chatHeader}>
                    <div className={styles.circleAvatar}>1111</div>
                    <span className={styles.chatPhone}>{selectedNumber}</span>
                </div>

                <div className={styles.chatBody}>
                    {chatMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={msg.from === "me" ? styles.myMessage : styles.userMessage}
                    >
                        <p>{msg.text}</p>
                        <span className={styles.msgTime}>{msg.time}</span>
                    </div>
                    ))}
                </div>

                <div className={styles.chatFooter}>
                    <select className={styles.senderSelect}>
                        {ownedPhoneNumbers?.length > 0 ? (
                            ownedPhoneNumbers.map((num, index) => (
                                <option>
                                    {num.phone_number}
                                </option>
                            ))
                        ) 
                    :
                    (
                        <option disabled>No numbers available</option>
                    )}
                    </select>
                    <input className={styles.inputBox} placeholder="Type your message..." />
                    <button className={styles.sendBtn}>➤</button>
                </div>
                </div>
            </div>
        );
    }
}

export default CallMessage;
