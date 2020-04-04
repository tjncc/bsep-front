import React from 'react';
import CertificatesTable from './CertificatesTable';
import { withRouter } from "react-router-dom";

class AllCertificatesPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CertificatesTable></CertificatesTable>
            </div>
        );
    }

}

export default withRouter(AllCertificatesPage);