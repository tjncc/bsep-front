import React from 'react';
import { Button, Card, Accordion, Form, Dropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import roots from "../../icons/roots.png"
import back from "../../icons/back.png"
import tips from "../../icons/tips.png"
import '../../css/certificates/CreateNewRootPage.css'



const SubjectValidationAlert = withReactContent(Swal)
class CreateCertificatePage extends React.Component {

  constructor(props) {
    super(props);
    this.showIssuerDataForm = this.showIssuerDataForm.bind(this);
    this.backToHomepage = this.backToHomepage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateSubjectFields = this.validateSubjectFields.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectSubjectType = this.handleSelectSubjectType.bind(this);
    this.handleKeyUsage = this.handleKeyUsage.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);

    this.state = {

      commonName: '',
      state: '',
      city: '',
      email: '',
      organization: '',
      organizationUnit: '',
      serialNumber:'',
      certificateRole:'',
      subjectType: 'CA',
      digitalSignarute:'',
      keyEncipherment:'',
      dataEnicipherment:'',
      keyAgreement:'',
      keyCertSign:'',
      crlSign:'',
      nonRepudiation:'',
      encipherOnly:'',
      decipherOnly:'',
      isCriticalKeyUsage: '',
      password:''

    }


  }

  validateSubjectFields() {
    const {commonName, state, city, organization, organizationUnit, email, subjectType,password} = this.state;
    const isEmpty =  commonName === "" || state === "" || city === "" || organization === "" || organizationUnit === "" || email === "" || password === "";

    if (!isEmpty ||  !this.state.subjectType === "None") {

        console.log(this.state);

        var keyUsageDto = {
          digitalSignarute: this.state.digitalSignarute,
          keyEncipherment: this.state.keyEncipherment,
          dataEnicipherment: this.state.dataEnicipherment,
          keyAgreement: this.state.keyAgreement,
          keyCertSign: this.state.keyCertSign,
          crlSign: this.state.crlSign,
          nonRepudiation: this.state.nonRepudiation,
          encipherOnly: this.state.encipherOnly,
          decipherOnly : this.state.decipherOnly,
          isCriticalKeyUsage: this.state.isCriticalKeyUsage,
        }

        var exstensionsDto = {
          keyUsageDto: keyUsageDto,

        }

        var niz = Int8Array.from(atob(this.state.password), c => c.charCodeAt(0));
        var pass = [];

              niz.forEach(element => {

                console.log(element);

                  pass.push(element);
              });
        

        var object = {commonName: this.state.commonName, state: this.state.state, city: this.state.city,
        email: this.state.email, organization: this.state.organization, organizationUnit :  this.state.organizationUnit,
        subjectType :  this.state.subjectType,exstensionsDto: exstensionsDto, password: pass}

      axios.post("http://localhost:8081/api/certificates/saveroot", object).then(
        (resp) => {

          SubjectValidationAlert.fire({
            title: "Successfully added root certificate.",
            text: '',
            type: "success",
            icon: "success",
            button: true
          });

          window.location = "http://localhost:3000/"

        },
        (resp) => {
          SubjectValidationAlert.fire({
            title: "Issuing root certificate failed. Please try again.",
            text: '',
            type: "error",
            icon: "error",
            button: true
          });
        },
      );
    } else {
      SubjectValidationAlert.fire({
        title: "You didn't fill out all the fields or forgot to select the issuer",
        text: '',
        type: "error",
        icon: "error",
        button: true
      });
    }
  }

  handleKeyUsage(e){
    console.log(document.getElementsByName(e.target.name));
    if(document.getElementsByName(e.target.name)[0].checked === true){
     this.setState({ ...this.state, [e.target.name]: e.target.value });
   }else{
    document.getElementsByName(e.target.name)[0].checked = false;
    this.setState({ ...this.state, [e.target.name]: "" });
   }

  }

  handleChangeChecked(e){

    if(document.getElementsByName(e.target.name)[0].checked === true){
     this.setState({ ...this.state, [e.target.name]: e.target.value });
   }else{
    document.getElementsByName(e.target.name)[0].checked = false;
    this.setState({ ...this.state, [e.target.name]: "" });
   }

  }

  onErrorHandler(resp) {

    console.log(this.state);

    SubjectValidationAlert.fire({
        title: "Error occured",
        text: '',
        type: 'error',
        icon: 'error',
        button: true
      });

}

onSuccessHandler(resp) {

  console.log(this.state);

    SubjectValidationAlert.fire({
        title: "Certificate issued",
        text: "",
        type: 'success',
        icon: 'success'
      });
      window.location = "http://localhost:3000"
}

  showIssuerDataForm() {

    document.getElementById("accordion").defaultActiveKey = "1";
  }

  backToHomepage() {
    window.location = "http://localhost:3000/"
  }

  handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  handleSelect(e){
    console.log(e.target.value)
    this.setState({issuerSerialNumber : e.target.value})

}

handleSelectSubjectType(e){
  console.log(e.target.value)
  this.setState({subjectType : e.target.value})

}

  render() {

console.log(this.state);

    return (

      <div style={{backgroundColor: 'rgb(39, 39, 39)', top:'0', bottom:'0', left:'0', right:'0', position: 'absolute',height:'100%'}}>
        <Button variant="link" className="backButton" onClick={this.backToHomepage}>
          <img src={back} style={{ width: '25px', height: '25px' }}></img>
        </Button>

        <Accordion id="accordion" defaultActiveKey="0" style={{ width: '60%', marginTop: '2%', marginLeft: '20%' }}>
          <Card style={{backgroundColor: 'rgba(61, 58, 58, 0.6)'}}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="light" eventKey="0" style={{ width: '25%' }}>
                Subject data
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>

              <Card style={{backgroundColor: 'rgba(61, 58, 58, 0.6)'}}>
              <Card.Body>
              <img src={roots} style={{width:'30px',height:'30px',padding:'4px'}}></img>
              <label style={{color:'white'}}>Currently there are no avaliable certificates. You have to fill out a form for creating a new root certificate.</label>
              </Card.Body>
              </Card>

                <Form style={{ textAlign: 'left', width: '50%' }}>
                  <Form.Group>
                    <Form.Label style={{color:'white'}}>Common Name:</Form.Label>
                    <Form.Control placeholder="Enter common name" required name="commonName" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label style={{color:'white'}}>Organization</Form.Label>
                    <Form.Control placeholder="Enter organization" required name="organization" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label style={{color:'white'}}>Organization unit</Form.Label>
                    <Form.Control placeholder="Enter organization unit" required name="organizationUnit" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label style={{color:'white'}}>City</Form.Label>
                    <Form.Control placeholder="Enter city" required name="city" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label style={{color:'white'}}>State</Form.Label>
                    <Form.Control placeholder="Enter state" name="state" onChange={this.handleChange} required />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label style={{color:'white'}}>Email</Form.Label>
                    <Form.Control placeholder="Enter email" type="email" name="email" onChange={this.handleChange} required />
                  </Form.Group>

                  <Card style={{backgroundColor: 'rgba(99, 107, 110, 0.6)'}}>

                    <Card style={{ textAlign: 'left', width: '50%', marginLeft: '5%', marginTop: '2%', marginBottom: '2%', backgroundColor: 'rgba(99, 107, 110, 0.6)', padding: '10px 10px' }}>
                      <div style={{padding:'3px 8px', backgroundColor: 'rgb(69, 69, 69)'}}>
                      <label style={{color:'white'}}>Extensions: </label>
                      <label style={{ marginTop: '2%',color:'white' }}><b>Key usage</b></label>
                      <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=" is Critical"
                          onChange={this.handleChangeChecked}
                          className="formCheckA"
                          name="isCriticalKeyUsage"
                        />
                      <div>
                        <input type="checkbox" name="digitalSignarute" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>Digital Signature</label>
                      </div>

                      <div>
                        <input type="checkbox" name="nonRepudiation" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>Non Repudiation</label>
                      </div>

                      <div>
                        <input type="checkbox" name="keyEncipherment" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>Key Encipherment </label>
                      </div>

                      <div>
                        <input type="checkbox" name="dataEnicipherment" onChange={this.handleKeyUsage} ></input>
          &nbsp;
          <label style={{color:'white'}}>Data Encipherment </label>
                      </div>

                      <div>
                        <input type="checkbox" name="keyAgreement" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>Key Agreement</label>
                      </div>

                      <div>
                        <input type="checkbox" name="keyCertSign" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>Key CertSign</label>
                      </div>

                      <div>
                        <input type="checkbox" name="crlSign" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>CRL Sign</label>
                      </div>


                      <div>
                        <input type="checkbox" name="encipherOnly" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>EncipherOnly</label>
                      </div>

                      <div>
                        <input type="checkbox" name="decipherOnly" onChange={this.handleKeyUsage}></input>
          &nbsp;
          <label style={{color:'white'}}>DecipherOnly</label>
                      </div>
                      </div>
                      </Card>
                      </Card>



                  <Card style={{backgroundColor: 'rgba(61, 58, 58, 0.6)'}} >
                  <Card.Body>
                  <img src={tips} style={{width:'30px',height:'30px',padding:'4px'}}></img>
                  <label style={{color:'white'}}>Because this is a root certificate only subject data is needed.</label>
                  </Card.Body>
                  </Card>
                  <Card style={{backgroundColor: 'rgba(99, 107, 110, 0.6)',textAlign:'left'}}><Card.Body>Password:  <input name="password" onChange={this.handleChange} type="password"></input></Card.Body></Card>

                  <Accordion.Toggle as={Button} variant="light" eventKey="1" style={{ marginRight: '93%',width:'200px',marginTop:'12px' }} onClick={this.validateSubjectFields} >Issue root certificate</Accordion.Toggle>
                </Form>

              </Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </div>




    );

  }

}

export default withRouter(CreateCertificatePage);
