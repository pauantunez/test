import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as RadiatorIcon } from "../../../../assets/img/icons/radiator.svg";
import { ReactComponent as UnderfloorHeatingIcon } from "../../../../assets/img/icons/underfloor_heating.svg";
import { ReactComponent as UnderfloorRadiatorIcon } from "../../../../assets/img/icons/underfloor_radiator.svg";
import { ReactComponent as HeatLarge } from "../../../../assets/img/icons/heat_large.svg";

import { ReactComponent as BuderusHeatLarge } from "../../../../assets/img/icons/buderus/heat_large.svg";
import { ReactComponent as BuderusRadiatorIcon } from "../../../../assets/img/icons/buderus/radiator.svg";
import { ReactComponent as BuderusUnderfloorHeatingIcon } from "../../../../assets/img/icons/buderus/underfloor_heating.svg";
import { ReactComponent as BuderusUnderfloorRadiatorIcon } from "../../../../assets/img/icons/buderus/underfloor_radiator.svg";

import { withTranslation } from "react-i18next";

class HeatDistribution extends React.Component {
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
    const { setFwdBtn, steps, activeView } = this.context;

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
    const { setPreHeatTempOption, buildingTypePreHeatOption, setHeatDistribution, kfwValue, setFwdBtn, steps, setSteps, activeView } = this.context;

    setHeatDistribution(event.target.value);
    let preHeatOptionValue = buildingTypePreHeatOption.find((o) => o.buildingType === kfwValue);
    if (preHeatOptionValue.option2 === "-") {
      setPreHeatTempOption(1);
    } else {
      if (event.target.value === "Underfloor") {
        setPreHeatTempOption(1);
      } else {
        setPreHeatTempOption(2);
      }
    }

    setFwdBtn(false);
    steps[activeView + 1] = false;
    setSteps({ ...steps });
    this.context.goToView(3);
    setFwdBtn(true);
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

  calculateClosestShBedarf = (ShBedarf) => {
    const options = [25, 35, 45, 55, 65, 95, 120, 150];
    let closestPosition = options[0];
    let minDifference = Math.abs(ShBedarf - options[0]);

    options.forEach((option) => {
      const currentDifference = Math.abs(ShBedarf - option);
      if (currentDifference < minDifference) {
        minDifference = currentDifference;
        closestPosition = option;
      }
    });

    return closestPosition;
  };

  render() {
    const { heatDistributionValue, kfwValue } = this.context;
    var radiatorDisabled;
    var underfloorRadiatorDisable;
    var underfloorDisabled;

    if (kfwValue === "kfW_40_" || kfwValue === "kfW_55_") {
      radiatorDisabled = "disabled";
      underfloorRadiatorDisable = "disabled";
    }
    if (kfwValue === "kfW_70_" || kfwValue === "kfW_85_" || kfwValue === "kfW_100_") {
      radiatorDisabled = "disabled";
    }
    if (kfwValue === "un_ren_ext_" || kfwValue === "un_ren_") {
      underfloorRadiatorDisable = "disabled";
      underfloorDisabled = "disabled";
    }

    return (
      <div>
        <div className="cardContainer step-three">
          <div className="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHeatLarge /> : <HeatLarge />}</div>
          <div className="cardContent">
            <div className="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHeatLarge style={{ marginLeft: "10px", width: "55px" }} /> : <HeatLarge style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 className="cardHeadline">Wärmeverteilsystem</h3>
                </div>
                <span className="cardDescription">Wie werden Ihre Räume beheizt?</span>
              </div>
              <div className="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="Radiator" className="card-input-element trackeable" checked={heatDistributionValue === "Radiator" && radiatorDisabled !== "disabled"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-heizkorper" disabled={radiatorDisabled} />
                    <div className={`panel panel-default card-input-wide ${radiatorDisabled}`}>
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusRadiatorIcon /> : <RadiatorIcon />}</div>
                      <div className="panel-body">Heizkörper</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="Underfloor" className="card-input-element trackeable" checked={heatDistributionValue === "Underfloor" && underfloorDisabled !== "disabled"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-fubodenheizung" disabled={underfloorDisabled} />
                    <div className={`panel panel-default card-input-wide ${underfloorDisabled}`}>
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusUnderfloorHeatingIcon /> : <UnderfloorHeatingIcon />}</div>
                      <div className="panel-body">Fußbodenheizung</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="UnderfloorRadiator" className="card-input-element trackeable" checked={heatDistributionValue === "UnderfloorRadiator" && underfloorRadiatorDisable !== "disabled"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-fubodenheizung-und-heizkorper" disabled={underfloorRadiatorDisable} />
                    <div className={`panel panel-default card-input-wide ${underfloorRadiatorDisable}`}>
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusUnderfloorRadiatorIcon /> : <UnderfloorRadiatorIcon />}</div>
                      <div className="panel-body">Fußbodenheizung und Heizkörper</div>
                    </div>
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "70px" }}>
                <InfoBox box="heat-distribution-system" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HeatDistribution));
