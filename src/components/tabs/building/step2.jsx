import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  Button,
} from 'reactstrap';
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import HeatingSelection from './components/heatingSelection'


var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class Tab1Step2 extends React.Component {
  
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

           <HeatingSelection />

          </div>
          )

  }
}

export default withRouter(withTranslation()(Tab1Step2));