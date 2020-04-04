import React from 'react';
import {Button} from 'react-bootstrap'
import { BrowserRouter as Router, withRouter, Link } from "react-router-dom";
//import Routes from './Router';
import '../../css/certificates/CertificatePage.css'

class CertificatePage extends React.Component{

    constructor(props){
        super(props);
        this.showAllCertificates = this.showAllCertificates.bind(this);
      }

      showAllCertificates() {
        window.location = "http://localhost:3000/allcertificates"
      }

      render(){
        return(
          <div className="divCertButtons" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <div className="divCertMiddle">
              <button variant="outline-dark" className="btnSertifikat">Request for a cerificate</button>
              <a className="aCertificate">Review existing certificates</a>
              </div>
          </div>

          
        );
    
      }
    
}

export default CertificatePage;
