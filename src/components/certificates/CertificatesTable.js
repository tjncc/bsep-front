import React from 'react';
import 'react-table-6/react-table.css';
import axios from 'axios';
import matchSorter from 'match-sorter'
import { Button, Card, Accordion, Form, Dropdown } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
var ReactTable = require('react-table-6').default;

class CertificatesTable extends React.Component {

    constructor(props) {
        super(props);

        
        this.state = {
            certificates: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/api/certificates/all').then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
        );
      
    }

    onSuccessHandler(resp) {

        this.setState({
          certificates: resp.data,
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    revokeCertificate(certificate) {

         axios.post("http://localhost:8081/api/certificates/revoke", certificate).then(
             (resp) => this.onSuccessHandlerRevoke(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onSuccessHandlerRevoke(resp) {

       alert("revoked");
       console.log(resp.data.serialNumber);
    }


    render() {

        const cert = [];
        //console.log(this.state.certificates)
        console.log(this.state.certificates.validFrom);

        for(var i = 0; i < this.state.certificates.length; i++) {
            const serialNumber = this.state.certificates.serialNumber;
            const certificateRole = this.state.certificates.certificateRole;
            const certificateStatus = this.state.certificates.certificateStatus;
            const validFrom = this.state.certificates.validFrom;
            const validTo = this.state.certificates.validTo;

           
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
                accessor: "validFrom",
                Header: "Date Valid",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["validFrom"] }),
                filterAll: true
            },
            {
                accessor: "validTo",
                Header: "Date expired",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["validTo"] }),
                filterAll: true
            },
            {
                accessor: "serialNumber",
                Header: "Download",
                Cell: ({ row }) => (<Button className="deleteDoctor" variant="outline-success" >Download</Button>)
            },
            {
                accessor: "serialNumber",
                Header: "Revoke",
                Cell: ({ row }) => (<Button className="revokeCert" onClick={this.revokeCertificate.bind(this, row)} variant="outline-danger">Revoke</Button>)
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
