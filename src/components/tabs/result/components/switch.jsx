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
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
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
import { ReactComponent as LightningIcon } from '../../../../assets/img/icons/lightning_chart.svg';
import { ReactComponent as PVIcon } from '../../../../assets/img/icons/photovoltaic_chart.svg';
import { ReactComponent as ElectricityIcon } from '../../../../assets/img/icons/electricity_sun_chart.svg';

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
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
    }

  }

  static contextType = AppContext

  componentWillMount() {
    const { setLoading, setLoadingOffGrid, heatpumpType, scenarioInDatabase, kfwValue, ev, homeStorageSizekWh, pvOutputkWh, tabEntries, products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
    setLoadingOffGrid(true)

  }

  componentDidMount() {
    this.getInitialResult();

  }

  getInitialResult = () => {
    const { scenarioInDatabase, kfwValue, ev, homeStorageSizekWh, pvOutputkWh, tabEntries, products, btnThemes, fonts, setFwdBtn } = this.context;

    //find the correct TAB for the "NO EMS" case
    let tabInTable = tabEntries.find(o => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === 'Nein');

    //call getResult for the correct TAB
    this.getResult(kfwValue + ev, scenarioInDatabase, tabInTable.Tab)
  }

  energyUsageCombined = (result) => {
    const { heatpumpType, setHouseholdNoEMSpvPercent, setNoEMSPercentage, setNoEMScombinedEnergyUseKWH, noEMSPercentageOffGrid, energyUsagekWh, odometerIncreaseKWH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
    var Avg_Eff_JAZ_HP;

    if (heatpumpType === "1") {
      Avg_Eff_JAZ_HP = result.Avg_Eff_JAZ_HP_A_W_MFH
    } else {
      Avg_Eff_JAZ_HP = result.Avg_Eff_JAZ_HP_B_W_MFH
    }

    //Enegery usage heatpump
    var energyUsageHeatpump = (parseFloat(result.EGen_sh_kWh_HP_A_W_MFH) + parseFloat(result.EGen_sh_kWh_HP_B_W_MFH) + parseFloat(result.EGen_hw_kWh_HP_A_W_MFH) + parseFloat(result.EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);

    //Energy usage heating rod
    var energyUsageHeatingRod = (parseFloat(result.EGen_sh_kWh_EDWW_MFH) + parseFloat(result.EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(result.EGen_hw_kWh_EDWW_MFH) + parseFloat(result.EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);

    //console.log(energyUsageHeatpump+energyUsageHeatingRod+parseInt(energyUsagekWh)+odometerIncreaseKWH);
    var combinedResult = energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
    setNoEMScombinedEnergyUseKWH(combinedResult)

    var pvUsagePercentNoEMS = (parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(combinedResult) * 100;
    setNoEMSPercentage(pvUsagePercentNoEMS);

    var householdNoEMSPercent = (parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(result.EGen_elc_kWh_PV_MFH) * 100;
    setHouseholdNoEMSpvPercent(householdNoEMSPercent);
    console.log("🚀 ~ Dani 1 ", energyUsageHeatpump, energyUsageHeatingRod, parseInt(energyUsagekWh), odometerIncreaseKWH, energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH)

    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;

  }


  inputOffgridEMS = (event) => {

    const { setLoading, setLoadingOffGrid, kfwValue, ev, setOffgridEMS, offgridEMS, scenarioInDatabase, tabEntries, setTabToSelect, pvOutputkWh, homeStorageSizekWh, homeStorage, setHomeStorage, setHomeStorageSize } = this.context;
    setOffgridEMS(event.target.checked)
    setLoadingOffGrid(true)

    if (event.target.checked) {
      var emsValue = "Ja"
    } else {
      var emsValue = "Nein"
    }

    let tabInTable = tabEntries.find(o => o.PV_size === pvOutputkWh.toString()
      && o.Storage_size === homeStorageSizekWh.toString()
      && o.EMS === emsValue);
    setTabToSelect(tabInTable.Tab)
    // console.log("Tab entries: " + tabInTable)

    setTimeout(() => {
      this.getResult(kfwValue + ev, scenarioInDatabase)
    }, "1000");

  };

  getResult = (kfw, scenario, noEMSTab) => {
    const { setLoading, setLoadingOffGrid, EGen_elc_kWh_PV_MFH, energy_to_grid_kWh_PV_MFH, heatpumpCombinedUsage, setOffgridPVPercentageNoEMS, offgridPVPercentageNoEMS, setDatabaseResult, heatpumpType, setTabToSelect, tabToSelect, ev, kfwValue, homeStorageSizekWh, pvOutputkWh, pvOutput, tabEntries, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, elc_Self_Consumption, setElc_Self_Consumption } = this.context;
    if (noEMSTab) {
      var tab = noEMSTab
    } else {
      var tab = tabToSelect.toString()
    }

    axios.get(`https://bosch-endkundentool-api.azurewebsites.net/results`, {
      params: {
        "Document": kfw,
        "ScenNo": scenario,
        "ConfigNo": heatpumpType.toString(),
        "Tab": tab
      }
    })
      .then(res => {
        if (res.data.data.length != 0) {
          if (noEMSTab) {
            this.energyUsageCombined(res.data.data[0])
          } else {
            //setDatabaseResult(res.data.data[0])
          }

          setLoadingOffGrid(false)
        }

        console.log(res.data.data[0])
        console.log(res)
        console.log(res.data)
        console.log(res.data.data.length)

      })
  }



  render() {

    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { switchId } = this.state;
    const { offgridEMS, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

    return (
      <div>
        <Stack direction="row" spacing={1} alignItems="center">
          <AntSwitch onChange={this.inputOffgridEMS} checked={offgridEMS} inputProps={{ 'aria-label': 'ant design' }} />
        </Stack>
      </div>
    );

  }
}

export default withRouter(withTranslation()(CustomSwitch));