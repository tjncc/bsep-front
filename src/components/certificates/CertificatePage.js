import React from 'react';
import {Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
//import Routes from './Router';
import axios from 'axios';
import AllCertificatesPage from '../certificates/AllCertificatesPage';
import '../../css/certificates/CertificatePage.css'


class CertificatePage extends React.Component{

    constructor(props){
        super(props);
        this.showAllCertificates = this.showAllCertificates.bind(this);
        this.createCertificate= this.createCertificate.bind(this);

        axios.get("http://localhost:8081/api/certificates/checkroot").then(
          (resp) => { window.location = "http://localhost:3000/createroot" },
          (resp) => {}
        );

      }

      showAllCertificates() {
        window.location = "http://localhost:3000/allcertificates"
      }

      createCertificate() {
        window.location = "http://localhost:3000/createcertificate"
      }

      render(){
        return(


          <div className="divCertButtons" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <div className="divCertMiddle">
              <button variant="outline-dark" className="btnSertifikat" onClick={this.createCertificate}>
              Request for a cerificate
              </button>

              <Link className="aCertificate" to="/allcertificates">  Valid certificates </Link>
              <Link className="aRCertificate" to="/revoked">  Review revoked </Link>


              </div>
          </div>




        );

      }

}

export default CertificatePage;
