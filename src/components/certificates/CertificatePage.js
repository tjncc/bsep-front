import React from 'react';
import {Button} from 'react-bootstrap'
import { BrowserRouter as Router, withRouter, Link } from "react-router-dom";
import Routes from './Router';
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
          <Router>
            <div>
              <Button className="btnSertifikat">Trazi sertifikat</Button>
              <Link to='/allcertificates'>Pregledaj sertifikat</Link>
          </div>
          </Router>
          
        );
    
      }
    
}

export default withRouter(CertificatePage);
