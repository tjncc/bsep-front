import React from 'react';
import 'react-table-6/react-table.css';
import axios from 'axios';
import matchSorter from 'match-sorter'
import { withRouter } from "react-router-dom";
var ReactTable = require('react-table-6').default;

class CertificatesTable extends React.Component {

    constructor(props) {
        super(props);

        axios.get('http://localhost:8081/api/certificates/all').then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
        );

        this.state = {
            certificates: []
        }
    }

    componentDidMount() {

        
    }

    onSuccessHandler(resp) {

        this.setState({
          certificates: resp.data,
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    render() {

        const cert = [];
        console.log(this.state.certificates)

        for(var i = 0; i < this.state.certificates.length; i++) {
            const serialNumber = this.state.certificates.serialNumber;
            const certificateRole = this.state.certificates.certificateRole;
            const certificateStatus = this.state.certificates.certificateStatus;
            const dateValid = this.state.certificates.dateValid;
            const dateExpired = this.state.certificates.dateExpired;

           
        }

        const columns = [
            {
                accessor: "serialNumber",
                Header: "Serial Number",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["serialNumber"] }),
                filterAll: true
            },
            {
                accessor: "certificateRole",
                Header: "Certificate Role",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["certificateRole"] }),
                filterAll: true
            },
            {
                accessor: "certificateStatus",
                Header: "Certificate Status",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["certificateStatus"] }),
                filterAll: true
            },
            {
                accessor: "dateValid",
                Header: "Date Valid",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateValid"] }),
                filterAll: true
            },
            {
                accessor: "dateExpired",
                Header: "Date expired",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dateExpired"] }),
                filterAll: true
            }
        ]

        return (
            <div>
                <br/>
                <br/>
                <ReactTable data={this.state.certificates} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    onFilteredChange={(filtered, column, value) => {
                        this.onFilteredChangeCustom(value, column.id || column.accessor);
                    }} />

            </div>
        )
    }
}
export default withRouter(CertificatesTable);
