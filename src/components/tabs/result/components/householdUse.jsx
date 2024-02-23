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

import HouseholdSwitch from "./switchHousehold";
import CustomSwitch from "./switch";
import InfoButton from "../../infoButton";

import { Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import pattern from "patternomaly";
import { ReactComponent as LightningIcon } from "../../../../assets/img/icons/lightning_chart.svg";
import { ReactComponent as PVIcon } from "../../../../assets/img/icons/photovoltaic_chart.svg";
import { ReactComponent as ElectricityIcon } from "../../../../assets/img/icons/electricity_sun_chart.svg";

import { ReactComponent as GridOut } from "../../../../assets/img/grid_out.svg";
import { ReactComponent as Plug } from "../../../../assets/img/plug.svg";
import { ReactComponent as HousePV } from "../../../../assets/img/house_pv.svg";

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

const leftPie = 45;
const topPie = 35;
const bottomPie = 20;

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

    iconToUse = <GridOut width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
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

    iconToUse = <HousePV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  }

  return <React.Fragment>{iconToUse}</React.Fragment>;
}

class HouseholdUse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
      infoBoxCombinedHouseholdUsage: false,
      infoBoxHouseholdGridFeed: false,
    };
  }

  static contextType = AppContext;

  componentWillMount() {
    const { products, btnThemes, fonts, setFwdBtn } = this.context;

    setFwdBtn(false);
    this.handleResize();

    this.householdUsagePercentage();
  }

  handleResize = () => {
    const { pieChartSize, setPieSize } = this.context;
    console.log(window.innerWidth);

    if (window.innerWidth < 1300) {
      //size, iconSize, innerRadius, fontSize, xHeatpumpLabel, xEVLabel, xHouseholdLabel, yHeatpumpLabel, yEVLabel, yHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin
      setPieSize(290, 50, 37, 14, 16, 2, 65, 0, 0, 36, 40, 15, 45, -10, 10, 0);
    } else if (window.innerWidth > 1300) {
      setPieSize(320, 70, 55, 18, 38, 25, 90, 0, 0, 34, 40, 15, 55, -20, 20, 0);
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    const { loading, loadingHousehold, setHouseholdUse1SVG, setHouseholdUse2SVG, setHousehold1SVG_EMS_Hidden, setHousehold2SVG_EMS_Hidden, setHousehold1SVG_NoEMS_Hidden, setHousehold2SVG_NoEMS_Hidden } = this.context;

    if (!loadingHousehold) {
      setTimeout(() => {
        const householdUseChart1 = document.getElementById("householdUse-1");
        const householdUseChart2 = document.getElementById("householdUse-2");
        const householdUseChart1_svg = householdUseChart1.getElementsByTagName("svg");
        const householdUseChart2_svg = householdUseChart2.getElementsByTagName("svg");

        const householdUseChart1Hidden = document.getElementById("householdUse-1-hidden");
        const householdUseChart2Hidden = document.getElementById("householdUse-2-hidden");
        const householdUseChart1_svg_hidden = householdUseChart1Hidden.getElementsByTagName("svg");
        const householdUseChart2_svg_hidden = householdUseChart2Hidden.getElementsByTagName("svg");

        const householdUseChart1_NoEMS_Hidden = document.getElementById("householdUse-1-noEMS-hidden");
        const householdUseChart2_NoEMS_Hidden = document.getElementById("householdUse-2-noEMS-hidden");
        const householdUseChart1_svg_noEMS_hidden = householdUseChart1_NoEMS_Hidden.getElementsByTagName("svg");
        const householdUseChart2_svg_noEMS_hidden = householdUseChart2_NoEMS_Hidden.getElementsByTagName("svg");

        console.log(householdUseChart1);
        console.log(householdUseChart2_svg_hidden[0]);

        setHouseholdUse1SVG(householdUseChart1_svg[0]);
        setHouseholdUse2SVG(householdUseChart2_svg[0]);
        setHousehold1SVG_EMS_Hidden(householdUseChart1_svg_hidden[0]);
        setHousehold2SVG_EMS_Hidden(householdUseChart2_svg_hidden[0]);
        setHousehold1SVG_NoEMS_Hidden(householdUseChart1_svg_noEMS_hidden[0]);
        setHousehold2SVG_NoEMS_Hidden(householdUseChart2_svg_noEMS_hidden[0]);
      }, "1000");
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const { infoBoxCombinedHouseholdUsage, setInfoBoxCombinedHouseholdUsage, setTabToSelect, tabEntries, pvOutputkWh, homeStorageSizekWh, pvOutput, setPVOutput } = this.context;

    if (previousState.infoBoxCombinedHouseholdUsage !== this.state.infoBoxCombinedHouseholdUsage) {
      console.log("infoBoxCombinedHouseholdUsage: " + this.state.infoBoxCombinedHouseholdUsage);
    }
  }

  changeInfoBoxValue = (type, value) => {
    const { infoBoxCombinedHouseholdUsage, setInfoBoxCombinedHouseholdUsage, noEMSPercentageOffGrid, heatpumpCombinedUsage, HH_energy_to_grid_kWh_PV_MFH, HH_EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, HH_EGen_hw_kWh_EDWW_MFH_Brine, HH_EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, HH_EGen_sh_kWh_EDWW_MFH, HH_Avg_Eff_JAZ_HP_B_W_MFH, HH_Avg_Eff_JAZ_HP_A_W_MFH, HH_EGen_sh_kWh_HP_A_W_MFH, HH_EGen_sh_kWh_HP_B_W_MFH, HH_EGen_hw_kWh_HP_A_W_MFH, HH_EGen_hw_kWh_HP_B_W_MFH } = this.context;
    console.log("INFO BOX: " + value);

    this.setState({ infoBoxCombinedHouseholdUsage: value });
  };

  householdUsagePercentage = (type) => {
    const { setInfoBoxCombinedHouseholdUsage, noEMSPercentageOffGrid, heatpumpCombinedUsage, HH_energy_to_grid_kWh_PV_MFH, HH_EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, HH_EGen_hw_kWh_EDWW_MFH_Brine, HH_EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, HH_EGen_sh_kWh_EDWW_MFH, HH_Avg_Eff_JAZ_HP_B_W_MFH, HH_Avg_Eff_JAZ_HP_A_W_MFH, HH_EGen_sh_kWh_HP_A_W_MFH, HH_EGen_sh_kWh_HP_B_W_MFH, HH_EGen_hw_kWh_HP_A_W_MFH, HH_EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var pvUsagePercent = ((parseFloat(HH_EGen_elc_kWh_PV_MFH) - parseFloat(HH_energy_to_grid_kWh_PV_MFH)) / parseFloat(HH_EGen_elc_kWh_PV_MFH)) * 100;
    console.log("HOUSEHOLD USAGE: " + pvUsagePercent);

    if (!this.state.infoBoxCombinedHouseholdUsage) {
      setInfoBoxCombinedHouseholdUsage(pvUsagePercent);
      this.setState({ infoBoxCombinedHouseholdUsage: true });
      console.log("infoBoxCombinedHouseholdUsage: " + pvUsagePercent);
    }

    return pvUsagePercent;
  };

  gridFeedPercentage = (type) => {
    const { setInfoBoxHouseholdGridFeed, infoBoxHouseholdGridFeed, noEMSPercentageOffGrid, heatpumpCombinedUsage, HH_energy_to_grid_kWh_PV_MFH, HH_EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, HH_EGen_hw_kWh_EDWW_MFH_Brine, HH_EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, HH_EGen_sh_kWh_EDWW_MFH, HH_Avg_Eff_JAZ_HP_B_W_MFH, HH_Avg_Eff_JAZ_HP_A_W_MFH, HH_EGen_sh_kWh_HP_A_W_MFH, HH_EGen_sh_kWh_HP_B_W_MFH, HH_EGen_hw_kWh_HP_A_W_MFH, HH_EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var gridFeedPercent = 100 - ((parseFloat(HH_EGen_elc_kWh_PV_MFH) - parseFloat(HH_energy_to_grid_kWh_PV_MFH)) / parseFloat(HH_EGen_elc_kWh_PV_MFH)) * 100;
    console.log("GRID FEED USAGE: " + gridFeedPercent);

    if (!this.state.infoBoxHouseholdGridFeed) {
      setInfoBoxHouseholdGridFeed(gridFeedPercent);
      this.setState({ infoBoxHouseholdGridFeed: true });
      console.log("infoBoxHouseholdGridFeed: " + gridFeedPercent);
    }

    return gridFeedPercent;
  };

  gridFeedPercentageNoEMS = (type) => {
    const { householdNoEMSpvPercent, noEMSPercentageOffGrid, heatpumpCombinedUsage, HH_energy_to_grid_kWh_PV_MFH, HH_EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, HH_EGen_hw_kWh_EDWW_MFH_Brine, HH_EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, HH_EGen_sh_kWh_EDWW_MFH, HH_Avg_Eff_JAZ_HP_B_W_MFH, HH_Avg_Eff_JAZ_HP_A_W_MFH, HH_EGen_sh_kWh_HP_A_W_MFH, HH_EGen_sh_kWh_HP_B_W_MFH, HH_EGen_hw_kWh_HP_A_W_MFH, HH_EGen_hw_kWh_HP_B_W_MFH } = this.context;

    var gridFeedPercentNoEMS = 100 - parseFloat(householdNoEMSpvPercent);

    return gridFeedPercentNoEMS;
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

  render() {
    const { t } = this.props;
    const { overlayToggle } = this.state;
    const { loading, loadingHousehold, householdNoEMSpvPercent, offgridEMS, householdEMS, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;
    var VictoryPieData = [];
    var VictoryPieData2 = [];
    var VictoryPieDataPDFWithEMS = [];
    var VictoryPieDataPDFWithoutEMS = [];
    var pieColors = [];
    var pieColorsPDFWithEMS = [];
    var pieColorsPDFWithoutEMS = [];

    var roundedGridFeedPercentageNoEMS = Math.round(parseFloat(this.gridFeedPercentageNoEMS()));
    var roundedHouseholdpvPercentNoEMS = Math.round(parseFloat(householdNoEMSpvPercent));
    roundedHouseholdpvPercentNoEMS = this.adjustPercentage(roundedHouseholdpvPercentNoEMS, roundedGridFeedPercentageNoEMS);

    if (sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent") != "") {
      sessionStorage.setItem("Onhe_HouseholdNoEMSpvPercent_NoEMS", roundedHouseholdpvPercentNoEMS);
    }
    if (sessionStorage.getItem("Onhe_GridFeedPercentageNoEMS") != "") {
      sessionStorage.setItem("Onhe_GridFeedPercentage_NoEMS", roundedGridFeedPercentageNoEMS);
    }

    if (householdEMS === true) {
      // Rounded values for VictoryPieData2
      var roundedGridFeedPercentage = Math.round(parseFloat(this.gridFeedPercentage()));
      var roundedHouseholdUsagePercentage = Math.round(parseFloat(this.householdUsagePercentage()) - householdNoEMSpvPercent);
      var roundedHouseholdpvPercent = Math.round(parseFloat(householdNoEMSpvPercent));
      roundedGridFeedPercentage = this.adjustPercentage(roundedGridFeedPercentage, roundedHouseholdUsagePercentage, roundedHouseholdpvPercent);

      if (sessionStorage.getItem("MIT_GridFeedPercentage") != "") {
        sessionStorage.setItem("MIT_GridFeedPercentage", roundedGridFeedPercentage);
      }
      if (sessionStorage.getItem("MIT_HouseholdUsagePercentage") != "") {
        sessionStorage.setItem("MIT_HouseholdUsagePercentage", roundedHouseholdUsagePercentage);
      }
      if (sessionStorage.getItem("MIT_HouseholdNoEMSpvPercent") != "") {
        sessionStorage.setItem("MIT_HouseholdNoEMSpvPercent", roundedHouseholdpvPercent);
      }

      VictoryPieData = [
        { x: 3, y: roundedGridFeedPercentage, name: "grid", label: "3.000 kWh", img: "/img/grid_out.svg", color: "#004975" },
        { x: 2, y: roundedHouseholdUsagePercentage, name: "plug", label: "1.400 kWh", img: "/img/plug.svg", color: "#C535BC" },
        { x: 1, y: roundedHouseholdpvPercent, name: "pv", label: "1.000 kWh", img: "/img/house_pv.svg", color: "#9E2896" },
      ];
      VictoryPieData2 = [
        { x: 3, y: roundedGridFeedPercentage, name: "grid", label: roundedGridFeedPercentage + "%", img: "/img/grid_out.svg", color: "#A4ABB3" },
        { x: 2, y: roundedHouseholdUsagePercentage, name: "plug", label: roundedHouseholdUsagePercentage + "%", img: "/img/plug.svg", color: "#00884A" },
        { x: 1, y: roundedHouseholdpvPercent, name: "pv", label: roundedHouseholdpvPercent + "%", img: "/img/house_pv.svg", color: "#18837E" },
      ];
      pieColors = ["#A4ABB3", "#00884A", "#18837E"];
    } else if (householdEMS === false) {
      // Rounded values for VictoryPieData2.
      var roundedGridFeedPercentageNoEMS = Math.round(parseFloat(this.gridFeedPercentageNoEMS()));
      var roundedHouseholdNoEMSpvPercent = Math.round(parseFloat(householdNoEMSpvPercent));
      roundedHouseholdNoEMSpvPercent = this.adjustPercentage(roundedHouseholdNoEMSpvPercent, roundedGridFeedPercentageNoEMS);

      if (sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent") != "") {
        sessionStorage.setItem("Onhe_HouseholdNoEMSpvPercent", roundedHouseholdNoEMSpvPercent);
      }
      if (sessionStorage.getItem("Onhe_GridFeedPercentageNoEMS") != "") {
        sessionStorage.setItem("Onhe_GridFeedPercentageNoEMS", roundedGridFeedPercentageNoEMS);
      }

      VictoryPieData = [
        { x: 2, y: roundedGridFeedPercentageNoEMS, name: "grid", label: "3.000 kWh", img: "/img/grid_out.svg", color: "#A4ABB3" },
        { x: 1, y: roundedHouseholdNoEMSpvPercent, name: "pv", label: "1.000 kWh", img: "/img/house_pv.svg", color: "#18837E" },
      ];
      VictoryPieData2 = [
        { x: 2, y: roundedGridFeedPercentageNoEMS, name: "grid", label: roundedGridFeedPercentageNoEMS + "%", img: "/img/grid_out.svg", color: "#A4ABB3" },
        { x: 1, y: roundedHouseholdNoEMSpvPercent, name: "pv", label: roundedHouseholdNoEMSpvPercent + "%", img: "/img/house_pv.svg", color: "#18837E" },
      ];
      pieColors = ["#A4ABB3", "#18837E"];
    }

    // Data for PDF victory pie
    VictoryPieDataPDFWithEMS = [
      { x: 3, y: parseInt(sessionStorage.getItem("MIT_GridFeedPercentage")), name: "grid", label: sessionStorage.getItem("MIT_GridFeedPercentage") + "%", img: "img/grid_in.svg", color: "#A4ABB3" },
      { x: 2, y: parseInt(sessionStorage.getItem("MIT_HouseholdUsagePercentage")), name: "plug", label: sessionStorage.getItem("MIT_HouseholdUsagePercentage") + " %", img: "img/plug.svg", color: "#00884A" },
      { x: 1, y: parseInt(sessionStorage.getItem("MIT_HouseholdNoEMSpvPercent")), name: "pv", label: sessionStorage.getItem("MIT_HouseholdNoEMSpvPercent") + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
    ];
    pieColorsPDFWithEMS = ["#A4ABB3", "#00884A", "#18837E"];

    VictoryPieDataPDFWithoutEMS = [
      { x: 3, y: parseInt(sessionStorage.getItem("Onhe_GridFeedPercentage_NoEMS")), name: "grid", label: sessionStorage.getItem("Onhe_GridFeedPercentage_NoEMS") + " %", img: "img/grid_in.svg", color: "#A4ABB3" },
      { x: 1, y: parseInt(sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent_NoEMS")), name: "pv", label: sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent_NoEMS") + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
    ];
    pieColorsPDFWithoutEMS = ["#A4ABB3", "#18837E"];

    return (
      <div>
        {!loadingHousehold && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" /*maxWidth: '450px'*/ }}>
              <div id="householdUse-1-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

              <div id="householdUse-2-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

              <div id="householdUse-1-noEMS-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

              <div id="householdUse-2-noEMS-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

              <div id="householdUse-1" style={{ position: "absolute", width: "100%", height: "300px" }}>
                <VictoryPie
                  data={VictoryPieData2}
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
                    labels: { fill: ({ datum }) => datum.color, border: "2px solid red", background: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize },
                  }}
                  labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
                />
              </div>

              <div id="householdUse-2" style={{ position: "absolute", width: "100%", height: "300px" }}>
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

        {loadingHousehold && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" }}>
              <div style={{ position: "absolute", left: "50%", top: "100px" }}>Lädt...</div>
            </div>
          </div>
        )}

        <div data-html2canvas-ignore style={{ display: "flex", marginTop: "30px", justifyContent: "flex-start", flexDirection: "row" }}>
          <div class="trackeable" data-event="result-part2-switch-energiemanagement">
            <HouseholdSwitch />
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

export default withRouter(withTranslation()(HouseholdUse));
