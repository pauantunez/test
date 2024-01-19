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

class BreakEven extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      displayLineChart: false,
    };

    this.onInputchange = this.onInputchange.bind(this);
  }

  static contextType = AppContext;

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    const { heatpumpPVems, breakEvenBase64, setBreakEvenBase64 } = this.context;

    console.log(heatpumpPVems);

    setTimeout(() => {
      const breakEvenCanvas = document.getElementById("breakEvenChart");

      breakEvenCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        setBreakEvenBase64(url);

        console.log(url);
      });
    }, 200);
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

  energyUseEuro = (divided) => {
    const { energyUsagekWh, electricityCost, costOverTime } = this.context;
    const timeToNum = parseInt(costOverTime);
    console.log(Math.round(((energyUsagekWh * (electricityCost / 100)) / 6) * divided * timeToNum).toLocaleString("de-DE"));

    return Math.round(((energyUsagekWh * (electricityCost / 100)) / 6) * divided * timeToNum).toLocaleString("de-DE") + " €";
  };

  inputCostOverTime = (event) => {
    const { costOverTime, setCostOverTime, setFwdBtn, steps, setSteps, activeView } = this.context;
    setCostOverTime(event.target.value);
  };

  investmentCost = () => {
    const { pvOutputkWh, homeStorageSize, PVcostLookupTable, StorageCostLookupTable, addHeatpumpPVems } = this.context;

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
    let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);

    const investmentCostResult = Math.abs(PVcostInTable.cost);

    return investmentCostResult;
  };

  findClosestPositionTo0(data) {
    let closestPosition = 0;
    let closestValue = Math.abs(data[0]);

    for (let i = 1; i < data.length; i++) {
      const actualValue = Math.abs(data[i]);

      if (actualValue < closestValue) {
        closestValue = actualValue;
        closestPosition = i;
      }
    }

    return closestPosition;
  }

  findIntersectionPosition(datapoints1, datapoints2) {
    let closestPosition = 0;
    let smallestDifference = Math.abs(datapoints1[0] - datapoints2[0]);

    for (let i = 1; i < datapoints1.length; i++) {
      const difference = Math.abs(datapoints1[i] - datapoints2[i]);

      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestPosition = i;
      }
    }

    return closestPosition;
  }

  render() {
    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { heatpumpPV, heatpumpPVems, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

    const datapoints = [heatpumpPVems[0].expenditure, heatpumpPVems[2].expenditure, heatpumpPVems[4].expenditure, heatpumpPVems[6].expenditure, heatpumpPVems[8].expenditure, heatpumpPVems[10].expenditure, heatpumpPVems[12].expenditure, heatpumpPVems[14].expenditure, heatpumpPVems[16].expenditure, heatpumpPVems[18].expenditure, heatpumpPVems[20].expenditure, heatpumpPVems[22].expenditure];
    const closestPosition01 = this.findClosestPositionTo0(datapoints);

    const datapoints2 = [heatpumpPV[0].expenditure, heatpumpPV[2].expenditure, heatpumpPV[4].expenditure, heatpumpPV[6].expenditure, heatpumpPV[8].expenditure, heatpumpPV[10].expenditure, heatpumpPV[12].expenditure, heatpumpPV[14].expenditure, heatpumpPV[16].expenditure, heatpumpPV[18].expenditure, heatpumpPV[20].expenditure, heatpumpPV[22].expenditure];
    const closestPosition02 = this.findClosestPositionTo0(datapoints2);

    const closestIntersectionPosition = this.findIntersectionPosition(datapoints, datapoints2);

    /* const datapoints3 = [0, null, null, null, null, null, null, null, null, null, null, 0]; */

    const lineData = {
      labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
      datasets: [
        {
          label: false,
          data: datapoints,
          borderColor: "#18837E",
          backgroundColor: "#18837E",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.8,
          spanGaps: true,
          pointStyle: "circle",
          pointRadius: (context) => {
            // Set the radius of the point closest to 0 as 3, and the others as 0.
            return context.dataIndex === closestPosition01 ? 3 : 0;
          },
          pointHoverRadius: (context) => {
            // Set the radius hover of the point closest to 0 as 5, and the others as 0.
            return context.dataIndex === closestPosition01 ? 5 : 0;
          },
        },
        {
          label: false,
          data: datapoints2,
          borderColor: "#007BC0",
          backgroundColor: "#007BC0",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.8,
          spanGaps: true,
          pointStyle: "circle",
          pointRadius: (context) => {
            // Set the radius of the point closest to 0 as 3, and the others as 0.
            return context.dataIndex === closestPosition02 ? 3 : context.dataIndex === closestIntersectionPosition ? 3 : 0;
          },
          pointHoverRadius: (context) => {
            // Set the radius hover of the point closest to 0 as 5, and the others as 0.
            return context.dataIndex === closestPosition02 ? 5 : context.dataIndex === closestIntersectionPosition ? 5 : 0;
          },
        },
        {
          label: false,
          data: datapoints3,
          borderColor: "#9DC9FF",
          borderDash: [5, 5],
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
          spanGaps: true,
          pointStyle: false,
        },
      ],
    };

    const lineOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
        tooltip: {
          enabled: true,
          callbacks: {
            title: function () {
              return ""; // Para ocultar la etiqueta del eje x en el tooltip
            },
            label: function (tooltipItem) {
              const index = tooltipItem.dataIndex;
              switch (index) {
                case closestPosition02:
                  return "Amortisierung PV-Anlage ohne EMS";
                case closestPosition01:
                  return "Amortisierung PV-Anlage mit EMS";
                case closestIntersectionPosition:
                  return "Amortisierung EMS";
                default:
                  return "";
              }
            },
          },
        },
        datalabels: {
          display: false,
        },
      },
      animations: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#000",
            font: {
              size: 12,
              family: "Bosch-Regular",
            },
          },
        },
        y: {
          suggestedMin: -34000,
          suggestedMax: 20000,
          border: {
            display: false,
          },
          ticks: {
            suggestedStepSize: 10000,
            color: "#000",
            font: {
              size: 12,
              family: "Bosch-Regular",
            },
            reverse: true,
            callback: function (value, index, ticks) {
              return value.toLocaleString("de-DE") + " €";
            },
          },
        },
      },
    };

    return (
      <div id="break-even">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px", fontSize: "16px" }}>
          <div>Investitionskosten PV-System:</div>
          <div style={{ fontFamily: "Bosch-Bold" }}>{this.investmentCost().toLocaleString()} €</div>
        </div>

        <div style={{ maxWidth: "550px" }}>
          <Line id="breakEvenChart" options={lineOptions} data={lineData} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "25px", fontFamily: "Bosch-Regular", fontSize: "12px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: "#007BC0", borderRadius: "12px" }}></div>
            </div>
            <div>Kapitalentwicklung mit PV ohne Energiemanagementsystem *</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: "#18837E", borderRadius: "12px" }}></div>
            </div>
            <div>Kapitalentwicklung mit PV mit Energiemanagementsystem</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(BreakEven));
