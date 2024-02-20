import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import InfoBox from "../../infoBox";
import { ReactComponent as AcceptIcon } from "../../../../assets/img/icons/accept_large.svg";
import { ReactComponent as DenyIcon } from "../../../../assets/img/icons/deny_large.svg";
import { ReactComponent as BatteryIcon } from "../../../../assets/img/icons/battery_large.svg";

import { ReactComponent as BuderusAcceptIcon } from "../../../../assets/img/icons/buderus/accept_large.svg";
import { ReactComponent as BuderusDenyIcon } from "../../../../assets/img/icons/buderus/deny_large.svg";
import { ReactComponent as BuderusBatteryIcon } from "../../../../assets/img/icons/buderus/battery_large.svg";

import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { withTranslation } from "react-i18next";
import axios from "axios";

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

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
    const { setFwdBtn, fwdBtn, steps, setSteps, activeView } = this.context;

    if (steps[activeView] === false) {
      setFwdBtn(false);
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const { setTabToSelect, tabEntries, pvOutputkWh, homeStorageSizekWh, pvOutput, setPVOutput } = this.context;

    let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja");

    if (previousState.homeStorageSizekW !== this.state.homeStorageSizekW) {
      setTabToSelect(tabInTable.Tab);
      console.log(tabInTable);
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
    const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value);
  };

  inputHeatingSelection = (event) => {
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard } = this.context;
    setBuildingEnegeryStandard(event.target.value);
  };

  inputHomeStorage = (event) => {
    const { homeStorageSize, ev, kfwValue, scenarioInDatabase, tabEntries, setTabToSelect, pvOutputkWh, homeStorageSizekWh, homeStorage, setHomeStorage, setHomeStorageSize, setFwdBtn, steps, setSteps, activeView } = this.context;
    setHomeStorage(event.target.value);

    if (event.target.value === "false") {
      setHomeStorageSize("none");

      let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === "0" && o.EMS === "Ja");
      setTabToSelect(tabInTable.Tab);
      console.log(tabInTable);
      setFwdBtn(true);
      this.context.goToView(8);
    } else {
      setHomeStorageSize(0);
      this.setState({ homeStorageSizekW: 0 });
    }

    /* setFwdBtn(false); */
    steps[activeView] = false;
    setSteps({ ...steps });
  };

  inputKfwValue = (event) => {
    const { kfwValue, setKfwValue } = this.context;
    setKfwValue(event.target.value);
  };

  inputInsulationValue = (event) => {
    const { insulationValue, setInsulationValue } = this.context;
    setInsulationValue(event.target.value);
  };

  inputOdometerValue = (event) => {
    const { odometerIncrease, setOdometerIncrease } = this.context;
    setOdometerIncrease(event.target.value);
  };

  inputChargingValue = (event) => {
    const { homeCharging, setHomeCharging } = this.context;
    setHomeCharging(event.target.value);
  };

  inputOilLNGValue = (event) => {
    const { OilLNGValue, setOilLNGValue, disabledOilUsage, setDisabledOilUsage, disabledLNGUsage, setDisabledLNGUsage } = this.context;
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
    const { OilUsageLiters, setOilUsageLiters } = this.context;
    setOilUsageLiters(event.target.value);
  };

  inputLNGUsage = (event) => {
    const { LNGUsage, setLNGUsage } = this.context;
    setLNGUsage(event.target.value);
  };

  inputStorageSize = (value) => {
    const { kfwValue, ev, scenarioInDatabase, homeStorageSize, setHomeStorageSize } = this.context;
    setHomeStorageSize(parseInt(value));
    this.setState({ homeStorageSizekW: parseInt(value) });
    //this.context.goToView(8);
  };

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, heatpumpType, ev, odometerIncrease, homeStorage, homeStorageSize } = this.context;

    const BpIcon = styled("span")(({ theme }) => ({
      borderRadius: "0%",
      width: 24,
      height: 24,
      backgroundColor: "#C1C7CC",
      fontFamily: "Bosch-Medium",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#C1C7CC",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    }));

    const BpCheckedIcon = styled(BpIcon)({
      backgroundColor: "#137cbd",
      backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 4,
        height: 12,
        transform: "rotate(45deg)",
        marginTop: "10%",
        marginLeft: "35%",
        borderBottom: "2px solid #fff",
        borderRight: "2px solid #fff",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#106ba3",
      },
    });

    function BpRadio(props) {
      return (
        <Radio
          disableRipple
          color="default"
          checkedIcon={<BpCheckedIcon />}
          icon={<BpIcon />}
          sx={{
            "&, & + .MuiFormControlLabel-label": {
              marginRight: "5px",
              fontFamily: "Bosch-Regular",
            },
          }}
          {...props}
        />
      );
    }

    const RadioIcon = styled("span")(({ theme }) => ({
      borderRadius: "50%",
      width: 24,
      height: 24,
      backgroundColor: "#8A9097",
      fontFamily: "Bosch-Medium",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#8A9097",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    }));

    const CheckedIcon = styled(RadioIcon)({
      backgroundColor: "#137cbd",
      backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        display: "block",
        width: 24,
        height: 24,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
      },
      "input:hover ~ &": {
        backgroundColor: "#106ba3",
      },
    });

    function StandardRadio(props) {
      return (
        <Radio
          disableRipple
          color="default"
          checkedIcon={<CheckedIcon />}
          icon={<RadioIcon />}
          sx={{
            "&, & + .MuiFormControlLabel-label": {
              marginRight: "5px",
              fontFamily: "Bosch-Regular",
            },
          }}
          {...props}
        />
      );
    }

    return (
      <div>
        <div class="cardContainer">
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusBatteryIcon /> : <BatteryIcon />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusBatteryIcon style={{ marginLeft: "10px", width: "55px" }} /> : <BatteryIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Batteriespeicher</h3>
                </div>
                <span class="cardDescription">Ist ein Batteriespeicher installiert oder geplant?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="true" class="card-input-element" checked={homeStorage === "true"} onChange={this.inputHomeStorage} />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusAcceptIcon /> : <AcceptIcon />}</div>
                      <div class="panel-body">Ja</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="false" class="card-input-element trackeable" checked={homeStorage === "false"} onChange={this.inputHomeStorage} data-event="batteriespeicher-nein" />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusDenyIcon /> : <DenyIcon />}</div>
                      <div class="panel-body">Nein</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Storage Size */}
              {homeStorage === "true" && (
                <div style={{ marginTop: "0px", marginLeft: "0px", marginRight: "0px", fontFamily: "Bosch-Regular" }}>
                  <div style={{ marginTop: "15px" }}>Wie groß ist Ihr installierter oder geplanter Batteriespeicher?</div>
                  <div class="slider-size" style={{ position: "relative", height: "90px", marginTop: "25px" }}>
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
                    <div style={{ position: "relative", top: "5px", left: 0, fontFamily: "Bosch-Regular", fontSize: "12px" }}>
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
                    <div style={{ position: "relative", top: "17px", left: 0, fontFamily: "Bosch-Regular", fontSize: "16px" }}>
                      <div style={{ position: "absolute", left: "0%", transform: "translateX(-50%)" }}>6</div>
                      <div style={{ position: "absolute", left: "33.333%", transform: "translateX(-50%)" }}>9</div>
                      <div style={{ position: "absolute", left: "66.6667%", transform: "translateX(-50%)" }}>12</div>
                      <div style={{ position: "absolute", left: "100%", transform: "translateX(-50%)" }}>15</div>
                      <div style={{ position: "absolute", left: "100%", marginLeft: "29px" }}>kWh</div>
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
