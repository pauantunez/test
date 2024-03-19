import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as HouseholdEnergyUseIcon } from "../../../../assets/img/icons/household_energy_use_icon.svg";
import { ReactComponent as BuderusPvLeistung } from "../../../../assets/img/icons/buderus/pv_leistung.svg";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { withTranslation } from "react-i18next";

class PVOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      pvOutputkW: null,
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    const { setTabToSelect, tabEntries, pvOutputkWh, homeStorageSizekWh } = this.context;

    if (this.state.pvOutputkW == null) {
      let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja");
      setTabToSelect(tabInTable.Tab);
      console.log(tabInTable);
    }
  }

  componentWillMount() {
    const { setFwdBtn, steps, setSteps, activeView } = this.context;

    steps[activeView] = false;
    setSteps({ ...steps });

    if (steps[activeView] === false) {
      setFwdBtn(false);
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const { setTabToSelect, tabEntries, pvOutputkWh, homeStorageSizekWh } = this.context;

    let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja");

    console.log(previousState.pvOutputkW);
    console.log(this.state.pvOutputkW);

    if (previousState.pvOutputkW !== this.state.pvOutputkW) {
      setTabToSelect(tabInTable.Tab);
      console.log(tabInTable);
    }
  }

  inputPVOutput = (value) => {
    const { setPVOutput } = this.context;
    setPVOutput(parseInt(value));
    this.setState({ pvOutputkW: parseInt(value) });
    //this.context.goToView(7);
  };

  render() {
    const { pvOutput } = this.context;

    return (
      <div>
        <div class="cardContainer step-seven">
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusPvLeistung /> : <HouseholdEnergyUseIcon />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusPvLeistung style={{ marginLeft: "10px", width: "55px" }} /> : <HouseholdEnergyUseIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">PV-Leistung</h3>
                </div>
                <span class="cardDescription">Welche Leistung hat die installierte oder geplante PV-Anlage?</span>
              </div>
              <div class="flexRow" style={{ flexDirection: "column", marginTop: "20px" }}>
                <div class="slider-size">
                  <Slider
                    min={0}
                    max={3}
                    value={pvOutput}
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
                    onChange={this.inputPVOutput}
                  />

                  <div class="slider-label" style={{ position: "relative", top: "5px", left: 0, fontFamily: "Bosch-Regular", fontSize: "12px" }}>
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
                  <div class="slider-label" style={{ position: "relative", top: "17px", left: 0, fontFamily: "Bosch-Regular", fontSize: "16px" }}>
                    <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>4</div>
                    <div style={{ position: "absolute", left: "33.333%", transform: "translateX(-50%)" }}>7</div>
                    <div style={{ position: "absolute", left: "66.6667%", transform: "translateX(-50%)" }}>10</div>
                    <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>14</div>
                    <div class="kwp-label" style={{ position: "absolute", left: "100%", marginLeft: "29px" }}>
                      kWp
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "105px" }}>
                  <InfoBox box="4-row-2-col" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(PVOutput));
