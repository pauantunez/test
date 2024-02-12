import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';
import Cost from './components/cost';
import BreakEven from './components/breakEven';

import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InfoBoxResult from '../infoBoxResult';
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


class ResultStep1 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      heatpumpPVems: []
    }

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    sessionStorage.clear()
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

        <h3 style={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', fontSize: '24px' }}>Ergebnis Teil 1: Stromkosten und Amortisationszeit Ihrer PV-Anlage</h3>

        <div class="pie-flex" style={{ display: 'flex', width: '100%', flexWrap: 'nowrap', justifyContent: 'space-between', alignContent: 'center' }}>
          <div style={{ alignItems: 'end' }}>
            <div style={{ fontFamily: 'Bosch-Bold', fontSize: '20px', textAlign: 'left' }}> Gesamtkosten Strom</div>
            <div style={{ marginTop: '20px' }}>
              <Cost />
              <div style={{ marginTop: '20px' }}>
                <InfoBoxResult box="left" />
              </div>
            </div>
          </div>
          <div class="flex-line" style={{ width: '2px', height: '700px', background: '#E0E2E5', marginLeft: '50px', marginRight: '50px' }}>

          </div>
          <div class="top-margins">
            <div style={{ fontFamily: 'Bosch-Bold', fontSize: '20px', textAlign: 'left' }}>Amortisationszeit</div>
            <div style={{ marginTop: '20px' }}>
              <BreakEven />
              <div style={{ marginTop: '20px' }}>
                <InfoBoxResult box="right" />
              </div>
            </div>
          </div>

        </div>

        {/* <div class="welcomeBtns" style={{display: 'flex', margin: '3% 5% 0 5%'}}>
          <div class="explanationBtn">
            <div class="calculationBase trackeable" onClick={handleOpen} style={{fontSize: '12px', fontFamily: 'Bosch-Regular', color: '#007BC0', cursor: 'pointer'}} data-event="berechnungsgrundlage">Berechnugsgrundlage</div>
          </div>
        </div> */}

      </div>
    )

  }
}

export default withRouter(withTranslation()(ResultStep1));