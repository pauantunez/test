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
  
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import pattern from 'patternomaly';
import {ReactComponent as LightningIcon} from '../../../../assets/img/icons/lightning_chart.svg';
import {ReactComponent as PVIcon} from '../../../../assets/img/icons/photovoltaic_chart.svg';
import {ReactComponent as ElectricityIcon} from '../../../../assets/img/icons/electricity_sun_chart.svg';

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

const datapoints = [-21300, null, null, null, null, null, null, 0, null, null, null, 8000];
const datapoints2 = [-29300, null, null, null, null, null, null, 0, null, null, null, 17000];
const datapoints3 = [0, null, null, null, null, null, null, 0, null, null, null, 0];
const lineData = {
  //labels: ["0", "22"],
  labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
  datasets: [
    {
      label: false,
      data: datapoints,
      borderColor: '#18837E',
      backgroundColor: '#18837E',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.8,
      spanGaps: true,
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
        label: false,
        data: datapoints2,
        borderColor: '#007BC0',
        backgroundColor: '#007BC0',
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.8,
        spanGaps: true,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 5,
      },
      {
        label: false,
        data: datapoints3,
        borderColor: '#9DC9FF',
        borderDash: [5, 5],
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        spanGaps: true,
        pointStyle: false
      }
  ]
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
        enabled: false
    },
    datalabels: {
        display: false
    }
  },
  animations: false,
  /*animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },*/
  scales: {
    x: {
      grid: {
        display: false
      },
      border: {
        display: false
      },
      ticks: {
        color: '#000',
        font: {
            size: 12,
            family: 'Bosch-Regular'
        }
      }
    },
    y: {
      min: -30000,
      max: 20000,
      border: {
        display: false
      },
      ticks: {
        stepSize: 10000,
        color: '#000',
        font: {
            size: 12,
            family: 'Bosch-Regular'
        },
        reverse: true,
        callback: function(value, index, ticks) {
            return value.toLocaleString('de-DE') + ' €';
        }
      }
  }
  }
};

export const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
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
  
  const labels = ['ohne PV', 'mit PV', 'mit PV und Energiemanagement'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [100,200,70,180,200,144],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };


export const barOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
            display: false
        },
        ticks: {
            //option 2, use callback to change labels to empty string
            callback: () => ('')
          }
      },
      y: {
        stacked: true,
        ticks: {
            stepSize: 500,
              callback: function(value, index, ticks) {
                  return value + ' €';
              }
          }
      },
    },
  };
  //const barLabels = ['ohne PV', 'mit PV', 'mit PV und Energiemanagement', 'April', 'May', 'June', 'July'];

  export const barData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [2800,1575,1400],
        backgroundColor: '#007BC0',
        barThickness: 60,
      },
      {
        label: 'Dataset 2',
        data: [0,1225,1400],
        backgroundColor: pattern.draw('diagonal-right-left', '#FFF', '#18837E'),
        barThickness: 60,
      },
    ],
  };

class BreakEven extends React.Component {
  
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

        this.onInputchange = this.onInputchange.bind(this);
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

    inputPower_kW_PV_MFH = (event) => { 
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH } = this.context;

      setPower_kW_PV_MFH(event.target.value) 
    };

    inputTCO_thermal_EUR_a = (event) => { 
      const { overlayToggle, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a } = this.context;

      setTCO_thermal_EUR_a(event.target.value) 
    };

    onInputchange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
      //alert(event.target.name)
    }

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    getResult =() => { 
      const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, setPower_kW_PV_MFH, TCO_thermal_EUR_a, elc_Self_Consumption, setElc_Self_Consumption } = this.context;

      axios.get(`https://bosch-endkundentool-api.azurewebsites.net/results`, { 
        params: { "TCO_EUR_a": this.state.TCO_EUR_a,
                  "OPEX_EUR_a": this.state.OPEX_EUR_a,
                  "CAPEX_EUR_a": this.state.CAPEX_EUR_a,
                  "CO2_kg_a": this.state.CO2_kg_a,
                  "TCO_thermal_EUR_a": TCO_thermal_EUR_a,
                  "Power_kW_PV_MFH": Power_kW_PV_MFH}})
          .then(res => {
            //const persons = res.data;
            //this.setState({ persons });
            //console.log(res.data);
            //this.state.results = res.data;

            //console.log(this.state.results)

            //this.state.Eta_sh_gas_EDWW_MFH_Brine = res.data.data[0].Eta_sh_gas_EDWW_MFH_Brine
            if(res.data.data.length != 0) {
            var gasBrineResult = res.data.data[0].Eta_sh_gas_EDWW_MFH_Brine.toString().substring(0,4) * 100;
            var elc_Self_ConsumptionResult = res.data.data[0].elc_Self_Consumption.toString().substring(0,4) * 100;
            console.log(elc_Self_ConsumptionResult)

            setGasBrine(gasBrineResult)
            setElc_Self_Consumption(elc_Self_ConsumptionResult)

            }

            console.log(res.data.data[0])

            console.log(res)
            console.log(res.data)
            console.log(res.data.data.length)
            
          })
    }

    energyUseEuro =(divided) => { 
        const { energyUsagekWh, electricityCost, costOverTime } = this.context;
        const timeToNum = parseInt(costOverTime)
        console.log(Math.round(energyUsagekWh * (electricityCost / 100) / 6 * divided * timeToNum).toLocaleString("de-DE"))

        return Math.round(energyUsagekWh * (electricityCost / 100) / 6 * divided * timeToNum).toLocaleString("de-DE") + ' €';
    }

    inputCostOverTime = (event) => { 
        const { costOverTime, setCostOverTime, setFwdBtn, steps, setSteps, activeView} = this.context;
        setCostOverTime(event.target.value);
    };

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;

          return  ( 
          <div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px', fontSize: '16px'}}>
                <div>Investitionskosten PV-System:</div>
                <div style={{fontFamily: 'Bosch-Bold'}}>27.500 €</div>
            </div>

            <div style={{maxWidth: '550px'}}>
                <Line options={lineOptions} data={lineData} />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', marginTop: '25px', fontFamily: 'Bosch-Regular', fontSize: '12px'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{marginRight: '15px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#007BC0', borderRadius: '12px'}}></div>
                    </div>
                    <div>Kapitalentwicklung mit PV ohne Energiemanagementsystem</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '6px'}}>
                    <div style={{marginRight: '15px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#18837E', borderRadius: '12px'}}></div>
                    </div>
                    <div>Kapitalentwicklung mit PV mit Energiemanagementsystem</div>
                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(BreakEven));