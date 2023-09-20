import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import InfoBox from '../../infoBox';
import {ReactComponent as HouseholdEnergyUseIcon} from '../../../../assets/img/icons/household_energy_use_icon.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { withTranslation } from 'react-i18next';


class PVOutput extends React.Component {
  
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
        const { setFwdBtn, fwdBtn, steps, setSteps, activeView} = this.context;
        
        steps[activeView] = false;
        setSteps({ ...steps })

        if(steps[activeView] === false) {
            setFwdBtn(false);
        }
    }

    inputPVOutput = (value) => { 
        const { pvOutput, setPVOutput} = this.context;
        setPVOutput(parseInt(value));
    };
    

    render() {

      const { t } = this.props;
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh, pvOutput } = this.context;

          return  ( 
          <div>
            <div class="cardContainer">
                <div class="cardLargeIcon">   
                    <HouseholdEnergyUseIcon />
                </div>
                <div class="cardContent">
                    <div class="flexContent">
                        <div>
                            <h3 class="cardHeadline">PV-Leistung</h3>
                            <span class="cardDescription">Welche Leistung hat die installierte oder geplante PV-Anlage?</span>    
                        </div>
                        <div class="flexRow" style={{flexDirection: 'column'}}>
                            <div style={{width: '85%', marginLeft: '15px'}}>
                            <Slider
                                min={0}
                                max={3}
                                value={pvOutput}
                                trackStyle={{ backgroundColor: 'transparent', height: 2 }}
                                railStyle={{ backgroundColor: '#8A9097', width: 'calc(100% + 15px)', height: 2, marginLeft: '-7px', cursor: 'pointer'}}
                                handleStyle={{
                                borderColor: '#008ECF',
                                height: 18,
                                width: 18,
                                marginLeft: 0,
                                marginRight: 0,
                                marginTop: -7,
                                backgroundColor: '#008ECF',
                                opacity: 1,
                                }}
                                onChange={this.inputPVOutput}
                                />
                            <div style={{position: 'relative', top: '5px', left: 0, fontFamily: 'Bosch-Regular', fontSize: '12px' }}>
                                <div style={{position: 'absolute', left: '0%', transform: 'translateX(-50%)'}}>
                                    <div style={{width: '1px', height: '10px', background: '#000'}}></div>
                                </div>
                                <div style={{position: 'absolute', left: '33.333%', transform: 'translateX(-50%)'}}>
                                    <div style={{width: '1px', height: '10px', background: '#000'}}></div>
                                </div>
                                <div style={{position: 'absolute', left: '66.6667%', transform: 'translateX(-50%)'}}>
                                    <div style={{width: '1px', height: '10px', background: '#000'}}></div>
                                </div>
                                <div style={{position: 'absolute', left: '100%', transform: 'translateX(-50%)'}}>
                                    <div style={{width: '1px', height: '10px', background: '#000'}}></div>
                                </div>
                            </div>
                            <div style={{position: 'relative', top: '17px', left: 0, fontFamily: 'Bosch-Regular', fontSize: '16px' }}>
                                <div style={{position: 'absolute', left: '0%', transform: 'translateX(-50%)'}}>
                                    5
                                </div>
                                <div style={{position: 'absolute', left: '33.333%', transform: 'translateX(-50%)'}}>
                                    7
                                </div>
                                <div style={{position: 'absolute', left: '66.6667%', transform: 'translateX(-50%)'}}>
                                    10
                                </div>
                                <div style={{position: 'absolute', left: '100%', transform: 'translateX(-50%)'}}>
                                    14
                                </div>
                                <div style={{position: 'absolute', left: '100%', marginLeft: '29px'}}>
                                    kWp
                                </div>
                            </div>

                            </div>
                            <div style={{marginTop: '20%'}}>
                                <InfoBox box="4-row-2-col" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(PVOutput));