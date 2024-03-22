import React from 'react';
import Box from '@mui/material/Box';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';
import PVOutput from './components/pvOutput';

import {Typography} from '@mui/material';
import { withTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';


var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class FacilitiesStep3 extends React.Component {
  
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

    onInputchange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    inputPower_kW_PV_MFH = (event) => { 
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH } = this.context;

      setPower_kW_PV_MFH(event.target.value) 
    };

    inputBuildingEnegeryStandard = (event) => { 
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard} = this.context;
      setBuildingEnegeryStandard(event.target.value) 
    };

    inputBuildingSize = (event) => { 
      const { BuildingSize, setBuildingSize} = this.context;
      setBuildingSize(event.target.value) 
    };

    inputGasOilSwitch = (event) => { 
      const { GasOilSwitch, setGasOilSwitch} = this.context;
      setGasOilSwitch(event.target.checked) 
    };

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    async changeVolume(e,value) {
      const { EnergyUse, setEnergyUse} = this.context;
      setEnergyUse(value)

  }

    render() {

      const { t } = this.props;
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, BuildingEnegeryStandard, SetBuildingEnegeryStandard, EnergyUse, setEnergyUse, BuildingSize, GasOilSwitch } = this.context;

          return  ( 
          <div>

            <PVOutput />

          </div>
          )

  }
}

export default withRouter(withTranslation()(FacilitiesStep3));