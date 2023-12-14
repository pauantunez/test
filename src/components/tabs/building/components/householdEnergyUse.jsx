import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import InfoButton from '../../infoButton';
import InfoBox from '../../infoBox';
import {ReactComponent as HouseSunSmallIcon} from '../../../../assets/img/icons/house_sun_small.svg';
import {ReactComponent as HouseSunLargeIcon} from '../../../../assets/img/icons/house_sun_large.svg';
import {ReactComponent as HouseSunLargeWhiteIcon} from '../../../../assets/img/icons/house_sun_large_white.svg';
import {ReactComponent as RadiatorIcon} from '../../../../assets/img/icons/radiator.svg';
import {ReactComponent as UnderfloorHeatingIcon} from '../../../../assets/img/icons/underfloor_heating.svg';
import {ReactComponent as UnderfloorRadiatorIcon} from '../../../../assets/img/icons/underfloor_radiator.svg';
import {ReactComponent as HeatLarge} from '../../../../assets/img/icons/heat_large.svg';
import {ReactComponent as InfoIcon} from '../../../../assets/img/icons/info.svg';
import {ReactComponent as HouseholdEnergyUseIcon} from '../../../../assets/img/icons/household_energy_use_icon.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import { withTranslation } from 'react-i18next';
import validator, { validate } from 'validate.js';


var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class HouseholdEnergyUse extends React.Component {
  
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

    componentWillMount() { 
        const { BuildingEnegeryStandard, setFwdBtn, fwdBtn, steps, setSteps, activeView, kfwValue} = this.context;

        if(steps[activeView] === false) {
            setFwdBtn(false);
        }
    }

    

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    inputTCO_thermal_EUR_a = (event) => { 
        const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;
  
        setTCO_thermal_EUR_a(event.target.value) 
      };  

    inputHeatingSelection = (event) => { 
        const { BuildingEnegeryStandard, setBuildingEnegeryStandard} = this.context;
        setBuildingEnegeryStandard(event.target.value);
    };

    inputHeatingDistribution = (event) => { 
        const { heatDistributionValue, setHeatDistribution} = this.context;
        setHeatDistribution(event.target.value);
    };

    inputKfwValue = (event) => { 
        const { kfwValue, setKfwValue} = this.context;
        setKfwValue(event.target.value);
    };

    inputInsulationValue = (event) => { 
        const { insulationValue, setInsulationValue} = this.context;
        setInsulationValue(event.target.value);
    };

    inputOilLNGValue = (event) => { 
        const { OilLNGValue, setOilLNGValue, disabledOilUsage, setDisabledOilUsage, disabledLNGUsage, setDisabledLNGUsage} = this.context;
        setOilLNGValue(event.target.value);

        if(event.target.value === 'oil-usage') {
            setDisabledOilUsage(false);
            setDisabledLNGUsage(true);
        } else if(event.target.value === 'lng-usage') {
            setDisabledOilUsage(true);
            setDisabledLNGUsage(false);
        }
    };

    inputOilUsageLiters = (event) => { 
        const { OilUsageLiters, setOilUsageLiters} = this.context;
        setOilUsageLiters(event.target.value);
    };

    inputLNGUsage= (event) => { 
        const { LNGUsage, setLNGUsage} = this.context;
        setLNGUsage(event.target.value);
    };

    inputEnergyUsageKWH = (event) => { 
        const { setElectricityCostPercentage, kWhUsageLookupTable, energyUsagekWh, setEnergyUsageKWH, setFwdBtn, steps, setSteps, activeView} = this.context;
        setEnergyUsageKWH(event.target.value);

        var percentageInTable = kWhUsageLookupTable.find(o => o.kwh === event.target.value.toString());
        setElectricityCostPercentage(percentageInTable.offGridPercentage, percentageInTable.householdPercentage)
        console.log(percentageInTable);

        var inputNumber = parseInt(event.target.value);

        if(validate.isInteger(inputNumber)) {
            setFwdBtn(false);
            steps[activeView] = false;
            
        } else {
            setFwdBtn(true);
            steps[activeView] = true;
        }

        setSteps({ ...steps })
    };
    

    render() {

      const { t } = this.props;
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh } = this.context;

      const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '0%',
        width: 24,
        height: 24,
        backgroundColor:  '#C1C7CC',
        fontFamily: 'Bosch-Medium',
        '.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#C1C7CC',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background:'rgba(206,217,224,.5)',
        },
      }));
      
      const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 4,
          height: 12,
          transform: 'rotate(45deg)',
          marginTop: '10%',
          marginLeft: '35%',
          borderBottom: '2px solid #fff',
          borderRight: '2px solid #fff',
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#106ba3',
        },
      });
      
      function BpRadio(props) {
        return (
          <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            sx={{
              "&, & + .MuiFormControlLabel-label": {
                marginRight: '5px',
                fontFamily: 'Bosch-Regular'
              }
          }}
            {...props}
          />
        );
      }


      const OilLNGIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 24,
        height: 24,
        backgroundColor:  '#8A9097',
        fontFamily: 'Bosch-Medium',
        '.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#8A9097',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background:'rgba(206,217,224,.5)',
        },
      }));
      
      const OilLNGCheckedIcon = styled(OilLNGIcon)({
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 24,
            height: 24,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
      });
      
      function OilLNGRadio(props) {
        return (
          <Radio
            disableRipple
            color="default"
            checkedIcon={<OilLNGCheckedIcon />}
            icon={<OilLNGIcon />}
            sx={{
              "&, & + .MuiFormControlLabel-label": {
                marginRight: '5px',
                fontFamily: 'Bosch-Regular',
              }
          }}
            {...props}
          />
        );
      }

          return  ( 
          <div>
            <div class="cardContainer">
                <div class="cardLargeIcon">   
                    <HouseholdEnergyUseIcon />
                </div>
                <div class="cardContent">
                    <div class="flexContent">
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                              <div class="cardIconInset"><HouseholdEnergyUseIcon style={{marginLeft: '10px', width: '55px'}} /></div>
                              <h3 class="cardHeadline">Haushaltsstromverbrauch</h3>
                            </div>
                            <span class="cardDescription">Wie groß ist ihr Haushaltsstromverbrauch pro Jahr<br /> (ohne Stromverbrauch für Wärmepumpe und E-Auto)?</span>    
                        </div>
                        <div class="flexRow" style={{flexDirection: 'column'}}>
                            <div class="input-margins">
                                { /*<TextField id="filled-basic" type="number" style={{width: '100%'}} name="energyUsagekWh" value={energyUsagekWh} label="Stromverbrauch in kWh" variant="filled" InputLabelProps={{shrink: true,}} onChange={this.inputEnergyUsageKWH} />*/ }

                                <FormControl variant="filled" sx={{ minWidth: 120, width: '100%' }}>
                                  <InputLabel id="demo-simple-select-filled-label">Stromverbrauch in kWh</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={energyUsagekWh}
                                    onChange={this.inputEnergyUsageKWH} 
                                  >
                                    <MenuItem value={4000}>4.000 kWh</MenuItem>
                                    <MenuItem value={6000}>6.000 kWh</MenuItem>
                                    <MenuItem value={8000}>8.000 kWh</MenuItem>
                                  </Select>
                                </FormControl>

                            </div>
                            <div style={{marginTop: '20%'}}>
                                <InfoBox box="2-row-2-col" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(HouseholdEnergyUse));