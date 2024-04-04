import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";

import { Line } from "react-chartjs-2";
import pattern from "patternomaly";

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
      // tension: 1
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
    const { setFwdBtn } = this.context;

    setFwdBtn(false);
  }

  componentDidMount() {
    const { setBreakEvenBase64, loading } = this.context;
    if (loading) {
      setTimeout(() => {
        const breakEvenCanvas = document.getElementById("breakEvenChart");
        if (breakEvenCanvas) {
          breakEvenCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);

            setBreakEvenBase64(url);
          });
        }
      }, 1000);
    }
  }

  inputPower_kW_PV_MFH = (event) => {
    const { setPower_kW_PV_MFH } = this.context;

    setPower_kW_PV_MFH(event.target.value);
  };

  inputTCO_thermal_EUR_a = (event) => {
    const { setTCO_thermal_EUR_a } = this.context;

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

    return Math.round(((energyUsagekWh * (electricityCost / 100)) / 6) * divided * timeToNum).toLocaleString("de-DE") + " €";
  };

  inputCostOverTime = (event) => {
    const { setCostOverTime } = this.context;
    setCostOverTime(event.target.value);
  };

  investmentCost = () => {
    const { pvOutputkWh, PVcostLookupTable, investmentCostEUR } = this.context;

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);

    let investmentCostResult = Math.abs(PVcostInTable.cost);

    if (investmentCostEUR > 0) {
      investmentCostResult = parseInt(investmentCostEUR) * -1;
    }

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

  breakEvenPV = () => {
    const heatpumpPV = JSON.parse(sessionStorage.getItem("heatpumpPV"));
    let closestPosition = 0;
    if (heatpumpPV) {
      let closestValue = Math.abs(heatpumpPV[0].expenditure);
      for (let i = 1; i < heatpumpPV.length; i++) {
        const actualValue = Math.abs(heatpumpPV[i].expenditure);

        if (actualValue < closestValue) {
          closestValue = actualValue;
          closestPosition = i;
        }
      }
    }
    return closestPosition;
  };

  breakEvenPVems = () => {
    const heatpumpPVems = JSON.parse(sessionStorage.getItem("heatpumpPVems"));
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

  render() {
    const { loading } = this.context;

    const heatpumpPVems = JSON.parse(sessionStorage.getItem("heatpumpPVems"));
    const heatpumpPV = JSON.parse(sessionStorage.getItem("heatpumpPV"));

    // Function to create datapoints array up to a certain position
    function createDataPoints(dataArray, position) {
      var points = [];
      if (dataArray) {
        for (var i = 0; i <= position; i++) {
          if (dataArray[i] !== undefined) {
            points.push(dataArray[i].expenditure);
          } else {
            // Handle cases where dataArray[i] might be undefined
            points.push(null); // or some other default value
          }
        }
      }
      return points;
    }

    // Create datapoints arrays
    const numYears01 = this.breakEvenPV();
    const datapoints = createDataPoints(heatpumpPVems, numYears01 + 3);
    const closestPosition01 = this.findClosestPositionTo0(datapoints);
    const datapoints2 = createDataPoints(heatpumpPV, numYears01 + 3);
    const closestPosition02 = this.findClosestPositionTo0(datapoints2);

    const closestIntersectionPosition = this.findIntersectionPosition(datapoints, datapoints2);

    function createDataPoints3(length) {
      var points = new Array(length).fill(null);

      // Set first and last positions to 0
      points[0] = 0;
      points[length - 1] = 0;

      // Calculate middle index and set it to 0
      var middleIndex = Math.floor(length / 2);
      points[middleIndex] = 0;

      return points;
    }
    const datapoints3 = createDataPoints3(numYears01 + 5 + 1); // Adding 1 because array is zero-indexed
    var labels_values = [];
    for (var i = 0; i <= numYears01 + 5; i++) {
      labels_values.push(i.toString());
    }

    const lineData = {
      labels: labels_values,
      datasets: [
        {
          label: false,
          data: datapoints,
          borderColor: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#18837E",
          backgroundColor: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#18837E",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.8,
          spanGaps: true,
          pointStyle: "circle",
          pointRadius: (context) => {
            // Set the radius of the point closest to 0 as 3, and the others as 0.
            return context.dataIndex === closestPosition01 ? 6 : 0;
          },
          pointHoverRadius: (context) => {
            // Set the radius hover of the point closest to 0 as 5, and the others as 0.
            return context.dataIndex === closestPosition01 ? 7 : 0;
          },
        },
        {
          label: false,
          data: datapoints2,
          borderColor: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0",
          backgroundColor: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.8,
          spanGaps: true,
          pointStyle: "circle",
          pointRadius: (context) => {
            // Set the radius of the point closest to 0 as 3, and the others as 0.
            return context.dataIndex === closestPosition02 ? 6 : context.dataIndex === closestIntersectionPosition ? 6 : 0;
          },
          pointHoverRadius: (context) => {
            // Set the radius hover of the point closest to 0 as 5, and the others as 0.
            return context.dataIndex === closestPosition02 ? 7 : context.dataIndex === closestIntersectionPosition ? 7 : 0;
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
          suggestedMin: 0,
          suggestedMax: "auto",
          border: {
            display: false,
          },
          ticks: {
            // suggestedStepSize: 100,
            stepSize: 1000,
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
        <div style={{ display: "flex", marginBottom: "20px", fontSize: "16px" }}>
          <div className="title-col-two">
            Investitionskosten PV-System: <span style={{ fontFamily: "Bosch-Bold" }}> {heatpumpPV ? Math.abs(heatpumpPV[0].expenditure).toLocaleString("de-DE") + " €" : ""}</span>
          </div>
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", height: "220px", top: "0", left: "0" }}>
              <div style={{ position: "absolute", left: "50%", top: "100px" }}>Lädt...</div>
            </div>
          </div>
        ) : (
          <div className="graph-container" style={{ maxWidth: "550px" }}>
            <Line id="breakEvenChart" options={lineOptions} data={lineData} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", marginTop: "25px", fontFamily: "Bosch-Regular", fontSize: "12px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "14px", height: "14px", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", borderRadius: "14px" }}></div>
            </div>
            <div className="text-mobile">Kapitalentwicklung mit PV ohne Energiemanagementsystem </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
            <div style={{ marginRight: "15px" }}>
              <div style={{ marginTop: "2px", width: "14px", height: "14px", background: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#18837E", borderRadius: "14px" }}></div>
            </div>
            <div className="text-mobile">Kapitalentwicklung mit PV und mit Energiemanagementsystem *</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(BreakEven));
