import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'

import { withTranslation } from 'react-i18next';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title, } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { VictoryPie, VictoryLabel } from 'victory';
import {ReactComponent as Heatpump} from '../../../../assets/img/heatpump_small.svg';
import {ReactComponent as EV} from '../../../../assets/img/ev_small.svg';
import {ReactComponent as Household} from '../../../../assets/img/household_small.svg';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
  

  function CustomLabelComponent(props) {
    const { x, y, datum, label } = props;
    console.log(props);
    const imgHeight = props.iconSize;
    const imgWidth = props.iconSize;
    const fontSize = props.fontSize;
    const pieLabelFontSize = props.pieLabelFontSize;
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

    if(datum.name == "heatpump") {
        xPositionIcon = x - xPositionIconMargin;
        yPositionIcon = y + yPositionIconMargin;
        xPositionLabel = x + xPositionHeatpumpLabel;
        yPositionLabel = y - yPositionHeatpumpLabel;

        iconToUse = <Heatpump width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />
    }
    else if(datum.name == "ev") { 
        xPositionIcon = x - xPositionEVIconMargin;
        yPositionIcon = y + yPositionEVIconMargin;
        xPositionLabel = x + xPositionEVLabel;
        yPositionLabel = y - yPositionEVLabel;

        iconToUse = <EV width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />
    }
    else if(datum.name == "household") {
          xPositionIcon = x - xPositionHouseholdIconMargin;
          yPositionIcon = y + yPositionHouseholdIconMargin;
          xPositionLabel = xPositionIcon - xPositionHouseholdLabel;
          yPositionLabel = yPositionIcon - yPositionHouseholdLabel;

        iconToUse = <Household width={imgWidth} height={imgHeight} x={xPositionIcon} y={y - 30} />
    }

    return (
      <React.Fragment>
        {iconToUse}
        <text x={xPositionLabel} y={yPositionLabel} class="small" fill={datum.color} font-family="Bosch-Bold" font-size={fontSize}>{datum.label}</text>  
      </React.Fragment>
    );
  }

class ElectricityUse extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            results: Array,
        }
    }

    static contextType = AppContext

    componentWillMount() {
      const { products, btnThemes, fonts, setFwdBtn } = this.context;

      setFwdBtn(false);
      this.handleResize();
    
    }

    handleResize = () => {
        const { pieChartSize, setPieSize } = this.context;
        console.log(window.innerWidth);

        if (window.innerWidth < 1300) {
            setPieSize(290, 50, 37, 14, 16, 2, 65, 0, 0, 36, 40, 15, 55, 5, 10, 0)
        } else if(window.innerWidth > 1300) {
            setPieSize(320, 70, 55, 18, 38, 25, 90, 0, 0, 34, 40, 15, 55, 5, 20, 0)
        }

      }
    
      heatpumpUsageKWH = (type) => {
        const { heatpumpType, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
        var Avg_Eff_JAZ_HP;

        if(heatpumpType === "1") {
          Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH
        } else {
          Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH
        }

        //Enegery usage heatpump
        var energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);
        console.log("RESULT: "+ energyUsageHeatpump);

        var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);
        console.log("RESULT HEATING ROD: "+ energyUsageHeatingRod);

        return energyUsageHeatpump+energyUsageHeatingRod;
      }
    
    energyUsageCombined = () => {
        const { heatpumpType, energyUsagekWh, odometerIncreaseKWH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;
        var Avg_Eff_JAZ_HP;

        if(heatpumpType === "1") {
          Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH
        } else {
          Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH
        }

        //Enegery usage heatpump
        var energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);
        console.log("RESULT: "+ energyUsageHeatpump);

        //Energy usage heating rod
        var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);
        console.log("RESULT HEATING ROD: "+ energyUsageHeatingRod);

        return energyUsageHeatpump+energyUsageHeatingRod+parseInt(energyUsagekWh)+odometerIncreaseKWH;
    }

    energyUsagePercentage = (source) => {
      const { heatpumpCombinedUsage, energyUsagekWh, odometerIncreaseKWH } = this.context;

      if(source === "heatpump") {
        return parseFloat((this.heatpumpUsageKWH() / heatpumpCombinedUsage) * 100).toFixed(2);
      } else if(source === "household") {
        return parseFloat((parseInt(energyUsagekWh) / heatpumpCombinedUsage) * 100).toFixed(2);
      } else if(source === "ev") {
        return parseFloat((parseInt(odometerIncreaseKWH) / heatpumpCombinedUsage) * 100).toFixed(2);
      }

    }


    componentDidMount() {

        window.addEventListener("resize", this.handleResize);

        const { setHeatpumpCombinedUsage, setElectricityUse1SVG, setElectricityUse2SVG, electricityUse1SVG, electricityUse2SVG } = this.context;
  
        const electricityUseChart1 = document.getElementById('electricityUse-1');
        const electricityUseChart2 = document.getElementById('electricityUse-2');
        const electricityUseChart1_svg = electricityUseChart1.getElementsByTagName('svg');
        const electricityUseChart2_svg = electricityUseChart2.getElementsByTagName('svg');
  
        console.log(electricityUseChart1)
        console.log(electricityUseChart1_svg[0])
  
        setElectricityUse1SVG(electricityUseChart1_svg[0]);
        setElectricityUse2SVG(electricityUseChart2_svg[0]);

        setHeatpumpCombinedUsage(this.energyUsageCombined())

        setTimeout(() => {
          this.energyUsagePercentage()
        }, "1000");

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

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { odometerIncreaseKWH, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

      const VictoryPieData = [{ x: 3, y: this.heatpumpUsageKWH(), name: "heatpump", label: parseInt(this.heatpumpUsageKWH()).toLocaleString("de-DE") + " kWh", img: "/img/heatpump_small.svg", color: "#004975" }, ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: odometerIncreaseKWH.toLocaleString("de-DE") + " kWh", img: "/img/ev_small.svg", color: "#C535BC" }] : []), { x: 1, y: parseInt(energyUsagekWh), name: "household", label: energyUsagekWh.toLocaleString("de-DE") + " kWh", img: "/img/household_small.svg", color: "#9E2896" }];
      
      // Rounded values for VictoryPieData2
      var roundedEnergyUsagePercentageHeatpump = Math.round(parseFloat(this.energyUsagePercentage("heatpump")));
      var roundedEnergyUsagePercentageEv = Math.round(parseFloat(this.energyUsagePercentage("ev")));
      var roundedHouseholdNoEMSpvPercentHousehold = Math.round(parseFloat(this.energyUsagePercentage("household")));
      roundedEnergyUsagePercentageHeatpump = this.adjustPercentage(roundedEnergyUsagePercentageHeatpump, roundedEnergyUsagePercentageEv, roundedHouseholdNoEMSpvPercentHousehold)
      const VictoryPieData2 = [
        { x: 3, y: this.heatpumpUsageKWH(), name: "heatpump", label: roundedEnergyUsagePercentageHeatpump + "%", img: "/img/heatpump_small.svg", color: "#004975" },
        ...(odometerIncreaseKWH !== 0 ? [{ x: 2, y: odometerIncreaseKWH, name: "ev", label: roundedEnergyUsagePercentageEv + "%", img: "/img/ev_small.svg", color: "#C535BC" }] : []),
        { x: 1, y: parseInt(energyUsagekWh), name: "household", label: roundedHouseholdNoEMSpvPercentHousehold + "%", img: "/img/household_small.svg", color: "#9E2896" },
      ];
      
      
          return  ( 
          <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>

                <div style={{position: 'relative', width: '100%', height: '300px', top: '0', left: '0', /*maxWidth: '450px'*/}}>
                  <div id="electricityUse-1" class="pieContainer" style={{position: 'absolute', width: '100%', height: '300px'}}>
                    <VictoryPie
                      data={VictoryPieData2}
                      width={pieChartSize}
                      padding={{ top: 0 }}
                      pointerEvents="auto"
                      colorScale={["#004975", "#C535BC", "#9E2896" ]}
                      labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin }
                      innerRadius={0}
                      style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto", data: {
                        fillOpacity: 1, stroke: "#fff", strokeWidth: 4
                      }, labels: { fill: ({ datum }) => datum.color, fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                      labelComponent={
                        <VictoryLabel
                          backgroundStyle={{ fill: "white" }}
                          backgroundPadding={6}
                        />
                      }
                    />
                  </div>

                  <div id="electricityUse-2" class="pieContainer" style={{position: 'absolute', width: '100%', height: '300px'}}>
                    <VictoryPie
                      data={VictoryPieData}
                      width={pieChartSize}
                      padding={{ top: 0 }}
                      pointerEvents="auto"
                      colorScale={["#004975", "#C535BC", "#9E2896" ]}
                      labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                      style={{ pointerEvents: "auto", userSelect: "auto", touchAction: "auto", data: {
                        fillOpacity: 0, stroke: "#fff", strokeWidth: 0
                      }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                    />
                  </div>

                </div>
            </div>

            <div class="additional-flex" style={{display: 'flex', justifyContent: 'space-around', marginTop: '38px', fontFamily: 'Bosch-Regular', fontSize: '14px'}}>
                <div style={{display: 'flex', flexDirection: 'row', color: '#9E2896'}}>
                    <div style={{marginRight: '10px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#9E2896', borderRadius: '12px'}}></div>
                    </div>
                    <div>Haushalt</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', color: '#004975'}}>
                    <div style={{marginRight: '10px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#004975', borderRadius: '12px'}}></div>
                    </div>
                    <div>Wärmepumpe</div>
                </div>
                <div style={{display: odometerIncreaseKWH === 0 ? 'none' : 'flex', flexDirection: 'row', color: '#C535BC'}}>
                    <div style={{marginRight: '10px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#C535BC', borderRadius: '12px'}}></div>
                    </div>
                    <div>Elektro-Auto</div>
                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(ElectricityUse));