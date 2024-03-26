import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";
import ElectricityUse from "./components/electricityUse";
import OffGrid from "./components/offGrid";
import HouseholdUse from "./components/householdUse";

import { withTranslation } from "react-i18next";
import InfoBoxResult from "../infoBoxResult";
import InfoButton from "../infoButton";
import CustomSwitch from "./components/switchCombined";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

class ResultStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
    };

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext;

  componentWillMount() {
    const { setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    /* const { setLoadingOffGrid, setLoadingHousehold } = this.context;
    const switchButtons = document.getElementsByClassName("MuiSwitch-input"); */
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
    const { setPower_kW_PV_MFH } = this.context;

    setPower_kW_PV_MFH(event.target.value);
  };

  inputTCO_thermal_EUR_a = (event) => {
    const { setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value);
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  render() {
    return (
      <div class="graphs-container">
        <h3 style={{ display: "flex", justifyContent: "flex-start", textAlign: "left", fontSize: "24px" }}>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>
        <div class="switch-container">
          <div class="switch-box" /*class="trackeable"  data-event="result-part2-switch-energiemanagement" */ /* TODO:add event */>
            <CustomSwitch />
          </div>
          <div class="switch-label">Mit Energiemanagementsystem</div>
          <div class="switch-selector">
            <InfoButton color={this.context.selectedTheme === "buderus" ? "#000" : "#007BC0"} size="14px" placement="right" text="Unter Energiemanagement wird die Kombination verschiedener Maßnahmen und Strategien verstanden, um Energie zu beschaffen, zu verteilen und optimal zu nutzen. Ziel ist es, Energieverbräuche zu senken und die Energieeffizienz im Haushalt zu optimieren, um wirtschaftliche und ökologische Ziele zu erreichen." />
          </div>
        </div>
        <div class="pie-flex results-page-two" style={{ display: "flex", marginTop: "50px", height: "100%", width: "100%", flexWrap: "nowrap" /*justifyContent: 'space-between',*/ /*alignContent: 'center'*/ }}>
          <div class="results col-one">
            <div style={{ fontFamily: "Bosch-Bold", fontSize: "20px", textAlign: "left" }}>Stromverbrauch</div>
            <div style={{ marginTop: "0px" }}>
              <ElectricityUse />
              <div style={{ marginTop: "20px" }}>
                <InfoBoxResult box="electricity-use" />
              </div>
            </div>
          </div>
          <div class="flex-line" style={{ width: "2px", height: "initial", background: "#E0E2E5", marginLeft: "15px", marginRight: "15px" }}></div>
          <div class="results col-two">
            <div class="top-margins" style={{ display: "flex", flexDirection: "row", fontFamily: "Bosch-Bold", fontSize: "20px", textAlign: "left" }}>
              <div style={{ marginRight: "20px" }}>Autarkie</div>
              <InfoButton class="tooltip-box" color={this.context.selectedTheme === "buderus" ? "#000" : "#007BC0"} size="14px" placement="right" text="Die Autarkie eines Energiesystems beschreibt, welcher Anteil des Stromverbrauchs durch die eigene PV-Anlage abgedeckt wird." />
            </div>
            <div style={{ marginTop: "0px" }}>
              <OffGrid />
              <div style={{ marginTop: "20px" }}>
                
                <div class="additional-flex second-col" style={{ display: "flex", justifyContent: "space-around", fontFamily: "Bosch-Regular", fontSize: "14px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#996193" : "#18837E" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#996193" : "#18837E", borderRadius: "12px" }}></div>
                    </div>
                    <div>PV-Strom</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#00884A" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#00884A", borderRadius: "12px" }}></div>
                    </div>
                    <div>Bezug Netzstrom</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#A4ABB3" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#A4ABB3", borderRadius: "12px" }}></div>
                    </div>
                    <div>Mit EMS</div>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <InfoBoxResult box="off-grid" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-line" style={{ width: "2px", height: "initial", background: "#E0E2E5", marginLeft: "15px", marginRight: "15px" }}></div>
          <div class="results col-three">
            <div class="top-margins" style={{ display: "flex", flexDirection: "row", fontFamily: "Bosch-Bold", fontSize: "20px", textAlign: "left" }}>
              <div style={{ marginRight: "20px" }}>Eigenverbrauch</div>
              <InfoButton color={this.context.selectedTheme === "buderus" ? "#000" : "#007BC0"} size="14px" placement="right" text="Der Eigenverbrauch eines Energiesystems beschreibt, welcher Anteil des eigens produzierten PV-Stroms selbst verbraucht wird." />
            </div>
            <div style={{ marginTop: "0px" }}>
              <HouseholdUse />
              <div style={{ marginTop: "20px" }}>
                <InfoBoxResult box="household-use" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ResultStep2));
