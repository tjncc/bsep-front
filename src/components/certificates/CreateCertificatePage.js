import React from 'react';
import { Button, Card, Accordion, Form, Dropdown, FormGroup, FormControlLabel } from 'react-bootstrap'
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
import '../../css/certificates/CreateCertificate.css'

const SubjectValidationAlert = withReactContent(Swal)
class CreateCertificatePage extends React.Component {

  constructor(props) {
    super(props);
    this.showIssuerDataForm = this.showIssuerDataForm.bind(this);
    this.backToHomepage = this.backToHomepage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleExtendedChangeChecked = this.handleExtendedChangeChecked.bind(this);
    this.validateSubjectFields = this.validateSubjectFields.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectSubjectType = this.handleSelectSubjectType.bind(this);
    this.renderCommonNames = this.renderCommonNames.bind(this);
    this.handleKeyUsage = this.handleKeyUsage.bind(this);
    this.handleSelectTemplate = this.handleSelectTemplate.bind(this);


    this.state = {

      commonName: '',
      state: '',
      city: '',
      email: '',
      organization: '',
      organizationUnit: '',
      serialNumber:'',
      certificateRole:'',
      issuerSerialNumber: '',
      subjectType: 'CA',
      allCAs: [],
      digitalSignarute:'',
      keyEncipherment:'',
      dataEnicipherment:'',
      keyAgreement:'',
      keyCertSign:'',
      crlSign:'',
      nonRepudiation:'',
      encipherOnly:'',
      decipherOnly:'',
      selectedTemplate: '',
      serverAuth:'',
      clientAuth:'',
      codeSigning:'',
      emailProtection:'',
      timeStamping:'',
      isCriticalKeyUsage: '',
      isCriticalExtendedKeyUsage: '',


    }


  }

  validateSubjectFields() {
    const {commonName, state, city, organization, issuerSerialNumber, organizationUnit, email, subjectType} = this.state;
    const isEmpty =  commonName === "" || state === "" || city === "" || organization === "" || organizationUnit === "" || email === "" || issuerSerialNumber === "";

    if (!isEmpty || !this.state.issuerSerialNumber === "None" || !this.state.subjectType === "None" || !this.state.issuerSerialNumber === "") {

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

        var extendedKeyUsageDto = {
          serverAuth: this.state.serverAuth,
          clientAuth: this.state.clientAuth,
          codeSigning: this.state.codeSigning,
          emailProtection:this.state.emailProtection,
          timeStamping: this.state.timeStamping,
          isCriticalExtendedKeyUsage: this.state.isCriticalExtendedKeyUsage,

        }

        var exstensionsDto = {
          keyUsageDto: keyUsageDto,
          extendedKeyUsageDto : extendedKeyUsageDto,
        }

        var object = {commonName: this.state.commonName, state: this.state.state, city: this.state.city,
        email: this.state.email, organization: this.state.organization, organizationUnit :  this.state.organizationUnit,
        issuerSerialNumber: this.state.issuerSerialNumber, subjectType :  this.state.subjectType, exstensionsDto: exstensionsDto}

      axios.post("http://localhost:8081/api/certificates/save", object).then(
        (resp) => this.onSuccessHandler(resp),
        (resp) => this.onErrorHandler(resp)
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

  //console.log(this.state);

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
    console.log(this.state);
  }

  handleSelect(e){
    console.log(e.target.value)
    this.setState({issuerSerialNumber : e.target.value})

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

handleSelectSubjectType(e){
  console.log(e.target.value)
  this.setState({subjectType : e.target.value})

  if(e.target.value === "ENDENTITY"){
    document.getElementsByName('endExtension')[0].style.display = 'block';
  } else {
    document.getElementsByName('endExtension')[0].style.display = 'none';
  }

}

handleSelectTemplate(e){
  console.log(e.target.value)
  console.log(this.state)
  this.setState({selectedTemplate : e.target.value})
  console.log(document.getElementsByName("digitalSignarute")[0]);

  document.getElementsByName("digitalSignarute")[0].checked = false;
  document.getElementsByName("keyEncipherment")[0].checked = false;
  document.getElementsByName("nonRepudiation")[0].checked = false;
  document.getElementsByName("dataEnicipherment")[0].checked = false;
  document.getElementsByName("keyAgreement")[0].checked = false;
  document.getElementsByName("keyCertSign")[0].checked = false;
  document.getElementsByName("crlSign")[0].checked = false;
  document.getElementsByName("encipherOnly")[0].checked = false;
  document.getElementsByName("decipherOnly")[0].checked = false;

  this.setState({digitalSignarute: "off",
              keyEncipherment: "off",
              nonRepudiation: "off",
              dataEnicipherment: "off",
              keyAgreement: "off",
              keyCertSign: "off",
              crlSign: "off",
              encipherOnly: "off",
              decipherOnly: "off"})

  if(e.target.value === "DigitalAndKeyE"){
    document.getElementsByName("digitalSignarute")[0].checked = true;
    this.setState({digitalSignarute: "on"})

    document.getElementsByName("keyEncipherment")[0].checked = true;
    this.setState({keyEncipherment: "on"})


  } else if(e.target.value === "OnlyDigital") {
    document.getElementsByName("digitalSignarute")[0].checked = true;
    this.setState({digitalSignarute: "on"})


  } else if(e.target.value === "KK") {
    document.getElementsByName("keyAgreement")[0].checked = true;
    document.getElementsByName("keyCertSign")[0].checked = true;

    this.setState({keyAgreement: "on", keyCertSign: "on"})


  } else if(e.target.value === "None") {

  } else if(e.target.value === "DED") {
    document.getElementsByName("digitalSignarute")[0].checked = true;
    this.setState({digitalSignarute: "on"})

    document.getElementsByName("keyEncipherment")[0].checked = true;
    this.setState({keyEncipherment: "on"})

    document.getElementsByName("dataEnicipherment")[0].checked = true;
    this.setState({dataEnicipherment: "on"})
  }

}

renderCommonNames(){
  return(
      this.state.allCAs.map(dto => {
        console.log(dto);
          return(
              <option style={{color:'white'}} value={dto.serialNumber}>{dto.commonName + " " + dto.serialNumber}</option>
          )
      })
  )
}

handleChangeChecked(e){

  if(document.getElementsByName(e.target.name)[0].checked === true){
   this.setState({ ...this.state, [e.target.name]: e.target.value });
 }else{
  document.getElementsByName(e.target.name)[0].checked = false;
  this.setState({ ...this.state, [e.target.name]: "" });
 }

}

handleExtendedChangeChecked(e){

  if(document.getElementsByName(e.target.name)[0].checked === true){
   this.setState({ ...this.state, [e.target.name]: e.target.value });
 }else{
  document.getElementsByName(e.target.name)[0].checked = false;
  this.setState({ ...this.state, [e.target.name]: "" });
 }

}




  componentDidMount() {

    axios.get('http://localhost:8081/api/certificates/CA').then(
      (resp) => {

        this.setState({
          allCAs: resp.data,
        });

      }
      ,
      (resp) => { alert("Something went wrong, please try again.") }
    );


  }


  render() {
    console.log(this.state)

    return (

      <div style={{backgroundColor: 'rgb(39, 39, 39)', top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
        <Button variant="link" className="backButton" onClick={this.backToHomepage}>

        </Button>

        <Accordion  id="accordion" defaultActiveKey="0" style={{ width: '60%', marginTop: '2%', marginLeft: '20%'}}>
          <Card style={{backgroundColor: 'rgba(99, 107, 110, 0.6)'}}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="light" eventKey="0" style={{ width: '25%' }}>
                Subject data
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>

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



                  <Accordion.Toggle as={Button} variant="light" eventKey="1" style={{ marginRight: '93%' }} >Next</Accordion.Toggle>
                </Form>

              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card id="issuerForm" style={{backgroundColor: 'rgba(99, 107, 110, 0.6)'}}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="light" eventKey="1" style={{ width: '25%' }}>
                Issuer data
      </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>

                <Card variant="outline-primary" style={{ padding: '15px',backgroundColor: 'rgba(99, 107, 110, 0.6)' }}>
                  <label style={{color:'white'}}>Currently avaliable CA:</label>
                  <select className="selectD" defaultValue="None" onChange={this.handleSelect}>
                    <option value="None">None</option>
                    {this.renderCommonNames()}
                  </select>

                </Card>

              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card style={{backgroundColor: 'rgba(99, 107, 110, 0.6)'}}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="light" eventKey="2" style={{ width: '25%' }}>
                Other info
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>

              <Card style={{ backgroundColor: 'rgba(99, 107, 110, 0.6)', marginTop: '3%', width: '50%', marginLeft: '-0.1%', marginBottom: '2%', padding: '15px' }}>
                    <Card.Title style={{ color: 'white' }}>Choose Template:</Card.Title>
                    <select className="selectD" defaultValue="None" onChange={this.handleSelectTemplate}>
                      <option value="None">None</option>
                      <option value="DigitalAndKeyE">Digital Certificate and Key Encipherment</option>
                      <option value="OnlyDigital">Only Digital Certificate</option>
                      <option value="KK">Key Agreement and KeyCertSign</option>
                      <option value="DED">Digital Certificate, Key Encipherment and Data Enicipherment</option>
                    </select>
                  </Card>

                  <Card style={{backgroundColor: 'rgba(99, 107, 110, 0.6)', marginTop: '3%',marginBottom: '3%', width: '50%', marginLeft: '0' ,padding:'15px'}}>
                  <Card.Title style={{color:'white'}}>Subject Type:</Card.Title>
                  <select className="selectD" defaultValue="None" onChange={this.handleSelectSubjectType}>
                    <option value="CA">CA</option>
                    <option value="ENDENTITY" >End-Entity</option>
                  </select>

                  </Card>

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

                    <div name="endExtension" style={{padding:'3px 8px',marginTop:'3%', backgroundColor: 'rgb(69, 69, 69)', display: 'none'}}>

                    <label style={{ marginTop: '2%',color:'white' }}><b>Extended Key usage</b></label>

                    <Form.Check
                        type="switch"
                        id="custom-switch2"
                        label=" is Critical"
                        onChange={this.handleExtendedChangeChecked}
                        className="formCheckA"
                        name="isCriticalExtendedKeyUsage"
                      />

                    <div>
                      <input type="checkbox" name="serverAuth" onChange={this.handleKeyUsage}></input>
                      &nbsp;
                      <label style={{color:'white'}}>ServerAuth</label>
                    </div>


                    <div>
                      <input type="checkbox" name="clientAuth" onChange={this.handleKeyUsage}></input>
                            &nbsp;
                            <label style={{color:'white'}}>clientAuth</label>
                    </div>

                    <div>
                      <input type="checkbox" name="codeSigning" onChange={this.handleKeyUsage}></input>
                          &nbsp;
                          <label style={{color:'white'}}>codeSigning</label>
                    </div>

                    <div>
                      <input type="checkbox" name="emailProtection" onChange={this.handleKeyUsage}></input>
                          &nbsp;
                          <label style={{color:'white'}}>emailProtection</label>
                    </div>

                    <div>
                      <input type="checkbox" name="timeStamping" onChange={this.handleKeyUsage}></input>
                          &nbsp;
                          <label style={{color:'white'}}>timeStamping</label>
                    </div>
                    </div>


                </Card>

                <Button onClick={this.validateSubjectFields} variant="light" style={{ marginBottom: '3%', width: '200px', align: 'center', marginTop: '5%' }}>Issue Certificate</Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>




    );

  }

}

export default withRouter(CreateCertificatePage);
