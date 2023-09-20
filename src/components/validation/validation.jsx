import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../AppContext'
import validator from 'validate.js';

import { withTranslation } from 'react-i18next';

class ValidateFields extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            text: props.text
        }
    }

    static contextType = AppContext

    componentDidMount() {
        
    }
    

    render() {
        
          return  ( 
            <div></div>
          )

  }
}

export default withRouter(withTranslation()(ValidateFields));