import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import { ReactComponent as ChartUpLarge } from "../../../../assets/img/icons/chart_up_large.svg";
import { ReactComponent as ChartUpSmall } from "../../../../assets/img/icons/chart_up_small.svg";
import { ReactComponent as ChartOil } from "../../../../assets/img/icons/chart_oil.svg";
import { ReactComponent as BuildingInsulationIcon } from "../../../../assets/img/icons/building_insulation.svg";

/* Buderus Icons */
import { ReactComponent as BuderusHouseIcon } from "../../../../assets/img/icons/buderus/house_icon.svg";
import { ReactComponent as BuderusEfficienteIcon } from "../../../../assets/img/icons/buderus/efficiente.svg";
import { ReactComponent as BuderusHomeIsolierungIcon } from "../../../../assets/img/icons/buderus/home_Isolierung.svg";
import { ReactComponent as BuderusOilIcon } from "../../../../assets/img/icons/buderus/oil.svg";

import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { withTranslation } from "react-i18next";
import { validate } from "validate.js";

class HeatingSelection extends React.Component {
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
    const { setBuildingEnegeryStandard, setFwdBtn, setKfwValue, setInsulationValue, setLNGUsage, setOilLNGValue, setOilUsageLiters, setDisabledLNGUsage, setDisabledOilUsage, activeView, steps, setSteps } = this.context;
    setBuildingEnegeryStandard(event.target.value);
    setLNGUsage("");
    setOilUsageLiters("");
    setOilLNGValue("");
    setDisabledLNGUsage(true);
    setDisabledOilUsage(true);

    setFwdBtn(true);
    steps[activeView] = true;
    setSteps({ ...steps });

    if (event.target.value === "BuildingEnergyStandard") {
    } else if (event.target.value === "OilLNG") {
      setKfwValue("");
    } else if (event.target.value === "BuildingInsulation") {
      setInsulationValue("");
    }
  };

  inputKfwValue = (event) => {
    const { setKfwValue, setFwdBtn, steps, setSteps, activeView } = this.context;
    setKfwValue(event.target.value);

    setFwdBtn(true);

    steps[activeView] = false;
    setSteps({ ...steps });
    this.context.goToView(2);
  };

  inputInsulationValue = (event) => {
    const { setKfwValue, setInsulationValue, setFwdBtn, steps, setSteps, activeView } = this.context;
    setInsulationValue(event.target.value);
    setKfwValue(event.target.value);

    setFwdBtn(true);

    steps[activeView] = false;
    setSteps({ ...steps });
    this.context.goToView(2);
  };

  inputOilLNGValue = (event) => {
    const { setOilLNGValue, setOilUsageLiters, setDisabledOilUsage, setDisabledLNGUsage, setLNGUsage, setFwdBtn, steps, setSteps, activeView } = this.context;
    setOilLNGValue(event.target.value);

    if (event.target.value === "oil-usage") {
      setDisabledOilUsage(false);
      setDisabledLNGUsage(true);
      setLNGUsage("");
      setFwdBtn(true);
      steps[activeView] = true;
    } else if (event.target.value === "lng-usage") {
      setDisabledOilUsage(true);
      setDisabledLNGUsage(false);
      setOilUsageLiters("");
      setFwdBtn(true);
      steps[activeView] = true;
    }

    setSteps({ ...steps });
  };

  inputOilUsageLiters = (event) => {
    const { BuildingSize, setKfwValue, kfwLookupTable, setOilUsageLiters, setFwdBtn, activeView, steps, setSteps } = this.context;
    setOilUsageLiters(event.target.value);

    var inputNumber = parseInt(event.target.value);

    if (validate.isInteger(inputNumber)) {
      var kWhUsage = inputNumber * 9.8;
      var usagePerSqm = kWhUsage / parseInt(BuildingSize);
      console.log(usagePerSqm);

      if (usagePerSqm < 35) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 25);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 35 && usagePerSqm < 45) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 35);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 45 && usagePerSqm < 55) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 45);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 55 && usagePerSqm < 65) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 55);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 65 && usagePerSqm < 95) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 65);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 95 && usagePerSqm < 120) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 95);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 120 && usagePerSqm < 150) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 120);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (usagePerSqm >= 150) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 150);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      }

      setFwdBtn(false);
      steps[activeView] = false;
    } else {
      setFwdBtn(true);
      steps[activeView] = true;
    }

    setSteps({ ...steps });
  };

  inputLNGUsage = (event) => {
    const { setLNGUsage, setKfwValue, kfwLookupTable, setFwdBtn, activeView, steps, setSteps } = this.context;
    setLNGUsage(event.target.value);

    var inputNumber = parseInt(event.target.value);
    console.log(inputNumber);

    if (validate.isInteger(inputNumber)) {
      if (inputNumber < 35) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 25);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 35 && inputNumber < 45) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 35);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 45 && inputNumber < 55) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 45);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 55 && inputNumber < 65) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 55);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 65 && inputNumber < 95) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 65);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 95 && inputNumber < 120) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 95);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 120 && inputNumber < 150) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 120);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      } else if (inputNumber >= 150) {
        let kfWInTable = kfwLookupTable.find((o) => o.kWh === 150);
        console.log(kfWInTable);
        setKfwValue(kfWInTable.kfW);
      }

      setFwdBtn(false);
      steps[activeView] = false;
    } else {
      setFwdBtn(true);
      steps[activeView] = true;
    }

    setSteps({ ...steps });
  };

  render() {
    const { BuildingEnegeryStandard, kfwValue, insulationValue, OilLNGValue, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

    const OilLNGIcon = styled("span")(({ theme }) => ({
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

    const OilLNGCheckedIcon = styled(OilLNGIcon)({
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

    function OilLNGRadio(props) {
      return (
        <Radio
          disableRipple
          color="default"
          checkedIcon={<OilLNGCheckedIcon />}
          icon={<OilLNGIcon />}
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
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHouseIcon /> : <ChartUpLarge />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <form id="async_form">
                <div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHouseIcon style={{ marginLeft: "10px", width: "55px" }} /> : <ChartUpLarge style={{ marginLeft: "10px", width: "55px" }} />}</div>
                    <h3 class="cardHeadline">Heizenergiebedarf</h3>
                  </div>
                  <span class="cardDescription">Wählen Sie eine der drei Möglichkeiten zur Bestimmung Ihres Heizenergiebedarfs.</span>
                </div>
                <div class="flexRow" style={{ flexWrap: "wrap" }}>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" checked={BuildingEnegeryStandard === "BuildingEnergyStandard"} onChange={this.inputHeatingSelection} />
                      <div class="panel panel-default card-input-wide">
                        <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusEfficienteIcon /> : <ChartUpSmall />}</div>
                        <div class="panel-body">
                          Gebäude-
                          <br />
                          energiestandard
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="OilLNG" class="card-input-element" checked={BuildingEnegeryStandard === "OilLNG"} onChange={this.inputHeatingSelection} />
                      <div class="panel panel-default card-input-wide">
                        <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusOilIcon /> : <ChartOil />}</div>
                        <div class="panel-body">
                          Öl- oder
                          <br />
                          Gasverbrauch
                        </div>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" checked={BuildingEnegeryStandard === "BuildingInsulation"} onChange={this.inputHeatingSelection} />
                      <div class="panel panel-default card-input-wide">
                        <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusHomeIsolierungIcon /> : <BuildingInsulationIcon />}</div>
                        <div class="panel-body">Gebäudeisolierung</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Gebäudeenergiestandard */}
                {BuildingEnegeryStandard === "BuildingEnergyStandard" && (
                  <div style={{ marginTop: "30px", marginLeft: "10px", fontFamily: "Bosch-Regular" }}>
                    Welchen Energiestandard besitzt Ihr Gebäude?
                    <div style={{ marginTop: "15px" }}>
                      <FormControl>
                        <RadioGroup name="kfw-value" id="kfw-value">
                          <div className="trackeable" data-event="heizenergiebefard-gebaude-40">
                            <FormControlLabel value="kfW_40_" control={<OilLNGRadio />} label="KfW 40" checked={kfwValue === "kfW_40_"} onChange={this.inputKfwValue} />
                          </div>
                          <div className="trackeable" data-event="heizenergiebefard-gebaude-55">
                            <FormControlLabel value="kfW_55_" control={<OilLNGRadio />} label="KfW 55" checked={kfwValue === "kfW_55_"} onChange={this.inputKfwValue} />
                          </div>
                          <div className="trackeable" data-event="heizenergiebefard-gebaude-70">
                            <FormControlLabel value="kfW_70_" control={<OilLNGRadio />} label="KfW 70" checked={kfwValue === "kfW_70_"} onChange={this.inputKfwValue} />
                          </div>
                          <div className="trackeable" data-event="heizenergiebefard-gebaude-85">
                            <FormControlLabel value="kfW_85_" control={<OilLNGRadio />} label="KfW 85" checked={kfwValue === "kfW_85_"} onChange={this.inputKfwValue} />
                          </div>
                          <div className="trackeable" data-event="heizenergiebefard-gebaude-100">
                            <FormControlLabel value="kfW_100_" control={<OilLNGRadio />} label="KfW 100" checked={kfwValue === "kfW_100_"} onChange={this.inputKfwValue} />
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}

                {/* Öl oder Gasverbrauch */}
                {BuildingEnegeryStandard === "OilLNG" && (
                  <div style={{ marginTop: "30px", marginLeft: "10px", fontFamily: "Bosch-Regular" }}>
                    Nennen Sie uns entweder Ihren Gas- oder Ölverbrauch pro Jahr
                    <div style={{ marginTop: "40px" }}>
                      <FormControl>
                        <RadioGroup sx={{ flexWrap: "inherit" }} className="Radio-Group-Flex" name="oil-lng-value" row>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <FormControlLabel value="oil-usage" control={<OilLNGRadio />} style={{ marginRight: "0px" }} label="Ölverbrauch pro Jahr" checked={OilLNGValue === "oil-usage"} onChange={this.inputOilLNGValue} />
                            <TextField disabled={disabledOilUsage} id="filled-basic" type="number" style={{ marginTop: "12px" }} name="OilUsageLiters" value={OilUsageLiters} label="Ölverbrauch in Liter" variant="filled" InputLabelProps={{ shrink: true }} onChange={this.inputOilUsageLiters} />
                          </div>
                          <div style={{ padding: "11px 50px 10px 35px", fontSize: "13px" }}>oder</div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <FormControlLabel value="lng-usage" control={<OilLNGRadio />} label="Gasverbrauch pro Jahr" checked={OilLNGValue === "lng-usage"} onChange={this.inputOilLNGValue} />
                            <TextField disabled={disabledLNGUsage} id="filled-basic" type="number" style={{ marginTop: "12px" }} name="LNGUsage" value={LNGUsage} label="Gasverbrauch in kWh" variant="filled" InputLabelProps={{ shrink: true }} onChange={this.inputLNGUsage} />
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}

                {/* Gebäudeisolierung */}
                {BuildingEnegeryStandard === "BuildingInsulation" && (
                  <div style={{ marginTop: "30px", marginLeft: "10px", fontFamily: "Bosch-Regular" }}>
                    Wie gut ist Ihr Gebäude isoliert?
                    <div style={{ marginTop: "15px" }}>
                      <FormControl>
                        <RadioGroup name="insulation-value">
                          <div>
                            <span class="trackeable" data-event="heizenergiebedard-vollstandig">
                              <FormControlLabel value="kfW_40_" control={<OilLNGRadio />} label="Vollständig sehr gut isoliert" checked={insulationValue === "kfW_40_"} onChange={this.inputInsulationValue} />
                            </span>
                            <InfoButton tooltipId="1" text="Die auschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer vollständig, sehr guten Dämmung wurden alle Faktoren bereits auf den neusten Stand gebracht." color="#000" />
                          </div>
                          <div>
                            <span class="trackeable" data-event="heizenergiebedard-grobtenteils">
                              <FormControlLabel value="kfW_70_" control={<OilLNGRadio />} label="Größtenteils gut isoliert" checked={insulationValue === "kfW_70_"} onChange={this.inputInsulationValue} />
                            </span>
                            <InfoButton tooltipId="2" text="Die auschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer größtenteils guten Dämmung wurden mindestens 2 Faktoren bereits auf den neusten Stand gebracht." color="#000" />
                          </div>
                          <div>
                            <span class="trackeable" data-event="heizenergiebedard-teilweise">
                              <FormControlLabel value="p_isolated" control={<OilLNGRadio />} label="Teilweise isoliert" checked={insulationValue === "p_isolated"} onChange={this.inputInsulationValue} />
                            </span>
                            <InfoButton tooltipId="3" text="Die auschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Bei einer Teil-Dämmung wurde mindestens ein Faktor bereits auf den neusten Stand gebracht." color="#000" />
                          </div>
                          <div>
                            <span class="trackeable" data-event="heizenergiebedard-schlecht">
                              <FormControlLabel value="un_ren_" control={<OilLNGRadio />} label="Schlecht bis gar nicht isoliert" checked={insulationValue === "un_ren_"} onChange={this.inputInsulationValue} />
                            </span>
                            <InfoButton tooltipId="4" text="Die auschlaggebenden Faktoren für die Gebäudedämmung sind das Dach, die Gebäudehülle und die Fenster. Nicht isoliert bedeutet, dass noch kein Faktor auf den neusten Stand gebracht wurde." color="#000" />
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HeatingSelection));
