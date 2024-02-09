import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoButton from "../../infoButton";
import InfoBox from "../../infoBox";
import { ReactComponent as HouseSunSmallIcon } from "../../../../assets/img/icons/house_sun_small.svg";
import { ReactComponent as HouseSunLargeIcon } from "../../../../assets/img/icons/house_sun_large.svg";
import { ReactComponent as HouseSunLargeWhiteIcon } from "../../../../assets/img/icons/house_sun_large_white.svg";
import { ReactComponent as GeothermalHeatpumpIcon } from "../../../../assets/img/icons/geothermal_heatpump.svg";
import { ReactComponent as AirWaterHeatpumpIcon } from "../../../../assets/img/icons/air_water_heatpump.svg";
import { ReactComponent as UnderfloorRadiatorIcon } from "../../../../assets/img/icons/underfloor_radiator.svg";
import { ReactComponent as HeatpumpLarge } from "../../../../assets/img/icons/heatpump_large.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/img/icons/info.svg";
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

  inputHeatpumpType = (event) => {
    const { heatpumpType, setHeatpumpType, setFwdBtn, steps, setSteps, activeView } = this.context;
    setHeatpumpType(event.target.value);

    setFwdBtn(false);
    steps[activeView] = false;
    setSteps({ ...steps });
    this.context.goToView(5);
    setFwdBtn(true);
  };

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, heatpumpType } = this.context;

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
          <div class="cardLargeIcon">
            <HeatpumpLarge />
          </div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">
                    <HeatpumpLarge style={{ marginLeft: "10px", width: "55px" }} />
                  </div>
                  <h3 class="cardHeadline">Wärmepumpe</h3>
                </div>
                <span class="cardDescription">Welche Art Wärmepumpe ist verbaut oder geplant?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="heating" value="2" class="card-input-element" checked={heatpumpType === "2"} onChange={this.inputHeatpumpType} />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">
                        <GeothermalHeatpumpIcon />
                      </div>
                      <div class="panel-body">Erdwärmepumpe</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="heating" value="1" class="card-input-element" checked={heatpumpType === "1"} onChange={this.inputHeatpumpType} />
                    <div class="panel panel-default card-input-wide">
                      <div class="panel-heading">
                        <AirWaterHeatpumpIcon />
                      </div>
                      <div class="panel-body">Luft-Wasser-Wärmepumpe</div>
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
