import React from 'react';
import CertificatesTable from './CertificatesTable';
import { withRouter } from "react-router-dom";
import '../../css/certificates/AllCertificatesPage.css'
import {Button} from 'react-bootstrap'
import back from "../../icons/back.png"

class AllCertificatesPage extends React.Component {

    constructor(props) {
        super(props);

        this.backToHomepage = this.backToHomepage.bind(this);
    }

    backToHomepage() {
      window.location = "http://localhost:3000/"
    }


    render() {
        return (
            <div className="AllCertificatesPageBackground"style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>

                <Button variant="link" className="backButton" onClick={this.backToHomepage}>
                <img src={back} style={{width:'25px',height:'25px'}}></img>
                </Button>

                <div style={{width:'70%',marginLeft:'15%'}}>
                <CertificatesTable></CertificatesTable>
                </div>

            </div>
        );
    }

}

export default withRouter(AllCertificatesPage);
