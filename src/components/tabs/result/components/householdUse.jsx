import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { VictoryPie, VictoryLabel } from "victory";

/* import HouseholdSwitch from "./switchHousehold";
import InfoButton from "../../infoButton"; */

import { ReactComponent as GridOut } from "../../../../assets/img/grid_in.svg";
import { ReactComponent as Plug } from "../../../../assets/img/plug.svg";
import { ReactComponent as HousePV } from "../../../../assets/img/house_pv.svg";

import { ReactComponent as BuderusPlug } from "../../../../assets/img/buderus/ev_small.svg";
import { ReactComponent as BuderusPV } from "../../../../assets/img/buderus/pv.svg";
import { ReactComponent as BuderusGridOut } from "../../../../assets/img/buderus/grid_out.svg";

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
  var iconToUse;
  const { selectedTheme } = React.useContext(AppContext);
  if (datum.name === "grid") {
    xPositionIcon = x - xPositionIconMargin;
    yPositionIcon = y + yPositionIconMargin;

    iconToUse = selectedTheme === "buderus" ? <BuderusGridOut width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <GridOut width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name === "plug") {
    xPositionIcon = x - xPositionEVIconMargin;
    yPositionIcon = y + yPositionEVIconMargin;
    iconToUse = selectedTheme === "buderus" ? <BuderusPlug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <Plug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
  } else if (datum.name === "pv") {
    xPositionIcon = x - xPositionHouseholdIconMargin;
    yPositionIcon = y + yPositionHouseholdIconMargin;
    iconToUse = selectedTheme === "buderus" ? <BuderusPV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} /> : <HousePV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />;
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

    const { loadingHousehold, setHouseholdUse1SVG, setHouseholdUse2SVG, setHousehold1SVG_EMS_Hidden, setHousehold2SVG_EMS_Hidden, setHousehold1SVG_NoEMS_Hidden, setHousehold2SVG_NoEMS_Hidden } = this.context;

    if (!loadingHousehold) {
      setTimeout(() => {
        const householdUseChart1 = document.getElementById("householdUse-1");
        const householdUseChart2 = document.getElementById("householdUse-2");
        if (householdUseChart1 && householdUseChart2) {
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

          setHouseholdUse1SVG(householdUseChart1_svg[0]);
          setHouseholdUse2SVG(householdUseChart2_svg[0]);
          setHousehold1SVG_EMS_Hidden(householdUseChart1_svg_hidden[0]);
          setHousehold2SVG_EMS_Hidden(householdUseChart2_svg_hidden[0]);
          setHousehold1SVG_NoEMS_Hidden(householdUseChart1_svg_noEMS_hidden[0]);
          setHousehold2SVG_NoEMS_Hidden(householdUseChart2_svg_noEMS_hidden[0]);
        }
      }, "1000");
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.infoBoxCombinedHouseholdUsage !== this.state.infoBoxCombinedHouseholdUsage) {
    }
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
    const { loadingHousehold, householdNoEMSpvPercent, householdEMS, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, gridFeedPercentage, houseHoldPvPercentageNoEms, houseHoldPvPercentage, gridFeedPercentageNoEms, offgridEMS } = this.context;

    var roundedGridFeedPercentage = Math.round(parseFloat(gridFeedPercentage));
    const roundedHouseholdUsagePercentage = Math.round(parseFloat(gridFeedPercentageNoEms - gridFeedPercentage));
    const roundedHouseholdpvPercent = Math.round(parseFloat(houseHoldPvPercentageNoEms));
    roundedGridFeedPercentage = this.adjustPercentage(roundedGridFeedPercentage, roundedHouseholdUsagePercentage, roundedHouseholdpvPercent);

    var roundedGridFeedPercentageNoEMS = Math.round(parseFloat(gridFeedPercentageNoEms));
    var roundedHouseholdpvPercentNoEMS = Math.round(parseFloat(houseHoldPvPercentageNoEms));
    roundedHouseholdpvPercentNoEMS = this.adjustPercentage(roundedHouseholdpvPercentNoEMS, roundedGridFeedPercentageNoEMS);

    const VictoryPieData = [
      { x: 3, y: roundedGridFeedPercentage, name: "grid", label: roundedGridFeedPercentage + "%", img: "/img/grid_out.svg", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" },
      { x: 2, y: roundedHouseholdUsagePercentage, name: "plug", label: roundedHouseholdUsagePercentage + "%", img: "/img/plug.svg", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" },
      { x: 1, y: roundedHouseholdpvPercent, name: "pv", label: roundedHouseholdpvPercent + "%", img: "/img/house_pv.svg", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" },
    ];

    const pieColors = [this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E"];

    const VictoryPieDataNoEms = [
      { x: 2, y: roundedGridFeedPercentageNoEMS, name: "grid", label: roundedGridFeedPercentageNoEMS + "%", img: "/img/grid_out.svg", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" },
      { x: 1, y: roundedHouseholdpvPercentNoEMS, name: "pv", label: roundedHouseholdpvPercentNoEMS + "%", img: "/img/house_pv.svg", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" },
    ];
    const pieColorsNoEms = [this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E"];

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", height: "300px", top: "0", left: "0" /*maxWidth: '450px'*/ }}>
            <div id="householdUse-1-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
              <VictoryPie
                data={VictoryPieData}
                width={pieChartSize}
                padding={{ top: 0 }}
                colorScale={pieColors}
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

            <div id="householdUse-2-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

            <div id="householdUse-1-noEMS-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

            <div id="householdUse-2-noEMS-hidden" style={{ position: "absolute", width: "100%", height: "300px", display: "none" }}>
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

            <div id="householdUse-1" style={{ position: "absolute", width: "100%", height: "300px" }}>
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
                  labels: { fill: ({ datum }) => datum.color, border: "2px solid red", background: "white", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold", fontSize: pieLabelFontSize },
                }}
                labelComponent={<VictoryLabel backgroundStyle={{ fill: "white" }} backgroundPadding={6} />}
              />
            </div>

            <div id="householdUse-2" style={{ position: "absolute", width: "100%", height: "300px" }}>
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
            <HouseholdSwitch />
          </div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(HouseholdUse));
