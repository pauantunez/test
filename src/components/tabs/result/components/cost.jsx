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
import PatternImg from '../../../../assets/img/icons/pattern.svg';
import PatternRoundImg from '../../../../assets/img/icons/pattern_small_round.svg';

import { BrowserView, MobileView, isBrowser, isMobile, isSafari } from 'react-device-detect';

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
        // beginAtZero: true, 
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
        // beginAtZero: true,
        ticks: {
            stepSize: 500,
              callback: function(value, index, ticks) {
                  return value + ' €';
              }
          }
      },
    },
  };

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

class Cost extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            results: Array,
            Eta_sh_gas_EDWW_MFH_Brine: String,
            displayed: props.displayed,
            electricityCostPVEMSsavings: 0,
            electricityCostPVsavings: 0,
            heatpumpPVems: [],
            runningCostPVonly: [],
            runningCostPVems: [],
            totalRunningCostPVonly: 0,
            totalRunningCostPVems: 0,
            ranOnce: false,
            ranceOnceEMS: false
        }

        this.onInputchange = this.onInputchange.bind(this);
    }

    static contextType = AppContext

    componentWillMount() {
      const { products, btnThemes, fonts, setFwdBtn } = this.context;

      setFwdBtn(false);
    
    }

    componentDidMount() {
      this.runningCostPVonly()
    }

    componentDidUpdate() {
      this.resultWithPV()
      this.resultWithPVandEMS()
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
    }

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    energyUseEuro =(divided,bar) => { 
        const { energyUsagekWh, electricityCost, costOverTime } = this.context;

        console.log("energyUsagekWh" + energyUsagekWh)
        console.log("electricityCost" + electricityCost)
        console.log("costOverTime" + costOverTime)

        var timeToNum;
        if(this.state.displayed == undefined) {
           timeToNum = parseInt(costOverTime)
        } else {
          if(this.state.displayed == "single") {
            timeToNum = 1;
          } else {
            timeToNum = 20;
          }
        }
       
        if(!bar) {
          if(costOverTime === "1") {
            // return '- ' + Math.round(energyUsagekWh * (electricityCost / 100) / 5 * divided * timeToNum).toLocaleString() + ' €';
            return Math.round(energyUsagekWh * (electricityCost / 100) / 5 * divided * timeToNum).toLocaleString() + ' €';
          } else {
            // return '- ' + parseInt(this.electricityCostNoPV20Years() / 5 * divided).toLocaleString() + ' €'
            return parseInt(this.electricityCostNoPV20Years() / 5 * divided).toLocaleString() + ' €'
          }
        } else {
          return Math.round(energyUsagekWh * (electricityCost / 100) / 5 * divided * timeToNum)
        }
    }

    energyUseEuroNegative =(multiplier, result) => { 
        const { energyUsagekWh, electricityCost, costOverTime } = this.context;
        var timeToNum;

        if(this.state.displayed == undefined) {
           timeToNum = parseInt(costOverTime)
        } else {
          if(this.state.displayed == "single") {
            timeToNum = 1;
          } else {
            timeToNum = 20;
          }
        }
       
        return '+ ' + parseInt(((result / 5) * (multiplier))).toLocaleString() + ' €';
    }

    electricityCostPV =() => { 
      const { pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;

      if(pvOutput == 0) {
        var pvOutputKW = 4
      } else if (pvOutput == 1) {
        var pvOutputKW = 7
      } else if(pvOutput == 2) {
        var pvOutputKW = 10
      } else if(pvOutput == 3) {
        var pvOutputKW = 14
      }

      console.log("ELECTRICITY")
      console.log(parseFloat(electricityCostOffGridPercentage) / 10000)
      console.log(electricityCostOffGridPercentage)

      return ((parseInt(pvOutputKW) * 1000) * (1 - (parseFloat(electricityCostOffGridPercentage) / 10000)) * (parseFloat(electricityCost) / 100)).toFixed(0)
    }

    electricityCostPVEMS =() => { 
      const { setElectricityCostPVEMSsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;
      
      if(pvOutput == 0) {
        var pvOutputKW = 4
      } else if (pvOutput == 1) {
        var pvOutputKW = 7
      } else if(pvOutput == 2) {
        var pvOutputKW = 10
      } else if(pvOutput == 3) {
        var pvOutputKW = 14
      }

      console.log("ELECTRICITY EMS")
      console.log(1 - parseFloat(electricityCostHouseholdPercentage / 10000))

      const result = ((parseInt(pvOutputKW) * 1000) * (1 - parseFloat(electricityCostOffGridPercentage / 10000) - (parseFloat(gridRevenue) / 100)) * parseFloat(electricityCost) / 100).toFixed(0);      

      return result
    }

    electricityCostNoPV20Years =() => { 
      const { energyUsagekWh, electricityCost } = this.context;

      const result = Math.abs((energyUsagekWh * (parseFloat(electricityCost) / 100)) * (1-(0.02+1) ** 20) / 0.02)

      console.log("1 año " + energyUsagekWh * (parseFloat(electricityCost) / 100))
      console.log("20 año " + Math.abs((energyUsagekWh * (parseFloat(electricityCost) / 100)) * (1-(0.02+1) ** 20) / 0.02))

      return result
      
    }

    electricityCostPV20Years =() => {
      const { PVcostLookupTable, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
      var investmentCostResult

      let PVcostInTable = PVcostLookupTable.find(o => o.pv === pvOutputkWh);
      let StorageCostInTable = StorageCostLookupTable.find(o => o.storage === homeStorageSize);

      if(homeStorageSize === 'none') {
        investmentCostResult = PVcostInTable.cost
      } else {
        investmentCostResult = PVcostInTable.cost + StorageCostInTable.cost
      }

      console.log(investmentCostResult);
      
      const result = Math.abs((1 - (electricityCostOffGridPercentage / 100)) * energyUsagekWh * ((parseFloat(electricityCost) /100) * (1 + 0.02)) * (1 - (0.02 + 1) ** 20) / 0.02)

      console.log("El resultado es: " + result)
      
      return this.electricityCostNoPV20Years()
    }

    runningCostPVonly =() => {
      const { PVcostLookupTable, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
      var totalRunning = 0;

      if(!this.state.ranOnce) {
        for (let index = 0; index < 20; index++) {

          if(this.state.runningCostPVonly.length == 0) {
            this.state.runningCostPVonly.push({expenditure: -Math.abs((1-(electricityCostOffGridPercentage / 100))*4000*((electricityCost/100)*(1+0.02)))})
            console.log(this.state.runningCostPVonly)
            
          } else {

            this.state.runningCostPVonly.push({expenditure: parseFloat(this.state.runningCostPVonly[index-1].expenditure)*(1+0.02)})
            
          }
          
        }

        for (var i = 0; i < this.state.runningCostPVonly.length; i++) {
          totalRunning += this.state.runningCostPVonly[i].expenditure
      }

      console.log(this.state.runningCostPVonly)
      console.log(totalRunning)

      this.setState({totalRunningCostPVonly: totalRunning})
      this.setState({ranOnce: true})

      this.runningCostPVems()
      }


    }

    runningCostPVems =() => {
      const { heatpumpPV, PVcostLookupTable, StorageCostLookupTable, pvOutputkWh, homeStorageSize, energyUsagekWh, electricityCost, electricityCostOffGridPercentage } = this.context;
      var totalRunning = 0;

      if(!this.state.ranOnceEMS) {
        for (let index = 0; index < 20; index++) {

          if(this.state.runningCostPVems.length == 0) {

            this.state.runningCostPVems.push({expenditure: Math.abs(heatpumpPV[0].runningCost + (1-((electricityCostOffGridPercentage + 10) / 100)) * 4000 * ((electricityCost / 100) * (1+0.02)))})
            console.log(this.state.runningCostPVems)

          } else {           
            this.state.runningCostPVems.push({expenditure: parseFloat(this.state.runningCostPVems[index-1].expenditure)*(1+0.02)})
          }
        }

        for (var i = 0; i < this.state.runningCostPVems.length; i++) {
          totalRunning += this.state.runningCostPVems[i].expenditure
      }

      console.log(this.state.runningCostPVems)
      console.log(totalRunning)

      this.setState({totalRunningCostPVems: totalRunning})
      this.setState({ranOnceEMS: true})
      }

      return -Math.abs((1-(electricityCostOffGridPercentage / 100))*4000*((electricityCost/100)*(1+0.02)))
    }

    runningCostPVemsDisplay =() => {
      return 8888
    }

    inputCostOverTime = (event) => { 
        const { costOverTime, setCostOverTime, setFwdBtn, steps, setSteps, activeView} = this.context;
        setCostOverTime(event.target.value);
    };

    resultWithPV =() => {
      const { costOverTime, setElectricityCostPVsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;
      var result;

      if(costOverTime === "1") {
        result = this.electricityCostPV() - this.energyUseEuro(5,true)
      } else {
        result = parseInt((parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVonly))

      }

      if(this.state.electricityCostPVsavings != result) {
        this.setState({ electricityCostPVsavings: result })
        setElectricityCostPVsavings(result)
      }

      return result
    }

    resultWithPVandEMS =() => {
      const { costOverTime, setElectricityCostPVEMSsavings, gridRevenue, electricityCostHouseholdPercentage, pvOutput, electricityCostOffGridPercentage, electricityCost } = this.context;
      var result;

      if(costOverTime === "1") {
        result = this.electricityCostPVEMS() - this.energyUseEuro(5,true)
      } else {
        result = parseInt((parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVems))

      }

      if(this.state.electricityCostPVEMSsavings != result) {
        this.setState({ electricityCostPVEMSsavings: result })
        setElectricityCostPVEMSsavings(result)
      }

      return result
    }

    whichChartLegend =() => {
      const { costOverTime, electricityCostPVsavings, electricityCostPVEMSsavings } = this.context;
      
      if(costOverTime==="1") {
        return electricityCostPVsavings
      } else {
        return electricityCostPVEMSsavings
      }
    }

    adjustBarHeight =(maxHeight, value1, value2, differenceValue2, value3, differenceValue3) => {

      var scale1 = 0
      var scale2 = 0
      var scale3 = 0
      var differenceScale = 0

      if (value1 >= value2 && value1 >= value3) {
        scale1 = maxHeight;
        scale2 = (value2 / value1) * maxHeight;
        scale3 = (value3 / value1) * maxHeight;
      } else if (value2 >= value1 && value2 >= value3) {
        scale1 = (value1 / value2) * maxHeight;
        scale2 = maxHeight;
        scale3 = (value3 / value2) * maxHeight;
      } else {
        scale1 = (value1 / value3) * maxHeight;
        scale2 = (value2 / value3) * maxHeight;
        
        // Modified
        differenceScale = (differenceValue2 / value3) * maxHeight
        scale3 = maxHeight - differenceScale;
      }
      
      const height2 = maxHeight - scale2;
      const height3 = maxHeight - scale3;
      
      return [scale1, height2, scale2, height3, scale3];
      // return [110, 110, 110, 110];
    }

    getHighestValue =(value1, value2, value3) => {

      if (value1 >= value2 && value1 >= value3) {
        return value1;
      } else if (value2 >= value1 && value2 >= value3) {
        return value2;
      } else {
        return value3;
      }
    }

    divideValuesForChart =(step, value) => {
      return parseInt((value / 5) * step).toLocaleString();
    }

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { electricityCostPVsavings, electricityCostPVEMSsavings, Eta_sh_gas_EDWW_MFH_Brine, setGasBrine, Power_kW_PV_MFH, TCO_thermal_EUR_a, setTCO_thermal_EUR_a, elc_Self_Consumption, energyUsagekWh, electricityCost, heatpumpType, costOverTime } = this.context;
      
      // Ohne PV
      var ohnePv1year = parseInt(this.energyUseEuro(5))
      var ohnePv20years = parseInt(this.electricityCostNoPV20Years())
      
      // Mit PV
      var mitPv1year = this.resultWithPV()
      var mitPv20years = parseInt((parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVonly))

      var differencePv1year = (parseInt(this.energyUseEuro(5)) - parseInt(this.resultWithPV()))
      var differencePv20years = (parseInt(this.electricityCostNoPV20Years()) - parseInt((this.electricityCostPV20Years() + this.state.totalRunningCostPVonly)))

      // Mit PV und EMS
      var mitPvUndEms1year = this.resultWithPVandEMS()
      var mitPvUndEms20years = parseInt((parseFloat(this.electricityCostPV20Years()) + this.state.totalRunningCostPVems))

      var differencePvUndEms1year = (parseInt(this.energyUseEuro(5)) - parseInt(this.resultWithPVandEMS()))
      var differencePvUndEms20years = (parseInt(this.electricityCostNoPV20Years()) - parseInt((this.electricityCostPV20Years() + this.state.totalRunningCostPVems)))

      var barHeights1year = this.adjustBarHeight(220, ohnePv1year, mitPv1year, differencePv1year, mitPvUndEms1year, differencePvUndEms1year);
      var barHeights20years = this.adjustBarHeight(220, ohnePv20years, mitPv20years, differencePv20years, mitPvUndEms20years, differencePvUndEms20years);
      var selectedBarHeights = costOverTime == "1" ? barHeights1year : barHeights20years;

      var highestValue1year = this.getHighestValue(ohnePv1year, mitPv1year + differencePv1year, mitPvUndEms1year + differencePvUndEms1year);
      var highestValue20years = this.getHighestValue(ohnePv20years, mitPv20years + differencePv20years, mitPvUndEms20years + differencePvUndEms20years); 

          return  ( 
          <div>
            <div class="flexRow" style={{marginBottom: '30px'}}>
                <div>
                    <label>
                    {this.state.displayed === undefined &&
                      <input type="radio" name="heating" value="1" class="card-input-element" checked={costOverTime === "1"} onChange={this.inputCostOverTime} />
                    }
                    {this.state.displayed === "single" &&
                      <input type="radio" name="single-year" id="single-year" value="1" class="card-input-element" checked="true" />
                    }
                    <div class="panel panel-default card-input-wide background-light-grey" style={{height: '40px', width: '100%', fontSize: '14px', margin: '0', border: 'none'}}>
                            <div class="panel-body">
                                Gesamtkosten pro Jahr
                            </div>
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                    {this.state.displayed === undefined &&
                      <input type="radio" name="heating" value="20" class="card-input-element" checked={costOverTime === "20"} onChange={this.inputCostOverTime} />
                    }
                    {this.state.displayed === "multi" &&
                      <input type="radio" name="multi-year" id="multi-year" value="20" class="card-input-element" checked="true" />
                    }
                    <div class="panel panel-default card-input-wide background-light-grey" style={{height: '40px', width: '100%', fontSize: '14px', margin: '0', border: 'none'}}>
                            <div class="panel-body">
                                Gesamtkosten über 20 Jahre
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '220px'}}>
                
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '17%', zIndex: '99999'}}>
                    
                    {/* ohne PV */}
                    <div style={{display: 'flex', width: '73px', height: `${selectedBarHeights[0]}px`, background: '#007BC0', color: 'white', marginTop: 'auto' }}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', fontSize: '12px', textAlign: 'center'}}>
                            { costOverTime=="1" && ohnePv1year.toLocaleString() }
                            { costOverTime=="1" && 
                              <span>&nbsp;€</span>
                            }
                            { costOverTime=="20" && 
                               ohnePv20years.toLocaleString()
                            }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                        </div>
                        
                    </div>

                    {/* Mit PV Price */}
                    {/* <div style={{display: 'flex', flexDirection: 'column', marginTop: '110px', width: '73px', height: '108px', color: 'white', marginLeft: '15%'}}> */}
                    <div style={{ width: '73px', color: 'white', marginLeft: '15%', zIndex: '99999'}}>
                      
                      {/* Pattern bar */}
                      <div style={{display: 'flex', width: '73px', height: `${selectedBarHeights[1]}px`, color: 'white' }}>
                        { isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}} class="pattern-safari">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007BC0', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#FFF', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && differencePv1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && differencePv20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                        { !isSafari &&
                        <div style={{width: '100%', height: '100%', top: '0%', textAlign: 'center'}} class="pattern">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007BC0', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#FFF', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && differencePv1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && differencePv20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                      </div>

                      {/* Blue bar */}
                      <div style={{display: 'flex', width: '73px', height: `${selectedBarHeights[2]}px`, background: '#007BC0', color: 'white' }}>
                        { isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#007BC0', color: 'white', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#007BC0', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && mitPv1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && mitPv20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }

                        { !isSafari &&
                        <div style={{width: '100%', height: '100%', top: '0%', textAlign: 'center'}}>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#007BC0', color: 'white', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#007BC0', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && mitPv1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && mitPv20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                      </div>
                    </div>

                    {/* Mit PV und EMS */}
                    {/* <div style={{display: 'flex', flexDirection: 'column', marginTop: '110px', width: '73px', height: '108px', color: 'white', marginLeft: '15%'}}> */}
                    <div style={{ width: '73px', color: 'white', marginLeft: '15%', zIndex: '99999'}}>
                      
                      {/* Pattern bar */}
                      <div style={{display: 'flex', width: '73px', height: `${selectedBarHeights[3]}px`, color: 'white' }}>
                        { isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}} class="pattern-safari">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007BC0', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#FFF', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && differencePvUndEms1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && differencePvUndEms20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                        { !isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}} class="pattern">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007BC0', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#FFF', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && differencePvUndEms1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && differencePvUndEms20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                      </div>
                      
                      {/* Blue bar */}
                      <div style={{display: 'flex', width: '73px', height: `${selectedBarHeights[4]}px`, color: 'white'}}>
                        { isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}} class="pattern-safari">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#007BC0', color: 'white', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#007BC0', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && mitPvUndEms1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && mitPvUndEms20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                        { !isSafari &&
                        <div style={{width: '100%', height: '100%', textAlign: 'center'}} class="pattern">
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#007BC0', color: 'white', fontSize: '12px', width: '100%', height: '100%'}}>
                            <span style={{background: '#007BC0', padding: '3px', fontFamily: 'Bosch-Bold'}}>
                            { costOverTime=="1" && mitPvUndEms1year.toLocaleString() }
                            { costOverTime=="1" && <span>&nbsp;€</span> }
                            { costOverTime=="20" && mitPvUndEms20years.toLocaleString() }
                            { costOverTime=="20" && 
                              <span>&nbsp;€</span>
                            }
                            </span>
                          </div>
                        </div>
                        }
                      </div>
                    </div>

                </div>

                <div class="cost-chart-width" style={{position: 'absolute', zIndex: '99998'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div class="bar-chart-left-legend">
                            <div>
                                { costOverTime == "1" && this.divideValuesForChart(5, highestValue1year) + " €"}
                                { costOverTime == "20" && this.divideValuesForChart(5, highestValue20years) + " €"}
                            </div>
                            <div>
                              { costOverTime == "1" && this.divideValuesForChart(4, highestValue1year) + " €" }
                              { costOverTime == "20" && this.divideValuesForChart(4, highestValue20years) + " €"}
                            </div>
                            <div>
                              { costOverTime == "1" && this.divideValuesForChart(3, highestValue1year) + " €" }
                              { costOverTime == "20" && this.divideValuesForChart(3, highestValue20years) + " €"}
                            </div>
                            <div>
                              { costOverTime == "1" && this.divideValuesForChart(2, highestValue1year) + " €" }
                              { costOverTime == "20" && this.divideValuesForChart(2, highestValue20years) + " €"}
                            </div>
                            <div>
                              { costOverTime == "1" && this.divideValuesForChart(1, highestValue1year) + " €" }
                              { costOverTime == "20" && this.divideValuesForChart(1, highestValue20years) + " €"}
                            </div>
                            <div>
                              { costOverTime == "1" && this.divideValuesForChart(0, highestValue1year) + " €" }
                              { costOverTime == "20" && this.divideValuesForChart(0, highestValue20years) + " €"}
                            </div>
                            {/* <div>
                                { this.energyUseEuroNegative(1,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(2,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(3,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(4,this.whichChartLegend()) }
                            </div>
                            <div>
                                { this.energyUseEuroNegative(5,this.whichChartLegend()) }
                            </div> */}
                        </div>
                        <div data-html2canvas-ignore class="cost-chart-width" style={{display: 'flex', flexDirection: 'column', marginLeft: '3px'}}>
                            <div class="cost-chart-width" style={{marginTop: '7px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '19px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            {/* <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #000'}}></div> */}
                            <div class="cost-chart-width" style={{marginTop: '19px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '19px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                            <div class="cost-chart-width" style={{marginTop: '18px', height: '1px', width: '480px', borderBottom: '1px solid #EFF1F2'}}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', width: '100%' }}>
                
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5px', marginLeft: '17%', zIndex: '99999'}}>
                    <div style={{display: 'flex', width: '73px', height: '40px', color: '#000'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', fontSize: '12px', textAlign: 'center'}}>
                          <LightningIcon />
                           ohne PV
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '73px', height: '40px', color: '#000', marginLeft: '15%'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', fontSize: '12px', textAlign: 'center'}}>
                          <PVIcon />
                           mit PV
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '73px', height: '40px', color: '#000', marginLeft: '15%'}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', fontSize: '12px', textAlign: 'center'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <PVIcon />
                                <div style={{display: 'block', margin: '0 2px -2px 2px'}}>+</div>
                                <ElectricityIcon />
                            </div>
                           mit PV und EMS
                        </div>
                    </div>
                </div>

            </div>

            <div style={{display: 'flex', flexDirection: 'column', marginTop: '25px', fontFamily: 'Bosch-Regular', fontSize: '12px'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{marginRight: '15px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', background: '#007BC0', borderRadius: '12px'}}></div>
                    </div>
                    <div>Laufende Stromkosten</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '6px'}}>
                    <div style={{marginRight: '15px'}}>
                        <div style={{marginTop: '2px', width: '12px', height: '12px', borderRadius: '12px'}} class="pattern-round"></div>
                    </div>
                    <div>Ersparnis</div>
                </div>
            </div>

          </div>
          )

  }
}

export default withRouter(withTranslation()(Cost));