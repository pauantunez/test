import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import InfoBox from "../../infoBox";
import { ReactComponent as Coins } from "../../../../assets/img/icons/coins.svg";
import { ReactComponent as BuderusCoins } from "../../../../assets/img/icons/buderus/coins.svg";
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

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class Investment extends React.Component {
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
    const { EGen_sh_kWh_HP_A_W_MFH, energy_to_grid_kWh_PV_MFH } = this.context;
    console.log(energy_to_grid_kWh_PV_MFH);
  }

  componentWillMount() {
    const { BuildingEnegeryStandard, setFwdBtn, fwdBtn, steps, setSteps, activeView, kfwValue } = this.context;

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

  inputHeatingDistribution = (event) => {
    const { heatDistributionValue, setHeatDistribution } = this.context;
    setHeatDistribution(event.target.value);
  };

  inputKfwValue = (event) => {
    const { kfwValue, setKfwValue } = this.context;
    setKfwValue(event.target.value);
  };

  inputInsulationValue = (event) => {
    const { insulationValue, setInsulationValue } = this.context;
    setInsulationValue(event.target.value);
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

  inputInvestmentCostEUR = (event) => {
    const { investmentCostEUR, setInvestmentCostEUR, setFwdBtn, steps, setSteps, activeView } = this.context;
    setInvestmentCostEUR(event.target.value);

    var inputNumber = parseInt(event.target.value);

    if (validate.isInteger(inputNumber)) {
      setFwdBtn(false);
      steps[activeView] = false;
      /* this.context.goToView(9); */
    } else {
      setFwdBtn(true);
      steps[activeView] = true;
    }

    setSteps({ ...steps });
  };

  inputInvestmentCost = (event) => {
    const { investmentCost, setInvestmentCost, setInvestmentCostEUR, setDisabledInvestmentCost, disabledInvestmentCost, setFwdBtn, steps, setSteps, activeView } = this.context;
    setInvestmentCost(event.target.value);
    setInvestmentCostEUR("");

    if (event.target.value === "true") {
      setDisabledInvestmentCost(false);

      setFwdBtn(true);
      steps[activeView] = true;
    } else if (event.target.value === "false") {
      setDisabledInvestmentCost(true);

      setFwdBtn(false);
      steps[activeView] = false;
      this.context.goToView(9);
      setFwdBtn(true);
    }

    setSteps({ ...steps });
  };

  avoidPointAndCharacters = (event) => {
    let ASCIICode = event.which ? event.which : event.keyCode;
    if (!/[0-9,]/.test(event.key) && ASCIICode != 8) {
      event.preventDefault();
    }
  };

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh, investmentCost, setInvestmentCost, setDisabledInvestmentCost, disabledInvestmentCost, investmentCostEUR } = this.context;

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

    const OilLNGIcon = styled("span")(({ theme }) => ({
      borderRadius: this.context.selectedTheme === "buderus" ? "0px" : "50%",
      width: 24,
      height: 24,
      backgroundColor: "#8A9097",
      fontFamily: "Bosch-Medium",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: this.context.selectedTheme === "buderus" ? "#000000" : "#106ba3",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    }));

    const OilLNGCheckedIcon = styled(OilLNGIcon)({
      backgroundColor: this.context.selectedTheme === "buderus" ? "#000000" : "#137cbd",
      backgroundImage: this.context.selectedTheme === "buderus" ? "" : "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
      "&:before": {
        content: '""',
        display: "block",
        width: this.context.selectedTheme === "buderus" ? 12 : 24,
        height: this.context.selectedTheme === "buderus" ? 12 : 24,
        backgroundColor: this.context.selectedTheme === "buderus" ? "#fff" : "",
        borderRadius: 2,
        margin: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: this.context.selectedTheme === "buderus" ? "" : "radial-gradient(#fff,#fff 28%,transparent 32%)",
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
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusCoins /> : <Coins />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusCoins style={{ marginLeft: "10px", width: "55px" }} /> : <Coins style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Investitionskosten</h3>
                </div>
                <span class="cardDescription">
                  Wie viel hat das PV-System gekostet oder wird es kosten
                  <br />
                  (inkl. Kosten des Batteriespeichers und Kosten für Montage)?
                </span>
              </div>
              <div class="flexRow" style={{ flexDirection: "column" }}>
                <div style={{ marginTop: "10px", marginLeft: "10px", fontFamily: "Bosch-Regular" }}>
                  <FormControl>
                    <RadioGroup sx={{ flexWrap: "inherit", flexDirection: "row" }} name="oil-lng-value" row>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel value="false" control={<OilLNGRadio />} style={{ marginRight: "0px" }} label="Ich kenne die Investitionskosten nicht." checked={investmentCost === "false"} onChange={this.inputInvestmentCost} />
                        <FormControlLabel value="true" control={<OilLNGRadio />} style={{ marginRight: "0px" }} label="Der Gesamtbetrag beläuft sich auf folgende Summe" checked={investmentCost === "true"} onChange={this.inputInvestmentCost} />
                        <TextField disabled={disabledInvestmentCost} id="filled-basic" type="number" style={{ marginTop: "12px" }} name="Investment" value={investmentCostEUR} label="Gesamtinvestitionskosten inkl. Montage in EUR (ohne MwSt.)" variant="filled" InputLabelProps={{ shrink: true }} onChange={this.inputInvestmentCostEUR} onKeyDown={this.avoidPointAndCharacters} />
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
                <div style={{ marginTop: "70px" }}>
                  <InfoBox box="1-row-1-col" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Investment));
