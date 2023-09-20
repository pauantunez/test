import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../AppContext'
import {ReactComponent as InfoIcon} from '../../assets/img/icons/info.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { withTranslation } from 'react-i18next';

class InfoBoxResult extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            text: props.text,
            boxType: props.box
        }
    }

    static contextType = AppContext

    componentDidMount() {
        
    }
    

    render() {

      const { t } = this.props;
      const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;
    
      const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.arrow}`]: {
                color: '#FFF',
                fontSize: 16,
                filter: 'drop-shadow(-2px 1px 1px rgba(130,130,130,0.7))'
                
            },
            [`& .${tooltipClasses.tooltipArrow}`]: {
                boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.6)',
                
            },
            [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: '#000',
            boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.6)',
            borderRadius: '0px',
            fontSize: 11,
            fontFamily: 'Bosch-Regular',
            lineHeight: '1.4',
            padding: '6px 6px 6px 8px'
            },
        }));
        
          return  ( 
            <Box component="span" class="infobox-container" style={{fontSize: '16px', fontWeight: '400', boxShadow: 'none', marginLeft: '0px', maxWidth: '500px', padding: '16px'}}>
                <div>

                    {this.state.boxType === "left" &&
                    <div>
                        <div class="infobox-row-container">
                            <div class="infobox-row" style={{display: 'block', lineHeight: '24px', borderBottom: 'none'}}>
                            Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>1.225 € Stromkosten</strong> pro Jahr sparen.
                            <br /><br />
                            Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>1.400 € Stromkosten</strong> pro Jahr sparen.
                            <br /><br />
                            Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>175 €</strong> pro Jahr.
                            </div>
                            
                        </div>
                    </div>
                    }

                    {this.state.boxType === "right" &&
                    <div>
                        <div class="infobox-row-container">
                            <div class="infobox-row" style={{display: 'block', lineHeight: '24px', borderBottom: 'none'}}>
                            Die Investition in eine <strong>PV-Anlage</strong> hat sich nach ca. <strong>19 Jahren</strong> amortisiert.
                            <br />
                            Die Investition in eine <strong>PV-Anlage</strong> hat sich durch den Einsatz eines <strong>Energiemanagementsystems</strong> nach ca. <strong>14 Jahren</strong> amortisiert.
                            <br />
                            Die zusätzlichen Kosten für ein <strong>Energiemanagementsystem</strong> haben sich bereits nach ca. <strong>5 Jahren</strong> bezahlt gemacht.
                            </div>
                            
                        </div>
                    </div>
                    }

                    {this.state.boxType === "electricity-use" &&
                    <div>
                        <div class="infobox-row-container">
                            <div class="infobox-row" style={{display: 'block', lineHeight: '24px', fontSize: '14px', borderBottom: 'none'}}>
                            <h3 style={{marginBlockStart: '0', marginBlockEnd: '8px'}}>Stromverbrauch gesamt:<br />8.000 kWh</h3>
                            
                            Der errechnete Stromverbrauch aufgeteilt auf die großen Verbraucher, Wärmepumpe, E-Auto und Haushalt​.
                            </div>
                            
                        </div>
                    </div>
                    }

                    {this.state.boxType === "off-grid" &&
                    <div>
                        <div class="infobox-row-container">
                            <div class="infobox-row" style={{display: 'block', lineHeight: '24px', fontSize: '14px', borderBottom: 'none'}}>
                            <h3 style={{marginBlockStart: '0', marginBlockEnd: '8px'}}>Autarkiegrad: ca. 65%</h3>
                            
                            Das bedeutet: bis zu <strong>65%</strong> Ihres Gesamtstrom-verbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                            <br />
                            <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>45%.</strong>
                            <br />
                            Ca. <strong>35%</strong> Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                            </div>
                            
                        </div>
                    </div>
                    }

                    {this.state.boxType === "household-use" &&
                    <div>
                        <div class="infobox-row-container">
                            <div class="infobox-row" style={{display: 'block', lineHeight: '24px', fontSize: '14px', borderBottom: 'none'}}>
                            <h3 style={{marginBlockStart: '0', marginBlockEnd: '8px'}}>Eigenverbrauchsanteil: ca. 45%</h3>
                            
                            Das bedeutet: bis zu <strong>45%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                            <br />
                            <strong>Mit Energiemanagementsystem</strong> lässt sich der <strong>Eigenverbrauchsanteil</strong> auf bis zu <strong>65%</strong> erhöhen.
                            <br />
                            Ca. <strong>55%</strong> Ihres eigens produzierten PV-Stroms speisen Sie in Sie ins <strong>öffentliche Stromnetz</strong> ein.
                            </div>
                            
                        </div>
                    </div>
                    }
                </div>

            </Box>
          )

  }
}

export default withRouter(withTranslation()(InfoBoxResult));