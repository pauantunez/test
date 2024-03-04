import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
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

    if (steps[activeView] === false) {
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
      console.log(preHeatOptionValue.option1);
    } else {
      if (event.target.value === "Radiator") {
        setPreHeatTempOption(1);
        console.log(preHeatOptionValue.option1);
      } else {
        setPreHeatTempOption(2);
        console.log(preHeatOptionValue.option2);
      }
    }

    setFwdBtn(false);
    steps[activeView] = false;
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

  render() {
    const { heatDistributionValue } = this.context;

    return (
      <div>
        <div class="cardContainer">
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHeatLarge /> : <HeatLarge />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHeatLarge style={{ marginLeft: "10px", width: "55px" }} /> : <HeatLarge style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Wärmeverteilsystem</h3>
                </div>
                <span class="cardDescription">Wie werden Ihre Räume beheizt?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="Radiator" class="card-input-element trackeable" checked={heatDistributionValue === "Radiator"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-heizkorper" />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusRadiatorIcon /> : <RadiatorIcon />}</div>
                      <div class="panel-body">Heizkörper</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="Underfloor" class="card-input-element trackeable" checked={heatDistributionValue === "Underfloor"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-fubodenheizung" />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusUnderfloorHeatingIcon /> : <UnderfloorHeatingIcon />}</div>
                      <div class="panel-body">Fußbodenheizung</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="UnderfloorRadiator" class="card-input-element trackeable" checked={heatDistributionValue === "UnderfloorRadiator"} onChange={this.inputHeatingDistribution} data-event="warmeverteilsystem-fubodenheizung-und-heizkorper" />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusUnderfloorRadiatorIcon /> : <UnderfloorRadiatorIcon />}</div>
                      <div class="panel-body">Fußbodenheizung und Heizkörper</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HeatDistribution));
