import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router,Link } from "react-router-dom";
import Routes from './components/Router';
import CertificatePage from './components/certificates/CertificatePage';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  }


  render(){
    return(

      <Router>
      <div className="homePage">


      <Switch>
            <Route exact path="/"><CertificatePage/></Route>
            <Route exact path="/allcertificates"><AllCertificatesPage/></Route>
      </Switch>


      </div>
      </Router>


    );

  }
}
