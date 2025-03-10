import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import Box from "@mui/material/Box";

import { withTranslation } from "react-i18next";

class InfoBoxResultPdf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      boxType: props.box,
      MIT_GridUsagePercentage: 0,
      displayed: props.displayed,
    };
  }

  static contextType = AppContext;

  componentDidMount() {
    this.breakEvenPoint();
    const MIT_GridUsagePercentage = sessionStorage.getItem("MIT_GridUsagePercentage");
    this.setState({ MIT_GridUsagePercentage });
  }

  energyUsageCombined = () => {
    const { heatpumpType, energyUsagekWh, odometerIncreaseKWH, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
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
    const { cost1YearNoPV, cost1yearPV, cost20YearNoPV, cost20yearPV, cost1yearPVEMS, cost20yearPVEMS } = this.context;
    // Electricity savings

    var savingOnlyPV1year = cost1YearNoPV - cost1yearPV;
    var savingOnlyPV20years = cost20YearNoPV - cost20yearPV;

    var savingPVandEMS1year = cost1YearNoPV - cost1yearPVEMS;
    var savingPVandEMS20years = cost20YearNoPV - cost20yearPVEMS;

    var savingOnlyPv1yearMinusSavingEMS1year = savingPVandEMS1year - savingOnlyPV1year;
    var savingOnlyPv20yearsMinusSavingEMS20years = savingPVandEMS20years - savingOnlyPV20years;

    return (
      <Box
        component="span"
        className="infobox-container"
        style={{
          fontSize: "16px",
          fontWeight: "400",
          boxShadow: "none",
          marginLeft: "0px",
          /*maxWidth: '500px',*/ padding: "0 16px 0 16px",
        }}
      >
        <div>
          {this.state.boxType === "left" && (
            <div>
              <div className="infobox-row-container">
                <div className="infobox-row" style={{ fontSize: "14px", display: "block", lineHeight: "24px", borderBottom: "none" }}>
                  {this.state.displayed === "one-year" && (
                    <p>
                      Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV1year.toLocaleString("de-DE")} € Stromkosten </strong>pro Jahr sparen.
                    </p>
                  )}
                  {this.state.displayed === "one-year" && (
                    <p>
                      Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS1year.toLocaleString("de-DE")} € Stromkosten</strong> pro Jahr sparen.
                    </p>
                  )}
                  {this.state.displayed === "one-year" && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv1yearMinusSavingEMS1year.toLocaleString("de-DE")} €</strong> pro Jahr.
                    </p>
                  )}

                  {this.state.displayed === "twenty-years" && (
                    <p>
                      Mit einer <strong>PV-Anlage</strong> lassen sich bis zu <strong>{savingOnlyPV20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen.
                    </p>
                  )}
                  {this.state.displayed === "twenty-years" && (
                    <p>
                      Mit einer <strong>PV-Anlage und einem Energiemanagementsystem</strong> lassen sich bis zu <strong>{savingPVandEMS20years.toLocaleString("de-DE")} € Stromkosten</strong> über 20 Jahre sparen.
                    </p>
                  )}
                  {this.state.displayed === "twenty-years" && (
                    <p>
                      Das <strong>Energiemanagementsystem</strong> bringt eine zusätzliche Kostenersparnis um bis zu <strong>{savingOnlyPv20yearsMinusSavingEMS20years.toLocaleString("de-DE")} €</strong> über 20 Jahre.
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
        </div>
      </Box>
    );
  }
}

export default withRouter(withTranslation()(InfoBoxResultPdf));
