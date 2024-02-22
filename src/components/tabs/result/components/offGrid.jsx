import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import { Button } from "reactstrap";
import axios from "axios";

import { withTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { VictoryChart, VictoryBar, VictoryPie, VictoryLabel } from "victory";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CustomSwitch from "./switch";
import InfoButton from "../../infoButton";

import { Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import pattern from "patternomaly";
import { ReactComponent as LightningIcon } from "../../../../assets/img/icons/lightning_chart.svg";
import { ReactComponent as PVIcon } from "../../../../assets/img/icons/photovoltaic_chart.svg";
import { ReactComponent as ElectricityIcon } from "../../../../assets/img/icons/electricity_sun_chart.svg";

import { ReactComponent as GridIn } from "../../../../assets/img/grid_in.svg";
import { ReactComponent as Plug } from "../../../../assets/img/plug.svg";
import { ReactComponent as PV } from "../../../../assets/img/pv.svg";

import CircularProgress from "@mui/material/CircularProgress";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

function CustomLabelComponent(props) {
  const { x, y, datum, label } = props;
  console.log(props);
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
  const padding = 5;
  var xPositionIcon;
  var yPositionIcon;
  var xPositionLabel;
  var yPositionLabel;
  var xPositionPercentage;
  var yPositionPercentage;
  var xPositionIconTest = x - 40;
  var iconToUse;

  if (datum.name == "grid") {
    xPositionIcon = x - xPositionIconMargin;
    yPositionIcon = y + yPositionIconMargin;
    xPositionLabel = x + xPositionHeatpumpLabel;
    yPositionLabel = y - yPositionHeatpumpLabel;

    iconToUse = <GridIn width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name == "plug") {
    xPositionIcon = x - xPositionEVIconMargin;
    yPositionIcon = y + yPositionEVIconMargin;
    xPositionLabel = x + xPositionEVLabel;
    yPositionLabel = y - yPositionEVLabel;

    iconToUse = <Plug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name == "pv") {
    xPositionIcon = x - xPositionHouseholdIconMargin;
    yPositionIcon = y + yPositionHouseholdIconMargin;
    xPositionLabel = x - xPositionHouseholdLabel;
    yPositionLabel = y - yPositionHouseholdLabel;

    iconToUse = <PV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
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
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
    this.handleResize();
  }

  handleResize = () => {
    const { pieChartSize, setPieSize } = this.context;
    //console.log(window.innerWidth);

    if (window.innerWidth < 1300) {
      //size, iconSize, innerRadius, fontSize, xHeatpumpLabel, xEVLabel, xHouseholdLabel, yHeatpumpLabel, yEVLabel, yHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin
      setPieSize(290, 50, 37, 14, 16, 2, 65, 0, 0, 36, 40, 15, 45, -10, 10, 0);
    } else if (window.innerWidth > 1300) {
      setPieSize(320, 70, 55, 18, 38, 25, 90, 0, 0, 34, 40, 15, 55, -20, 20, 0);
    }
  };

  pvUsagePercentage = (type) => {
    const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var pvUsagePercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;
    console.log("PV USAGE: " + pvUsagePercent);
    return pvUsagePercent;
  };

  pvUsagePercentageEMS = (type) => {
    const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var pvUsagePercentEMS = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;
    console.log("PV USAGE: " + pvUsagePercentEMS);
    return pvUsagePercentEMS;
  };

  gridUsagePercentage = (type) => {
    const { infoBoxOffGridGridUsage, setInfoBoxOffGridGridUsage, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage)) * 100;
    console.log("GRID USAGE: " + gridUsagePercent);

    if (!this.state.infoBoxOffGridGridUsage) {
      setInfoBoxOffGridGridUsage(gridUsagePercent);
      this.setState({ infoBoxOffGridGridUsage: true });
      console.log("infoBoxOffGridGridUsage: " + gridUsagePercent);
    }

    return gridUsagePercent;
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
    const { loading, loadingOffGrid, setOffGrid1SVG, offgrid1SVG, setOffGrid2SVG, setOffgrid1SVG_NoEMS_Hidden, setOffgrid2SVG_NoEMS_Hidden, setOffgrid1SVG_EMS_Hidden, setOffgrid2SVG_EMS_Hidden } = this.context;
    window.addEventListener("resize", this.handleResize);

    if (!loadingOffGrid) {
      /* const offgridChart1 = document.getElementById("offgrid-1");
      const offgrid1_svg = offgridChart1.getElementsByTagName("svg");

      const offgridChart2 = document.getElementById("offgrid-2");
      const offgrid2_svg = offgridChart2.getElementsByTagName("svg");

      const offgridChart1_NoEMS = document.getElementById("offgrid-1-hidden");
      const offgridChart1_NoEMS_svg = offgridChart1_NoEMS.getElementsByTagName("svg");

      const offgridChart2_NoEMS = document.getElementById("offgrid-2-hidden");
      const offgridChart2_NoEMS_svg = offgridChart2_NoEMS.getElementsByTagName("svg");

      const offgridChart1_EMS = document.getElementById("offgrid-1-ems-hidden");
      const offgridChart1_EMS_svg = offgridChart1_EMS.getElementsByTagName("svg");

      const offgridChart2_EMS = document.getElementById("offgrid-2-ems-hidden");
      const offgridChart2_EMS_svg = offgridChart2_EMS.getElementsByTagName("svg"); */
      setTimeout(() => {
        debugger;
        const offgridChart1 = document.getElementById("offgrid-1");
        const offgrid1_svg = offgridChart1.getElementsByTagName("svg");

        const offgridChart2 = document.getElementById("offgrid-2");
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
      }, "1000");
      /* setOffGrid1SVG(offgrid1_svg[0]);
      setOffGrid2SVG(offgrid2_svg[0]);
      setOffgrid1SVG_NoEMS_Hidden(offgridChart1_NoEMS_svg[0]);
      setOffgrid2SVG_NoEMS_Hidden(offgridChart2_NoEMS_svg[0]);
      setOffgrid1SVG_EMS_Hidden(offgridChart1_EMS_svg[0]);
      setOffgrid2SVG_EMS_Hidden(offgridChart2_EMS_svg[0]); */

      // console.log(offgridChart1_NoEMS_svg[0]);
    }
  }

  render() {
    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { loading, loadingOffGrid, setInfoBoxOffGridGridUsage, noEMSPercentageOffGrid, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime, setOffgridEMS, offgridEMS } = this.context;
    var VictoryPieData = [];
    var VictoryPieDataTest = [];
    var VictoryPieDataPDFWithEMS = [];
    var VictoryPieDataPDFWithoutEMS = [];
    var pieColors = [];
    var pieColorsPDFWithEMS = [];
    var pieColorsPDFWithoutEMS = [];

    var VictoryPieData1EMS = [];
    var VictoryPieData2EMS = [];
    var pieColors1EMS = [];
    var VictoryPieData1NoEMS = [];
    var VictoryPieData2NoEMS = [];
    var pieColors2NoEMS = [];

    if (offgridEMS === true) {
      var roundedNoEMSGridUsagePercentage = Math.round(parseFloat(this.gridUsagePercentage()));
      var roundedNoEMSPvUsagePercentage = Math.round(parseFloat(this.pvUsagePercentage() - Math.round(noEMSPercentageOffGrid)));
      var roundedNoEMSPercentageOffGrid = Math.round(parseFloat(noEMSPercentageOffGrid));
      roundedNoEMSPercentageOffGrid = this.adjustPercentage(roundedNoEMSPercentageOffGrid, roundedNoEMSGridUsagePercentage, roundedNoEMSPvUsagePercentage); // Rounded values for VictoryPieDataTest
      if (sessionStorage.getItem("MIT_GridUsagePercentage") != "") {
        sessionStorage.setItem("MIT_GridUsagePercentage", roundedNoEMSGridUsagePercentage);
      }
      if (sessionStorage.getItem("MIT_PvUsagePercentage") != "") {
        sessionStorage.setItem("MIT_PvUsagePercentage", roundedNoEMSPvUsagePercentage);
      }
      if (sessionStorage.getItem("MIT_NoEMSPercentageOffGrid") != "") {
        sessionStorage.setItem("MIT_NoEMSPercentageOffGrid", roundedNoEMSPercentageOffGrid);
      }
      VictoryPieData = [
        { x: 3, y: roundedNoEMSGridUsagePercentage, name: "grid", label: "3.000 kWh", img: "img/grid_in.svg", color: "#004975" },
        { x: 2, y: roundedNoEMSPvUsagePercentage, name: "plug", label: "1.400 kWh", img: "img/plug.svg", color: "#C535BC" },
        { x: 1, y: roundedNoEMSPercentageOffGrid, name: "pv", label: "1.000 kWh", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#9E2896" },
      ];

      VictoryPieDataTest = [
        { x: 3, y: roundedNoEMSGridUsagePercentage, name: "grid", label: roundedNoEMSGridUsagePercentage + "%", img: "img/grid_in.svg", color: "#A4ABB3" },
        { x: 2, y: roundedNoEMSPvUsagePercentage, name: "plug", label: roundedNoEMSPvUsagePercentage + "%", img: "img/plug.svg", color: "#00884A" },
        { x: 1, y: roundedNoEMSPercentageOffGrid, name: "pv", label: roundedNoEMSPercentageOffGrid + "%", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
      ];

      pieColors = ["#A4ABB3", "#00884A", "#18837E"];
    } else if (offgridEMS === false) {
      // Rounded values for VictoryPieDataTest
      var roundedGridUsagePercentage = Math.round(parseFloat(this.gridUsagePercentage()));
      var roundedPvUsagePercentage = Math.round(parseFloat(this.pvUsagePercentage()));
      roundedGridUsagePercentage = this.adjustPercentage(roundedGridUsagePercentage, roundedPvUsagePercentage);

      if (sessionStorage.getItem("OHNE_GridUsagePercentage") != "") {
        sessionStorage.setItem("OHNE_GridUsagePercentage", roundedGridUsagePercentage);
      }
      if (sessionStorage.getItem("OHNE_PvUsagePercentage") != "") {
        sessionStorage.setItem("OHNE_PvUsagePercentage", roundedPvUsagePercentage);
      }
      VictoryPieData = [
        { x: 3, y: roundedGridUsagePercentage, name: "grid", label: "3.000 kWh", img: "img/grid_in.svg", color: "#A4ABB3" },
        { x: 1, y: roundedPvUsagePercentage, name: "pv", label: "1.000 kWh", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
      ];

      VictoryPieDataTest = [
        { x: 3, y: roundedGridUsagePercentage, name: "grid", label: roundedGridUsagePercentage + " %", img: "img/grid_in.svg", color: "#A4ABB3" },
        { x: 1, y: roundedPvUsagePercentage, name: "pv", label: roundedPvUsagePercentage + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
      ];

      pieColors = ["#A4ABB3", "#18837E"];
    }

    // Data for PDF victory pie
    VictoryPieDataPDFWithEMS = [
      { x: 3, y: parseInt(sessionStorage.getItem("MIT_GridUsagePercentage")), name: "grid", label: sessionStorage.getItem("MIT_GridUsagePercentage") + "%", img: "img/grid_in.svg", color: "#A4ABB3" },
      { x: 2, y: parseInt(sessionStorage.getItem("MIT_PvUsagePercentage")), name: "plug", label: sessionStorage.getItem("MIT_PvUsagePercentage") + " %", img: "img/plug.svg", color: "#00884A" },
      { x: 1, y: parseInt(sessionStorage.getItem("MIT_NoEMSPercentageOffGrid")), name: "pv", label: sessionStorage.getItem("MIT_NoEMSPercentageOffGrid") + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
    ];
    pieColorsPDFWithEMS = ["#A4ABB3", "#00884A", "#18837E"];

    VictoryPieDataPDFWithoutEMS = [
      { x: 3, y: parseInt(sessionStorage.getItem("OHNE_GridUsagePercentage")), name: "grid", label: sessionStorage.getItem("OHNE_GridUsagePercentage") + " %", img: "img/grid_in.svg", color: "#A4ABB3" },
      { x: 1, y: parseInt(sessionStorage.getItem("OHNE_PvUsagePercentage")), name: "pv", label: sessionStorage.getItem("OHNE_PvUsagePercentage") + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
    ];
    pieColorsPDFWithoutEMS = ["#A4ABB3", "#18837E"];

    return (
      <div>
        {!loadingOffGrid && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" /*maxWidth: '450px'*/ }}>
              <div id="offgrid-1-ems-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
                <VictoryPie
                  data={VictoryPieDataPDFWithEMS}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColorsPDFWithEMS}
                  labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                  innerRadius={0}
                  style={{
                    data: {
                      fillOpacity: 1,
                      stroke: "#fff",
                      strokeWidth: 6,
                    },
                    labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: "20px" },
                  }}
                />
              </div>
              <div id="offgrid-2-ems-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
                <VictoryPie
                  data={VictoryPieDataPDFWithEMS}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColorsPDFWithEMS}
                  labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={"20px"} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                  style={{
                    data: {
                      fillOpacity: 0,
                      stroke: "#fff",
                      strokeWidth: 6,
                    },
                    labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: "20px" },
                  }}
                />
              </div>

              <div id="offgrid-1-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
                <VictoryPie
                  data={VictoryPieDataPDFWithoutEMS}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColorsPDFWithoutEMS}
                  labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                  innerRadius={0}
                  style={{
                    data: {
                      fillOpacity: 1,
                      stroke: "#fff",
                      strokeWidth: 6,
                    },
                    labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: "20px" },
                  }}
                />
              </div>
              <div id="offgrid-2-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
                <VictoryPie
                  data={VictoryPieDataPDFWithoutEMS}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColorsPDFWithoutEMS}
                  labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={"20px"} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                  style={{
                    data: {
                      fillOpacity: 0,
                      stroke: "#fff",
                      strokeWidth: 6,
                    },
                    labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: "20px" },
                  }}
                />
              </div>

              <div id="offgrid-1" style={{ position: "absolute", width: "100%", height: "300px" }}>
                <VictoryPie
                  data={VictoryPieDataTest}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColors}
                  labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin}
                  innerRadius={0}
                  style={{
                    data: {
                      fillOpacity: 1,
                      stroke: "#fff",
                      strokeWidth: 4,
                    },
                    labels: { fill: ({ datum }) => datum.color, fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize },
                  }}
                  labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
                />
              </div>

              <div id="offgrid-2" style={{ position: "absolute", width: "100%", height: "300px" }}>
                <VictoryPie
                  data={VictoryPieData}
                  width={pieChartSize}
                  padding={{ top: 0 }}
                  colorScale={pieColors}
                  labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                  style={{
                    data: {
                      fillOpacity: 0,
                      stroke: "#fff",
                      strokeWidth: 0,
                    },
                    labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize },
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {loadingOffGrid && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" }}>
              <div style={{ position: "absolute", left: "50%", top: "100px" }}>Lädt...</div>
            </div>
          </div>
        )}

        <div data-html2canvas-ignore style={{ display: "flex", marginTop: "30px", justifyContent: "flex-start", flexDirection: "row" }}>
          <div class="trackeable" data-event="result-part2-switch-energiemanagement">
            <CustomSwitch />
          </div>
          <div style={{ marginLeft: "12px", marginRight: "12px", paddingTop: "2px", fontFamily: "Bosch-Regular", fontSize: "16px" }}>Mit Energiemanagementsystem</div>
          <div>
            <InfoButton color="#007BC0" size="14px" placement="right" text="Unter Energiemanagement wird die Kombination verschiedener Maßnahmen und Strategien verstanden, um Energie zu beschaffen, zu verteilen und optimal zu nutzen. Ziel ist es, Energieverbräuche zu senken und die Energieeffizienz im Haushalt zu optimieren, um wirtschaftliche und ökologische Ziele zu erreichen." />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(OffGrid));
