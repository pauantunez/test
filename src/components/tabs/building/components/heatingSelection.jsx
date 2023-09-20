import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import InfoButton from '../../infoButton';
import {ReactComponent as HouseSunSmallIcon} from '../../../../assets/img/icons/house_sun_small.svg';
import {ReactComponent as HouseSunLargeIcon} from '../../../../assets/img/icons/house_sun_large.svg';
import {ReactComponent as HouseSunLargeWhiteIcon} from '../../../../assets/img/icons/house_sun_large_white.svg';
import {ReactComponent as ChartUpLarge} from '../../../../assets/img/icons/chart_up_large.svg';
import {ReactComponent as ChartUpSmall} from '../../../../assets/img/icons/chart_up_small.svg';
import {ReactComponent as ChartOil} from '../../../../assets/img/icons/chart_oil.svg';
import {ReactComponent as BuildingInsulationIcon} from '../../../../assets/img/icons/building_insulation.svg';
import {ReactComponent as InfoIcon} from '../../../../assets/img/icons/info.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { withTranslation } from 'react-i18next';
import validator, { validate } from 'validate.js';
import JustValidate from 'just-validate';

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class HeatingSelection extends React.Component {
  
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

        

        /*for (const key in steps) {
            if(key == activeView) {
                console.log(`${key}: ${steps[key]}`);
                setSteps(key,true);
            }
        }*/



        /*steps[activeView] = false;
        setSteps({ ...steps })*/


        
        console.log(steps)

        /*if(validate.isEmpty(BuildingEnegeryStandard)) {
            setFwdBtn(true)
            
            } else {
            setFwdBtn(false)
        }*/

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
        const { BuildingEnegeryStandard, setBuildingEnegeryStandard, setFwdBtn, setKfwValue, kfwValue, setInsulationValue, setLNGUsage, setOilLNGValue, setOilUsageLiters, setDisabledLNGUsage, setDisabledOilUsage, activeView, steps, setSteps} = this.context;
        setBuildingEnegeryStandard(event.target.value);
        setLNGUsage('');
        setOilUsageLiters('');
        setOilLNGValue('');
        setDisabledLNGUsage(true);
        setDisabledOilUsage(true);

        setFwdBtn(true)
        steps[activeView] = true;
        setSteps({ ...steps })
        //alert(BuildingEnegeryStandard);

        if(event.target.value === "BuildingEnergyStandard") {

        } else if(event.target.value === "OilLNG") {
            setKfwValue('');
            //alert(kfwValue)

        } else if(event.target.value === "BuildingInsulation") {
            setInsulationValue('');
        }
    };

    inputKfwValue = (event) => { 
        const { kfwValue, setKfwValue, fwdBtn, setFwdBtn, steps, setSteps, activeView} = this.context;
        setKfwValue(event.target.value);
        setFwdBtn(false);

        steps[activeView] = false;
        setSteps({ ...steps })

    };

    inputInsulationValue = (event) => { 
        const { insulationValue, setInsulationValue,  fwdBtn, setFwdBtn, steps, setSteps, activeView} = this.context;
        setInsulationValue(event.target.value);

        setFwdBtn(false);

        steps[activeView] = false;
        setSteps({ ...steps })
    };

    inputOilLNGValue = (event) => { 
        const { OilLNGValue, setOilLNGValue, disabledOilUsage, setOilUsageLiters, setDisabledOilUsage, disabledLNGUsage, setDisabledLNGUsage, setLNGUsage, setKfwValue, kfwValue, setFwdBtn, steps, setSteps, activeView} = this.context;
        setOilLNGValue(event.target.value);

        if(event.target.value === 'oil-usage') {
            setDisabledOilUsage(false);
            setDisabledLNGUsage(true);
            setLNGUsage('');
            setFwdBtn(true);
            steps[activeView] = true;
        } else if(event.target.value === 'lng-usage') {
            setDisabledOilUsage(true);
            setDisabledLNGUsage(false);
            setOilUsageLiters('');
            setFwdBtn(true);
            steps[activeView] = true;
        }

        setSteps({ ...steps })
    };

    inputOilUsageLiters = (event) => { 
        const { OilUsageLiters, setOilUsageLiters, setFwdBtn, activeView, steps, setSteps} = this.context;
        setOilUsageLiters(event.target.value);

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

    inputLNGUsage= (event) => { 
        const { LNGUsage, setLNGUsage, setFwdBtn, activeView, steps, setSteps} = this.context;
        setLNGUsage(event.target.value);

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
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

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
                    <ChartUpLarge />
                </div>
                <div class="cardContent">
                    <div class="flexContent">
                        <form id="async_form">
                        <div>
                            <h3 class="cardHeadline">Heizungsbedarf</h3>
                            <span class="cardDescription">Wählen Sie eine der drei Möglichkeiten zur Bestimmung Ihres Heizenergiebedarfs.</span>    
                        </div>
                        <div class="flexRow">
                            <div>
                                <label>
                                <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" checked={BuildingEnegeryStandard === "BuildingEnergyStandard"} onChange={this.inputHeatingSelection} />
                                    <div class="panel panel-default card-input-wide">
                                    <div class="panel-heading">  
                                        <ChartUpSmall />
                                    </div>
                                    <div class="panel-body">
                                        Gebäude-<br />energiestandard
                                    </div>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                <input type="radio" name="heating" value="OilLNG" class="card-input-element" checked={BuildingEnegeryStandard === "OilLNG"} onChange={this.inputHeatingSelection} />
                                    <div class="panel panel-default card-input-wide">
                                    <div class="panel-heading">
                                        <ChartOil />
                                    </div>
                                    <div class="panel-body">
                                        Öl- oder<br />Gasverbrauch
                                    </div>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" checked={BuildingEnegeryStandard === "BuildingInsulation"} onChange={this.inputHeatingSelection} />
                                    <div class="panel panel-default card-input-wide">
                                    <div class="panel-heading">
                                        <BuildingInsulationIcon />
                                    </div>
                                    <div class="panel-body">
                                        Gebäudeisolierung
                                    </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        { /* Gebäudeenergiestandard */}
                        {BuildingEnegeryStandard === "BuildingEnergyStandard" &&
                        <div style={{marginTop: '30px', marginLeft: '10px', fontFamily: 'Bosch-Regular'}}>
                            Welchen Energiestandard besitzt Ihr Gebäude?
                            <div style={{marginTop: '15px'}}>
                            
                                <FormControl>
                                    <RadioGroup
                                        name="kfw-value" id="kfw-value"
                                    >
                                        <FormControlLabel value="kfw40" control={<BpRadio />} label="KfW 40" checked={kfwValue === "kfw40"} onChange={this.inputKfwValue} />
                                        <FormControlLabel value="kfw55" control={<BpRadio />} label="KfW 55" checked={kfwValue === "kfw55"} onChange={this.inputKfwValue} />
                                        <FormControlLabel value="kfw70" control={<BpRadio />} label="KfW 70" checked={kfwValue === "kfw70"} onChange={this.inputKfwValue} />
                                        <FormControlLabel value="kfw85" control={<BpRadio />} label="KfW 85" checked={kfwValue === "kfw85"} onChange={this.inputKfwValue} />
                                        <FormControlLabel value="kfw100" control={<BpRadio />} label="KfW 100" checked={kfwValue === "kfw100"} onChange={this.inputKfwValue} />

                                    </RadioGroup>
                                </FormControl>
                            
                            </div>
                        </div>
                        }

                        { /* Öl oder Gasverbrauch */}
                        {BuildingEnegeryStandard === "OilLNG" &&
                        <div style={{marginTop: '30px', marginLeft: '10px', fontFamily: 'Bosch-Regular'}}>
                            Nennen Sie uns entweder Ihren Gas- oder Ölverbrauch pro Jahr
                            <div style={{marginTop: '40px'}}>
                            <FormControl>
                                <RadioGroup
                                    sx={{flexWrap: 'inherit', flexDirection: 'row'}}
                                    name="oil-lng-value"
                                    row
                                >
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <FormControlLabel value="oil-usage" control={<OilLNGRadio />} style={{marginRight: '0px'}} label="Ölverbrauch pro Jahr" checked={OilLNGValue === "oil-usage"} onChange={this.inputOilLNGValue} />
                                        <TextField disabled={disabledOilUsage} id="filled-basic" style={{marginTop: '12px'}} name="OilUsageLiters" value={OilUsageLiters} label="Ölverbrauch in Liter" variant="filled" InputLabelProps={{shrink: true,}} onChange={this.inputOilUsageLiters} />
                                    </div>
                                    <div style={{padding: '11px 50px 10px 35px', fontSize: '13px'}}>oder</div>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <FormControlLabel value="lng-usage" control={<OilLNGRadio />} label="Gasverbrauch pro Jahr" checked={OilLNGValue === "lng-usage"} onChange={this.inputOilLNGValue} />
                                        <TextField disabled={disabledLNGUsage} id="filled-basic" style={{marginTop: '12px'}} name="LNGUsage" value={LNGUsage} label="Gasverbrauch in m&sup3; oder kWh" variant="filled" InputLabelProps={{shrink: true,}} onChange={this.inputLNGUsage} />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            </div>
                        </div>
                        }

                        { /* Gebäudeisolierung */}
                        {BuildingEnegeryStandard === "BuildingInsulation" &&
                        <div style={{marginTop: '30px', marginLeft: '10px', fontFamily: 'Bosch-Regular'}}>
                           Wie gut ist Ihr Gebäude isoliert?
                            <div style={{marginTop: '15px'}}>
                            <FormControl>
                                <RadioGroup
                                    name="insulation-value"
                                >
                                    <div>
                                        <FormControlLabel value="1" control={<OilLNGRadio />} label="Vollständig sehr gut isoliert" checked={insulationValue === "1"} onChange={this.inputInsulationValue} />
                                        <InfoButton text="Die ausschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer vollständig, sehr guten Dämmung wurden alle Faktoren bereits auf den neusten Stand gebracht." />
                                    </div>
                                    <div>
                                        <FormControlLabel value="2" control={<OilLNGRadio />} label="Größtenteils gut isoliert" checked={insulationValue === "2"} onChange={this.inputInsulationValue} />
                                        <InfoButton text="Die ausschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer größtenteils guten Dämmung wurden mindestens 2 Faktoren bereits auf den neusten Stand gebracht." />
                                    </div>
                                    <div>
                                        <FormControlLabel value="3" control={<OilLNGRadio />} label="Teilweise isoliert" checked={insulationValue === "3"} onChange={this.inputInsulationValue} />
                                        <InfoButton text="Die ausschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer Teil-Dämmung wurde mindestens ein Faktor bereits aus den neusten Stand gebracht." />
                                    </div>
                                    <div>
                                        <FormControlLabel value="4" control={<OilLNGRadio />} label="Schlecht bis gar nicht isoliert" checked={insulationValue === "4"} onChange={this.inputInsulationValue} />
                                        <InfoButton text="Die ausschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Nicht isoliert bedeutet, dass noch kein Faktor aus den neusten Stand gebracht wurde." />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            </div>

                        </div>
                        }

                        </form>
                    </div>

                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(HeatingSelection));