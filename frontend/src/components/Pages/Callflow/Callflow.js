import React, { Component } from "react";
import { getOwnedPhoneNumbers } from "../../../connector.js";
import UniversalSearch from "../../UniversalSearch.js";
import AgGridTable from "../../Functions/Table/AgGridTable/AgGridTable.js";
import styles from "./Callflow.module.scss";

class Callflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPhoneNumbers: JSON.parse(localStorage.getItem("telnyx_owned_numbers")) || [],
      phoneNumbers: JSON.parse(localStorage.getItem("telnyx_owned_numbers")) || [],
      searchTerm: "",
      columnDefs: [
        { headerName: "#", valueGetter: "node.rowIndex + 1", width: 80 },
        { headerName: "Phone Number", field: "phone_number", flex: 1 },
        { headerName: "Name", field: "connection_name", flex: 1 },
        { headerName: "Press Key", field: "external_pin", flex: 1 },
        { headerName: "Assign To", field: "messaging_profile_name", flex: 1 }
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      }
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem("telnyx_owned_numbers")) {
      await this.fetchOwnedNumbers();
    }
  }

  fetchOwnedNumbers = async () => {
    try {
      const response = await getOwnedPhoneNumbers();
      const numbers = response.data || [];
      this.setState({ allPhoneNumbers: numbers, phoneNumbers: numbers });
      localStorage.setItem("telnyx_owned_numbers", JSON.stringify(numbers));
    } catch (error) {
      console.error("Error fetching owned Telnyx numbers:", error);
    }
  };

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
    const { allPhoneNumbers } = this.state;
    const filtered = allPhoneNumbers.filter(num =>
      num.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ phoneNumbers: filtered });
  };

  render() {
    const { phoneNumbers, columnDefs, defaultColDef } = this.state;

    return (
      <div className={styles.callflowContainer}>
        <h2>Callflow</h2>

        <div className={styles.searchSection}>
          <UniversalSearch onSearch={this.handleSearch} />
          <button className={styles.chooseBtn}>Choose</button>
        </div>

        <div className={styles.tableSection}>
          <AgGridTable
            rowData={phoneNumbers}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            suppressHorizontalScroll={true}
            onGridReady={(params) => (this.gridApi = params.api)}
            onSelectionChanged={() => console.log("Row selected")}
          />
        </div>

        <button className={styles.addNumberBtn}>Add a New Number</button>
      </div>
    );
  }
}

export default Callflow;