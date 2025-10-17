import React, { Component } from "react";
import { withFuncProps } from "../../withFuncProps";
import RecordTable from "../../Functions/Table/RecordTable/RecordTable";
import ClientSearch from "../../ClientSearch";
import './MainPage.css';
import { getRecords, getOwnedPhoneNumbers, getAvailablePhoneNumbers } from "../../../connector.js";
import { useNavigate } from "react-router-dom";

// ✅ Wrap navigation for class component
export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            phoneNumbers: [],         // owned Telnyx numbers
            availableNumbers: [],     // available Telnyx numbers
            searchTerm: '',
            selectedRowData: null
        };
    }

    async componentDidMount() {
        await this.loadRecords();
        await this.fetchOwnedNumbers();
        await this.fetchAvailableNumbers(); // 👈 new call
    }

    // ✅ Fetch Records
    loadRecords = async () => {
        try {
            const records = await getRecords();
            this.setState({ records });
        } catch (error) {
            console.error("Error loading records:", error);
        }
    };

    fetchOwnedNumbers = async () => {
        try {
            const response = await getOwnedPhoneNumbers();
            const numbers = response.data || [];
            this.setState({ phoneNumbers: numbers });
            console.log("Owned Telnyx Numbers:", numbers);
        } catch (error) {
            console.error("Error fetching owned Telnyx numbers:", error);
        }
    };

    fetchAvailableNumbers = async () => {
        try {
            const response = await getAvailablePhoneNumbers();
            const available = response.data || [];
            this.setState({ availableNumbers: available });
            console.log("Available Telnyx Numbers:", available);
        } catch (error) {
            console.error("Error fetching available Telnyx numbers:", error);
        }
    };

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });
    };

    getFilteredData = () => {
        const { searchTerm, records } = this.state;
        if (!searchTerm) return records;
        return records.filter(item =>
            (item.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.type || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.jobTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    handleRowSelected = (selectedData) => {
        this.setState({ selectedRowData: selectedData }, () => {
            this.props.navigate('/edit-existing-client', {
                state: { selectedRow: selectedData }
            });
        });
    };

    render() {
        const filteredData = this.getFilteredData();
        const { phoneNumbers, availableNumbers } = this.state;

        return (
            <div className="main-page-body">
                <div className="main-page-container">
                    <div>
                        <ClientSearch onSearch={this.handleSearch} />
                    </div>

                    <div className="owned-numbers-section">
                        <h3>📱 Owned Phone Numbers</h3>
                        {phoneNumbers.length === 0 ? (
                            <p>No phone numbers found.</p>
                        ) : (
                            <ul>
                                {phoneNumbers.map((num, index) => (
                                    <li key={index}>
                                        {num.phone_number} — {num.record_type}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="available-numbers-section">
                        <h3>📞 Available Phone Numbers</h3>
                        {availableNumbers.length === 0 ? (
                            <p>No available numbers found.</p>
                        ) : (
                            <ul>
                                {availableNumbers.map((num, index) => (
                                    <li key={index}>
                                        {num.phone_number} — {num.country_code || 'N/A'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="record-table-section">
                        <RecordTable
                            rowData={filteredData}
                            onRowSelected={this.handleRowSelected}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withFuncProps(withNavigation(MainPage));
