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
import CreateNewRootPage from './components/certificates/CreateNewRootPage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import RevokedCertificates from './components/certificates/RevokedCertificates';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }

}

  render(){
    return(

      <Router>
      <div className="homePage">


      <Switch>
            <Route exact path="/"><CertificatePage/></Route>
            <Route exact path="/allcertificates"><AllCertificatesPage/></Route>
            <Route exact path="/createcertificate"><CreateCertificatePage/></Route>
            <Route exact path="/createroot"><CreateNewRootPage/></Route>
            <Route exact path="/revoked"><RevokedCertificates></RevokedCertificates></Route>

      </Switch>


      </div>
      </Router>


    );

  }
}
