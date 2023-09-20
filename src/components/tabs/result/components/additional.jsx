import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import InfoBox from '../../infoBox';
import {ReactComponent as PDFIcon} from '../../../../assets/img/icons/pdf_small.svg';
import {ReactComponent as HeatpumpSmallIcon} from '../../../../assets/img/icons/heatpump_small.svg';
import {ReactComponent as PhotovoltaicIcon} from '../../../../assets/img/icons/photovoltaic_small.svg';
import {ReactComponent as WallboxIcon} from '../../../../assets/img/icons/wallbox_small.svg';
import {ReactComponent as EnergyManagementIcon} from '../../../../assets/img/icons/energy_management_small.svg';
import {ReactComponent as MagnifyingGlassIcon} from '../../../../assets/img/icons/magnifying_glass_small.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '@mui/material/Button';

import { withTranslation } from 'react-i18next';


class Additional extends React.Component {
  
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

    inputPVOutput = (value) => { 
        const { pvOutput, setPVOutput} = this.context;
        setPVOutput(parseInt(value));
    };
    

    render() {

      const { t } = this.props;
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh, pvOutput } = this.context;

          return  ( 
          <div>
            <div class="cardContainer" style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Bosch-Regular'}}>
                <div>
                    <div class="cardContent" style={{marginBottom: '40px'}}>
                        <div class="flexContent" style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <div style={{paddingRight: '30px', paddingBottom: '10px'}}>
                                <h3>Ergebnisse speichern</h3>
                                <div>Sichern Sie sich Ihre Ergebnisse, indem Sie diese als PDF jetzt herunterladen</div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'end'}}>
                                <Button variant="outlined" startIcon={<PDFIcon />} disabled={this.state.restart} style={{height: '40px', textTransform: 'none', borderRadius: '0px', fontFamily: 'Bosch-Regular'}}>
                                    Ergebnisse herunterladen
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="cardContent" style={{borderTop: '1px solid #E0E2E5', marginBottom: '40px'}}>
                        <div class="flexContent" style={{flexDirection: 'row', justifyContent: 'center', marginTop: '8px'}}>
                            <div style={{paddingRight: '30px', paddingBottom: '10px'}}>
                                <h3>Kontakt zum Fachbetrieb</h3>
                                <div>Finden Sie einen Experten in Ihrer Nähe, der Sie bei der Umsetzung unterstützt</div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'end'}}>
                                <Button variant="outlined" startIcon={<MagnifyingGlassIcon />} disabled={this.state.restart} style={{height: '40px', textTransform: 'none', borderRadius: '0px', fontFamily: 'Bosch-Regular'}}>
                                   Jetzt Fachbetrieb finden
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="cardContent" style={{borderTop: '1px solid #E0E2E5', marginBottom: '40px'}}>
                        <div class="flexContent" style={{flexDirection: 'column', justifyContent: 'center', marginTop: '8px'}}>
                            <div style={{paddingRight: '30px', paddingBottom: '10px'}}>
                                <h3>Wie komme ich zu einem energieeffizienten System?</h3>
                                <div style={{fontFamily: 'Bosch-Bold'}}>Informationen zu unseren Produkten</div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'end'}}>
                                <div>
                                    <label>
                                    <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                                        <div class="panel panel-default card-input-narrow">
                                        <div class="panel-heading-narrow">  
                                            <HeatpumpSmallIcon />
                                        </div>
                                        <div class="panel-body">
                                            Wärmepumpe
                                        </div>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                    <input type="radio" name="heating" value="OilLNG" class="card-input-element" />
                                        <div class="panel panel-default card-input-narrow">
                                        <div class="panel-heading-narrow">
                                            <PhotovoltaicIcon />
                                        </div>
                                        <div class="panel-body">
                                            PV-Anlage
                                        </div>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                    <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" />
                                        <div class="panel panel-default card-input-narrow">
                                        <div class="panel-heading-narrow">
                                            <WallboxIcon />
                                        </div>
                                        <div class="panel-body">
                                            Wallbox
                                        </div>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                    <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" />
                                        <div class="panel panel-default card-input-narrow">
                                        <div class="panel-heading-narrow">
                                            <EnergyManagementIcon />
                                        </div>
                                        <div class="panel-body">
                                            Energiemanage-<br />mentsystem
                                        </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(Additional));