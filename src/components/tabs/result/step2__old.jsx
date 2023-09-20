import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../../AppContext'
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
  Title, } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var selectedTheme;
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

const doughnutData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const datapoints = [-27300, null, null, null, null, null, null, 0, null, null, null, 8000];
const lineData = {
  //labels: ["0", "22"],
  labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
  datasets: [
    {
      label: false,
      data: datapoints,
      borderColor: 'green',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      spanGaps: true
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
    }
  },
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      min: -30000,
      max: 20000,
      ticks: {
        stepSize: 10000,
          // Include a dollar sign in the ticks
          callback: function(value, index, ticks) {
              return value + '€';
          }
      }
  }
  }
};

class ResultStep2 extends React.Component {
  
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
  
            require("../../../styles/"+productsProps[themes]+".css");
            
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
          require("../../../styles/"+productsProps[0]+".css");
          selectedTheme = productsProps[0];
          /*btnColor = btnThemes.bosch[0];
          themeFont = fonts.bosch[0];
          labelFont = fonts.bosch[1];*/
          
        }
  
      } else {
        require("../../../styles/"+productsProps[0]+".css");
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

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption } = this.context;

          return  ( 
          <div>

            

            <p>Eregbnis Teil 2</p>

            <TextField id="filled-basic" name="TCO_EUR_a" value={this.state.TCO_EUR_a} label="TCO_EUR_a" variant="filled" onChange={this.onInputchange} />
            <br /><br />
            <TextField id="filled-basic" name="OPEX_EUR_a" value={this.state.OPEX_EUR_a} label="OPEX_EUR_a" variant="filled" onChange={this.onInputchange} />
            <br /><br />
            <TextField id="filled-basic" name="CAPEX_EUR_a" value={this.state.CAPEX_EUR_a} label="CAPEX_EUR_a" variant="filled" onChange={this.onInputchange} />
            <br /><br />
            <TextField id="filled-basic" name="CO2_kg_a" value={this.state.CO2_kg_a} label="CO2_kg_a" variant="filled" onChange={this.onInputchange} />
            { /*<br /><br />
            <TextField id="filled-basic" name="TCO_thermal_EUR_a" value={TCO_thermal_EUR_a} label="TCO_thermal_EUR_a" variant="filled" onChange={this.inputTCO_thermal_EUR_a} />
            <br /><br />
          <TextField id="filled-basic" name="Power_kW_PV_MFH" value={Power_kW_PV_MFH} label="Power_kW_PV_MFH" variant="filled" onChange={this.inputPower_kW_PV_MFH} />*/ }

            <br /><br />
            <Button id="previousTabBtn" className="btnBackground" onClick={() => { this.getResult() }}>Result from API</Button>

            <div style={{maxWidth: '550px'}}>
              { /*<Doughnut data={doughnutData} />*/ }
              <Line options={lineOptions} data={lineData} />
            </div>

            <br /><br />

            

            <div style={{display: 'flex', width: '100%', height: '40px', background: 'green', color: 'white'}}>
              <div style={{width: elc_Self_Consumption+'%', background: 'red', textAlign: 'center'}}>{elc_Self_Consumption}%</div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(ResultStep2));