import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import { Button } from "reactstrap";
import axios from "axios";

import { withTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";

import { Doughnut, Line, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import pattern from "patternomaly";
import { ReactComponent as LightningIcon } from "../../../../assets/img/icons/lightning_chart.svg";
import { ReactComponent as PVIcon } from "../../../../assets/img/icons/photovoltaic_chart.svg";
import { ReactComponent as ElectricityIcon } from "../../../../assets/img/icons/electricity_sun_chart.svg";

import { ReactComponent as BuderusLightningIcon } from "../../../../assets/img/icons/buderus/lightning_chart.svg";
import { ReactComponent as BuderusPVIcon } from "../../../../assets/img/icons/buderus/photovoltaic_chart.svg";
import { ReactComponent as BuderusElectricityIcon } from "../../../../assets/img/icons/buderus/electricity_sun_chart.svg";

import PatternImg from "../../../../assets/img/icons/pattern.svg";
import PatternRoundImg from "../../../../assets/img/icons/pattern_small_round.svg";

import { BrowserView, MobileView, isBrowser, isMobile, isSafari } from "react-device-detect";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      // beginAtZero: true,
    },
  },
};

const labels = ["ohne PV", "mit PV", "mit PV und Energiemanagement"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 70, 180, 200, 144],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

export const barOptions = {
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked",
    },
    legend: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        //option 2, use callback to change labels to empty string
        callback: () => "",
      },
    },
    y: {
      stacked: true,
      // beginAtZero: true,
      ticks: {
        stepSize: 500,
        callback: function (value, index, ticks) {
          return value + " €";
        },
      },
    },
  },
};

export const barData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [2800, 1575, 1400],
      backgroundColor: "#007BC0",
      barThickness: 60,
    },
    {
      label: "Dataset 2",
      data: [0, 1225, 1400],
      backgroundColor: pattern.draw("diagonal-right-left", "#FFF", "#18837E"),
      barThickness: 60,
    },
  ],
};

class Cost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      displayed: props.displayed,
      electricityCostPVEMSsavings: 0,
      electricityCostPVsavings: 0,
      heatpumpPVems: [],
      runningCostPVonly: [],
      runningCostPVems: [],
      totalRunningCostPVonly: 0,
      totalRunningCostPVems: 0,
      ranOnce: false,
      ranceOnceEMS: false,
    };

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext;

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    this.runningCostPVonly();
  }

  componentDidUpdate() {
    this.resultWithPV();
    this.resultWithPVandEMS();
  }

  inputPower_kW_PV_MFH = (event) => {
    const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH } = this.context;

    setPower_kW_PV_MFH(event.target.value);
  };

  inputTCO_thermal_EUR_a = (event) => {
    const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value);
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  energyUseEuro = (divided, bar) => {
    const { energyUsagekWh, electricityCost, costOverTime } = this.context;

    var timeToNum;
    if (this.state.displayed == undefined) {
      timeToNum = parseInt(costOverTime);
    } else {
      if (this.state.displayed == "single") {
        timeToNum = 1;
      } else {
        timeToNum = 20;
      }
    }

    if (!bar) {
      if (costOverTime === "1") {
        // return '- ' + Math.round(energyUsagekWh * (electricityCost / 100) / 5 * divided * timeToNum).toLocaleString("de-DE") + ' €';
        return Math.round(((energyUsagekWh * (electricityCost / 100)) / 5) * divided * timeToNum).toLocaleString("de-DE") + " €";
      } else {
        // return '- ' + parseInt(this.electricityCostNoPV20Years() / 5 * divided).toLocaleString("de-DE") + ' €'
        return parseInt((this.electricityCostNoPV20Years() / 5) * divided).toLocaleString("de-DE") + " €";
      }
    } else {
      return Math.round(((energyUsagekWh * (electricityCost / 100)) / 5) * divided * timeToNum);
    }
  };

  energyUseEuroNegative = (multiplier, result) => {
    const { energyUsagekWh, electricityCost, costOverTime } = this.context;
    var timeToNum;

    if (this.state.displayed == undefined) {
      timeToNum = parseInt(costOverTime);
    } else {
      if (this.state.displayed == "single") {
        timeToNum = 1;
      } else {
        timeToNum = 20;
      }
    }

    return "+ " + parseInt((result / 5) * multiplier).toLocaleString("de-DE") + " €";
  };

  electricityCostPV = () => {
    const { pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;

    if (pvOutput == 0) {
      var pvOutputKW = 4;
    } else if (pvOutput == 1) {
      var pvOutputKW = 7;
    } else if (pvOutput == 2) {
      var pvOutputKW = 10;
    } else if (pvOutput == 3) {
      var pvOutputKW = 14;
    }

    return (parseInt(pvOutputKW) * 1000 * (1 - parseFloat(electricityCostOffGridPercentage) / 10000) * (parseFloat(electricityCost) / 100)).toFixed(0);
  };

  electricityCostPVEMS = () => {
    const { setElectricityCostPVEMSsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;

    if (pvOutput == 0) {
      var pvOutputKW = 4;
    } else if (pvOutput == 1) {
      var pvOutputKW = 7;
    } else if (pvOutput == 2) {
      var pvOutputKW = 10;
    } else if (pvOutput == 3) {
      var pvOutputKW = 14;
    }

    const result = ((parseInt(pvOutputKW) * 1000 * (1 - parseFloat(electricityCostOffGridPercentage / 10000) - parseFloat(gridRevenue.replace(",", ".")) / 100) * parseFloat(electricityCost)) / 100).toFixed(0);

    return result;
  };

  electricityCostNoPV20Years = () => {
    const { energyUsagekWh, electricityCost } = this.context;

    const result = Math.abs((energyUsagekWh * (parseFloat(electricityCost) / 100) * (1 - (0.02 + 1) ** 20)) / 0.02);

    return result;
  };

  electricityCostPV20Years = () => {
    const { costOverTime, PVcostLookupTable, investmentCostEUR, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
    var investmentCostResult;

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
    let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);

    if (homeStorageSize === "none") {
      investmentCostResult = PVcostInTable.cost;
    } else {
      investmentCostResult = PVcostInTable.cost + StorageCostInTable.cost;
    }

    if (investmentCostEUR > 0) {
      investmentCostResult = Math.abs(parseInt(investmentCostEUR) * -1);
    }

    if (costOverTime == "1") {
      const result = Math.abs(Math.round((1 - electricityCostOffGridPercentage / 100) * energyUsagekWh * (parseFloat(electricityCost) / 100)));
      return Math.abs(result);
    } else {
      const result = Math.abs(((1 - electricityCostOffGridPercentage / 100) * energyUsagekWh * ((parseFloat(electricityCost) / 100) * (1 + 0.02)) * (1 - (0.02 + 1) ** 20)) / 0.02);
      // return Math.abs(result + investmentCostResult);
      return Math.abs(result);
    }
  };

  runningCostPVonly = () => {
    const { PVcostLookupTable, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
    var totalRunning = 0;

    if (!this.state.ranOnce) {
      for (let index = 0; index < 20; index++) {
        if (this.state.runningCostPVonly.length == 0) {
          this.state.runningCostPVonly.push({ expenditure: -Math.abs((1 - electricityCostOffGridPercentage / 100) * 4000 * ((electricityCost / 100) * (1 + 0.02))) });
        } else {
          this.state.runningCostPVonly.push({ expenditure: parseFloat(this.state.runningCostPVonly[index - 1].expenditure) * (1 + 0.02) });
        }
      }

      for (var i = 0; i < this.state.runningCostPVonly.length; i++) {
        totalRunning += this.state.runningCostPVonly[i].expenditure;
      }

      this.setState({ totalRunningCostPVonly: totalRunning });
      this.setState({ ranOnce: true });

      this.runningCostPVems();
    }
  };

  runningCostPVems = () => {
    const { heatpumpPV, PVcostLookupTable, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
    var totalRunning = 0;

    if (!this.state.ranOnceEMS) {
      for (let index = 0; index < 20; index++) {
        if (this.state.runningCostPVems.length == 0) {
          this.state.runningCostPVems.push({ expenditure: Math.abs(heatpumpPV[0].runningCost + (1 - (electricityCostOffGridPercentage + 10) / 100) * 4000 * ((electricityCost / 100) * (1 + 0.02))) });
        } else {
          this.state.runningCostPVems.push({ expenditure: parseFloat(this.state.runningCostPVems[index - 1].expenditure) * (1 + 0.02) });
        }
      }

      for (var i = 0; i < this.state.runningCostPVems.length; i++) {
        totalRunning += this.state.runningCostPVems[i].expenditure;
      }

      this.setState({ totalRunningCostPVems: totalRunning });
      this.setState({ ranOnceEMS: true });
    }

    return -Math.abs((1 - electricityCostOffGridPercentage / 100) * 4000 * ((electricityCost / 100) * (1 + 0.02)));
  };

  runningCostPVemsDisplay = () => {
    return 8888;
  };

  inputCostOverTime = (event) => {
    const { costOverTime, setCostOverTime, setFwdBtn, steps, setSteps, activeView } = this.context;
    setCostOverTime(event.target.value);
  };

  getBarHeights = (total, cost, savings) => {
    var heights = [];
    heights["cost"] = (cost * 212) / total;
    heights["savings"] = (savings * 212) / total;

    return heights;
  };

  resultWithPV = () => {
    const { costOverTime, setElectricityCostPVsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;
    var result;

    if (costOverTime === "1") {
      result = this.electricityCostPV() - this.energyUseEuro(5, true);
    } else {
      result = parseInt(parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVonly);
    }

    if (this.state.electricityCostPVsavings != result) {
      this.setState({ electricityCostPVsavings: result });
      setElectricityCostPVsavings(result);
    }

    return result;
  };

  resultWithPVandEMS = () => {
    const { costOverTime, setElectricityCostPVEMSsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;
    var result;

    if (costOverTime === "1") {
      result = this.electricityCostPVEMS() - this.energyUseEuro(5, true);
    } else {
      result = parseInt(parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVems);
    }

    if (this.state.electricityCostPVEMSsavings != result) {
      this.setState({ electricityCostPVEMSsavings: result });
      setElectricityCostPVEMSsavings(result);
    }

    return result;
  };

  whichChartLegend = () => {
    const { costOverTime, electricityCostPVsavings, electricityCostPVEMSsavings } = this.context;

    if (costOverTime === "1") {
      return electricityCostPVsavings;
    } else {
      return electricityCostPVEMSsavings;
    }
  };

  getHighestValue = (value1, value2, value3) => {
    if (value1 >= value2 && value1 >= value3) {
      return value1;
    } else if (value2 >= value1 && value2 >= value3) {
      return value2;
    } else {
      return value3;
    }
  };

  divideValuesForChart = (step, value) => {
    return parseInt((value / 5) * step).toLocaleString("de-DE");
  };

  render() {
    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { electricityCostPVsavings, electricityCostPVEMSsavings, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

    // Ohne PV
    var OHNE_PV_cost1year = Math.abs(parseInt(this.energyUseEuro(5).replace(".", "").replace(",", "")));
    var OHNE_PV_cost20years = Math.abs(parseInt(this.electricityCostNoPV20Years()));

    sessionStorage.setItem("OHNE_PV_cost1year", OHNE_PV_cost1year);
    sessionStorage.setItem("OHNE_PV_cost20years", OHNE_PV_cost20years);

    // Mit PV
    var costOnlyPV = parseInt(this.electricityCostPV20Years());
    sessionStorage.setItem("costOnlyPV", costOnlyPV);

    var savingOnlyPV1year = OHNE_PV_cost1year - costOnlyPV;
    var savingOnlyPV20years = OHNE_PV_cost20years - costOnlyPV;

    sessionStorage.setItem("savingOnlyPV1year", savingOnlyPV1year);
    sessionStorage.setItem("savingOnlyPV20years", savingOnlyPV20years);

    // Mit PV und EMS
    var costPVandEMS1year = parseInt(Math.abs(costOnlyPV * 0.95));
    var costPVandEMS20years = parseInt(Math.abs(costOnlyPV * 0.8));

    sessionStorage.setItem("costPVandEMS1year", costPVandEMS1year);
    sessionStorage.setItem("costPVandEMS20years", costPVandEMS20years);

    var savingPVandEMS1year = OHNE_PV_cost1year - costPVandEMS1year;
    var savingPVandEMS20years = OHNE_PV_cost20years - costPVandEMS20years;

    sessionStorage.setItem("savingPVandEMS1year", savingPVandEMS1year);
    sessionStorage.setItem("savingPVandEMS20years", savingPVandEMS20years);

    // 1 year bar heights
    var oneYearHeightMitPv = this.getBarHeights(OHNE_PV_cost1year, costOnlyPV, savingOnlyPV1year);
    var oneYearHeightMitPvAndEMS = this.getBarHeights(OHNE_PV_cost1year, costPVandEMS1year, savingPVandEMS1year);

    // 20 years bar heights
    var twentyYearsHeightMitPv = this.getBarHeights(OHNE_PV_cost20years, costOnlyPV, savingOnlyPV20years);
    var twentyYearsHeightMitPvAndEms = this.getBarHeights(OHNE_PV_cost20years, costPVandEMS20years, savingPVandEMS20years);

    console.log("twentyYearsHeightMitPvAndEms ", twentyYearsHeightMitPvAndEms);

    // Bar heights
    // var barHeights1year = this.adjustBarHeight(costOverTime, 212, OHNE_PV_cost1year, Math.abs(electricityCostPVsavings), Math.abs(electricityCostPVEMSsavings));
    // var barHeights20years = this.adjustBarHeight(costOverTime, 212, OHNE_PV_cost20years, Math.abs(electricityCostPVsavings), Math.abs(electricityCostPVEMSsavings));
    // var selectedBarHeights = costOverTime == "1" ? barHeights1year : barHeights20years;

    return (
      <div>
        <div class="flexRow" style={{ marginBottom: "30px" }}>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="1" class={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked={costOverTime === "1"} onChange={this.inputCostOverTime} />}
              {this.state.displayed === "single" && <input type="radio" name="single-year" id="single-year" value="1" class={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked="true" />}
              <div class="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div class="panel-body">Gesamtkosten pro Jahr</div>
              </div>
            </label>
          </div>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="20" class={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked={costOverTime === "20"} onChange={this.inputCostOverTime} />}
              {this.state.displayed === "multi" && <input type="radio" name="multi-year" id="multi-year" value="20" class={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked="true" />}
              <div class="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div class="panel-body">Gesamtkosten über 20 Jahre</div>
              </div>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "220px" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "17%", zIndex: "99999" }}>
            {/* ohne PV */}
            <div style={{ display: "flex", width: "73px", height: `212px`, background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                {costOverTime == "1" && OHNE_PV_cost1year.toLocaleString("de-DE")}
                {costOverTime == "1" && <span>&nbsp;€</span>}
                {costOverTime == "20" && OHNE_PV_cost20years.toLocaleString("de-DE")}
                {costOverTime == "20" && <span>&nbsp;€</span>}
              </div>
            </div>

            {/* Mit PV Price */}
            <div style={{ width: "73px", color: "white", marginLeft: "10%", zIndex: "99999", marginTop: "auto" }}>
              {/* Pattern bar 1 year */}
              {costOverTime == "1" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingOnlyPV1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {costOverTime == "20" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingOnlyPV20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {costOverTime == "1" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costOnlyPV.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {costOverTime == "20" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costOnlyPV.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mit PV und EMS */}
            <div style={{ width: "73px", color: "white", marginLeft: "10%", zIndex: "99999", marginTop: "auto" }}>
              {/* Pattern bar 1 year */}
              {costOverTime == "1" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingPVandEMS1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {costOverTime == "20" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingPVandEMS20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {costOverTime == "1" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costPVandEMS1year.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {costOverTime == "20" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costPVandEMS20years.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div class="cost-chart-width" style={{ position: "absolute", zIndex: "99998" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div class="bar-chart-left-legend">
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(5, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(5, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(4, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(4, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(3, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(3, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(2, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(2, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(1, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(1, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {costOverTime == "1" && this.divideValuesForChart(0, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(0, OHNE_PV_cost20years) + " €"}
                </div>
                {/* <div>
                  {costOverTime == "1" && this.divideValuesForChart(-1, OHNE_PV_cost1year) + " €"}
                  {costOverTime == "20" && this.divideValuesForChart(-1, OHNE_PV_cost20years) + " €"}
                </div> */}
                {/* <div>
                                { this.energyUseEuroNegative(1,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(2,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(3,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(4,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(5,this.whichChartLegend()) }
                            </div> */}
              </div>
              <div data-html2canvas-ignore class="cost-chart-width" style={{ display: "flex", flexDirection: "column", marginLeft: "3px" }}>
                <div class="cost-chart-width" style={{ marginTop: "7px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                {/* <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '450px', borderBottom: '1px solid #000'}}></div> */}
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "5px", marginLeft: "17%", zIndex: "99999" }}>
            <div style={{ display: "flex", width: "73px", height: "40px", color: "#000" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                {this.context.selectedTheme === "buderus" ? <BuderusLightningIcon /> : <LightningIcon />}
                ohne PV
              </div>
            </div>
            <div style={{ display: "flex", width: "73px", height: "40px", color: "#000", marginLeft: "10%" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                {this.context.selectedTheme === "buderus" ? <BuderusPVIcon /> : <PVIcon />}
                mit PV
              </div>
            </div>
            <div style={{ display: "flex", width: "73px", height: "40px", color: "#000", marginLeft: "10%" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  {this.context.selectedTheme === "buderus" ? <BuderusPVIcon /> : <PVIcon />}
                  <div style={{ display: "block", margin: "0 2px -2px 2px" }}>+</div>
                  {this.context.selectedTheme === "buderus" ? <BuderusElectricityIcon /> : <ElectricityIcon />}
                </div>
                mit PV und EMS
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "25px", fontFamily: "Bosch-Regular", fontSize: "12px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", borderRadius: "12px" }}></div>
            </div>
            <div>Laufende Stromkosten</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", borderRadius: "12px" }} class="pattern-round"></div>
            </div>
            <div>Ersparnis</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Cost));
