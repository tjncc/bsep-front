import React from 'react';
import { Button, Card, Accordion, Form, Dropdown, FormGroup, FormControlLabel } from 'react-bootstrap'
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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const sweetAlert = withReactContent(Swal)
class CertificatePage extends React.Component{

    constructor(props){
        super(props);
        this.showAllCertificates = this.showAllCertificates.bind(this);
        this.createCertificate= this.createCertificate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);

        axios.get("http://localhost:8081/api/certificates/checkroot").then(
          (resp) => { window.location = "http://localhost:3000/createroot" },
          (resp) => {}
        );

        this.state = {
          status: '',
          serialnum: '',
        }

      }

      showAllCertificates() {
        window.location = "http://localhost:3000/allcertificates"
      }

      createCertificate() {
        window.location = "http://localhost:3000/createcertificate"
      }

      handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
        console.log(this.state);
      }


      checkValidity(){
        if(this.state.serialnum != ''){
        axios.get(`http://localhost:8081/api/certificates/check/${this.state.serialnum}`).then(
          (resp) => { this.setState({ status: resp.data }) },
          (resp) => alert('error'),
        );

        } else {
          sweetAlert.fire({
            title: '',
            text: 'Enter the serial number to check validity of the certificate',
            type: 'error',
            icon: 'error',
            button: true
          });
          
        }
        
      }


      render(){
        return(

          <div className="divCertButtons" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <div className="divCertMiddle">
              <button variant="outline-dark" className="btnSertifikat" onClick={this.createCertificate}>
              Request for a cerificate
              </button>

              <Link className="aCertificate" to="/allcertificates">  Valid certificates </Link>
              <Link className="aRCertificate" to="/revoked">  Revoked certificates </Link>

              </div>

              <div className="divCertDown">
                <Form>
                <Form.Group>
                    <Form.Label style={{color: 'rgb(164, 207, 194)'}}>Check validity of a certificate:</Form.Label>
                    <Form.Row> 
                    <Form.Control className="formCntrlNum" style={{width: '78%'}} placeholder="Enter serial number" required name="serialnum" onChange={this.handleChange} />
                    <Button variant="outline-light" onClick={this.checkValidity}>Check</Button>
                    </Form.Row>
                      <Form.Row>
                        <Form.Label style={{color: 'rgb(164, 207, 194)', margin: '2% 4%'}}>Certificate status: </Form.Label>
                        <Form.Label></Form.Label>
                        <Form.Label style={{color: 'rgb(220, 227, 224)', margin: '2% -2.6%' }}>{this.state.status}</Form.Label>
                      </Form.Row>
                  </Form.Group>
                </Form>

              </div>


          </div>


        );

      }

}

export default CertificatePage;
