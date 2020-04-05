import React from 'react';
import {Button, Card, Accordion, Form, Dropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
} from "react-router-dom";
import back from "../../icons/back.png"




class CreateCertificatePage extends React.Component{

    constructor(props){
        super(props);
        this.showIssuerDataForm = this.showIssuerDataForm.bind(this);
        this.backToHomepage = this.backToHomepage.bind(this);


      }

      showIssuerDataForm(){

        document.getElementById("accordion").defaultActiveKey= "1";
      }

      backToHomepage() {
        window.location = "http://localhost:3000/"
      }



      render(){
        return(

<div>
  <Button variant="link" className="backButton" onClick={this.backToHomepage}>
  <img src={back} style={{width:'25px',height:'25px'}}></img>
  </Button>

  <Accordion  id="accordion" defaultActiveKey="0" style={{width:'60%',marginTop:'2%',marginLeft:'20%'}}>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="outline-dark" eventKey="0" style={{width:'25%'}}>
        Subject data
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>

<Form style={{textAlign:'left',width:'50%'}}>
<Form.Group>
  <Form.Label>Common Name:</Form.Label>
  <Form.Control placeholder="Enter common name" required />
</Form.Group>

<Form.Group >
  <Form.Label>Organization</Form.Label>
  <Form.Control placeholder="Enter organization" required/>
</Form.Group>

<Form.Group >
  <Form.Label>Organization unit</Form.Label>
  <Form.Control placeholder="Enter organization unit" required/>
</Form.Group>

<Form.Group >
  <Form.Label>Location (City)</Form.Label>
  <Form.Control placeholder="Enter location" required/>
</Form.Group>

<Form.Group >
  <Form.Label>Country</Form.Label>
  <Form.Control placeholder="Enter country" required/>
</Form.Group>

 <Form.Group >
  <Form.Label>Email</Form.Label>
  <Form.Control placeholder="Enter email"  type="email" required/>
</Form.Group>

<Form.Group>
<Form.Check
  type="switch"
  id="custom-switch"
  label="Self-signed"
/>
</Form.Group>
<Button  as={Accordion.Toggle} variant="outline-dark" eventKey="1" style={{marginRight:'93%'}} type="submit" >Next</Button>
</Form>

    </Card.Body>
    </Accordion.Collapse>
  </Card>

  <Card id="issuerForm">
    <Card.Header>
      <Accordion.Toggle as={Button} variant="outline-dark" eventKey="1" style={{width:'25%'}}>
        Issuer data
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>

      <Card variant="outline-primary" style={{padding:'15px'}}>
      <label>Currently avaliable CA:</label>
      <Dropdown>
  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
    Choose Issuer
  </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </Card>

      </Card.Body>
    </Accordion.Collapse>
  </Card>

  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="outline-dark" eventKey="2" style={{width:'25%'}}>
        Other info
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body>

      <Card>

      <Card style={{textAlign:'left',width:'50%',marginLeft:'5%',marginTop:'2%'}}>

        <label>Extensions:</label>
        <label style={{marginTop:'2%'}}><b>Key usage</b></label>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>Digital Signature</label>
        </div>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>Key Encipherment </label>
        </div>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>Data Encipherment </label>
        </div>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>Key Agreement</label>
        </div>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>Key CertSign</label>
        </div>

        <div>
        <input type="checkbox"></input>
        &nbsp;
        <label>CRL Sign</label>
        </div>

        </Card>

        <Card style={{marginTop:'5%',width:'50%',marginLeft:'5%',marginBottom:'2%'}}>
        <Dropdown style={{textAlign:'left',width:'50%',marginLeft:'5%',marginTop:'2%'}}>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          Subject Type
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">CA</Dropdown.Item>
          <Dropdown.Item href="#/action-2">End entity</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

        <Form style={{textAlign:'left',width:'50%',marginLeft:'5%',marginTop:'5%'}}>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" style={{width:'250px'}} required/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Allias</Form.Label>
          <Form.Control type="text" style={{width:'250px'}} required/>
        </Form.Group>

        </Form>

      </Card>

      </Card>

      <Button variant="outline-primary"style={{marginBottom:'3%',width:'200px',align:'center',marginTop:'5%'}}>Issue Certificate</Button>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
</div>




        );

      }

}

export default withRouter(CreateCertificatePage);
