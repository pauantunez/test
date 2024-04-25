import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";

import { ReactComponent as LightningIcon } from "../../../../assets/img/icons/lightning_chart.svg";
import { ReactComponent as PVIcon } from "../../../../assets/img/icons/photovoltaic_chart.svg";
import { ReactComponent as ElectricityIcon } from "../../../../assets/img/icons/electricity_sun_chart.svg";

import { ReactComponent as BuderusLightningIcon } from "../../../../assets/img/icons/buderus/lightning_chart.svg";
import { ReactComponent as BuderusPVIcon } from "../../../../assets/img/icons/buderus/photovoltaic_chart.svg";
import { ReactComponent as BuderusElectricityIcon } from "../../../../assets/img/icons/buderus/electricity_sun_chart.svg";

import { isSafari } from "react-device-detect";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

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
    const { setFwdBtn } = this.context;

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
    const { loading, cost1YearNoPV, cost20YearNoPV, cost1yearPV, cost1yearPVEMS, cost20yearPV, cost20yearPVEMS } = this.context;

    const { costOverTime } = this.context;

    var savingOnlyPV1year = cost1YearNoPV - cost1yearPV;
    var savingOnlyPV20years = cost20YearNoPV - cost20yearPV;

    var savingPVandEMS1year = cost1YearNoPV - cost1yearPVEMS;
    var savingPVandEMS20years = cost20YearNoPV - cost20yearPVEMS;

    // 1 year bar heights
    var oneYearHeightMitPv = this.getBarHeights(cost1YearNoPV, cost1yearPV, savingOnlyPV1year);
    var oneYearHeightMitPvAndEMS = this.getBarHeights(cost1YearNoPV, cost1yearPVEMS, savingPVandEMS1year);

    // 20 years bar heights
    var twentyYearsHeightMitPv = this.getBarHeights(cost20YearNoPV, cost20yearPV, savingOnlyPV20years);
    var twentyYearsHeightMitPvAndEms = this.getBarHeights(cost20YearNoPV, cost20yearPV, savingPVandEMS20years);

    return (
      <div>
        <div className="flexRow" style={{ marginBottom: "30px" }}>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="1" className={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked={this.state.displayed === "one-year"} />}
              {this.state.displayed === "one-year" && <input type="radio" name="single-year" id="single-year" value="1" className={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked="true" />}
              <div className="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div className="panel-body">Gesamtkosten pro Jahr</div>
              </div>
            </label>
          </div>
          <div>
            <label>
              {this.state.displayed === undefined && <input type="radio" name="heating" value="20" className={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked={this.state.displayed === "twenty-years"} />}
              {this.state.displayed === "twenty-years" && <input type="radio" name="multi-year" id="multi-year" value="20" className={this.context.selectedTheme === "buderus" ? "card-input-element-result" : "card-input-element"} checked="true" />}
              <div className="panel panel-default card-input-wide background-light-grey" style={{ height: "40px", width: "100%", fontSize: "14px", margin: "0", border: "none" }}>
                <div className="panel-body trackeable" data-event="gesamtkosten-strom-20-years">
                  Gesamtkosten über 20 Jahre
                </div>
              </div>
            </label>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "220px" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "17%", zIndex: "99999" }}>
            {/* ohne PV */}
            <div style={{ display: "flex", width: "73px", height: `212px`, background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                {this.state.displayed === "one-year" && cost1YearNoPV.toLocaleString("de-DE")}
                {this.state.displayed === "one-year" && <span>&nbsp;€</span>}
                {this.state.displayed === "twenty-years" && cost20YearNoPV.toLocaleString("de-DE")}
                {this.state.displayed === "twenty-years" && <span>&nbsp;€</span>}
              </div>
            </div>

            {/* Mit PV Price */}
            <div style={{ width: "73px", color: "white", marginLeft: "10%", zIndex: "99999", marginTop: "auto" }}>
              {/* Pattern bar 1 year */}
              {this.state.displayed === "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {savingOnlyPV1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {this.state.displayed === "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {savingOnlyPV20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {this.state.displayed === "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {cost1yearPV.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {this.state.displayed === "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPv["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {cost20yearPV.toLocaleString("de-DE")}
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
              {this.state.displayed === "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {savingPVandEMS1year.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern bar 20 years */}
              {this.state.displayed === "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["savings"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#007BC0", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: "#FFF", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {savingPVandEMS20years.toLocaleString("DE-de")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 1 year */}
              {this.state.displayed === "one-year" && (
                <div style={{ display: "flex", width: "73px", height: `${oneYearHeightMitPvAndEMS["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {cost1yearPVEMS.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Blue bar 20 years */}
              {this.state.displayed === "twenty-years" && (
                <div style={{ display: "flex", width: "73px", height: `${twentyYearsHeightMitPvAndEms["cost"]}px`, color: "white" }}>
                  <div style={{ width: "100%", height: "100%", textAlign: "center" }} className={isSafari ? "pattern-safari" : "pattern"}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", color: "white", fontSize: "12px", width: "100%", height: "100%" }}>
                      <span style={{ background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", padding: "3px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>
                        {cost20yearPVEMS.toLocaleString("de-DE")}
                        <span>&nbsp;€</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cost-chart-width" style={{ position: "absolute", zIndex: "99998" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="bar-chart-left-legend">
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(5, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-years" && this.divideValuesForChart(5, cost20YearNoPV) + " €"}
                </div>
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(4, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-years" && this.divideValuesForChart(4, cost20YearNoPV) + " €"}
                </div>
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(3, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-years" && this.divideValuesForChart(3, cost20YearNoPV) + " €"}
                </div>
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(2, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-years" && this.divideValuesForChart(2, cost20YearNoPV) + " €"}
                </div>
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(1, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-years" && this.divideValuesForChart(1, cost20YearNoPV) + " €"}
                </div>
                <div>
                  {this.state.displayed === "one-year" && this.divideValuesForChart(0, cost1YearNoPV) + " €"}
                  {this.state.displayed === "twenty-year" && this.divideValuesForChart(0, cost20YearNoPV) + " €"}
                </div>
              </div>
              <div data-html2canvas-ignore className="cost-chart-width" style={{ display: "flex", flexDirection: "column", marginLeft: "3px" }}>
                <div className="cost-chart-width" style={{ marginTop: "7px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                {/* <div className="cost-chart-width" style={{ marginTop: '18px', height: '1px', width: '450px', borderBottom: '1px solid #000' }}></div> */}
                <div className="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "19px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
                <div className="cost-chart-width" style={{ marginTop: "18px", height: "1px", width: "450px", borderBottom: "1px solid #EFF1F2" }}></div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "75%" }}>
              <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "5px", marginLeft: "70px", zIndex: "99999" }}>
                <div style={{ display: "flex", width: "73px", height: "40px", color: "#000" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                    {this.context.selectedTheme === "buderus" ? <BuderusLightningIcon /> : <LightningIcon />}
                    ohne PV
                  </div>
                </div>
                <div style={{ display: "flex", width: "73px", height: "40px", color: "#000", marginLeft: "50px" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "12px", textAlign: "center" }}>
                    {this.context.selectedTheme === "buderus" ? <BuderusPVIcon /> : <PVIcon />}
                    mit PV
                  </div>
                </div>
                <div style={{ display: "flex", width: "73px", height: "40px", color: "#000", marginLeft: "40px" }}>
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

            <div style={{ display: "flex", flexDirection: "column", marginTop: "12px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "15px" }}>
                  <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", borderRadius: "12px" }}></div>
                </div>
                <div>Laufende Stromkosten</div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
                <div style={{ marginRight: "15px" }}>
                  <div style={{ marginTop: "2px", width: "12px", height: "12px", borderRadius: "12px" }} className="pattern-round"></div>
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
