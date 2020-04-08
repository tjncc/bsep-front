import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { BrowserRouter as Router,Link } from "react-router-dom";
import Routes from './components/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCertificatePage from './components/certificates/CreateCertificatePage';
import CertificatePage from './components/certificates/CertificatePage';
import AllCertificatesPage from './components/certificates/AllCertificatesPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }

    axios.get('http://localhost:8081/api/certificates/generateroot').then(
              (resp) => { alert("jndsndj") }  ,
              (resp) => {alert("Something went wrong, please try again.")}
              );


  }


  render(){
    return(

      <Router>
      <div className="homePage">


      <Switch>
            <Route exact path="/"><CertificatePage/></Route>
            <Route exact path="/allcertificates"><AllCertificatesPage/></Route>
            <Route exact path="/createcertificate"><CreateCertificatePage/></Route>
      </Switch>


      </div>
      </Router>


    );

  }
}
