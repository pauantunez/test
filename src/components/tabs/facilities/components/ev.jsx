import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import InfoBox from "../../infoBox";
import { ReactComponent as AcceptIcon } from "../../../../assets/img/icons/accept_large.svg";
import { ReactComponent as DenyIcon } from "../../../../assets/img/icons/deny_large.svg";
import { ReactComponent as EVLargeIcon } from "../../../../assets/img/icons/ev_large.svg";

import { ReactComponent as BuderusEVLargeIcon } from "../../../../assets/img/icons/buderus/ev_large.svg";
import { ReactComponent as BuderusAcceptIcon } from "../../../../assets/img/icons/buderus/accept_large.svg";
import { ReactComponent as BuderusDenyIcon } from "../../../../assets/img/icons/buderus/deny_large.svg";

import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import { withTranslation } from "react-i18next";
import validator, { validate } from "validate.js";
import axios from "axios";

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class EV extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      TCO_EUR_a: "1708.092161",
      OPEX_EUR_a: "83.06824285",
      CAPEX_EUR_a: "1625.023918",
      CO2_kg_a: "-425.1493941",
      TCO_thermal_EUR_a: "1008.819062",
      Power_kW_PV_MFH: "14",
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

  changeEVUsage = (type, value) => {
    const { setScenarioInDatabase, BuildingSize, energyUsagekWh, buildingTypePreHeatOption, kfwValue, preHeatTempOption, singlePreHeatOptionNoEVLookupTable, dualPreHeatOptionNoEVLookupTable, singlePreHeatOptionEVLookupTable, dualPreHeatOptionEVLookupTable, ev, setEV, setFwdBtn, steps, setSteps, activeView, odometerIncrease, homeCharging, setOdometerIncrease, setHomeCharging } = this.context;
    let evProfile;

    if (type == "homeCharging") {
      evProfile = value + odometerIncrease;
    } else {
      evProfile = homeCharging + value;
    }

    let validateOptions = buildingTypePreHeatOption.find((o) => o.buildingType === kfwValue);
    let scenarioInDatabase;
    console.log(validateOptions);

    if (validateOptions.option2 === "-") {
      //if one, use singlePreHeatOptionNoEVLookupTable as lookup table
      scenarioInDatabase = singlePreHeatOptionEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString() && o.evProfile === evProfile);
      console.log("HAS FIRST OPTION, NO SECOND OPTION");
      console.log(scenarioInDatabase);
      //this.context.goToView(6);
    } else {
      if (preHeatTempOption == 1) {
        scenarioInDatabase = dualPreHeatOptionEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString() && o.evProfile === evProfile);
        console.log("HAS FIRST OPTION, USE FIRST OPTION");
        console.log(scenarioInDatabase);
      } else {
        scenarioInDatabase = dualPreHeatOptionEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString() && o.evProfile === evProfile);
        console.log("HAS FIRST OPTION, USE SECOND OPTION");
        console.log(scenarioInDatabase);
      }
    }
    setScenarioInDatabase(scenarioInDatabase.scenario);
  };

  inputEV = (event) => {
    const { setScenarioInDatabase, BuildingSize, energyUsagekWh, buildingTypePreHeatOption, kfwValue, preHeatTempOption, singlePreHeatOptionNoEVLookupTable, dualPreHeatOptionNoEVLookupTable, singlePreHeatOptionEVLookupTable, dualPreHeatOptionEVLookupTable, ev, setEV, setFwdBtn, steps, setSteps, activeView, odometerIncrease, homeCharging, setOdometerIncreaseKWH, setOdometerIncrease, setHomeCharging } = this.context;
    setEV(event.target.value);
    setOdometerIncrease("");
    setHomeCharging("");
    setOdometerIncreaseKWH(0);

    if (event.target.value === "EV") {
      if (odometerIncrease != "" && homeCharging != "") {
        setFwdBtn(false);
        steps[activeView] = false;
      } else {
        setFwdBtn(true);
        steps[activeView] = true;
      }
    } else {
      //noEV

      //check if vorlauftemp has two options, or one
      let validateOptions = buildingTypePreHeatOption.find((o) => o.buildingType === kfwValue);
      let scenarioInDatabase;
      console.log(validateOptions);
      this.context.goToView(6);
      setFwdBtn(true);
      if (validateOptions.option2 === "-") {
        //if one, use singlePreHeatOptionNoEVLookupTable as lookup table
        scenarioInDatabase = singlePreHeatOptionNoEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString());
        console.log("HAS FIRST OPTION, NO SECOND OPTION");
        console.log(scenarioInDatabase);
      } else {
        if (preHeatTempOption == 1) {
          scenarioInDatabase = dualPreHeatOptionNoEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString());
          console.log("HAS FIRST OPTION, USE FIRST OPTION");
          console.log(scenarioInDatabase);
        } else {
          scenarioInDatabase = dualPreHeatOptionNoEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString());
          console.log("HAS FIRST OPTION, USE SECOND OPTION");
          console.log(scenarioInDatabase);
        }
      }
      setScenarioInDatabase(scenarioInDatabase.scenario);

      setFwdBtn(false);
      steps[activeView] = false;
    }
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
    const { setOdometerIncreaseKWH, odometerIncrease, setOdometerIncrease, homeCharging, setFwdBtn, steps, setSteps, activeView } = this.context;
    setOdometerIncrease(event.target.value);

    if (event.target.value === "10k") {
      setOdometerIncreaseKWH(1800);
    } else {
      setOdometerIncreaseKWH(3600);
    }

    if (homeCharging !== "") {
      this.changeEVUsage("odometerIncrease", event.target.value);

      setFwdBtn(false);
      steps[activeView] = false;
      setSteps({ ...steps });
    }
  };

  inputChargingValue = (event) => {
    const { homeCharging, setHomeCharging, setFwdBtn, steps, setSteps, activeView, odometerIncrease } = this.context;
    setHomeCharging(event.target.value);

    if (odometerIncrease !== "") {
      this.changeEVUsage("homeCharging", event.target.value);

      setFwdBtn(false);
      steps[activeView] = false;
      setSteps({ ...steps });
    }
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

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, heatpumpType, ev, odometerIncrease, homeCharging } = this.context;

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
      borderRadius: this.context.selectedTheme === "buderus" ? "0px" : "50%",
      border: this.context.selectedTheme === "buderus" ? "1px solid #3C3C3B" : "",
      width: 24,
      height: 24,
      backgroundColor: this.context.selectedTheme === "buderus" ? "#FFFFFF" : "#8A9097",
      fontFamily: "Bosch-Medium",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: this.context.selectedTheme === "buderus" ? "#D8D8D8" : "#106ba3",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    }));

    const checkmarkSVG = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";

    const CheckedIcon = styled(RadioIcon)({
      backgroundColor: this.context.selectedTheme === "buderus" ? "#000000" : "#137cbd",
      backgroundImage: this.context.selectedTheme === "buderus" ? "" : "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        content: '""',
        display: "block",
        width: 24,
        height: 24,
        borderRadius: 2,
        margin: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: this.context.selectedTheme === "buderus" ? `url("data:image/svg+xml, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='${checkmarkSVG}'/></svg>")` : "radial-gradient(#fff,#fff 28%,transparent 32%)",
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
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusEVLargeIcon /> : <EVLargeIcon />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusEVLargeIcon style={{ marginLeft: "10px", width: "55px" }} /> : <EVLargeIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Elektroauto</h3>
                </div>
                <span class="cardDescription">Ist ein Elektroauto vorhanden oder geplant?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="EV" class="card-input-element" checked={ev === "EV"} onChange={this.inputEV} />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusAcceptIcon /> : <AcceptIcon />}</div>
                      <div class="panel-body">Ja</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="noEV" class="card-input-element trackeable" checked={ev === "noEV"} onChange={this.inputEV} data-event="elektroauto-nein" />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusDenyIcon /> : <DenyIcon />}</div>
                      <div class="panel-body">Nein</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* EV */}
              {ev === "EV" && (
                <div style={{ marginTop: "0px", marginLeft: "10px", fontFamily: "Bosch-Regular" }}>
                  <div style={{ marginTop: "15px" }}>
                    <FormControl>
                      <RadioGroup name="charging-value">
                        <div>
                          <FormControlLabel value="Commuter_" control={<StandardRadio />} label="Das E-Auto kann nur selten tagsüber zuhause geladen werden." checked={homeCharging === "Commuter_"} onChange={this.inputChargingValue} />
                        </div>
                        <div class="top-margin-10">
                          <FormControlLabel value="Family_" control={<StandardRadio />} label="Das E-Auto wird vorwiegend tagsüber zuhause geladen." checked={homeCharging === "Family_"} onChange={this.inputChargingValue} />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div style={{ marginTop: "15px" }}>Jahreskilometer:</div>
                  <div style={{ marginTop: "10px" }}>
                    <FormControl>
                      <RadioGroup name="odometer-value">
                        <div>
                          <FormControlLabel value="10k" control={<StandardRadio />} label="ca. 10.000 km" checked={odometerIncrease === "10k"} onChange={this.inputOdometerValue} />
                        </div>
                        <div>
                          <FormControlLabel value="20k" control={<StandardRadio />} label="ca. 20.000 km" checked={odometerIncrease === "20k"} onChange={this.inputOdometerValue} />
                        </div>
                      </RadioGroup>
                    </FormControl>
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

export default withRouter(withTranslation()(EV));
