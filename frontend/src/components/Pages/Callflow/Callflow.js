import React, { Component } from "react";
import { getOwnedPhoneNumbers } from "../../../connector.js";
import ClientSearch from "../../ClientSearch";
import "./Callflow.css";

class Callflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPhoneNumbers: [],    // all owned numbers (raw)
            phoneNumbers: [],       // filtered owned numbers
            availableNumbers: [],   // available Telnyx numbers
            searchTerm: ""
        };
    }

    async componentDidMount() {
        await this.fetchOwnedNumbers();
    }

    fetchOwnedNumbers = async () => {
        try {
            const response = await getOwnedPhoneNumbers();
            const numbers = response.data || [];
            this.setState({ allPhoneNumbers: numbers, phoneNumbers: numbers });
        } catch (error) {
            console.error("Error fetching owned Telnyx numbers:", error);
        }
    };

    handleSearch = async (searchTerm) => {
        this.setState({ searchTerm });

        // Optional: re-fetch from backend each time user types (latest list)
        await this.fetchOwnedNumbers();

        const { allPhoneNumbers } = this.state;
        const filtered = allPhoneNumbers.filter(num =>
            num.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({ phoneNumbers: filtered });
    };

    render() {
        const { phoneNumbers, availableNumbers } = this.state;

        return (
            <div className="callflow-container">
                <div className="search-section">
                    <ClientSearch onSearch={this.handleSearch} />
                </div>

                <h2>📞 Telnyx Callflow Dashboard</h2>

                <div className="table-section">
                    <h3>📱 Owned Phone Numbers</h3>
                    {phoneNumbers.length === 0 ? (
                        <p>No owned phone numbers found.</p>
                    ) : (
                        <table className="number-table">
                            <thead>
                                <tr>
                                    <th>Phone Number</th>
                                    <th>Record Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phoneNumbers.map((num, index) => (
                                    <tr key={index}>
                                        <td>{num.phone_number}</td>
                                        <td>{num.record_type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default Callflow;
