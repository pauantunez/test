import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';
import Cost from './components/cost';
import BreakEven from './components/breakEven';
import ElectricityUse from './components/electricityUse';
import OffGrid from './components/offGrid';
import HouseholdUse from './components/householdUse';

import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InfoBoxResult from '../infoBoxResult';
import InfoButton from '../infoButton';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

const datapoints = [-27300, null, null, null, null, null, null, 0, null, null, null, 8000];

class ResultStep2 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
    }

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);

  }

  componentDidMount() {
    const { setLoadingOffGrid, setLoadingHousehold } = this.context;
    const switchButtons = document.getElementsByClassName('MuiSwitch-input');

    //sessionStorage.clear()

    // Switch click automatically to get values for the PDF
    // setLoadingOffGrid(true)
    // setLoadingHousehold(true)

    // for (let i = 0; i < switchButtons.length; i++) {
    //   switchButtons[i].click();
    // }
    // setTimeout(() => {
    //   for (let i = 0; i < switchButtons.length; i++) {
    //     switchButtons[i].click();
    //   }

    //   //setLoadingOffGrid(false)
    //   //setLoadingHousehold(false)
    // }, 500);


  }

  inputPower_kW_PV_MFH = (event) => {
    const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH } = this.context;

    setPower_kW_PV_MFH(event.target.value)
  };

  inputTCO_thermal_EUR_a = (event) => {
    const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value)
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async toggleModal() {

    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false })
    } else {
      this.setState({ overlayToggle: true })
    }

  }

  render() {

    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption } = this.context;

    return (
      <div style={{ marginLeft: '3%', marginRight: '3%' }}>

        <h3 style={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', fontSize: '24px' }}>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>

        <div class="pie-flex" style={{ display: 'flex', marginTop: '50px', height: '100%', width: '100%', flexWrap: 'nowrap', /*justifyContent: 'space-between',*/ /*alignContent: 'center'*/ }}>
          <div style={{ alignItems: 'end' }}>
            <div style={{ fontFamily: 'Bosch-Bold', fontSize: '20px', textAlign: 'left' }}>Stromverbrauch</div>
            <div style={{ marginTop: '0px' }}>
              <ElectricityUse />
              <div style={{ marginTop: '20px' }}>
                <InfoBoxResult box="electricity-use" />
              </div>
            </div>
          </div>
          <div class="flex-line" style={{ width: '2px', height: 'initial', background: '#E0E2E5', marginLeft: '15px', marginRight: '15px' }}>

          </div>
          <div>
            <div class="top-margins" style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Bosch-Bold', fontSize: '20px', textAlign: 'left' }}>
              <div style={{ marginRight: '20px' }}>Autarkie</div>
              <InfoButton color="#007BC0" size="14px" placement="right" text="Die Autarkie eines Energiesystems beschreibt, welcher Anteil des Stromverbrauchs durch die eigene PV-Anlage abgedeckt wird." />
            </div>
            <div style={{ marginTop: '0px' }}>
              <OffGrid />
              <div style={{ marginTop: '20px' }}>
                <InfoBoxResult box="off-grid" />
              </div>
            </div>
          </div>
          <div class="flex-line" style={{ width: '2px', height: 'initial', background: '#E0E2E5', marginLeft: '15px', marginRight: '15px' }}>

          </div>
          <div>
            <div class="top-margins" style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Bosch-Bold', fontSize: '20px', textAlign: 'left' }}>
              <div style={{ marginRight: '20px' }}>Eigenverbrauch</div>
              <InfoButton color="#007BC0" size="14px" placement="right" text="Der Eigenverbrauch eines Energiesystems beschreibt, welcher Anteil des eigens produzierten PV-Stroms selbst verbraucht wird." />
            </div>
            <div style={{ marginTop: '0px' }}>
              <HouseholdUse />
              <div style={{ marginTop: '20px' }}>
                <InfoBoxResult box="household-use" />
              </div>
            </div>
          </div>

        </div>



      </div>
    )

  }
}

export default withRouter(withTranslation()(ResultStep2));