import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import { ReactComponent as HouseSunSmallIcon } from "../../../../assets/img/icons/house_sun_small.svg";
import { ReactComponent as HouseSunLargeIcon } from "../../../../assets/img/icons/house_sun_large.svg";
import { ReactComponent as HouseSunLargeWhiteIcon } from "../../../../assets/img/icons/house_sun_large_white.svg";
import { ReactComponent as RadiatorIcon } from "../../../../assets/img/icons/radiator.svg";
import { ReactComponent as UnderfloorHeatingIcon } from "../../../../assets/img/icons/underfloor_heating.svg";
import { ReactComponent as UnderfloorRadiatorIcon } from "../../../../assets/img/icons/underfloor_radiator.svg";
import { ReactComponent as HeatLarge } from "../../../../assets/img/icons/heat_large.svg";

import { ReactComponent as BuderusHeatLarge } from "../../../../assets/img/icons/buderus/heat_large.svg";
import { ReactComponent as BuderusRadiatorIcon } from "../../../../assets/img/icons/buderus/radiator.svg";
import { ReactComponent as BuderusUnderfloorHeatingIcon } from "../../../../assets/img/icons/buderus/underfloor_heating.svg";
import { ReactComponent as BuderusUnderfloorRadiatorIcon } from "../../../../assets/img/icons/buderus/underfloor_radiator.svg";

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

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

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
    const { setPreHeatTempOption, preHeatTempOption, buildingTypePreHeatOption, heatDistributionValue, setHeatDistribution, kfwValue, setFwdBtn, steps, setSteps, activeView } = this.context;

    setHeatDistribution(event.target.value);

    let preHeatOptionValue = buildingTypePreHeatOption.find((o) => o.buildingType === kfwValue);

    if (preHeatOptionValue.option2 === "-") {
      setPreHeatTempOption(1);
      console.log(preHeatOptionValue.option1);
    } else {
      if (event.target.value == "Radiator") {
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

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue } = this.context;

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

    const OilLNGCheckedIcon = styled(OilLNGIcon)({
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
                    <input type="radio" name="heating" value="Radiator" class="card-input-element" checked={heatDistributionValue === "Radiator"} onChange={this.inputHeatingDistribution} />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusRadiatorIcon /> : <RadiatorIcon />}</div>
                      <div class="panel-body">Heizkörper</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="Underfloor" class="card-input-element" checked={heatDistributionValue === "Underfloor"} onChange={this.inputHeatingDistribution} />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusUnderfloorHeatingIcon /> : <UnderfloorHeatingIcon />}</div>
                      <div class="panel-body">Fußbodenheizung</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="UnderfloorRadiator" class="card-input-element" checked={heatDistributionValue === "UnderfloorRadiator"} onChange={this.inputHeatingDistribution} />
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
