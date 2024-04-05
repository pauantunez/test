import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as GeothermalHeatpumpIcon } from "../../../../assets/img/icons/geothermal_heatpump.svg";
import { ReactComponent as AirWaterHeatpumpIcon } from "../../../../assets/img/icons/air_water_heatpump.svg";
import { ReactComponent as HeatpumpLarge } from "../../../../assets/img/icons/heatpump_large.svg";

import { ReactComponent as BuderusHeatpumpLarge } from "../../../../assets/img/icons/buderus/heatpump_large.svg";
import { ReactComponent as BuderusGeothermalHeatpumpIcon } from "../../../../assets/img/icons/buderus/geothermal_heatpump.svg";
import { ReactComponent as BuderusAirWaterHeatpumpIcon } from "../../../../assets/img/icons/buderus/air_water_heatpump.svg";

import { withTranslation } from "react-i18next";

class Heatpump extends React.Component {
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

  inputHeatpumpType = (event) => {
    const { setHeatpumpType, setFwdBtn, steps, setSteps, activeView } = this.context;
    setHeatpumpType(event.target.value);

    setFwdBtn(false);
    steps[activeView] = false;
    setSteps({ ...steps });
    this.context.goToView(5);
    setFwdBtn(true);
  };

  render() {
    const { heatpumpType } = this.context;

    return (
      <div>
        <div className="cardContainer step-three">
          <div className="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHeatpumpLarge /> : <HeatpumpLarge />}</div>
          <div className="cardContent">
            <div className="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHeatpumpLarge style={{ marginLeft: "10px", width: "55px" }} /> : <HeatpumpLarge style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 className="cardHeadline">Wärmepumpe</h3>
                </div>
                <span className="cardDescription">Welche Art Wärmepumpe ist verbaut oder geplant?</span>
              </div>
              <div className="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="2" className="card-input-element trackeable" checked={heatpumpType === "2"} onChange={this.inputHeatpumpType} data-event="warmepumpe-erdwarmepumpe" />
                    <div className="panel panel-default card-input-wide">
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusGeothermalHeatpumpIcon /> : <GeothermalHeatpumpIcon />}</div>
                      <div className="panel-body">Erdwärmepumpe</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="1" className="card-input-element trackeable" checked={heatpumpType === "1"} onChange={this.inputHeatpumpType} data-event="warmepumpe-luftwasserwarmepumper" />
                    <div className="panel panel-default card-input-wide">
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusAirWaterHeatpumpIcon /> : <AirWaterHeatpumpIcon />}</div>
                      <div className="panel-body">Luft-Wasser-Wärmepumpe</div>
                    </div>
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "70px" }}>
                <InfoBox box="2-row-3-col" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Heatpump));
