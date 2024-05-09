import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as HouseholdEnergyUseIcon } from "../../../../assets/img/icons/household_energy_use_icon.svg";

import { ReactComponent as BuderusHouseholdEnergyUseIcon } from "../../../../assets/img/icons/buderus/household_energy_use_icon.svg";

import Slider from "rc-slider";

import { withTranslation } from "react-i18next";
import { validate } from "validate.js";

class HouseholdEnergyUse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    const { setElectricityCostPercentage, kWhUsageLookupTable, energyUsagekWh } = this.context;

    var percentageInTable = kWhUsageLookupTable.find((o) => o.kwh === energyUsagekWh.toString());

    setElectricityCostPercentage(percentageInTable.offGridPercentage, percentageInTable.householdPercentage);
  }

  componentWillMount() {
    const { setFwdBtn, steps, setSteps, activeView } = this.context;

    steps[activeView + 1] = false;
    setSteps({ ...steps });

    if (steps[activeView + 1] === false) {
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

  inputEnergyUsageKWH = (value) => {
    const { setElectricityCostPercentage, kWhUsageLookupTable, setEnergyUsageKWH, setFwdBtn, steps, setSteps, activeView } = this.context;
    setEnergyUsageKWH(parseInt(value));

    var percentageInTable = kWhUsageLookupTable.find((o) => o.kwh === value.toString());
    setElectricityCostPercentage(percentageInTable.offGridPercentage, percentageInTable.householdPercentage);

    var inputNumber = parseInt(value);

    if (validate.isInteger(inputNumber)) {
      setFwdBtn(false);
      steps[activeView + 1] = false;
    } else {
      setFwdBtn(true);
      steps[activeView + 1] = true;
    }

    setSteps({ ...steps });
    //this.context.goToView(4);
  };

  render() {
    const { energyUsagekWh } = this.context;

    return (
      <div>
        <div className="cardContainer step-four">
          <div className="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHouseholdEnergyUseIcon /> : <HouseholdEnergyUseIcon />}</div>
          <div className="cardContent">
            <div className="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHouseholdEnergyUseIcon style={{ marginLeft: "10px", width: "55px" }} /> : <HouseholdEnergyUseIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 className="cardHeadline">Haushaltsstromverbrauch</h3>
                </div>
                <span className="cardDescription">
                  Wie groß ist ihr Haushaltsstromverbrauch pro Jahr
                  <br /> (ohne Stromverbrauch für Wärmepumpe und E-Auto)?
                </span>
              </div>
              <div className="flexRow" style={{ flexDirection: "column", marginTop: "20px" }}>
                <div className="slider-size">
                  <Slider
                    min={2000}
                    max={8000}
                    step={2000}
                    value={energyUsagekWh}
                    trackStyle={{ backgroundColor: "transparent", height: 2 }}
                    railStyle={{ backgroundColor: "#8A9097", width: "calc(100% + 15px)", height: 2, marginLeft: "-7px", cursor: "pointer" }}
                    handleStyle={{
                      borderColor: this.context.selectedTheme === "buderus" ? "#000000" : "#008ECF",
                      height: 18,
                      width: 18,
                      borderRadius: this.context.selectedTheme === "buderus" ? "0" : "",
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: -7,
                      backgroundColor: this.context.selectedTheme === "buderus" ? "#FFFFFF" : "#008ECF",
                      opacity: 1,
                    }}
                    onChange={this.inputEnergyUsageKWH}
                  />

                  <div className="slider-label" style={{ position: "relative", top: "5px", left: 0, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                    <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>
                      <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                    </div>
                    <div style={{ position: "absolute", left: "33%", transform: "translateX(-50%)" }}>
                      <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                    </div>
                    <div style={{ position: "absolute", left: "67%", transform: "translateX(-50%)" }}>
                      <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                    </div>
                    <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>
                      <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                    </div>
                  </div>
                  <div className="slider-label" style={{ position: "relative", top: "17px", left: 0, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "16px" }}>
                    <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>2.000</div>
                    <div style={{ position: "absolute", left: "33%", transform: "translateX(-50%)" }}>4.000</div>
                    <div style={{ position: "absolute", left: "67%", transform: "translateX(-50%)" }}>6.000</div>
                    <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>8.000</div>
                    <div className="kwp-label" style={{ position: "absolute", left: "115%", transform: "translateX(-50%)" }}>
                      kWh
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "105px" }}>
                  <InfoBox box="2-row-2-col" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HouseholdEnergyUse));
