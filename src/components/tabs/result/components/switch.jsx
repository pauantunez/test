import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title, } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { VictoryChart, VictoryBar, VictoryPie, VictoryLabel } from 'victory';
 
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import pattern from 'patternomaly';
import {ReactComponent as LightningIcon} from '../../../../assets/img/icons/lightning_chart.svg';
import {ReactComponent as PVIcon} from '../../../../assets/img/icons/photovoltaic_chart.svg';
import {ReactComponent as ElectricityIcon} from '../../../../assets/img/icons/electricity_sun_chart.svg';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;


  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 49,
    height: 24,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: '6px 5px 5px 5px',
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#007BC0' : '#007BC0',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 24 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

class CustomSwitch extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            TCO_EUR_a: '965.9769603',
            OPEX_EUR_a: '-535.055231',
            CAPEX_EUR_a: '1501.032191',
            CO2_kg_a: '-885.8828844',
            TCO_thermal_EUR_a: '591.7784389',
            Power_kW_PV_MFH: '14',
            results: Array,
            Eta_sh_gas_EDWW_MFH_Brine: String,
        }

        //this.onInputchange = this.onInputchange.bind(this);
    }

    static contextType = AppContext

    componentWillMount() {

      const { products, btnThemes, fonts, setFwdBtn } = this.context;
      const productsProps = Object.getOwnPropertyNames(products);
      var foundTheme = 0;

      setFwdBtn(false);
  
      if(urlParams.get('theme')) {
        entryParam = urlParams.get('theme');
        //alert(entryParam)
  
        for(let themes = 0; themes < productsProps.length; themes++) {
  
          if(entryParam === productsProps[themes]) {
            console.log(productsProps[themes])
  
            require("../../../../styles/"+productsProps[themes]+".css");
            
            selectedTheme = productsProps[themes];
            /*btnColor = btnThemes[entryParam][0];
            themeFont = fonts[entryParam][0];
            labelFont = fonts[entryParam][1];
            console.log(selectedTheme);*/
  
            foundTheme++;
          } else {
            require("ignore");
            console.log("ignore:" + productsProps[themes])
          }
          
        }
  
        if(foundTheme === 0) {
          require("../../../../styles/"+productsProps[0]+".css");
          selectedTheme = productsProps[0];
          /*btnColor = btnThemes.bosch[0];
          themeFont = fonts.bosch[0];
          labelFont = fonts.bosch[1];*/
          
        }
  
      } else {
        require("../../../../styles/"+productsProps[0]+".css");
        selectedTheme = productsProps[0];
        /*btnColor = btnThemes.bosch[0];
        themeFont = fonts.bosch[0];
        labelFont = fonts.bosch[1];*/
       
      }

    

    }

    componentDidMount() {


    }


    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

          return  ( 
          <div>

            <Stack direction="row" spacing={1} alignItems="center">
                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>


          </div>
          )

  }
}

export default withRouter(withTranslation()(CustomSwitch));