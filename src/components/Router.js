import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import CertificatePage from './certificates/CertificatePage';
import AllCertificatesPage from './certificates/AllCertificatesPage';

class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Switch>
                <Route path="/"  component={ <CertificatePage></CertificatePage> }/>
                <Route path="/allcertificates" component={<AllCertificatesPage></AllCertificatesPage>} />
            </Switch>
        );
    }
}

export default withRouter(Routes);
