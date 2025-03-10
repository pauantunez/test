import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { ReactComponent as InfoIcon } from "../../assets/img/icons/info.svg";
import { ReactComponent as BuderusInfoIcon } from "../../assets/img/icons/buderus/info.svg";
import { styled } from "@mui/material/styles";
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

  componentDidMount() {}

  render() {
    const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: this.context.selectedTheme === "buderus" ? "#262626" : "#ffffff",
        fontSize: 16,
        filter: this.context.selectedTheme === "buderus" ? "drop-shadow(0px 0px 0px rgba(0,0,0,0))" : "drop-shadow(-2px 1px 1px rgba(130,130,130,0.7))",
      },
      [`& .${tooltipClasses.tooltipArrow}`]: {
        /* boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.6)", */
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: this.context.selectedTheme === "buderus" ? "#262626" : "#ffffff",
        /*color: "#007BC0",*/
        /* color: this.state.color, */
        color: this.context.selectedTheme === "buderus" ? "#fff" : "#007BC0",
        boxShadow: this.context.selectedTheme === "buderus" ? "0px 0px 0px 0px" : "0px 0px 6px 0px rgba(0,0,0,0.6)",
        borderRadius: "0px",
        fontSize: "12px",
        fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
        lineHeight: "1.4",
        padding: "6px 6px 6px 8px",
        width: "150px", // <600 px
      },
    }));

    return (
      <LightTooltip enterTouchDelay={0} leaveTouchDelay={5000} arrow tooltipid={this.state.tooltipId} title={this.state.text} placement={this.state.placement}>
        <Button style={{ minWidth: "unset", padding: 0 }}>{this.context.selectedTheme === "buderus" ? <BuderusInfoIcon /> : <InfoIcon />}</Button>
      </LightTooltip>
    );
  }
}

export default withRouter(withTranslation()(InfoButton));
