import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import CertificatePage from './certificates/CertificatePage';

class Router extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Switch>
                <Route>
                <Route exact path="/"  render={ <CertificatePage/> }/>
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Router);
