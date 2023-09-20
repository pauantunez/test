import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import ElectricityCost from './components/electricityCost';


var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class CostStep2 extends React.Component {
  
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

    inputTCO_thermal_EUR_a = (event) => { 
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

      setTCO_thermal_EUR_a(event.target.value) 
    };

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    render() {

      const { t } = this.props;
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

          return  ( 
          <div>

            <ElectricityCost />

          </div>
          )

  }
}

export default withRouter(withTranslation()(CostStep2));