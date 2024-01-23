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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import { ReactComponent as EditIcon } from "../../assets/img/icons/pencil-7.svg";

import { withTranslation } from "react-i18next";

class InfoBoxResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      boxType: props.box,
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.breakEvenPoint();
  }

  energyUsageCombined = () => {
    const { heatpumpType, energyUsagekWh, odometerIncreaseKWH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
    var Avg_Eff_JAZ_HP;

    if (heatpumpType === "1") {
      Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH;
    } else {
      Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH;
    }

    //Enegery usage heatpump
    var energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);
    console.log("RESULT: " + energyUsageHeatpump);

    //Energy usage heating rod
    var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);
    console.log("RESULT HEATING ROD: " + energyUsageHeatingRod);

    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
  };

  pvUsagePercentage = (type) => {
    const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var pvUsagePercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;
    console.log("PV USAGE: " + pvUsagePercent);

    return pvUsagePercent;
  };

  gridUsagePercentage = (type) => {
    const { infoBoxOffGridGridUsage, setInfoBoxOffGridGridUsage, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;

    return gridUsagePercent;
  };

  breakEvenPV = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;
    let yearBreakEven = heatpumpPV.findIndex((n) => n.expenditure > 0);

    return yearBreakEven;
  };

  breakEvenPVems = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;
    let yearBreakEven = heatpumpPVems.findIndex((n) => n.expenditure > 0);

    return yearBreakEven;
  };

  breakEvenPoint = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;

    for (let index = 0; index < heatpumpPV.length; index++) {
      if (heatpumpPVems[index].expenditure > heatpumpPV[index].expenditure) {
        return index;
      }
    }
  };

  amortizationDifference = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;

    let difference = heatpumpPV[0].expenditure - heatpumpPVems[0].expenditure;
    return difference;
  };

  goToView = (newValue) => {
    const { selectedTab, activeView, activeStep, setActiveView, setActiveStep, steps, setSteps, setFwdBtn, setMenuBackdrop, setDirectLink } = this.context;
    setDirectLink(true);
    setActiveView(newValue);
  };

  render() {
    const { t } = this.props;
    const { costOverTime, electricityCostPVsavings, electricityCostPVEMSsavings, offgridEMS, noEMSPercentageOffGrid, householdNoEMSpvPercent, infoBoxOffGridGridUsage, infoBoxHouseholdGridFeed, infoBoxCombinedHouseholdUsage, BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

    return (
      <Box component="span" class="infobox-container" style={{ fontSize: "16px", fontWeight: "400", boxShadow: "none", marginLeft: "0px", /*maxWidth: '500px',*/ padding: "16px" }}>
        <div>
          {this.state.boxType === "left" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", borderBottom: "none" }}>
                  Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{parseInt(electricityCostPVsavings).toLocaleString("de-DE")} € Stromkosten</strong>
                  {costOverTime == "1" && <span>&nbsp;pro Jahr sparen.</span>}
                  {costOverTime == "20" && <span>&nbsp;über 20 Jahre sparen.</span>}
                  <br />
                  <br />
                  Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{parseInt(electricityCostPVEMSsavings).toLocaleString("de-DE")} € Stromkosten</strong>
                  {costOverTime == "1" && <span>&nbsp;pro Jahr sparen.</span>}
                  {costOverTime == "20" && <span>&nbsp;über 20 Jahre sparen.</span>}
                  <br />
                  <br />
                  Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{parseInt(electricityCostPVEMSsavings - electricityCostPVsavings).toLocaleString("de-DE")} €</strong> {costOverTime == "1" && <span>&nbsp;pro Jahr.</span>}
                  {costOverTime == "20" && <span>&nbsp;über 20 Jahre.</span>}
                  {/* über 20 Jahre. */}
                  {/* {costOverTime == "20" && (
                    
                  )} */}
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "right" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", borderBottom: "none" }}>
                  Die Investition in eine <b>PV-Anlage</b> hat sich nach ca. <strong>{this.breakEvenPV()} Jahren</strong> amortisiert.
                  <br />
                  <br />
                  Die Investition in eine <strong>PV-Anlage</strong> hat sich durch den Einsatz eines <strong>Energiemanagementsystems</strong> nach ca. <strong>{this.breakEvenPVems()} Jahren</strong> amortisiert.
                  <br />
                  <br />
                  Die zusätzlichen Kosten für ein <strong>Energiemanagementsystem</strong> von <strong>{this.amortizationDifference().toLocaleString("de-DE")} € *</strong> haben sich bereits nach ca. <strong>{this.breakEvenPoint()} Jahren</strong> bezahlt gemacht.
                  <br />
                  <br />
                  <small>* Bei Einsatz Fronius / Sungrow (ab Ende Q1/24) Wechselrichter</small>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "electricity-use" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>
                    Stromverbrauch gesamt: {parseFloat(this.energyUsageCombined().toLocaleString("de-DE"))} kWh
                    <IconButton
                      id="editBtn"
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        this.goToView(3);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </h3>
                  Der errechnete Stromverbrauch aufgeteilt auf die großen Verbraucher, Wärmepumpe, E-Auto und Haushalt.
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "off-grid" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {Math.round(this.pvUsagePercentage().toFixed(2))}%</h3>
                  Das bedeutet: bis zu <strong>{Math.round(this.pvUsagePercentage().toFixed(2))}%</strong> Ihres Gesamtstrom-verbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                  <br />
                  <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca.&nbsp;
                  {offgridEMS == false && <strong>{Math.round(this.pvUsagePercentage().toFixed(2))}%</strong>}
                  {offgridEMS == true && <strong>{Math.round(parseFloat(noEMSPercentageOffGrid).toFixed(2))}%.</strong>}
                  <br />
                  Ca.&nbsp;
                  {offgridEMS == false && <strong>{Math.round(parseFloat(this.gridUsagePercentage()).toFixed(2))}%</strong>}
                  {offgridEMS == true && <strong>{Math.round(parseFloat(this.gridUsagePercentage()).toFixed(2))}%</strong>}
                  &nbsp;Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "household-use" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {Math.round(parseFloat(infoBoxCombinedHouseholdUsage).toFixed(2))}%</h3>
                  Das bedeutet: bis zu <strong>{Math.round(parseFloat(householdNoEMSpvPercent).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                  <br />
                  <strong>Mit Energiemanagementsystem</strong> lässt sich der <strong>Eigenverbrauchsanteil</strong> auf bis zu <strong>{Math.round(parseFloat(infoBoxCombinedHouseholdUsage).toFixed(2))}%</strong> erhöhen.
                  <br />
                  Ca.&nbsp;
                  {offgridEMS == false && <strong>{Math.round(parseFloat(100 - parseFloat(householdNoEMSpvPercent)).toFixed(2))}%</strong>}
                  {offgridEMS == true && <strong>{Math.round(parseFloat(infoBoxHouseholdGridFeed).toFixed(2))}%</strong>}
                  &nbsp;Ihres eigens produzierten PV-Stroms speisen Sie in Sie ins <strong>öffentliche Stromnetz</strong> ein.
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    );
  }
}

export default withRouter(withTranslation()(InfoBoxResult));
