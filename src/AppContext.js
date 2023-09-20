import React, { Component } from 'react';

import i18n from 'i18next';

export const AppContext = React.createContext()
export const SimulatorConsumer = AppContext.Consumer;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var productEntry = 0;


class SimulatorProvider extends Component {

  state = {
      viewLocation: 'outdoor',
      viewLocationPrevious: 'outdoor',
      backgroundAudio: ['Hintergrund-Sound_TAG.mp3','Hintergrund-Sound_TAG.mp3','Hintergrund-Sound_NACHT.mp3', 'Hintergrund-Sound_NACHT.mp3'],
      deviceIcons: ['leaf.svg','Air_4000.webp', 'compress5800.png','compress-7400-small-icon-night.jpg','microwave.svg','dishwasher.svg','kettle.svg','hairdryer.svg','blender.svg', 'vacuum-cleaner.svg'],
      Eta_sh_gas_EDWW_MFH_Brine: '',
      elc_Self_Consumption: '',
      Power_kW_PV_MFH: '',
      TCO_thermal_EUR_a: '',
      BuildingEnegeryStandard: '',
      BuildingSize: '',
      EnergyUse: 0,
      kfwValue: '',
      insulationValue: '',
      OilLNGValue: '',
      OilUsageLiters: '',
      LNGUsage: '',
      heatDistributionValue: '',
      heatpumpType: '',
      GasOilSwitch: false,
      disabledOilUsage: true,
      disabledLNGUsage: true,
      ev: '',
      pvOutput: 0,
      energyUsagekWh: '',
      odometerIncrease: '',
      homeCharging: '',
      homeStorage: '',
      homeStorageSize: 0,
      investmentCost: '',
      disabledInvestmentCost: true,
      investmentCostEUR: '',
      electricityCost: '',
      gridRevenue: '',
      costOverTime: '1',
      selectedBackgroundAudio: '',
      initialLoad: true,
      productSelected: productEntry,
      selectedTab: 0,
      entryProduct: 0,
      activeView: 0,
      activeStep: '0-0',
      navDirection: 'right',
      time: false,
      heatpumpAudio: false,
      disableSlider: true,
      heatpumpVolume: 0.4,
      refernceHeatpumpVolume: 0.4,
      appVolume: 0.30,
      backgroundVolume: 1,
      menuOpen: true,
      menuIsFloating: false,
      ambientAudio: true,
      audioContext: {},
      gainNode: {},
      mediaSource: {},
      products: i18n.t('themes', {returnObjects:true}),
      btnThemes: i18n.t('buttons', {returnObjects:true}),
      fonts: i18n.t('fonts', {returnObjects:true}),
      userTracked: false,
      acceptedTerms: false,
      backBtn: true,
      fwdBtn: false,
      backgroundAudioLevels: {
        outdoorDay: 1,
        outdoorNight: 0.5,
        indoorDay: 0.1,
        indoorNight: 0.05
      },
      heatpumpAudioLevels: {
        outdoor3mDay: 0.5,
        outdoor1mDay: 1,
        outdoor3mNight: 0.5,
        outdoor1mNight: 1,
        indoorDay: 0.1,
        indoorNight: 0.1
      },
      navStepsNew: [2,1,0],
      navSteps: [2,1,0],
      stepperNavActive: {
        tab1: 0,
        tab2: 0,
        tab3: 0
      },
      steps: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true
      }
    }

    setProduct= (product) => {
      this.setState((prevState) => ({ productSelected: product }))
    }

    setEntryProduct= (product) => {
      this.setState((prevState) => ({ entryProduct: product }))
    }

    setProducts= (productsLng) => {
      this.setState({ products: productsLng });
    }

    setHeatpumpAudio= (audioState) => {
      this.setState((prevState) => ({ heatpumpAudio: audioState }))
    }

    setHeatpumpVolume= (volume) => {
      this.setState((prevState) => ({ heatpumpVolume: volume }))
    }

    setViewLocation= (viewLocation) => {
      this.setState((prevState) => ({ viewLocation: viewLocation }))
    }

    setViewLocationPrevious= (viewLocation) => {
      this.setState((prevState) => ({ viewLocationPrevious: viewLocation }))
    }

    setActiveView= (view) => {
      this.setState((prevState) => ({ activeView: view }))
    }

    setActiveStep= (step) => {
      this.setState((prevState) => ({ activeStep: step }))
    }

    setSelectedTab= (tab) => {
      this.setState((prevState) => ({ selectedTab: tab }))
    }

    setTime= (time) => {
      this.setState((prevState) => ({ time: time }))
    }

    setAppVolume= (volume) => {
      this.setState((prevState) => ({ appVolume: volume }))
    }

    setBackgroundVolume= (volume) => {
      this.setState((prevState) => ({ backgroundVolume: volume }))
    }

    setMenu= (state) => {
      this.setState((prevState) => ({ menuOpen: state }))
    }

    setMenuFloating= (state) => {
      this.setState((prevState) => ({ menuIsFloating: state }))
    }

    setAmbient= (state) => {
      this.setState((prevState) => ({ ambientAudio: state }))
    }

    setInitialLoad= (state) => {
      this.setState((prevState) => ({ initialLoad: state }))
    }

    setSelectedBackgroundAudio= (state) => {
      this.setState((prevState) => ({ selectedBackgroundAudio: state }))
    }

    setAudioContext= (state) => {
      this.setState((prevState) => ({ audioContext: state }))
    }

    setGainNode= (state) => {
      this.setState((prevState) => ({ gainNode: state }))
    }

    setMediaSource= (state) => {
      this.setState((prevState) => ({ mediaSource: state }))
    }

    trackUser= (state) => {
      this.setState((prevState) => ({ userTracked: state }))
    }

    setTerms= (state) => {
      this.setState((prevState) => ({ acceptedTerms: state }))
    }

    setSliderState= (state) => {
      this.setState((prevState) => ({ disableSlider: state }))
    }

    setStepperNav= (steps) => {
      this.setState((prevState) => ({ stepperNavActive: steps }))
    }

    setNavDirection= (direction) => {
      this.setState((prevState) => ({ navDirection: direction }))
    }

    setGasBrine= (result) => {
      this.setState((prevState) => ({ Eta_sh_gas_EDWW_MFH_Brine: result }))
    }

    setElc_Self_Consumption= (result) => {
      this.setState((prevState) => ({ elc_Self_Consumption: result }))
    }

    setPower_kW_PV_MFH= (result) => {
      this.setState((prevState) => ({ Power_kW_PV_MFH: result }))
    }

    setTCO_thermal_EUR_a= (result) => {
      this.setState((prevState) => ({ TCO_thermal_EUR_a: result }))
    }

    setBuildingEnegeryStandard= (result) => {
      this.setState((prevState) => ({ BuildingEnegeryStandard: result }))
    }

    setEnergyUse= (result) => {
      this.setState((prevState) => ({ EnergyUse: result }))
    }

    setBuildingSize= (result) => {
      this.setState((prevState) => ({ BuildingSize: result }))
    }

    setGasOilSwitch= (result) => {
      this.setState((prevState) => ({ GasOilSwitch: result }))
    }

    setKfwValue= (result) => {
      this.setState((prevState) => ({ kfwValue: result }))
    }

    setInsulationValue= (result) => {
      this.setState((prevState) => ({ insulationValue: result }))
    }

    setOilLNGValue= (result) => {
      this.setState((prevState) => ({ OilLNGValue: result }))
    }

    setDisabledOilUsage= (result) => {
      this.setState((prevState) => ({ disabledOilUsage: result }))
    }

    setDisabledLNGUsage= (result) => {
      this.setState((prevState) => ({ disabledLNGUsage: result }))
    }

    setOilUsageLiters= (result) => {
      this.setState((prevState) => ({ OilUsageLiters: result }))
    }

    setLNGUsage= (result) => {
      this.setState((prevState) => ({ LNGUsage: result }))
    }

    setHeatDistribution= (result) => {
      this.setState((prevState) => ({ heatDistributionValue: result }))
    }

    setEnergyUsageKWH= (result) => {
      this.setState((prevState) => ({ energyUsagekWh: result }))
    }

    setHeatpumpType= (result) => {
      this.setState((prevState) => ({ heatpumpType: result }))
    }

    setEV= (result) => {
      this.setState((prevState) => ({ ev: result }))
    }

    setOdometerIncrease= (result) => {
      this.setState((prevState) => ({ odometerIncrease: result }))
    }

    setHomeCharging= (result) => {
      this.setState((prevState) => ({ homeCharging: result }))
    }

    setPVOutput= (result) => {
      this.setState((prevState) => ({ pvOutput: result }))
    }

    setHomeStorage= (result) => {
      this.setState((prevState) => ({ homeStorage: result }))
    }

    setHomeStorageSize= (result) => {
      this.setState((prevState) => ({ homeStorageSize: result }))
    }

    setInvestmentCost= (result) => {
      this.setState((prevState) => ({ investmentCost: result }))
    }

    setDisabledInvestmentCost= (result) => {
      this.setState((prevState) => ({ disabledInvestmentCost: result }))
    }

    setInvestmentCostEUR= (result) => {
      this.setState((prevState) => ({ investmentCostEUR: result }))
    }

    setElectricityCost= (result) => {
      this.setState((prevState) => ({ electricityCost: result }))
    }

    setGridRevenue= (result) => {
      this.setState((prevState) => ({ gridRevenue: result }))
    }

    setBackBtn= (result) => {
      this.setState((prevState) => ({ backBtn: result }))
    }

    setFwdBtn= (result) => {
      this.setState((prevState) => ({ fwdBtn: result }))
    }

    setSteps= (steps) => {
      this.setState((prevState) => ({ ...steps }))
    }

    setCostOverTime= (time) => {
      this.setState((prevState) => ({ costOverTime: time }))
    }


    render() {
      const { children } = this.props
      const { products, btnThemes, fonts, navSteps, product, productSelected, selectedTab, stepperNavActive, entryProduct, activeView, activeStep, navDirection, time, heatpumpAudio, disableSlider, heatpumpVolume, refernceHeatpumpVolume, viewLocation, viewLocationPrevious, selectedBackgroundAudio, backgroundAudio, deviceIcons, backgroundVolume, appVolume, menuOpen, menuIsFloating, ambientAudio, productList, initialLoad, audioContext, gainNode, mediaSource, backgroundAudioLevels, heatpumpAudioLevels, userTracked, acceptedTerms, Eta_sh_gas_EDWW_MFH_Brine, elc_Self_Consumption, Power_kW_PV_MFH, TCO_thermal_EUR_a, BuildingEnegeryStandard, EnergyUse, BuildingSize, GasOilSwitch, kfwValue, insulationValue, OilLNGValue, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh, heatpumpType, ev, pvOutput, odometerIncrease, homeCharging, homeStorage, homeStorageSize, investmentCost, disabledInvestmentCost, investmentCostEUR, electricityCost, gridRevenue, backBtn, fwdBtn, steps, costOverTime } = this.state
      const { setProduct, setEntryProduct, setProducts, setHeatpumpAudio, setHeatpumpVolume, setActiveView, setActiveStep, setSelectedTab, setNavDirection, setStepperNav, setTime, setAppVolume, setBackgroundVolume, setSelectedBackgroundAudio, setViewLocation, setViewLocationPrevious, setMenu, setMenuFloating, setAmbient, setInitialLoad, setAudioContext, setGainNode, setMediaSource, trackUser, setTerms, setSliderState, setGasBrine, setElc_Self_Consumption, setPower_kW_PV_MFH, setTCO_thermal_EUR_a, setBuildingEnegeryStandard, setEnergyUse, setBuildingSize, setGasOilSwitch, setKfwValue, setInsulationValue, setOilLNGValue, setDisabledOilUsage, setOilUsageLiters, setLNGUsage, setDisabledLNGUsage, setHeatDistribution, setEnergyUsageKWH, setHeatpumpType, setEV, setOdometerIncrease, setHomeCharging, setPVOutput, setHomeStorage, setHomeStorageSize, setInvestmentCost, setDisabledInvestmentCost, setInvestmentCostEUR, setElectricityCost, setGridRevenue, setBackBtn, setFwdBtn, setSteps, setCostOverTime} = this

      return (
        <AppContext.Provider
          value={{
            products,
            btnThemes,
            fonts,
            navSteps,
            product,
            entryProduct,
            productSelected,
            selectedTab,
            stepperNavActive,
            activeView,
            activeStep,
            navDirection,
            time,
            heatpumpAudio,
            disableSlider,
            viewLocation,
            viewLocationPrevious,
            selectedBackgroundAudio,
            backgroundAudio,
            deviceIcons,
            backgroundVolume,
            heatpumpVolume,
            refernceHeatpumpVolume,
            appVolume,
            menuOpen,
            menuIsFloating,
            ambientAudio,
            productList,
            initialLoad,
            audioContext,
            gainNode,
            mediaSource,
            backgroundAudioLevels,
            heatpumpAudioLevels,
            userTracked,
            acceptedTerms,
            Eta_sh_gas_EDWW_MFH_Brine,
            elc_Self_Consumption,
            Power_kW_PV_MFH,
            TCO_thermal_EUR_a,
            BuildingEnegeryStandard,
            EnergyUse,
            BuildingSize,
            GasOilSwitch,
            kfwValue,
            insulationValue,
            OilLNGValue,
            disabledOilUsage,
            OilUsageLiters,
            LNGUsage,
            disabledLNGUsage,
            heatDistributionValue,
            energyUsagekWh,
            heatpumpType,
            ev,
            pvOutput,
            odometerIncrease,
            homeCharging,
            homeStorage,
            homeStorageSize,
            investmentCost,
            disabledInvestmentCost,
            investmentCostEUR,
            electricityCost,
            gridRevenue,
            backBtn,
            fwdBtn,
            steps,
            costOverTime,
            setProduct,
            setEntryProduct,
            setProducts,
            setHeatpumpAudio,
            setHeatpumpVolume,
            setActiveView,
            setActiveStep,
            setSelectedTab,
            setNavDirection,
            setStepperNav,
            setTime,
            setAppVolume,
            setBackgroundVolume,
            setSelectedBackgroundAudio,
            setViewLocation,
            setViewLocationPrevious,
            setMenu,
            setMenuFloating,
            setAmbient,
            setInitialLoad,
            setAudioContext,
            setGainNode,
            setMediaSource,
            trackUser,
            setTerms,
            setSliderState,
            setGasBrine,
            setElc_Self_Consumption,
            setPower_kW_PV_MFH,
            setTCO_thermal_EUR_a,
            setBuildingEnegeryStandard,
            setEnergyUse,
            setBuildingSize,
            setGasOilSwitch,
            setKfwValue,
            setInsulationValue,
            setOilLNGValue,
            setDisabledOilUsage,
            setOilUsageLiters,
            setLNGUsage,
            setDisabledLNGUsage,
            setHeatDistribution,
            setEnergyUsageKWH,
            setHeatpumpType,
            setEV,
            setOdometerIncrease,
            setHomeCharging,
            setPVOutput,
            setHomeStorage,
            setHomeStorageSize,
            setInvestmentCost,
            setDisabledInvestmentCost,
            setInvestmentCostEUR,
            setElectricityCost,
            setGridRevenue,
            setBackBtn,
            setFwdBtn,
            setSteps,
            setCostOverTime
          }}
        >
          {children}
        </AppContext.Provider>
      )


    }
  }



export default AppContext

export { SimulatorProvider }
