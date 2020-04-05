import React from 'react';
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter'
import { withRouter } from "react-router-dom";
var ReactTable = require('react-table-6').default;

class CertificatesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            certificates: []
        }

        //this.renderTableData = this.renderTableData.bind(this);
    }

    componentDidMount() {

        /*axios.get('http://localhost:8081/api/certificates/all').then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
        );*/
    }

    onSuccessHandler(resp) {

        this.setState({
          certificates: resp.data,
        });

    }

    onErrorHandlerRoom(response) {
        alert("Error response: Uncovered case");
    }

    render() {

        const cert = [];

        for(var i = 0; i < this.state.certificates.length; i++) {
            const name = this.state.certificates.name;
            const issuer = this.state.certificates.issuer;
            const subject = this.state.certificates.subject;
            const dateValid = this.state.certificates.dateValid;
            const dateExpired = this.state.certificates.dateExpired;

            {cert.push({name: name, issuer: issuer, subject: subject, dateValid: dateValid, dateExpired: dateExpired})}

        }

        const columns = [
            {
                accessor: "name",
                Header: "Name",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true
            },
            {
                accessor: "issuer",
                Header: "Issuer",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["issuer"] }),
                filterAll: true
            },
            {
                accessor: "subject",
                Header: "Subject",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["subject"] }),
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
                <ReactTable data={cert} columns={columns}
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
