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

    }


  }

  validateSubjectFields() {
    const {commonName, state, city, organization, organizationUnit, email, subjectType} = this.state;
    const isEmpty =  commonName === "" || state === "" || city === "" || organization === "" || organizationUnit === "" || email === "";

    if (!isEmpty ||  !this.state.subjectType === "None") {

        console.log(this.state);

        var object = {commonName: this.state.commonName, state: this.state.state, city: this.state.city,
        email: this.state.email, organization: this.state.organization, organizationUnit :  this.state.organizationUnit,
        subjectType :  this.state.subjectType}

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


    return (

      <div>
        <Button variant="link" className="backButton" onClick={this.backToHomepage}>
          <img src={back} style={{ width: '25px', height: '25px' }}></img>
        </Button>

        <Accordion id="accordion" defaultActiveKey="0" style={{ width: '60%', marginTop: '2%', marginLeft: '20%' }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline-dark" eventKey="0" style={{ width: '25%' }}>
                Subject data
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>

              <Card>
              <Card.Body>
              <img src={roots} style={{width:'30px',height:'30px',padding:'4px'}}></img>
              <label>Currently there are no avaliable certificates. You have to fill out a form for creating a new root certificate.</label>
              </Card.Body>
              </Card>

                <Form style={{ textAlign: 'left', width: '50%' }}>
                  <Form.Group>
                    <Form.Label>Common Name:</Form.Label>
                    <Form.Control placeholder="Enter common name" required name="commonName" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Organization</Form.Label>
                    <Form.Control placeholder="Enter organization" required name="organization" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Organization unit</Form.Label>
                    <Form.Control placeholder="Enter organization unit" required name="organizationUnit" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="Enter city" required name="city" onChange={this.handleChange} />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>State</Form.Label>
                    <Form.Control placeholder="Enter state" name="state" onChange={this.handleChange} required />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Enter email" type="email" name="email" onChange={this.handleChange} required />
                  </Form.Group>

                  <Card >
                  <Card.Body>
                  <img src={tips} style={{width:'30px',height:'30px',padding:'4px'}}></img>
                  <label>Because this is a root certificate only subject data is needed.</label>
                  </Card.Body>
                  </Card>
                  <Accordion.Toggle as={Button} variant="outline-dark" eventKey="1" style={{ marginRight: '93%',width:'200px',marginTop:'12px' }} onClick={this.validateSubjectFields} >Issue root certificate</Accordion.Toggle>
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
