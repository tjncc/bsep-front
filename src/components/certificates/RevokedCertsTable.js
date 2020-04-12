import React from 'react';
import 'react-table-6/react-table.css';
import axios from 'axios';
import matchSorter from 'match-sorter'
import { Button, Card, Accordion, Form, Dropdown } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

var ReactTable = require('react-table-6').default;

const Alert = withReactContent(Swal)
class RevokedCertsTable extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            certificates: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/api/certificates/allrevoked').then(
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

    render() {

        const cert = [];

        for(var i = 0; i < this.props.content.length; i++) {
            const serialNumber = this.props.content[i].serialNumber;
            const certificateRole = this.props.content[i].certificateRole;

            { cert.push({ serialNumber: serialNumber, certificateRole: certificateRole}); }

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
                    style={{backgroundColor: 'rgba(255,255,255,1)'}}
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    onFilteredChange={(filtered, column, value) => {
                        this.onFilteredChangeCustom(value, column.id || column.accessor);
                    }} />

            </div>
        )
    }
}
export default withRouter(RevokedCertsTable);
