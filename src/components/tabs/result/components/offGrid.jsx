import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../../AppContext'
import {
  Button,
} from 'reactstrap';
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title, } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { VictoryChart, VictoryBar, VictoryPie, VictoryLabel } from 'victory';
 
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CustomSwitch from './switch';
import InfoButton from '../../infoButton';

import { Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import pattern from 'patternomaly';
import {ReactComponent as LightningIcon} from '../../../../assets/img/icons/lightning_chart.svg';
import {ReactComponent as PVIcon} from '../../../../assets/img/icons/photovoltaic_chart.svg';
import {ReactComponent as ElectricityIcon} from '../../../../assets/img/icons/electricity_sun_chart.svg';

import {ReactComponent as GridIn} from '../../../../assets/img/grid_in.svg';
import {ReactComponent as Plug} from '../../../../assets/img/plug.svg';
import {ReactComponent as PV} from '../../../../assets/img/pv.svg';

import CircularProgress from '@mui/material/CircularProgress';


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

    if(datum.name == "grid") {
        xPositionIcon = x - xPositionIconMargin;
        yPositionIcon = y + yPositionIconMargin;
        xPositionLabel = x + xPositionHeatpumpLabel;
        yPositionLabel = y - yPositionHeatpumpLabel;

        iconToUse = <GridIn width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />
    }
    else if(datum.name == "plug") {
        xPositionIcon = x - xPositionEVIconMargin;
        yPositionIcon = y + yPositionEVIconMargin;
        xPositionLabel = x + xPositionEVLabel;
        yPositionLabel = y - yPositionEVLabel;

        iconToUse = <Plug width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />
    }
    else if(datum.name == "pv") {
        xPositionIcon = x - xPositionHouseholdIconMargin;
        yPositionIcon = y + yPositionHouseholdIconMargin;
        xPositionLabel = x - xPositionHouseholdLabel;
        yPositionLabel = y - yPositionHouseholdLabel;

        iconToUse = <PV width={imgWidth} height={imgHeight} x={xPositionIcon} y={yPositionIcon - 30} />
    }

    return (
      <React.Fragment>
    
        {iconToUse}
        
      </React.Fragment>
    );
  }


class OffGrid extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            results: Array,
            Eta_sh_gas_EDWW_MFH_Brine: String,
            ems: props.ems,
            infoBoxOffGridGridUsage: 0
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
      //console.log(window.innerWidth);

      if (window.innerWidth < 1300) {
          //size, iconSize, innerRadius, fontSize, xHeatpumpLabel, xEVLabel, xHouseholdLabel, yHeatpumpLabel, yEVLabel, yHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin
          setPieSize(290, 50, 37, 16, 16, 2, 65, 0, 0, 36, 40, 15, 45, -10, 10, 0)
      } else if(window.innerWidth > 1300) {
          setPieSize(330, 75, 55, 20, 38, 28, 90, 0, 0, 34, 40, 15, 55, -20, 20, 0)
      }

    }

    pvUsagePercentage = (type) => {
      const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

      var pvUsagePercent = (parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage) * 100;
      console.log("PV USAGE: "+ pvUsagePercent);

      return pvUsagePercent;
    }

    pvUsagePercentageEMS = (type) => {
      const { noEMSPercentageOffGrid, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

      var pvUsagePercentEMS = (parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage) * 100;
      console.log("PV USAGE: "+ pvUsagePercentEMS);

      return pvUsagePercentEMS;
    }

    gridUsagePercentage = (type) => {
      const { infoBoxOffGridGridUsage, setInfoBoxOffGridGridUsage, heatpumpCombinedUsage, energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH, setHeatpumpCombinedUsage, EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = this.context;

      var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(heatpumpCombinedUsage) * 100);
      console.log("GRID USAGE: "+ gridUsagePercent);

      if(!this.state.infoBoxOffGridGridUsage) {
        setInfoBoxOffGridGridUsage(gridUsagePercent)
        this.setState({infoBoxOffGridGridUsage: true})
        console.log("infoBoxOffGridGridUsage: "+gridUsagePercent)
      }

      return gridUsagePercent;
    }

    componentDidMount() {
      const { loading, setOffGrid1SVG, offgrid1SVG, setOffGrid2SVG, setOffgrid1SVG_NoEMS_Hidden, setOffgrid2SVG_NoEMS_Hidden, setOffgrid1SVG_EMS_Hidden, setOffgrid2SVG_EMS_Hidden } = this.context;
      window.addEventListener("resize", this.handleResize)
      
    if(!loading) {
      const offgridChart1 = document.getElementById('offgrid-1');
      const offgrid1_svg = offgridChart1.getElementsByTagName('svg');

      const offgridChart2 = document.getElementById('offgrid-2');
      const offgrid2_svg = offgridChart2.getElementsByTagName('svg');

      const offgridChart1_NoEMS = document.getElementById('offgrid-1-hidden');
      const offgridChart1_NoEMS_svg = offgridChart1_NoEMS.getElementsByTagName('svg');

      const offgridChart2_NoEMS = document.getElementById('offgrid-2-hidden');
      const offgridChart2_NoEMS_svg = offgridChart2_NoEMS.getElementsByTagName('svg');

      const offgridChart1_EMS = document.getElementById('offgrid-1-ems-hidden');
      const offgridChart1_EMS_svg = offgridChart1_EMS.getElementsByTagName('svg');

      const offgridChart2_EMS = document.getElementById('offgrid-2-ems-hidden');
      const offgridChart2_EMS_svg = offgridChart2_EMS.getElementsByTagName('svg');

      setOffGrid1SVG(offgrid1_svg[0]);
      setOffGrid2SVG(offgrid2_svg[0]);
      setOffgrid1SVG_NoEMS_Hidden(offgridChart1_NoEMS_svg[0]);
      setOffgrid2SVG_NoEMS_Hidden(offgridChart2_NoEMS_svg[0]);
      setOffgrid1SVG_EMS_Hidden(offgridChart1_EMS_svg[0]);
      setOffgrid2SVG_EMS_Hidden(offgridChart2_EMS_svg[0]);

      console.log(offgridChart1_NoEMS_svg[0]);
    }

    }


    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { loading, setInfoBoxOffGridGridUsage, noEMSPercentageOffGrid, pieChartSize, pieIconSize, innerRadiusMargin, pieLabelFontSize, xPositionHeatpumpLabel, xPositionEVLabel, xPositionHouseholdLabel, yPositionHeatpumpLabel, yPositionEVLabel, yPositionHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime, setOffgridEMS, offgridEMS } = this.context;
      var VictoryPieData = [];
      var VictoryPieDataTest = [];
      var pieColors = [];

      var VictoryPieData1EMS = [];
      var VictoryPieData2EMS = [];
      var pieColors1EMS = [];
      var VictoryPieData1NoEMS = [];
      var VictoryPieData2NoEMS = [];
      var pieColors2NoEMS = [];

      if(offgridEMS === true) {
        VictoryPieData = 
        [
            { x: 3, y: this.gridUsagePercentage(), name: "grid", label: "3.000 kWh", img: "img/grid_in.svg", color: "#004975" },
            { x: 2, y: this.pvUsagePercentage() - noEMSPercentageOffGrid, name: "plug", label: "1.400 kWh", img: "img/plug.svg", color: "#C535BC" },
            { x: 1, y: this.pvUsagePercentage(), name: "pv", label: "1.000 kWh", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#9E2896" },
        ]
    
        VictoryPieDataTest = 
        [
            { x: 3, y: this.gridUsagePercentage(), name: "grid", label: Math.round(parseFloat(this.gridUsagePercentage()).toFixed(2)) + "%", img: "img/grid_in.svg", color: "#A4ABB3" },
            { x: 2, y: this.pvUsagePercentage() - noEMSPercentageOffGrid, name: "plug", label: Math.round(parseFloat(this.pvUsagePercentage() - noEMSPercentageOffGrid).toFixed(2)) + "%", img: "img/plug.svg", color: "#00884A" },
            { x: 1, y: this.pvUsagePercentage(), name: "pv", label: Math.round(parseFloat(noEMSPercentageOffGrid).toFixed(2)) + "%", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
        ]

        pieColors = ["#A4ABB3", "#00884A", "#18837E"];

      } else if(offgridEMS === false) {
        VictoryPieData = 
        [
            { x: 3, y: this.gridUsagePercentage(), name: "grid", label: "3.000 kWh", img: "img/grid_in.svg", color: "#A4ABB3" },
            { x: 1, y: this.pvUsagePercentage(), name: "pv", label: "1.000 kWh", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
        ]
    
        VictoryPieDataTest = 
        [
            { x: 3, y: this.gridUsagePercentage(), name: "grid", label: Math.round(parseFloat(this.gridUsagePercentage().toFixed(2))) + " %", img: "img/grid_in.svg", color: "#A4ABB3" },
            { x: 1, y: this.pvUsagePercentage(), name: "pv", label: Math.round(parseFloat(this.pvUsagePercentage()).toFixed(2)) + " %", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#18837E" },
        ]

        pieColors = ["#A4ABB3", "#18837E"]
      }


      //Data for hidden Charts

      //With EMS
      VictoryPieData1EMS = 
      [
          { x: 3, y: 35, name: "grid", label: "35%", img: "img/grid_in.svg", color: "#004975" },
          { x: 2, y: 20, name: "plug", label: "20%", img: "img/plug.svg", color: "#C535BC" },
          { x: 1, y: 45, name: "pv", label: "45%", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#9E2896" },
      ]
      pieColors1EMS = ["#A4ABB3", "#00884A", "#18837E"];

      //No EMS
      VictoryPieData1NoEMS = 
      [
        { x: 3, y: 45, name: "grid", label: "45%", img: "img/grid_in.svg", color: "#004975" },
        { x: 1, y: 55, name: "pv", label: "55%", img: "https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w100", color: "#9E2896" },
      ]
      pieColors2NoEMS = ["#A4ABB3", "#18837E"]


          return  ( 
          <div>
            {!loading &&
            <div style={{display: 'flex', justifyContent: 'center'}}>

                <div style={{position: 'relative', width: '100%', height: '300px', top: '0', left: '0', /*maxWidth: '450px'*/}}>
                    <div id="offgrid-1-ems-hidden" style={{position: 'absolute', width: '100%', height: '300px', display: 'none'}}>
                        <VictoryPie
                        data={VictoryPieData1EMS}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors1EMS}
                        labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin }
                        innerRadius={0}
                        style={{ data: {
                            fillOpacity: 1, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                        />
                    </div>
                    <div id="offgrid-2-ems-hidden" style={{position: 'absolute', width: '100%', height: '300px', display: 'none'}}>
                        <VictoryPie
                        data={VictoryPieData1EMS}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors1EMS}
                        labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                        style={{ data: {
                            fillOpacity: 0, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                        />
                    </div>

                    <div id="offgrid-1-hidden" style={{position: 'absolute', width: '100%', height: '300px', display: 'none'}}>
                        <VictoryPie
                        data={VictoryPieData1NoEMS}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors2NoEMS}
                        labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin }
                        innerRadius={0}
                        style={{ data: {
                            fillOpacity: 1, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                        />
                    </div>
                    <div id="offgrid-2-hidden" style={{position: 'absolute', width: '100%', height: '300px', display: 'none'}}>
                        <VictoryPie
                        data={VictoryPieData1NoEMS}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors2NoEMS}
                        labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                        style={{ data: {
                            fillOpacity: 0, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                        />
                    </div>

                    <div id="offgrid-1" style={{position: 'absolute', width: '100%', height: '300px' }}>
                        <VictoryPie
                        data={VictoryPieDataTest}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors}
                        labelRadius={({ innerRadius }) => innerRadius + innerRadiusMargin }
                        innerRadius={0}
                        style={{ data: {
                            fillOpacity: 1, stroke: "#fff", strokeWidth: 4
                        }, labels: { fill: ({ datum }) => datum.color, fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize }
                        }}
                        labelComponent={
                          <VictoryLabel
                            backgroundStyle={{ fill: "white" }}
                            backgroundPadding={6}
                          />
                        }
                        />
                        </div>

                        <div id="offgrid-2" style={{position: 'absolute', width: '100%', height: '300px' }}>
                        <VictoryPie
                        data={VictoryPieData}
                        width={pieChartSize}
                        padding={{ top: 0 }}
                        colorScale={pieColors}
                        labelComponent={<CustomLabelComponent iconSize={pieIconSize} fontSize={pieLabelFontSize} xPositionIconMargin={xPositionIconMargin} yPositionIconMargin={yPositionIconMargin} xPositionEVIconMargin={xPositionEVIconMargin} yPositionEVIconMargin={yPositionEVIconMargin} xPositionHouseholdIconMargin={xPositionHouseholdIconMargin} yPositionHouseholdIconMargin={yPositionHouseholdIconMargin} xPositionHeatpumpLabel={xPositionHeatpumpLabel} xPositionEVLabel={xPositionEVLabel} xPositionHouseholdLabel={xPositionHouseholdLabel} yPositionHeatpumpLabel={yPositionHeatpumpLabel} yPositionEVLabel={yPositionEVLabel} yPositionHouseholdLabel={yPositionHouseholdLabel} />}
                        style={{ data: {
                            fillOpacity: 0, stroke: "#fff", strokeWidth: 0
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: pieLabelFontSize } }}
                        />
                    </div>

                </div>
            </div>
            }

            {loading &&
             <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{position: 'relative', width: '100%', height: '300px', top: '0', left: '0'}}>
                  <div style={{position: 'absolute', left: '50%', top: '100px'}}>
                    Lädt...
                  </div>
                </div>
             </div>
            }

            <div data-html2canvas-ignore style={{display: 'flex', marginTop: '30px', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <CustomSwitch />
                <div style={{marginLeft: '12px', marginRight: '12px', paddingTop: '2px', fontFamily: 'Bosch-Regular', fontSize: '16px'}}>
                    Mit Energiemanagementsystem
                </div>
                <div>
                    <InfoButton color="#007BC0" size="14px" placement="right" text="Unter Energiemanagement wird die Kombination verschiedener Maßnahmen und Strategien verstanden, um Energie zu beschaffen, zu verteilen und optimal zu nutzen. Ziel ist es, Energieverbräuche zu senken und die Energieeffizienz im Haushalt zu optimieren, um wirtschaftliche und ökologische Ziele zu erreichen." />
                </div>
            </div>
          </div>
          )

  }
}

export default withRouter(withTranslation()(OffGrid));