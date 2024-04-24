import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { VictoryPie, VictoryLabel } from "victory";

/* import CustomSwitch from "./switch"; */
/* import InfoButton from "../../infoButton"; */

import { ReactComponent as GridIn } from "../../../../assets/img/grid_in.svg";
import { ReactComponent as Plug } from "../../../../assets/img/plug.svg";
import { ReactComponent as PV } from "../../../../assets/img/pv.svg";

import { ReactComponent as BuderusPlug } from "../../../../assets/img/buderus/ev_small.svg";
import { ReactComponent as BuderusPV } from "../../../../assets/img/buderus/pv.svg";
import { ReactComponent as BuderusGridIn } from "../../../../assets/img/buderus/grid_in.svg";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);

function CustomLabelComponent(props) {
  const { x, y, datum } = props;

  const imgHeight = props.iconSize;
  const imgWidth = props.iconSize;
  const xPositionIconMargin = props.xPositionIconMargin;
  const yPositionIconMargin = props.yPositionIconMargin;
  const xPositionEVIconMargin = props.xPositionEVIconMargin;
  const yPositionEVIconMargin = props.yPositionEVIconMargin;
  const xPositionHouseholdIconMargin = props.xPositionHouseholdIconMargin;
  const yPositionHouseholdIconMargin = props.yPositionHouseholdIconMargin;
  var xPositionIcon;
  var yPositionIcon;
  const { selectedTheme } = React.useContext(AppContext);
  var iconToUse;

  if (datum.name === "grid") {
    xPositionIcon = x - xPositionIconMargin;
    yPositionIcon = y + yPositionIconMargin;

    iconToUse = selectedTheme === "buderus" ? <BuderusGridIn width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <GridIn width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name === "plug") {
    xPositionIcon = x - xPositionEVIconMargin;
    yPositionIcon = y + yPositionEVIconMargin;

    iconToUse = selectedTheme === "buderus" ? <BuderusPlug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <Plug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name === "pv") {
    xPositionIcon = x - xPositionHouseholdIconMargin;
    yPositionIcon = y + yPositionHouseholdIconMargin;

    iconToUse = selectedTheme === "buderus" ? <BuderusPV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <PV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  }

  return <React.Fragment>{iconToUse}</React.Fragment>;
}

class OffGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      ems: props.ems,
      infoBoxOffGridGridUsage: 0,
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

  componentDidMount() {
    const { loadingOffGrid, setOffGrid1SVG, setOffGrid2SVG, setOffgrid1SVG_NoEMS_Hidden, setOffgrid2SVG_NoEMS_Hidden, setOffgrid1SVG_EMS_Hidden, setOffgrid2SVG_EMS_Hidden } = this.context;
    window.addEventListener("resize", this.handleResize);

    if (!loadingOffGrid) {
      setTimeout(() => {
        const offgridChart1 = document.getElementById("offgrid-1");
        const offgridChart2 = document.getElementById("offgrid-2");
        if (offgridChart1 && offgridChart2) {
          const offgrid1_svg = offgridChart1.getElementsByTagName("svg");

          const offgrid2_svg = offgridChart2.getElementsByTagName("svg");

          const offgridChart1_NoEMS = document.getElementById("offgrid-1-hidden");
          const offgridChart1_NoEMS_svg = offgridChart1_NoEMS.getElementsByTagName("svg");

          const offgridChart2_NoEMS = document.getElementById("offgrid-2-hidden");
          const offgridChart2_NoEMS_svg = offgridChart2_NoEMS.getElementsByTagName("svg");

          const offgridChart1_EMS = document.getElementById("offgrid-1-ems-hidden");
          const offgridChart1_EMS_svg = offgridChart1_EMS.getElementsByTagName("svg");

          const offgridChart2_EMS = document.getElementById("offgrid-2-ems-hidden");
          const offgridChart2_EMS_svg = offgridChart2_EMS.getElementsByTagName("svg");

          setOffGrid1SVG(offgrid1_svg[0]);
          setOffGrid2SVG(offgrid2_svg[0]);
          setOffgrid1SVG_NoEMS_Hidden(offgridChart1_NoEMS_svg[0]);
          setOffgrid2SVG_NoEMS_Hidden(offgridChart2_NoEMS_svg[0]);
          setOffgrid1SVG_EMS_Hidden(offgridChart1_EMS_svg[0]);
          setOffgrid2SVG_EMS_Hidden(offgridChart2_EMS_svg[0]);
        }
      }, "1000");
    }
  }

  render() {
    const { loadingOffGrid, noEMSPercentageOffGrid, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, offgridEMS, gridUsagePercentage, gridUsagePercentageNoEms, pvUsagePercentageNoEms } = this.context;

    var roundedGridUsagePercentage = Math.round(parseFloat(gridUsagePercentage));
    const roundedPvUsagePercentage = Math.round(parseFloat(gridUsagePercentageNoEms - gridUsagePercentage));
    const roundedOffGridPercentage = Math.round(parseFloat(pvUsagePercentageNoEms));
    roundedGridUsagePercentage = this.adjustPercentage(roundedGridUsagePercentage, roundedPvUsagePercentage, roundedOffGridPercentage);

    var roundedGridUsagePercentageNoEMS = Math.round(parseFloat(gridUsagePercentageNoEms));
    const roundedPvUsagePercentageNoEms = Math.round(parseFloat(pvUsagePercentageNoEms));
    roundedGridUsagePercentageNoEMS = this.adjustPercentage(roundedGridUsagePercentageNoEMS, roundedPvUsagePercentageNoEms);

    const VictoryPieData = [
      { x: 3, y: roundedGridUsagePercentage, name: "grid", label: roundedGridUsagePercentage + "%", img: "img/grid_in.svg", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" },
      { x: 2, y: roundedPvUsagePercentage, name: "plug", label: roundedPvUsagePercentage + "%", img: "img/plug.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" },
      { x: 1, y: roundedOffGridPercentage, name: "pv", label: roundedOffGridPercentage + "%", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" },
    ];

    const pieColors = [this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E"];

    const VictoryPieDataNoEms = [
      { x: 3, y: roundedGridUsagePercentageNoEMS, name: "grid", label: roundedGridUsagePercentageNoEMS + " %", img: "img/grid_in.svg", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" },
      { x: 1, y: roundedPvUsagePercentageNoEms, name: "pv", label: roundedPvUsagePercentageNoEms + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" },
    ];

    const pieColorsNoEms = [this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E"];

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" /*maxWidth: '450px'*/ }}>
            <div id="offgrid-1-ems-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
              <VictoryPie
                data={VictoryPieData}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={VictoryPieData}
                labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                innerRadius={0}
                style={{
                  data: {
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 6,
                  },
                  labels: { fill: ({ datum }) => datum.color, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: "20px" },
                }}
                labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
              />
            </div>
            <div id="offgrid-2-ems-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
              <VictoryPie
                data={VictoryPieData}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={pieColors}
                labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={"20px"} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                style={{
                  data: {
                    fillOpacity: 0,
                    stroke: "#fff",
                    strokeWidth: 0,
                  },
                  labels: { fill: "white", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: "20px" },
                }}
              />
            </div>

            <div id="offgrid-1-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
              <VictoryPie
                data={VictoryPieDataNoEms}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={pieColorsNoEms}
                labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                innerRadius={0}
                style={{
                  data: {
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 6,
                  },
                  labels: { fill: ({ datum }) => datum.color, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: "20px" },
                }}
                labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
              />
            </div>
            <div id="offgrid-2-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
              <VictoryPie
                data={VictoryPieDataNoEms}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={pieColorsNoEms}
                labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={"20px"} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                style={{
                  data: {
                    fillOpacity: 0,
                    stroke: "#fff",
                    strokeWidth: 0,
                  },
                  labels: { fill: "white", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: "20px" },
                }}
              />
            </div>

            <div id="offgrid-1" style={{ position: "absolute", width: "100%", height: "300px" }}>
              <VictoryPie
                data={offgridEMS ? VictoryPieData : VictoryPieDataNoEms}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={offgridEMS ? pieColors : pieColorsNoEms}
                labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                innerRadius={0}
                style={{
                  data: {
                    fillOpacity: 1,
                    stroke: "#fff",
                    strokeWidth: 4,
                  },
                  labels: { fill: ({ datum }) => datum.color, fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: pieLabelFontSize },
                }}
                labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
              />
            </div>

            <div id="offgrid-2" style={{ position: "absolute", width: "100%", height: "300px" }}>
              <VictoryPie
                data={offgridEMS ? VictoryPieData : VictoryPieDataNoEms}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={offgridEMS ? pieColors : pieColorsNoEms}
                labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                style={{
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

        <div data-html2canvas-ignore style={{ display: "flex", marginTop: "0px", justifyContent: "flex-start", flexDirection: "row" }}>
          {/* <div className="trackeable" data-event="result-part2-switch-energiemanagement">
            <CustomSwitch />
          </div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(OffGrid));
