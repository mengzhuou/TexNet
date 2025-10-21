import React, { Component } from "react";
import { getOwnedPhoneNumbers } from "../../../connector.js";
import UniversalSearch from "../../UniversalSearch.js";
import "./Callflow.css";

class Callflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownedPhoneNumbers: JSON.parse(localStorage.getItem("telnyx_owned_numbers")) || [],
            phoneNumbers: JSON.parse(localStorage.getItem("telnyx_owned_numbers")) || [],
            searchTerm: ""
        };
    }

    fetchOwnedNumbers = async () => {
        try {
            const response = await getOwnedPhoneNumbers();
            const numbers = response.data || [];

            this.setState({ ownedPhoneNumbers: numbers, phoneNumbers: numbers });
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

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });

        const { ownedPhoneNumbers } = this.state;
        const filtered = ownedPhoneNumbers.filter(num =>
            num.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ phoneNumbers: filtered });
    };

    render() {
        const { phoneNumbers } = this.state;

        return (
            <div className="callflow-container">
                <div className="search-section">
                    <UniversalSearch onSearch={this.handleSearch} placeholder="Search phone number..." />
                </div>

                <h2>Callflow</h2>

                <div className="table-section">
                    <table className="number-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Phone Number</th>
                                <th>Name</th>
                                <th>Press Key</th>
                                <th>Assign To</th>
                                <th>Status</th>
                                <th>Create at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {phoneNumbers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No data found.</td>
                                </tr>
                            ) : (
                                phoneNumbers.map((num, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{num.phone_number}</td>
                                        <td>{num.connection_name || ""}</td>
                                        <td>{num.external_pin || ""}</td>
                                        <td>{num.messaging_profile_name || ""}</td>
                                        <td>{num.status || ""}</td>
                                        <td>{num.created_at || ""}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Callflow;
