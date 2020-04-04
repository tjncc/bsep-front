import React from 'react';
import {Button} from 'react-bootstrap'
import '../../css/certificates/CertificatePage.css'

class CertificatePage extends React.Component{

    constructor(props){
        super(props);
      }

      render(){
        return(
          <div>
              <Button className="btnSertifikat">Trazi sertifikat</Button>
              <Button className="btnSertifikat">Pregledaj sertifikate</Button>
          </div>
        );
    
      }
    
}

export default CertificatePage;
