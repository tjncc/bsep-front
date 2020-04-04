import React from 'react';
import {Button} from 'react-bootstrap'
import '../../css/certificates/CertificatePage.css'

class CertificatePage extends React.Component{

    constructor(props){
        super(props);
      }

      render(){
        return(
          <div className="divCertButtons" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <div className="divCertMiddle">
              <button variant="outline-dark" className="btnSertifikat">Request for a cerificate</button>
              <a className="aCertificate">Review existing certificates</a>
              </div>
          </div>
        );
    
      }
    
}

export default CertificatePage;
