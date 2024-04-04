import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as AcceptIcon } from "../../../../assets/img/icons/accept_large.svg";
import { ReactComponent as DenyIcon } from "../../../../assets/img/icons/deny_large.svg";
import { ReactComponent as BatteryIcon } from "../../../../assets/img/icons/battery_large.svg";

import { ReactComponent as BuderusAcceptIcon } from "../../../../assets/img/icons/buderus/accept_large.svg";
import { ReactComponent as BuderusDenyIcon } from "../../../../assets/img/icons/buderus/deny_large.svg";
import { ReactComponent as BuderusBatteryIcon } from "../../../../assets/img/icons/buderus/battery_large.svg";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { withTranslation } from "react-i18next";

class HomeStorage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      homeStorageSizekW: null,
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

  componentDidUpdate(previousProps, previousState) {
    const { setTabToSelect, tabEntries, pvOutputkWh, homeStorageSizekWh } = this.context;

    let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja");

    if (previousState.homeStorageSizekW !== this.state.homeStorageSizekW) {
      setTabToSelect(tabInTable.Tab);
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

  inputHomeStorage = (event) => {
    const { tabEntries, setTabToSelect, pvOutputkWh, setHomeStorage, setHomeStorageSize, setFwdBtn, steps, setSteps, activeView } = this.context;
    setHomeStorage(event.target.value);

    if (event.target.value === "false") {
      setHomeStorageSize("none");

      let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === "0" && o.EMS === "Ja");
      setTabToSelect(tabInTable.Tab);

      setFwdBtn(true);
      this.context.goToView(8);
    } else {
      setHomeStorageSize(0);
      this.setState({ homeStorageSizekW: 0 });
      setFwdBtn(false);
    }

    steps[activeView] = false;
    setSteps({ ...steps });
  };

  inputKfwValue = (event) => {
    const { setKfwValue } = this.context;
    setKfwValue(event.target.value);
  };

  inputInsulationValue = (event) => {
    const { setInsulationValue } = this.context;
    setInsulationValue(event.target.value);
  };

  inputOdometerValue = (event) => {
    const { setOdometerIncrease } = this.context;
    setOdometerIncrease(event.target.value);
  };

  inputChargingValue = (event) => {
    const { setHomeCharging } = this.context;
    setHomeCharging(event.target.value);
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

  inputStorageSize = (value) => {
    const { setHomeStorageSize } = this.context;
    setHomeStorageSize(parseInt(value));
    this.setState({ homeStorageSizekW: parseInt(value) });
    //this.context.goToView(8);
  };

  render() {
    const { homeStorage, homeStorageSize } = this.context;

    return (
      <div>
        <div className="cardContainer step-eight">
          <div className="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusBatteryIcon /> : <BatteryIcon />}</div>
          <div className="cardContent">
            <div className="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusBatteryIcon style={{ marginLeft: "10px", width: "55px" }} /> : <BatteryIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 className="cardHeadline">Batteriespeicher</h3>
                </div>
                <span className="cardDescription">Ist ein Batteriespeicher installiert oder geplant?</span>
              </div>
              <div className="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="true" className="card-input-element" checked={homeStorage === "true"} onChange={this.inputHomeStorage} />
                    <div className="panel panel-default card-input">
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusAcceptIcon /> : <AcceptIcon />}</div>
                      <div className="panel-body">Ja</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="false" className="card-input-element trackeable" checked={homeStorage === "false"} onChange={this.inputHomeStorage} data-event="batteriespeicher-nein" />
                    <div className="panel panel-default card-input">
                      <div className="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusDenyIcon /> : <DenyIcon />}</div>
                      <div className="panel-body">Nein</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Storage Size */}
              {homeStorage === "true" && (
                <div style={{ marginTop: "0px", marginLeft: "0px", marginRight: "0px", fontFamily: "Bosch-Regular" }}>
                  <div className="txt" style={{ marginTop: "15px" }}>
                    Wie groß ist Ihr installierter oder geplanter Batteriespeicher?
                  </div>
                  <div className="slider-size" style={{ position: "relative", height: "90px", marginTop: "25px" }}>
                    <Slider
                      min={0}
                      max={3}
                      value={homeStorageSize}
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
                      onChange={this.inputStorageSize}
                    />
                    <div className="slider-label" style={{ position: "relative", top: "5px", left: 0, fontFamily: "Bosch-Regular", fontSize: "12px" }}>
                      <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>
                        <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                      </div>
                      <div style={{ position: "absolute", left: "33.333%", transform: "translateX(-50%)" }}>
                        <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                      </div>
                      <div style={{ position: "absolute", left: "66.6667%", transform: "translateX(-50%)" }}>
                        <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                      </div>
                      <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>
                        <div style={{ width: "1px", height: "10px", background: "#000" }}></div>
                      </div>
                    </div>
                    <div className="slider-label" style={{ position: "relative", top: "17px", left: 0, fontFamily: "Bosch-Regular", fontSize: "16px" }}>
                      <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>6</div>
                      <div style={{ position: "absolute", left: "33.333%", transform: "translateX(-50%)" }}>9</div>
                      <div style={{ position: "absolute", left: "66.6667%", transform: "translateX(-50%)" }}>12</div>
                      <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>15</div>
                      <div className="kwp-label" style={{ position: "absolute", left: "100%", marginLeft: "29px" }}>
                        kWh
                      </div>
                    </div>
                  </div>

                  <div>
                    <InfoBox box="4-row-2-col-battery" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HomeStorage));
