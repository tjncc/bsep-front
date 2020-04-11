import React from 'react';
import axios from 'axios';
import RevokedCertsTable from './RevokedCertsTable'
import { withRouter } from "react-router-dom";
import '../../css/certificates/AllCertificatesPage.css'
import {Button} from 'react-bootstrap'
import back from "../../icons/back.png"

class RevokedCertificates extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            certificates: []
        }

        this.backToHomepage = this.backToHomepage.bind(this);

        axios.get("http://localhost:8081/api/certificates/allrevoked").then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );
    }

    onSuccessHandler(resp) {
        var temp = [];

        for (var i = 0; i < resp.data.length; i++) {
            temp.push(resp.data[i]);
        }
        this.setState({
            certificates: temp
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
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
                <RevokedCertsTable content={this.state.certificates}/>
                </div>

            </div>
        );
    }

}

export default withRouter(RevokedCertificates);
