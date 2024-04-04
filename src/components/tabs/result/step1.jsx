import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";
import Cost from "./components/cost";
import BreakEven from "./components/breakEven";

import { withTranslation } from "react-i18next";
import InfoBoxResult from "../infoBoxResult";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

class ResultStep1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      heatpumpPVems: [],
    };

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext;

  componentWillMount() {
    const { setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    sessionStorage.clear();
  }

  energyUsageCombined = () => {
    const { heatpumpType, energyUsagekWh, odometerIncreaseKWH, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
    var Avg_Eff_JAZ_HP;

    if (heatpumpType === "1") {
      Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH;
    } else {
      Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH;
    }

    //Enegery usage heatpump
    var energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);

    //Energy usage heating rod
    var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);
    return Math.round(energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH);
  };

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
    var energyUsageCombined = this.energyUsageCombined();
    if (sessionStorage.getItem("energyUsageCombined") !== "") {
      sessionStorage.setItem("energyUsageCombined", energyUsageCombined);
    }
    return (
      <div className="wrapper-container" style={{ marginLeft: "3%", marginRight: "3%" }}>
        <h3 style={{ display: "flex", justifyContent: "flex-start", textAlign: "left", fontSize: "24px" }}>Ergebnis Teil 1: Stromkosten und Amortisationszeit Ihrer PV-Anlage</h3>

        <div className="pie-flex results-page-one" style={{ display: "flex", width: "100%", flexWrap: "nowrap", justifyContent: "space-between", alignContent: "center" }}>
          <div className="left-box" style={{ alignItems: "end" }}>
            <div style={{ fontFamily: "Bosch-Bold", fontSize: "20px", textAlign: "left" }}> Gesamtkosten Strom</div>
            <div style={{ marginTop: "20px" }}>
              <Cost />
              <div style={{ marginTop: "20px" }}>
                <InfoBoxResult box="left" />
              </div>
            </div>
          </div>
          <div className="flex-line" style={{ width: "2px", background: "#E0E2E5", marginLeft: "50px", marginRight: "50px" }}></div>
          <div className="right-box top-margins">
            <div style={{ fontFamily: "Bosch-Bold", fontSize: "20px", textAlign: "left" }}>Amortisationszeit</div>
            <div style={{ marginTop: "20px" }}>
              <BreakEven />
              <div className="upper-space" style={{ marginTop: "20px" }}>
                <InfoBoxResult box="right" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="welcomeBtns" style={{display: 'flex', margin: '3% 5% 0 5%'}}>
          <div className="explanationBtn">
            <div className="calculationBase trackeable" onClick={handleOpen} style={{fontSize: '12px', fontFamily: 'Bosch-Regular', color: '#007BC0', cursor: 'pointer'}} data-event="berechnungsgrundlage">Berechnugsgrundlage</div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withRouter(withTranslation()(ResultStep1));
