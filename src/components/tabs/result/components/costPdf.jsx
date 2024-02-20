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

class CostPdf extends React.Component {
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
  }

  static contextType = AppContext;

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  getBarHeights = (total, cost, savings) => {
    var heights = [];
    heights["cost"] = (cost * 212) / total;
    heights["savings"] = (savings * 212) / total;

    return heights;
  };

  divideValuesForChart = (step, value) => {
    return parseInt((value / 5) * step).toLocaleString("de-DE");
  };

  render() {
    const { t } = this.props;
    const { overlayToggle } = this.state;
    // const { electricityCostPVsavings, electricityCostPVEMSsavings, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

    var OHNE_PV_cost1year = sessionStorage.getItem("OHNE_PV_cost1year");
    var OHNE_PV_cost20years = sessionStorage.getItem("OHNE_PV_cost20years");

    var costOnlyPV1year = sessionStorage.getItem("costOnlyPV1year");
    var costOnlyPV20years = sessionStorage.getItem("costOnlyPV20years");

    var costPVandEMS1year = sessionStorage.getItem("costPVandEMS1year");
    var costPVandEMS20years = sessionStorage.getItem("costPVandEMS20years");

    var savingOnlyPV1year = sessionStorage.getItem("savingOnlyPV1year");
    var savingOnlyPV20years = sessionStorage.getItem("savingOnlyPV20years");

    var savingPVandEMS1year = sessionStorage.getItem("savingPVandEMS1year");
    var savingPVandEMS20years = sessionStorage.getItem("savingPVandEMS20years");

    // 1 year bar heights
    var oneYearHeightMitPv = this.getBarHeights(OHNE_PV_cost1year, costOnlyPV1year, savingOnlyPV1year);
    var oneYearHeightMitPvAndEMS = this.getBarHeights(OHNE_PV_cost1year, costPVandEMS1year, savingPVandEMS1year);

    // 20 years bar heights
    var twentyYearsHeightMitPv = this.getBarHeights(OHNE_PV_cost20years, costOnlyPV20years, savingOnlyPV20years);
    var twentyYearsHeightMitPvAndEms = this.getBarHeights(OHNE_PV_cost20years, costPVandEMS20years, savingPVandEMS20years);

    return (
      <div>
        <div class="flexRow" style={{ marginBottom: "30px" }}>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="1" class="card-input-element" checked={this.state.displayed === "one-year"} />}
              {this.state.displayed === "one-year" && <input type="radio" name="single-year" id="single-year" value="1" class="card-input-element" checked="true" />}
              <div class="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div class="panel-body">Gesamtkosten pro Jahr</div>
              </div>
            </label>
          </div>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="20" class="card-input-element" checked={this.state.displayed === "twenty-years"} />}
              {this.state.displayed === "twenty-years" && <input type="radio" name="multi-year" id="multi-year" value="20" class="card-input-element" checked="true" />}
              <div class="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div class="panel-body trackeable" data-event="gesamtkosten-strom-20-years">
                  Gesamtkosten über 20 Jahre
                </div>
              </div>
            </label>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "220px" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "17%", zIndex: "99999" }}>
            {/* ohne PV */}
            <div style={{ display: "flex", width: "73px", height: `212px`, background: "#007BC0", color: "white", marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                {this.state.displayed == "one-year" && OHNE_PV_cost1year.toLocaleString("de-DE")}
                {this.state.displayed == "one-year" && <span>&nbsp;€</span>}
                {(this.state.displayed == "twenty-years") == "20" && OHNE_PV_cost20years.toLocaleString("de-DE")}
                {(this.state.displayed == "twenty-years") == "20" && <span>&nbsp;€</span>}
              </div>
            </div>

            {/* Mit PV Price */}
            <div style={{ width: "73px", color: "white", marginLeft: "10%", zIndex: "99999", marginTop: "auto" }}>
              {/* Pattern bar 1 year */}
              {this.state.displayed == "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingOnlyPV1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {this.state.displayed == "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingOnlyPV20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {this.state.displayed == "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costOnlyPV1year.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {this.state.displayed == "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costOnlyPV20years.toLocaleString("de-DE")}
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
              {this.state.displayed == "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingPVandEMS1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {this.state.displayed == "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {savingPVandEMS20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {this.state.displayed == "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
                        {costPVandEMS1year.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {this.state.displayed == "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} class={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#007BC0", padding: "3px", fontFamily: "Bosch-Bold" }}>
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
                  {this.state.displayed == "one-year" && this.divideValuesForChart(5, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-years" && this.divideValuesForChart(5, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {this.state.displayed == "one-year" && this.divideValuesForChart(4, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-years" && this.divideValuesForChart(4, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {this.state.displayed == "one-year" && this.divideValuesForChart(3, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-years" && this.divideValuesForChart(3, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {this.state.displayed == "one-year" && this.divideValuesForChart(2, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-years" && this.divideValuesForChart(2, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {this.state.displayed == "one-year" && this.divideValuesForChart(1, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-years" && this.divideValuesForChart(1, OHNE_PV_cost20years) + " €"}
                </div>
                <div>
                  {this.state.displayed == "one-year" && this.divideValuesForChart(0, OHNE_PV_cost1year) + " €"}
                  {this.state.displayed == "twenty-year" && this.divideValuesForChart(0, OHNE_PV_cost20years) + " €"}
                </div>
              </div>
              <div data-html2canvas-ignore class="cost-chart-width" style={{ display: "flex", flexDirection: "column", marginLeft: "3px" }}>
                <div class="cost-chart-width" style={{ marginTop: "7px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                {/* <div class="cost-chart-width" style={{ marginTop: '18px', height: '1px', width: '450px', borderBottom: '1px solid #000' }}></div> */}
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div class="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: "25px", fontFamily: "Bosch-Regular", fontSize: "12px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "15px" }}>
                  <div style={{ marginTop: "2px", width: "12px", height: "12px", background: "#007BC0", borderRadius: "12px" }}></div>
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
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(CostPdf));
