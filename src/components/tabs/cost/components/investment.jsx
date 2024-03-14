import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import { ReactComponent as Coins } from "../../../../assets/img/icons/coins.svg";
import { ReactComponent as BuderusCoins } from "../../../../assets/img/icons/buderus/coins.svg";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { withTranslation } from "react-i18next";
import { validate } from "validate.js";

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

  inputInvestmentCostEUR = (event) => {
    const { setInvestmentCostEUR, setFwdBtn, steps, setSteps, activeView } = this.context;
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
    const { setInvestmentCost, setInvestmentCostEUR, setDisabledInvestmentCost, setFwdBtn, steps, setSteps, activeView } = this.context;
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
    if (!/[0-9,]/.test(event.key) && ASCIICode !== 8) {
      event.preventDefault();
    }
  };

  render() {
    const { investmentCost, disabledInvestmentCost, investmentCostEUR } = this.context;

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
        <div class="cardContainer step-nine">
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
                        <span class="trackeable" data-event="investitionskosten-nein">
                          <FormControlLabel value="false" control={<OilLNGRadio />} style={{ marginRight: "0px" }} label="Ich kenne die Investitionskosten nicht." checked={investmentCost === "false"} onChange={this.inputInvestmentCost} />
                        </span>
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
