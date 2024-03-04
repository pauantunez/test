import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as LightningIcon } from "../../../../assets/img/icons/lightning_large.svg";

import { ReactComponent as BuderusCoins } from "../../../../assets/img/icons/buderus/coins.svg";
import TextField from "@mui/material/TextField";

import { withTranslation } from "react-i18next";
import { validate } from "validate.js";

class ElectricityCost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
    };
  }

  static contextType = AppContext;

  componentDidMount() {}

  componentWillMount() {
    const { setFwdBtn, steps, activeView, electricityCost } = this.context;

    if (steps[activeView] === false) {
      setFwdBtn(true);
    }
    if (electricityCost) {
      setFwdBtn(false);
    }
  }

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  inputTCO_thermal_EUR_a = (event) => {
    const { setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value);
  };

  inputHeatingSelection = (event) => {
    const { setBuildingEnegeryStandard } = this.context;
    setBuildingEnegeryStandard(event.target.value);
  };

  inputHeatingDistribution = (event) => {
    const { setHeatDistribution } = this.context;
    setHeatDistribution(event.target.value);
  };

  inputKfwValue = (event) => {
    const { setKfwValue } = this.context;
    setKfwValue(event.target.value);
  };

  inputInsulationValue = (event) => {
    const { setInsulationValue } = this.context;
    setInsulationValue(event.target.value);
  };

  inputOilLNGValue = (event) => {
    const { setOilLNGValue, setDisabledOilUsage, setDisabledLNGUsage } = this.context;
    setOilLNGValue(event.target.value);

    if (event.target.value === "oil-usage") {
      setDisabledOilUsage(false);
      setDisabledLNGUsage(true);
    } else if (event.target.value === "lng-usage") {
      setDisabledOilUsage(true);
      setDisabledLNGUsage(false);
    }
  };

  inputOilUsageLiters = (event) => {
    const { setOilUsageLiters } = this.context;
    setOilUsageLiters(event.target.value);
  };

  inputLNGUsage = (event) => {
    const { setLNGUsage } = this.context;
    setLNGUsage(event.target.value);
  };

  inputEnergyUsageKWH = (event) => {
    const { setEnergyUsageKWH } = this.context;
    setEnergyUsageKWH(event.target.value);
  };

  inputElectricityCost = (event) => {
    const { setElectricityCost, setFwdBtn, steps, setSteps, activeView } = this.context;
    setElectricityCost(event.target.value);

    var inputNumber = parseInt(event.target.value);

    if (validate.isInteger(inputNumber)) {
      setFwdBtn(false);
      steps[activeView] = false;
    } else {
      setFwdBtn(true);
      steps[activeView] = true;
    }

    setSteps({ ...steps });
  };

  avoidPointAndCharacters = (event) => {
    let ASCIICode = event.which ? event.which : event.keyCode;
    if (!/[0-9,]/.test(event.key) && ASCIICode !== 8) {
      event.preventDefault();
    }
  };

  render() {
    const { electricityCost } = this.context;

    return (
      <div>
        <div class="cardContainer">
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusCoins /> : <LightningIcon />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusCoins style={{ marginLeft: "10px", width: "55px" }} /> : <LightningIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Stromkosten</h3>
                </div>
                <span class="cardDescription">Wie viel kostet der bezogene Strom aus dem Netz?</span>
              </div>
              <div class="flexRow" style={{ flexDirection: "column" }}>
                <div class="input-margins">
                  <TextField id="filled-basic" style={{ width: "100%" }} name="electricityCost" placeholder="35" type="number" value={electricityCost} label="Stromkosten in Ct/kWh (inkl. MwSt.)" variant="filled" InputLabelProps={{ shrink: true }} onChange={this.inputElectricityCost} onKeyDown={this.avoidPointAndCharacters} />
                </div>
                <div style={{ marginTop: "70px" }}>
                  <InfoBox box="1-row-1-col-electricity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ElectricityCost));
