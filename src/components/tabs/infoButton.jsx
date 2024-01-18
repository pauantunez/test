import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { ReactComponent as InfoIcon } from "../../assets/img/icons/info.svg";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import { withTranslation } from "react-i18next";

class InfoButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      color: props.color,
      size: props.size,
      placement: props.placement,
      tooltip1: false,
      tooltip2: false,
      tooltip3: false,
      tooltip4: false,
      tooltipId: props.tooltipId,
    };
  }

  static contextType = AppContext;

  componentDidMount() { }

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

    const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: "#ffffff",
        fontSize: 16,
        filter: "drop-shadow(-2px 1px 1px rgba(130,130,130,0.7))",
      },
      [`& .${tooltipClasses.tooltipArrow}`]: {
        /* boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.6)", */
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#ffffff",
        /*color: "#007BC0",*/
        color: this.state.color,
        boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.6)",
        borderRadius: "0px",
        fontSize: "12px",
        fontFamily: "Bosch-Regular",
        lineHeight: "1.4",
        padding: "6px 6px 6px 8px",
      },
    }));

    return (
      <LightTooltip enterTouchDelay={0} leaveTouchDelay={5000} arrow tooltipId={this.state.tooltipId} title={this.state.text} placement={this.state.placement}>
        <Button style={{ minWidth: "unset", padding: 0 }}>
          <InfoIcon />
        </Button>
      </LightTooltip>
    );
  }
}

export default withRouter(withTranslation()(InfoButton));
