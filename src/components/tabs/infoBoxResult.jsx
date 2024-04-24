import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import Box from "@mui/material/Box";

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
      MIT_GridUsagePercentage: 0,
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.breakEvenPoint();
    const MIT_GridUsagePercentage = sessionStorage.getItem("MIT_GridUsagePercentage");
    this.setState({ MIT_GridUsagePercentage });
  }

  energyUsageCombined = () => {
    const { heatpumpType, energyUsagekWh, odometerIncreaseKWH, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH, offgridEMS, EGen_sh_kWh_HP_A_W_MFH_NoEMS, EGen_sh_kWh_HP_B_W_MFH_NoEMS, EGen_hw_kWh_HP_A_W_MFH_NoEMS, EGen_hw_kWh_HP_B_W_MFH_NoEMS, EGen_sh_kWh_EDWW_MFH_NoEMS, EGen_sh_kWh_EDWW_MFH_Brine_NoEMS, EGen_hw_kWh_EDWW_MFH_NoEMS, EGen_hw_kWh_EDWW_MFH_Brine_NoEMS, Avg_Eff_JAZ_HP_A_W_MFH_NoEMS, Avg_Eff_JAZ_HP_B_W_MFH_NoEMS } = this.context;

    var Avg_Eff_JAZ_HP;
    let energyUsageHeatingRod;
    let energyUsageHeatpump;
    if (offgridEMS === true) {
      if (heatpumpType === "1") {
        Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH;
      } else {
        Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH;
      }
      //Enegery usage heatpump
      energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);

      //Energy usage heating rod
      energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);
    } else {
      if (heatpumpType === "1") {
        Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH_NoEMS;
      } else {
        Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH_NoEMS;
      }
      energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH_NoEMS) + parseFloat(EGen_sh_kWh_HP_B_W_MFH_NoEMS) + parseFloat(EGen_hw_kWh_HP_A_W_MFH_NoEMS) + parseFloat(EGen_hw_kWh_HP_B_W_MFH_NoEMS)) / parseFloat(Avg_Eff_JAZ_HP);

      //Energy usage heating rod
      energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH_NoEMS) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine_NoEMS) + parseFloat(EGen_hw_kWh_EDWW_MFH_NoEMS) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine_NoEMS)) / parseFloat(0.99);
    }
    /* console.log("🚀 ~ InfoBoxResult ~ ", energyUsageHeatpump, energyUsageHeatingRod, parseInt(energyUsagekWh), odometerIncreaseKWH); */
    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
  };

  pvUsagePercentage = (type) => {
    const { heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = this.context;

    var pvUsagePercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;

    return pvUsagePercent;
  };

  gridUsagePercentage = (type) => {
    const { heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = this.context;

    var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;

    return gridUsagePercent;
  };

  breakEvenPV = () => {
    const { breakEvenNoEms } = this.context;
    const heatpumpPV = breakEvenNoEms;
    if (!heatpumpPV || heatpumpPV.length === 0) {
      return null;
    }
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
    const { breakEven } = this.context;
    const heatpumpPVems = breakEven;
    if (!heatpumpPVems || heatpumpPVems.length === 0) {
      return null;
    }
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
    const { breakEven, breakEvenNoEms } = this.context;
    const heatpumpPVems = breakEven;
    const heatpumpPV = breakEvenNoEms;
    if (!heatpumpPV || heatpumpPV.length === 0 || !heatpumpPVems || heatpumpPVems.length === 0) {
      return null;
    }
    for (let index = 0; index < heatpumpPV.length; index++) {
      if (heatpumpPVems[index].expenditure > heatpumpPV[index].expenditure) {
        return index;
      }
    }
  };

  goToView = (newValue) => {
    const { setActiveView, setDirectLink } = this.context;
    setDirectLink(true);
    setActiveView(newValue);
  };

  render() {
    const { costOverTime, offgridEMS, householdEMS, cost1YearNoPV, cost1yearPV, cost20YearNoPV, cost20yearPV, cost1yearPVEMS, cost20yearPVEMS, energyUsageCombined, energyUsageCombinedNoEms } = this.context;

    // Electricity savings
    var savingOnlyPV1year = cost1YearNoPV - cost1yearPV;
    var savingOnlyPV20years = cost20YearNoPV - cost20yearPV;

    var savingPVandEMS1year = cost1YearNoPV - cost1yearPVEMS;
    var savingPVandEMS20years = cost20YearNoPV - cost20yearPVEMS;

    var savingOnlyPv1yearMinusSavingEMS1year = savingPVandEMS1year - savingOnlyPV1year;
    var savingOnlyPv20yearsMinusSavingEMS20years = savingPVandEMS20years - savingOnlyPV20years;

    //OffGrid
    // Mit
    var mitGridUsagePercentage = parseInt(sessionStorage.getItem("MIT_GridUsagePercentage"));
    var mitNoEMSPercentage = parseInt(sessionStorage.getItem("MIT_NoEMSPercentageOffGrid"));
    var mitPvUsagePercentage = parseInt(sessionStorage.getItem("MIT_PvUsagePercentage"));
    var autarkiegradWithEMS = mitNoEMSPercentage + mitPvUsagePercentage;

    // Ohne
    var ohneGridUsagePercentage = parseInt(sessionStorage.getItem("OHNE_GridUsagePercentage"));
    var ohnePvUsagePercentage = parseInt(sessionStorage.getItem("OHNE_PvUsagePercentage"));

    //household-use
    // Mit
    var MIT_GridFeedPercentage = parseInt(sessionStorage.getItem("MIT_GridFeedPercentage"));
    var MIT_HouseholdUsagePercentage = parseInt(sessionStorage.getItem("MIT_HouseholdUsagePercentage"));
    var MIT_HouseholdNoEMSpvPercent = parseInt(sessionStorage.getItem("MIT_HouseholdNoEMSpvPercent"));
    var eigenverbrauchsanteil = MIT_HouseholdUsagePercentage + MIT_HouseholdNoEMSpvPercent;

    // Ohne
    var Onhe_HouseholdNoEMSpvPercent = parseInt(sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent"));
    var Onhe_GridFeedPercentageNoEMS = parseInt(sessionStorage.getItem("Onhe_GridFeedPercentageNoEMS"));

    return (
      <Box component="span" className="infobox-container" style={{ fontSize: "16px", fontWeight: "400", boxShadow: "none", marginLeft: "0px", /*maxWidth: '500px',*/ padding: "16px" }}>
        <div>
          {this.state.boxType === "left" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ fontSize: "14px", display: "block", lineHeight: "24px", borderBottom: "none" }}>
                  {costOverTime === "1" && (
                    <p>
                      Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV1year.toLocaleString("de-DE")} € Stromkosten </strong>pro Jahr sparen.
                    </p>
                  )}
                  {costOverTime === "1" && (
                    <p>
                      Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS1year.toLocaleString("de-DE")} € Stromkosten</strong> pro Jahr sparen.
                    </p>
                  )}
                  {costOverTime === "1" && parseInt(savingOnlyPv1yearMinusSavingEMS1year) > 0 && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv1yearMinusSavingEMS1year.toLocaleString("de-DE")} €</strong> pro Jahr.
                    </p>
                  )}
                  {costOverTime === "1" && parseInt(savingOnlyPv1yearMinusSavingEMS1year) < 0 && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis von +<strong>{Math.abs(savingOnlyPv1yearMinusSavingEMS1year.toLocaleString("de-DE"))} €</strong> pro Jahr.
                    </p>
                  )}

                  {costOverTime === "20" && (
                    <p>
                      Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen.
                    </p>
                  )}
                  {costOverTime === "20" && (
                    <p>
                      Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen.
                    </p>
                  )}
                  {costOverTime === "20" && parseInt(savingOnlyPv20yearsMinusSavingEMS20years) > 0 && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv20yearsMinusSavingEMS20years.toLocaleString("de-DE")} €</strong> über 20 Jahre.
                    </p>
                  )}
                  {costOverTime === "20" && parseInt(savingOnlyPv20yearsMinusSavingEMS20years) < 0 && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis von +<strong>{Math.abs(savingOnlyPv20yearsMinusSavingEMS20years.toLocaleString("de-DE"))} €</strong> über 20 Jahre.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "right" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ fontSize: "14px", display: "block", lineHeight: "24px", borderBottom: "none" }}>
                  <p>
                    Die Investition in eine <b>PV-Anlage</b> hat sich nach ca. <strong>{this.breakEvenPV()} Jahren</strong> amortisiert.
                  </p>
                  <p>
                    Die Investition in eine <strong>PV-Anlage</strong> hat sich durch den Einsatz eines <strong>Energiemanagementsystems</strong> nach ca. <strong>{this.breakEvenPVems()} Jahren</strong> amortisiert.
                  </p>
                  <p>
                    Die zusätzlichen Kosten für ein <strong>Energiemanagementsystem</strong> von <strong>400 €*</strong> haben sich bereits nach ca.{" "}
                    <strong>
                      {this.breakEvenPoint()} {this.breakEvenPoint() > 1 ? "Jahren" : "Jahr"}{" "}
                    </strong>{" "}
                    bezahlt gemacht.
                  </p>
                  <p>
                    <small>* Bei Einsatz Fronius / Sungrow Wechselrichter (ab Ende Q1/24)</small>
                  </p>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "electricity-use" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>
                    Stromverbrauch gesamt: {Math.round(offgridEMS ? energyUsageCombined : energyUsageCombinedNoEms).toLocaleString("de-DE")} kWh
                    <IconButton
                      id="editBtn"
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        this.goToView(3, true);
                      }}
                    >
                      <div className="trackeable" data-event="result-part2-change-electricity">
                        <EditIcon />
                      </div>
                    </IconButton>
                  </h3>
                  <p>Der errechnete Stromverbrauch aufgeteilt auf die großen Verbraucher Wärmepumpe, E-Auto und Haushalt.</p>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "off-grid" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  {offgridEMS === true && <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {autarkiegradWithEMS}%</h3>}
                  {offgridEMS === false && <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {ohnePvUsagePercentage}%</h3>}

                  {offgridEMS === true && (
                    <p>
                      Das bedeutet: bis zu <strong>{autarkiegradWithEMS}%</strong> Ihres Gesamtstromverbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                    </p>
                  )}
                  {offgridEMS === false && (
                    <p>
                      Das bedeutet: bis zu <strong>{ohnePvUsagePercentage}%</strong> Ihres Gesamtstromverbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                    </p>
                  )}

                  {offgridEMS === true && (
                    <p>
                      <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>{mitNoEMSPercentage}%</strong>.{" "}
                    </p>
                  )}
                  {offgridEMS === false && (
                    <p>
                      <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Autarkiegrad</strong> auf bis zu <strong>{autarkiegradWithEMS}%</strong> erhöhen.{" "}
                    </p>
                  )}

                  <p>
                    Ca.&nbsp;
                    {offgridEMS === false && <strong>{ohneGridUsagePercentage}%</strong>}
                    {offgridEMS === true && <strong>{mitGridUsagePercentage}%</strong>}
                    &nbsp;Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {this.state.boxType === "household-use" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ display: "block", lineHeight: "24px", fontSize: "14px", borderBottom: "none" }}>
                  {householdEMS === true && <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {eigenverbrauchsanteil}%</h3>}
                  {householdEMS === false && <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {Onhe_HouseholdNoEMSpvPercent}%</h3>}
                  {householdEMS === true && (
                    <p>
                      Das bedeutet: bis zu <strong>{Math.round(parseFloat(eigenverbrauchsanteil).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                    </p>
                  )}
                  {householdEMS === false && (
                    <p>
                      Das bedeutet: bis zu <strong>{Math.round(parseFloat(Onhe_HouseholdNoEMSpvPercent).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                    </p>
                  )}

                  {householdEMS === true && (
                    <p>
                      <strong>Ohne ein Energiemanagementsystem</strong> beträgt der <strong>Eigenverbrauchsanteil</strong> lediglich ca. <strong>{MIT_HouseholdNoEMSpvPercent}%</strong>.{" "}
                    </p>
                  )}
                  {householdEMS === false && (
                    <p>
                      <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Eigenverbrauchsanteil</strong> auf bis zu <strong>{eigenverbrauchsanteil}%</strong> erhöhen.{" "}
                    </p>
                  )}
                  <p>
                    Ca.&nbsp;
                    {householdEMS === false && <strong>{Onhe_GridFeedPercentageNoEMS}%</strong>}
                    {householdEMS === true && <strong>{MIT_GridFeedPercentage}%</strong>}
                    &nbsp;Ihres eigens produzierten PV-Stroms speisen Sie ins <strong>öffentliche Stromnetz</strong> ein.
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
