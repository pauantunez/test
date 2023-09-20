import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';
import BuildingSize from './components/buildingSize'

import { withTranslation } from 'react-i18next';



var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class Tab1Step1 extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme
        }
    }

    static contextType = AppContext

    componentDidMount() {
        
    }

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;

          return  ( 
          <div>

            <BuildingSize />

          </div>
          )

  }
}

export default withRouter(withTranslation()(Tab1Step1));