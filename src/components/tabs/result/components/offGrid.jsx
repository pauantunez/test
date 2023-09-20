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

export function getImage() {
    const img = new Image();
    img.src = 'https://www.chartjs.org/chartjs-plugin-annotation/latest/favicon.png';
    return img;
  }

  export function getSpiral() {
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const ctx = canvas.getContext('2d');
    ctx.moveTo(centerX, centerY);
    ctx.beginPath();
    for (let i = 0; i < 720; i++) {
      const angle = 0.1 * i;
      const x = centerX + angle * Math.cos(angle);
      const y = centerX + angle * Math.sin(angle);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#666";
    ctx.stroke();
    return canvas;
  }
  
  export function getHouse() {
    const canvas = document.createElement('canvas');
    canvas.width = 230;
    canvas.height = 210;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#666';
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 90, 150, 110);
    ctx.fillRect(95, 140, 40, 60);
    ctx.beginPath();
    ctx.moveTo(15, 90);
    ctx.lineTo(115, 10);
    ctx.lineTo(215, 90);
    ctx.closePath();
    ctx.stroke();
    return canvas;
  }

  function yValue(ctx, label) {
    const chart = ctx.chart;
    const dataset = chart.data.datasets[0];
    return dataset.data[chart.data.labels.indexOf(label)];
  }

const annotation1 = {
    type: 'label',
    drawTime: 'afterDraw',
    content: getImage(),
    width: 50,
    height: 50,
    xValue: 51,
    yValue: (ctx) => yValue(ctx, 51),
    xAdjust: 150,
    yAdjust: -150,
  };

  const annotation2 = {
    type: 'label',
    drawTime: 'afterDraw',
    content: getImage(),
    width: 50,
    height: 50,
    xValue: 4,
    yValue: 30,
    xAdjust: 150,
    yAdjust: 150,
  };

  const annotationHouse = {
    type: 'label',
    content: getHouse(),
    xValue: 9,
    yValue: 30
  };

  const annotationSpiral = {
    type: 'label',
    content: getSpiral(),
    position: {
        x: 'center',
        y: 'center'
      },
  };

  const annotationImage = {
  type: 'ellipse',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderWidth: 1,
  borderColor: '#F27173',
  yMin: 30,
  yMax: 80,
  xMax: 2,
  xMin: 5,
  label: {
    display: true,
    content: getImage(),
    width: 150,
    height: 150,
    position: 'center'
  }
};

const leftPie = 45;
const topPie = 35;
const bottomPie = 20;

const pieData = {
    labels: false,
    datasets: [
      {
        label: false,
        data: [topPie,bottomPie,leftPie],
        backgroundColor: ['#A4ABB3','#00884A','#18837E'],
        borderWidth: 8,
        radius: '100%',
        animation: {
            animateRotate: false
        },
      }
    ]
  };

  const outsideLabelValue = '2.222 kWh';

  const pieConfig = {
      responsive: true,
      aspectRatio: 1,
      plugins: {
        annotation: {
            annotations: {
                //annotation1,
                //annotation2,
                  /*label2: {
                    type: 'label',
                    xValue: 20.5,
                    yValue: 60,
                    borderRadius: 20,
                    backgroundColor: 'blue',
                    content: ['This is my text', 'This is my text, second line'],
                    font: {
                      size: 14
                    },
                    position: {
                        x: 'center',
                        y: 'center'
                    },
                    yAdjust: 80,
                    xAdjust: 120
                  }*/
            }
        },
        datalabels: {
            /*color: '#FFF',
            font: {
                family: 'Bosch-Bold',
                size: '16px'
            },
            align: 'center',
            formatter: function(value, context) {
                return Math.round(value) + '%';
              }*/
              labels: {
                /*index: {
                  color: '#404040',
                  font: {
                    size: 18,
                  },
                  // See https://chartjs-plugin-datalabels.netlify.app/guide/options.html#option-context
                  formatter: function(value, context) {
                    if(context.dataIndex == 1) {
                        return '4.000 kWh';
                    } else {
                        return outsideLabelValue;
                    }
                    
                  },
                  font: {
                    family: 'Bosch-Bold',
                    size: '12px'
                    },
                  align: 'end',
                  anchor: 'end',
                },*/
                value: {
                  color: '#FFF',
                  padding: 0,
                  formatter: function(value, context) {
                    return Math.round(value) + '%';
                  },
                  font: {
                    family: 'Bosch-Bold',
                    size: '16px'
                    },
                  align: 'bottom',
                },
              },
          },
        tooltip: {
            enabled: false
        },
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Pie Chart'
        }
      }
  };

  /*const VictoryPieData = 
    [
        { x: 1, y: 2, label: "one" },
        { x: 2, y: 3, label: "two" },
        { x: 3, y: 5, label: "three" }
    ]*/

    const VictoryPieData = 
    [
        { x: 3, y: 35, name: "heatpump", label: "3.000 kWh", img: "/img/grid_in.svg", color: "#004975" },
        { x: 2, y: 20, name: "ev", label: "1.400 kWh", img: "/img/plug.svg", color: "#C535BC" },
        { x: 1, y: 45, name: "household", label: "1.000 kWh", img: "/img/pv.svg", color: "#9E2896" },
    ]

        const VictoryPieDataTest = 
    [
        { x: 3, y: 35, name: "heatpump", label: "35%", img: "/img/grid_in.svg", color: "#004975" },
        { x: 2, y: 20, name: "ev", label: "20%", img: "/img/plug.svg", color: "#C535BC" },
        { x: 1, y: 45, name: "household", label: "45%", img: "/img/pv.svg", color: "#9E2896" },
    ]


    //const imgUrl ="https://pbs.twimg.com/profile_images/1120740691011702784/scAOUrJe_400x400.png";
  

    const imgUrl =
    "/img/heatpump_small.svg";
  
  function CustomLabelComponent(props) {
    const { x, y, datum, label } = props;
    console.log(datum);
    const imgHeight = 60;
    const imgWidth = 60;
    const padding = 5;
    var xPositionIcon;
    var xPositionLabel;
    var xPositionPercentage;
    var yPositionPercentage;
    var xPositionIconTest = x - 40;

    if(datum.name == "heatpump") {
        xPositionIcon = x - 40;
        xPositionLabel = x + 25
        xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) - 10;
        yPositionPercentage = y + 50;
    }
    else if(datum.name == "ev") {
        xPositionIcon = x - 40;
        xPositionLabel = x + 25;

        if(datum.endAngle > 180) {
            //xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) + 10;
            console.log(x);
            console.log(y);

            //xPositionPercentage = datum.endAngle - datum.startAngle;
            xPositionPercentage = x;
            //288 - 108 = 180
        } else {
            //xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) - 10;
            xPositionPercentage = x;
        }

        /*console.log(x - ((datum.endAngle - datum.startAngle) / 2) - 10);
        console.log(((datum.endAngle - datum.startAngle) / 2) - 10);
        console.log(x);*/
        yPositionPercentage = y - 50;
    }
    else if(datum.name == "household") {
        xPositionIcon = x - 20;
        xPositionLabel = x - 60;
        //xPositionPercentage = x + ((datum.endAngle - datum.startAngle) / 2) - 10;
        xPositionPercentage = x + 50;
        yPositionPercentage = y;
    }

    return (
      <React.Fragment>
        <image
      href={datum.img}
      x={xPositionIcon}
      y={y - 30}
      /*x={x - imgWidth / 2}
      y={y - imgHeight - padding}*/
      height={imgHeight}
      width={imgWidth}
        />
        <text x={xPositionLabel} y={y} class="small" fill={datum.color} font-family="Bosch-Bold">{datum.label}</text>
        <text x={xPositionPercentage} y={yPositionPercentage} fill="#FFF">{datum.y}%</text>
    </React.Fragment>
    );
  }
  

  function CustomLabelComponentTest(props) {
    const { x, y, datum, label } = props;
    console.log(datum);
    const imgHeight = 75;
    const imgWidth = 75;
    const padding = 5;
    var xPositionIcon;
    var yPositionIcon;
    var xPositionLabel;
    var xPositionPercentage;
    var yPositionPercentage;
    var xPositionIconTest = x - 40;

    if(datum.name == "heatpump") {
        xPositionIcon = x - 5;
        yPositionIcon = y - 30;
        xPositionLabel = x + 38
        xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) - 10;
        yPositionPercentage = y + 50;
    }
    else if(datum.name == "ev") {
        xPositionIcon = x - 55;
        yPositionIcon = y - 45;
        xPositionLabel = x + 28;

        if(datum.endAngle > 180) {
            //xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) + 10;
            console.log(x);
            console.log(y);

            //xPositionPercentage = datum.endAngle - datum.startAngle;
            xPositionPercentage = x;
            //288 - 108 = 180
        } else {
            //xPositionPercentage = x - ((datum.endAngle - datum.startAngle) / 2) - 10;
            xPositionPercentage = x;
        }

        /*console.log(x - ((datum.endAngle - datum.startAngle) / 2) - 10);
        console.log(((datum.endAngle - datum.startAngle) / 2) - 10);
        console.log(x);*/
        yPositionPercentage = y - 50;
    }
    else if(datum.name == "household") {
        xPositionIcon = x - 20;
        yPositionIcon = y - 30;
        xPositionLabel = x - 120;
        //xPositionPercentage = x + ((datum.endAngle - datum.startAngle) / 2) - 10;
        xPositionPercentage = x + 50;
        yPositionPercentage = y;
    }

    return (
      <React.Fragment>
        <image
      href={datum.img}
      x={xPositionIcon}
      y={yPositionIcon}
      /*x={x - imgWidth / 2}
      y={y - imgHeight - padding}*/
      height={imgHeight}
      width={imgWidth}
        />
        
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
            TCO_EUR_a: '965.9769603',
            OPEX_EUR_a: '-535.055231',
            CAPEX_EUR_a: '1501.032191',
            CO2_kg_a: '-885.8828844',
            TCO_thermal_EUR_a: '591.7784389',
            Power_kW_PV_MFH: '14',
            results: Array,
            Eta_sh_gas_EDWW_MFH_Brine: String,
        }

        //this.onInputchange = this.onInputchange.bind(this);
    }

    static contextType = AppContext

    componentWillMount() {

      const { products, btnThemes, fonts, setFwdBtn } = this.context;
      const productsProps = Object.getOwnPropertyNames(products);
      var foundTheme = 0;

      setFwdBtn(false);
  
      if(urlParams.get('theme')) {
        entryParam = urlParams.get('theme');
        //alert(entryParam)
  
        for(let themes = 0; themes < productsProps.length; themes++) {
  
          if(entryParam === productsProps[themes]) {
            console.log(productsProps[themes])
  
            require("../../../../styles/"+productsProps[themes]+".css");
            
            selectedTheme = productsProps[themes];
            /*btnColor = btnThemes[entryParam][0];
            themeFont = fonts[entryParam][0];
            labelFont = fonts[entryParam][1];
            console.log(selectedTheme);*/
  
            foundTheme++;
          } else {
            require("ignore");
            console.log("ignore:" + productsProps[themes])
          }
          
        }
  
        if(foundTheme === 0) {
          require("../../../../styles/"+productsProps[0]+".css");
          selectedTheme = productsProps[0];
          /*btnColor = btnThemes.bosch[0];
          themeFont = fonts.bosch[0];
          labelFont = fonts.bosch[1];*/
          
        }
  
      } else {
        require("../../../../styles/"+productsProps[0]+".css");
        selectedTheme = productsProps[0];
        /*btnColor = btnThemes.bosch[0];
        themeFont = fonts.bosch[0];
        labelFont = fonts.bosch[1];*/
       
      }

    

    }

    componentDidMount() {


    }


    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

          return  ( 
          <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>

                <div style={{position: 'relative', width: '100%', height: '300px', top: '0', left: '0', /*maxWidth: '450px'*/}}>
                    { /*<Pie id="offgrid" data={pieData} options={pieConfig} />*/ }
                    { /*<VictoryPie
                    colorScale={["#004975", "#C535BC", "#9E2896" ]}
                    width={400}
                    height={280}
                    padding={{top: 20, bottom: 20}}

                        labels={({ datum }) => datum.label}
                        labelComponent={<CustomLabelComponent label="4.000 kWh" />}
                        data={VictoryPieData}
                    />*/ }
                    <div style={{position: 'absolute', width: '100%', height: '300px'}}>
                        <VictoryPie
                        data={VictoryPieDataTest}
                        width={410}
                        colorScale={["#A4ABB3", "#00884A", "#18837E" ]}
                        labelRadius={({ innerRadius }) => innerRadius + 55 }
                        /*radius={({ datum }) => 50 + datum.y * 20}*/
                        innerRadius={0}
                        style={{ data: {
                            fillOpacity: 1, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: 20 } }}
                        />
                        </div>

                        <div style={{position: 'absolute', width: '100%', height: '300px'}}>
                        <VictoryPie
                        data={VictoryPieData}
                        width={410}
                        colorScale={["#A4ABB3", "#00884A", "#18837E" ]}
                        labelComponent={<CustomLabelComponentTest />}
                        /*radius={({ datum }) => 50 + datum.y * 20}*/
                        style={{ data: {
                            fillOpacity: 0, stroke: "#fff", strokeWidth: 6
                        }, labels: { fill: "white", fontFamily: "Bosch-Bold", fontSize: 20 } }}
                        />
                    </div>

                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'}}>
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