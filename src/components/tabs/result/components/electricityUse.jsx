import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { VictoryPie, VictoryLabel } from "victory";
import { ReactComponent as Heatpump } from "../../../../assets/img/heatpump_small.svg";
import { ReactComponent as EV } from "../../../../assets/img/ev_small.svg";
import { ReactComponent as Household } from "../../../../assets/img/household_small.svg";

import { ReactComponent as BuderusHeatpump } from "../../../../assets/img/buderus/heatpump_small.svg";
import { ReactComponent as BuderusEV } from "../../../../assets/img/buderus/ev_small.svg";
import { ReactComponent as BuderusHousehold } from "../../../../assets/img/buderus/household_small.svg";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);

function CustomLabelComponent(props) {
  const { x, y, datum } = props;
  const imgHeight = props.iconSize;
  const imgWidth = props.iconSize;
  const fontSize = props.fontSize;

  const xPositionIconMargin = props.xPositionIconMargin;
  const yPositionIconMargin = props.yPositionIconMargin;
  const xPositionEVIconMargin = props.xPositionEVIconMargin;
  const yPositionEVIconMargin = props.yPositionEVIconMargin;
  const xPositionHouseholdIconMargin = props.xPositionHouseholdIconMargin;
  const yPositionHouseholdIconMargin = props.yPositionHouseholdIconMargin;
  const xPositionHeatpumpLabel = props.xPositionHeatpumpLabel;

  const xPositionEVLabel = props.xPositionEVLabel;
  const xPositionHouseholdLabel = props.xPositionHouseholdLabel;
  const yPositionHeatpumpLabel = props.yPositionHeatpumpLabel;
  const yPositionEVLabel = props.yPositionEVLabel;
  const yPositionHouseholdLabel = props.yPositionHouseholdLabel;
  var xPositionIcon;
  var yPositionIcon;
  var xPositionLabel;
  var yPositionLabel;

  var iconToUse;
  const { selectedTheme } = React.useContext(AppContext);
  if (datum.name === "heatpump") {
    xPositionIcon = x - xPositionIconMargin;
    yPositionIcon = y + yPositionIconMargin;
    xPositionLabel = x + xPositionHeatpumpLabel;
    yPositionLabel = y - yPositionHeatpumpLabel;

    iconToUse = selectedTheme === "buderus" ? <BuderusHeatpump width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} /> : <Heatpump width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />;
  } else if (datum.name === "ev") {
    xPositionIcon = x - xPositionEVIconMargin;
    yPositionIcon = y + yPositionEVIconMargin;
    xPositionLabel = x + xPositionEVLabel;
    yPositionLabel = y - yPositionEVLabel;

    iconToUse = selectedTheme === "buderus" ? <BuderusEV width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} /> : <EV width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />;
  } else if (datum.name === "household") {
    xPositionIcon = x - xPositionHouseholdIconMargin;
    yPositionIcon = y + yPositionHouseholdIconMargin;
    xPositionLabel = xPositionIcon - xPositionHouseholdLabel;
    yPositionLabel = yPositionIcon - yPositionHouseholdLabel;

    iconToUse = selectedTheme === "buderus" ? <BuderusHousehold width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} /> : <Household width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />;
  }

  return (
    <React.Fragment>
      {iconToUse}
      <rect x={xPositionLabel - 5} y={yPositionLabel - 10} width="80px" height="15px" fill="white" />
      <text x={xPositionLabel} y={yPositionLabel} className="small" fill={datum.color} fontFamily="Bosch-Bold" fontSize={fontSize}>
        {datum.label}
      </text>
    </React.Fragment>
  );
}

class ElectricityUse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
    };
  }

  static contextType = AppContext;

  componentWillMount() {
    const { setFwdBtn } = this.context;

    setFwdBtn(false);
    this.handleResize();
  }

  handleResize = () => {
    const { setPieSize } = this.context;

    if (window.innerWidth > 1600) {
      //size, iconSize, innerRadius, fontSize, xHeatpumpLabel, xEVLabel, xHouseholdLabel, yHeatpumpLabel, yEVLabel, yHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin
      setPieSize(300, 60, 55, 18, 38, 25, 90, 0, 0, 34, 40, 15, 55, 5, 20, 0);
    } else if (window.innerWidth > 1500) {
      setPieSize(280, 70, 55, 18, 38, 25, 90, 0, 0, 34, 40, 15, 55, 5, 20, 0);
    } else if (window.innerWidth > 1400) {
      setPieSize(260, 70, 55, 18, 38, 25, 40, 0, 0, 34, 40, 15, 55, 5, 20, 0);
    } else if (window.innerWidth > 1300) {
      setPieSize(240, 70, 55, 18, 38, 22, 40, 0, 0, 34, 40, 15, 55, 5, 20, 0);
    } else if (window.innerWidth > 1100) {
      setPieSize(220, 50, 37, 14, 16, 5, 50, 0, 0, 36, 40, 15, 55, 5, 10, 0);
    } else if (window.innerWidth > 900) {
      setPieSize(200, 50, 37, 14, 16, 5, 40, 0, 0, 36, 40, 15, 55, 5, 10, 0);
    } else {
      setPieSize(260, 50, 55, 18, 35, 5, 40, 0, 50, 36, 40, 15, 60, 5, 20, 0);
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    const { setElectricityUse1SVG, setElectricityUse2SVG } = this.context;

    const electricityUseChart1 = document.getElementById("electricityUse-1");
    const electricityUseChart2 = document.getElementById("electricityUse-2");
    const electricityUseChart1_svg = electricityUseChart1.getElementsByTagName("svg");
    const electricityUseChart2_svg = electricityUseChart2.getElementsByTagName("svg");

    setElectricityUse1SVG(electricityUseChart1_svg[0]);
    setElectricityUse2SVG(electricityUseChart2_svg[0]);
  }

  adjustPercentage(value1, value2, value3 = 0) {
    const total = value1 + value2 + value3;

    if (total > 100) {
      return value1 - 1;
    } else if (total < 100) {
      return value1 + 1;
    } else {
      return value1;
    }
  }

  render() {
    const { odometerIncreaseKWH, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, energyUsagekWh, energyUsageHeatpump, energyUsageHeatpumpNoEms, energyUsageHeatpumpPercentage, energyUsageEvPercentage, energyUsageHouseHoldPercentage, energyUsageHeatpumpPercentageNoEms, energyUsageEvPercentageNoEms, energyUsageHouseHoldPercentageNoEms, offgridEMS } = this.context;

    const VictoryPieDataEMS = [{ x: 3, y: energyUsageHeatpump, name: "heatpump", label: parseInt(energyUsageHeatpump).toLocaleString("de-DE") + " kWh", img: "/img/heatpump_small.svg", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }, ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: odometerIncreaseKWH.toLocaleString("de-DE") + " kWh", img: "/img/ev_small.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }] : []), { x: 1, y: parseInt(energyUsagekWh), name: "household", label: energyUsagekWh.toLocaleString("de-DE") + " kWh", img: "/img/household_small.svg", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }];

    const VictoryPieDataNoEMS = [{ x: 3, y: energyUsageHeatpumpNoEms, name: "heatpump", label: parseInt(energyUsageHeatpumpNoEms).toLocaleString("de-DE") + " kWh", img: "/img/heatpump_small.svg", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }, ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: odometerIncreaseKWH.toLocaleString("de-DE") + " kWh", img: "/img/ev_small.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }] : []), { x: 1, y: parseInt(energyUsagekWh), name: "household", label: energyUsagekWh.toLocaleString("de-DE") + " kWh", img: "/img/household_small.svg", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }];

    // Rounded values for VictoryPieData2
    var roundedEnergyUsageHeatpumpPercentage = Math.round(energyUsageHeatpumpPercentage);
    var roundedEnergyUsageEvPercentage = Math.round(energyUsageEvPercentage);
    var roundedEnergyUsageHouseHoldPercentage = Math.round(energyUsageHouseHoldPercentage);
    roundedEnergyUsageHeatpumpPercentage = this.adjustPercentage(roundedEnergyUsageHeatpumpPercentage, roundedEnergyUsageEvPercentage, roundedEnergyUsageHouseHoldPercentage);
    const VictoryPieData2EMS = [{ x: 3, y: energyUsageHeatpump, name: "heatpump", label: roundedEnergyUsageHeatpumpPercentage + "%", img: "/img/heatpump_small.svg", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }, ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: roundedEnergyUsageEvPercentage + "%", img: "/img/ev_small.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }] : []), { x: 1, y: parseInt(energyUsagekWh), name: "household", label: roundedEnergyUsageHouseHoldPercentage + "%", img: "/img/household_small.svg", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }];
    const colorScale = [this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975", odometerIncreaseKWH !== 0 ? (this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC") : undefined, this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896"].filter((color) => color !== undefined);

    var roundedEnergyUsageHeatpumpPercentageNoEms = Math.round(energyUsageHeatpumpPercentageNoEms);
    var roundedEnergyUsageEvPercentageNoEms = Math.round(energyUsageEvPercentageNoEms);
    var roundedEnergyUsageHouseHoldPercentageNoEms = Math.round(energyUsageHouseHoldPercentageNoEms);
    roundedEnergyUsageHeatpumpPercentageNoEms = this.adjustPercentage(roundedEnergyUsageHeatpumpPercentageNoEms, roundedEnergyUsageEvPercentageNoEms, roundedEnergyUsageHouseHoldPercentageNoEms);

    const VictoryPieData2NoEMS = [{ x: 3, y: energyUsageHeatpump, name: "heatpump", label: roundedEnergyUsageHeatpumpPercentageNoEms + "%", img: "/img/heatpump_small.svg", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }, ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: roundedEnergyUsageEvPercentageNoEms + "%", img: "/img/ev_small.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }] : []), { x: 1, y: parseInt(energyUsagekWh), name: "household", label: roundedEnergyUsageHouseHoldPercentageNoEms + "%", img: "/img/household_small.svg", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }];

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" /*maxWidth: '450px'*/ }}>
            <div id="electricityUse-1" className="pieContainer" style={{ position: "absolute", width: "100%", height: "300px" }}>
              <VictoryPie
                data={offgridEMS ? VictoryPieData2EMS : VictoryPieData2NoEMS}
                width={pieChartSize}
                padding={{ top: 0 }}
                pointerEvents="auto"
                colorScale={colorScale}
                labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                innerRadius={0}
                style={{
                  pointerEvents: "auto",
                  userSelect: "auto",
                  touchAction: "auto",
                  data: {
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 4,
                  },
                  labels: { fill: ({ datum }) => datum.color, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: pieLabelFontSize, backgroundcolor: ({ datum }) => datum.backgroundcolor },
                }}
                labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
              />
            </div>

            <div id="electricityUse-2" className="pieContainer" style={{ position: "absolute", width: "100%", height: "300px" }}>
              <VictoryPie
                data={offgridEMS ? VictoryPieDataEMS : VictoryPieDataNoEMS}
                width={pieChartSize}
                padding={{ top: 0 }}
                pointerEvents="auto"
                colorScale={colorScale}
                labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                style={{
                  pointerEvents: "auto",
                  userSelect: "auto",
                  touchAction: "auto",
                  data: {
                    fillOpacity: 0,
                    stroke: "#fff",
                    strokeWidth: 0,
                  },
                  labels: { fill: "white", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: pieLabelFontSize },
                }}
              />
            </div>
          </div>
        </div>

        <div className="additional-flex first-col" style={{ display: "flex", justifyContent: "space-around", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "14px" }}>
          <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }}>
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896", borderRadius: "12px" }}></div>
            </div>
            <div>Haushalt</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }}>
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975", borderRadius: "12px" }}></div>
            </div>
            <div>Wärmepumpe</div>
          </div>
          <div style={{ display: odometerIncreaseKWH === 0 ? "none" : "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }}>
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC", borderRadius: "12px" }}></div>
            </div>
            <div>Elektro-Auto</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ElectricityUse));
