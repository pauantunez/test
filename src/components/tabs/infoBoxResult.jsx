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
      MIT_GridUsagePercentage: 0
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.breakEvenPoint();
    
    const MIT_GridUsagePercentage = sessionStorage.getItem("MIT_GridUsagePercentage")
    this.setState({ MIT_GridUsagePercentage })
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

    //Energy usage heating rod
    var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);

    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
  };

  pvUsagePercentage = (type) => {
    const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var pvUsagePercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;

    return pvUsagePercent;
  };

  gridUsagePercentage = (type) => {
    const { infoBoxOffGridGridUsage, setInfoBoxOffGridGridUsage, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;

    return gridUsagePercent;
  };

  findClosestPositionTo0 = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;
    let closestPosition = 0;
    let closestValue = Math.abs(heatpumpPV[0].expenditure);
    for (let i = 1; i < heatpumpPV.length; i++) {
      const actualValue = Math.abs(heatpumpPV[i].expenditure);

      if (actualValue < closestValue) {
        closestValue = actualValue;
        closestPosition = i;
      }
    }

    return closestPosition;
  };

  breakEvenPV = () => {
    const { heatpumpPV, heatpumpPVems } = this.context;
    let closestPosition = 0;
    let closestValue = Math.abs(heatpumpPV[0].expenditure);
    for (let i = 1; i < heatpumpPV.length; i++) {
      const actualValue = Math.abs(heatpumpPV[i].expenditure);

      if (actualValue < closestValue) {
        closestValue = actualValue;
        closestPosition = i;
      }
    }
    return closestPosition;
  };

  breakEvenPVems = () => {
    /* const { heatpumpPV, heatpumpPVems } = this.context;
    let yearBreakEven = heatpumpPVems.findIndex((n) => n.expenditure > 0);

    return yearBreakEven; */
    const { heatpumpPV, heatpumpPVems } = this.context;
    let closestPosition = 0;
    let closestValue = Math.abs(heatpumpPVems[0].expenditure);
    for (let i = 1; i < heatpumpPVems.length; i++) {
      const actualValue = Math.abs(heatpumpPVems[i].expenditure);

      if (actualValue < closestValue) {
        closestValue = actualValue;
        closestPosition = i;
      }
    }

    return closestPosition;
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

    // Mit
    var mitGridUsagePercentage = parseInt(sessionStorage.getItem("MIT_GridUsagePercentage"))
    var mitNoEMSPercentage = parseInt(sessionStorage.getItem("MIT_NoEMSPercentageOffGrid"))
    var mitPvUsagePercentage = parseInt(sessionStorage.getItem("MIT_PvUsagePercentage"))
    var autarkiegradWithEMS = mitNoEMSPercentage + mitPvUsagePercentage

    // Ohne
    var ohneGridUsagePercentage = parseInt(sessionStorage.getItem("OHNE_GridUsagePercentage"))
    var ohnePvUsagePercentage = parseInt(sessionStorage.getItem("OHNE_PvUsagePercentage"))

    // Bar graph
    var OHNE_PV_cost1year = parseInt(sessionStorage.getItem("OHNE_PV_cost1year"))
    var OHNE_PV_cost20years = parseInt(sessionStorage.getItem("OHNE_PV_cost20years"))

    var costOnlyPV = parseInt(sessionStorage.getItem("costOnlyPV"))

    var costPVandEMS1year = parseInt(sessionStorage.getItem("costPVandEMS1year"))
    var costPVandEMS20years = parseInt(sessionStorage.getItem("costPVandEMS20years"))

    var savingOnlyPV1year = parseInt(sessionStorage.getItem("savingOnlyPV1year"))
    var savingOnlyPV20years = parseInt(sessionStorage.getItem("savingOnlyPV20years"))

    var savingPVandEMS1year = parseInt(sessionStorage.getItem("savingPVandEMS1year"))
    var savingPVandEMS20years = parseInt(sessionStorage.getItem("savingPVandEMS20years"))

    var savingOnlyPv1yearMinusSavingEMS1year = savingPVandEMS1year - savingOnlyPV1year
    var savingOnlyPv20yearsMinusSavingEMS20years = savingPVandEMS20years - savingOnlyPV20years

    return (
      <Box component="span" class="infobox-container" style={{ fontSize: "16px", fontWeight: "400", boxShadow: "none", marginLeft: "0px", /*maxWidth: '500px',*/ padding: "16px" }}>
        <div>
          {this.state.boxType === "left" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", borderBottom: "none" }}>

                  {costOverTime == "1" && (
                    <p>Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV1year.toLocaleString("de-DE")} € Stromkosten </strong>pro Jahr sparen.</p>
                  )}
                  {costOverTime == "1" && (
                    <p>Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS1year.toLocaleString("de-DE")} € Stromkosten</strong> pro Jahr sparen.</p>
                  )}
                  {costOverTime == "1" && (
                    <p>Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv1yearMinusSavingEMS1year.toLocaleString("de-DE")} €</strong> pro Jahr.</p>
                  )}

                  {costOverTime == "20" && (
                    <p>Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen.</p>
                  )}
                  {costOverTime == "20" && (
                    <p>Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen</p>
                  )}
                  {costOverTime == "20" && (
                    <p>Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv20yearsMinusSavingEMS20years.toLocaleString("de-DE")} €</strong> über 20 Jahre.</p>
                  )}
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
                  Die zusätzlichen Kosten für ein <strong>Energiemanagementsystem</strong> von <strong>400 € *</strong> haben sich bereits nach ca. <strong>{this.breakEvenPoint()} Jahren</strong> bezahlt gemacht.
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

                  {offgridEMS == true && (
                    <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {autarkiegradWithEMS}%</h3>
                  )}
                  {offgridEMS == false && (
                    <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {ohnePvUsagePercentage}%</h3>
                  )}

                  {offgridEMS == true && (
                    <p>
                      Das bedeutet: bis zu <strong>{autarkiegradWithEMS}%</strong> Ihres Gesamtstrom-verbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                    </p>
                  )}
                  {offgridEMS == false && (
                    <p>
                      Das bedeutet: bis zu <strong>{ohnePvUsagePercentage}%</strong> Ihres Gesamtstrom-verbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                    </p>
                  )}
                  
                  {offgridEMS == true && (
                    <p>
                      <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>{mitNoEMSPercentage}%</strong>.{" "}
                    </p>
                  )}
                  {offgridEMS == false && (
                    <p>
                      <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Autarkiegrad</strong> auf bis zu <strong>{autarkiegradWithEMS}%</strong> erhöhen.{" "}
                    </p>
                  )}

                  <p>
                    Ca.&nbsp;
                    {offgridEMS == false && <strong>{ohneGridUsagePercentage}%</strong>}
                    {offgridEMS == true && <strong>{mitGridUsagePercentage}%</strong>}
                    &nbsp;Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "household-use" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {Math.round(parseFloat(infoBoxCombinedHouseholdUsage).toFixed(2))}%</h3>
                  <p>
                    Das bedeutet: bis zu <strong>{Math.round(parseFloat(infoBoxCombinedHouseholdUsage).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                  </p>
                  {offgridEMS == true && (
                    <p>
                      <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>{Math.round(parseFloat(householdNoEMSpvPercent).toFixed(2))}%</strong>.{" "}
                    </p>
                  )}
                  {offgridEMS == false && (
                    <p>
                      <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Autarkiegrad</strong> auf bis zu <strong>{Math.round(this.pvUsagePercentage().toFixed(2))}%</strong> erhöhen.{" "}
                    </p>
                  )}
                  <p>
                    Ca.&nbsp;
                    {offgridEMS == false && <strong>{Math.round(parseFloat(100 - parseFloat(householdNoEMSpvPercent)).toFixed(2))}%</strong>}
                    {offgridEMS == true && <strong>{Math.round(parseFloat(infoBoxHouseholdGridFeed).toFixed(2))}%</strong>}
                    &nbsp;Ihres eigens produzierten PV-Stroms speisen Sie ins <strong>öffentliche Stromnetz</strong>.
                  </p>
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
