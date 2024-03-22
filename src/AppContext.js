import React, { Component } from "react";

import i18n from "i18next";

export const AppContext = React.createContext();
export const SimulatorConsumer = AppContext.Consumer;

const queryString = window.location.search;

var productEntry = 0;

class SimulatorProvider extends Component {
  state = {
    selectedTheme: "",
    directLink: false,
    loading: false,
    loadingOffGrid: false,
    loadingHousehold: false,
    viewLocation: "outdoor",
    viewLocationPrevious: "outdoor",
    backgroundAudio: ["Hintergrund-Sound_TAG.mp3", "Hintergrund-Sound_TAG.mp3", "Hintergrund-Sound_NACHT.mp3", "Hintergrund-Sound_NACHT.mp3"],
    deviceIcons: ["leaf.svg", "Air_4000.webp", "compress5800.png", "compress-7400-small-icon-night.jpg", "microwave.svg", "dishwasher.svg", "kettle.svg", "hairdryer.svg", "blender.svg", "vacuum-cleaner.svg"],
    Eta_sh_gas_EDWW_MFH_Brine: "",
    elc_Self_Consumption: "",
    Power_kW_PV_MFH: "",
    TCO_thermal_EUR_a: "",
    BuildingEnegeryStandard: "",
    BuildingSize: "",
    EnergyUse: 0,
    kfwValue: "",
    insulationValue: "",
    OilLNGValue: "",
    OilUsageLiters: "",
    LNGUsage: "",
    heatDistributionValue: "",
    heatpumpType: "",
    GasOilSwitch: false,
    disabledOilUsage: true,
    disabledLNGUsage: true,
    ev: "",
    pvOutput: 0,
    pvOutputkWh: 4,
    energyUsagekWh: "4000",
    odometerIncrease: "",
    odometerIncreaseKWH: 0,
    homeCharging: "",
    homeStorage: "",
    homeStorageSize: 0,
    homeStorageSizekWh: 0,
    heatpumpCombinedUsage: 0,
    householdNoEMSpvPercent: 0,
    investmentCost: "",
    disabledInvestmentCost: true,
    investmentCostEUR: "",
    electricityCost: "35",
    gridRevenue: "8,2",
    costOverTime: "1",
    selectedBackgroundAudio: "",
    initialLoad: true,
    productSelected: productEntry,
    selectedTab: 0,
    entryProduct: 0,
    activeView: 0,
    activeStep: "0-0",
    activeMilestone: 0,
    activeCalculationView: 0,
    milestoneHeadline: "Gebäude",
    navDirection: "right",
    time: false,
    heatpumpAudio: false,
    disableSlider: true,
    heatpumpVolume: 0.4,
    refernceHeatpumpVolume: 0.4,
    appVolume: 0.3,
    backgroundVolume: 1,
    pieChartSize: 410,
    pieIconSize: 60,
    innerRadiusMargin: 55,
    pieLabelFontSize: 18,
    xPositionHeatpumpLabel: 38,
    xPositionEVLabel: 38,
    xPositionHouseholdLabel: 38,
    yPositionHeatpumpLabel: 38,
    yPositionEVLabel: 38,
    yPositionHouseholdLabel: 38,
    xPositionIconMargin: 40,
    yPositionIconMargin: 25,
    xPositionEVIconMargin: 70,
    yPositionEVIconMargin: 5,
    xPositionHouseholdIconMargin: 20,
    yPositionHouseholdIconMargin: 0,
    menuOpen: false,
    menuIsFloating: false,
    ambientAudio: true,
    audioContext: {},
    gainNode: {},
    mediaSource: {},
    products: i18n.t("themes", { returnObjects: true }),
    btnThemes: i18n.t("buttons", { returnObjects: true }),
    fonts: i18n.t("fonts", { returnObjects: true }),
    userTracked: false,
    acceptedTerms: false,
    backBtn: true,
    fwdBtn: false,
    anchorEl: true,
    backdrop: false,
    menuBackdrop: false,
    offgrid1SVG: "",
    offgrid2SVG: "",
    electricityUse1SVG: "",
    electricityUse2SVG: "",
    householdUse1SVG: "",
    householdUse2SVG: "",
    breakEvenBase64: "",
    testSVG: "",
    offgrid1SVG_EMS_Hidden: "",
    offgrid2SVG_EMS_Hidden: "",
    offgrid1SVG_NoEMS_Hidden: "",
    offgrid2SVG_NoEMS_Hidden: "",
    household1SVG_EMS_Hidden: "",
    household2SVG_EMS_Hidden: "",
    household1SVG_NoEMS_Hidden: "",
    household2SVG_NoEMS_Hidden: "",
    calculationModal: false,
    offgridEMS: true,
    offgridPVPercentageNoEMS: 0,
    NoEMScombinedEnergyUseKWH: 0,
    noEMSPercentageOffGrid: 0,
    infoBoxCombinedHouseholdUsage: 0,
    infoBoxHouseholdGridFeed: 0,
    infoBoxOffGridGridUsage: 0,
    electricityCostOffGridPercentage: 0,
    electricityCostHouseholdPercentage: 0,
    electricityCostPVsavings: 0,
    electricityCostPVEMSsavings: 0,
    householdEMS: true,
    windowWidth: "0",
    windowHeight: "0",
    backgroundAudioLevels: {
      outdoorDay: 1,
      outdoorNight: 0.5,
      indoorDay: 0.1,
      indoorNight: 0.05,
    },
    heatpumpAudioLevels: {
      outdoor3mDay: 0.5,
      outdoor1mDay: 1,
      outdoor3mNight: 0.5,
      outdoor1mNight: 1,
      indoorDay: 0.1,
      indoorNight: 0.1,
    },
    navStepsNew: [2, 1, 0],
    navSteps: [2, 1, 0],
    stepperNavActive: {
      tab1: 0,
      tab2: 0,
      tab3: 0,
    },
    tabToSelect: "0",
    tabToSelectEigenverbrauch: "0",
    scenarioInDatabase: "",
    steps: {
      0: false,
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
      11: true,
      12: true,
      13: true,
    },
    pvMarks: [
      {
        value: 4,
        label: "4",
      },
      {
        value: 7,
        label: "7",
      },
      {
        value: 10,
        label: "10",
      },
      {
        value: 14,
        label: "14",
      },
    ],
    heatpumpPVems: [],
    heatpumpPV: [],
    PVcostLookupTable: [
      {
        pv: 4,
        cost: 6000,
      },
      {
        pv: 7,
        cost: 10000,
      },
      {
        pv: 10,
        cost: 13000,
      },
      {
        pv: 14,
        cost: 18000,
      },
    ],
    StorageCostLookupTable: [
      {
        storage: 0,
        cost: 5000,
      },
      {
        storage: 1,
        cost: 7000,
      },
      {
        storage: 2,
        cost: 8000,
      },
      {
        storage: 3,
        cost: 9000,
      },
    ],
    kWhUsageLookupTable: [
      {
        kwh: "2000",
        offGridPercentage: 85,
        householdPercentage: 25,
      },
      {
        kwh: "4000",
        offGridPercentage: 75,
        householdPercentage: 35,
      },
      {
        kwh: "6000",
        offGridPercentage: 60,
        householdPercentage: 40,
      },
      {
        kwh: "8000",
        offGridPercentage: 55,
        householdPercentage: 45,
      },
    ],
    kfwLookupTable: [
      {
        kfW: "kfW_40_",
        kWh: 25,
      },
      {
        kfW: "kfW_55_",
        kWh: 35,
      },
      {
        kfW: "kfW_70_",
        kWh: 45,
      },
      {
        kfW: "kfW_85_",
        kWh: 55,
      },
      {
        kfW: "kfW_100_",
        kWh: 65,
      },
      {
        kfW: "p_ren_",
        kWh: 95,
      },
      {
        kfW: "un_ren_",
        kWh: 120,
      },
      {
        kfW: "un_ren_ext_",
        kWh: 150,
      },
    ],
    tabEntries: [
      {
        Tab: "",
        PV_size: "",
        Storage_size: "",
        EMS: "",
      },
      {
        Tab: "1",
        PV_size: "0",
        Storage_size: "0",
        EMS: "Nein",
      },
      {
        Tab: "2",
        PV_size: "4",
        Storage_size: "0",
        EMS: "Nein",
      },
      {
        Tab: "3",
        PV_size: "7",
        Storage_size: "0",
        EMS: "Nein",
      },
      {
        Tab: "4",
        PV_size: "10",
        Storage_size: "0",
        EMS: "Nein",
      },
      {
        Tab: "5",
        PV_size: "14",
        Storage_size: "0",
        EMS: "Nein",
      },
      {
        Tab: "6",
        PV_size: "0",
        Storage_size: "6",
        EMS: "Nein",
      },
      {
        Tab: "7",
        PV_size: "4",
        Storage_size: "6",
        EMS: "Nein",
      },
      {
        Tab: "8",
        PV_size: "7",
        Storage_size: "6",
        EMS: "Nein",
      },
      {
        Tab: "9",
        PV_size: "10",
        Storage_size: "6",
        EMS: "Nein",
      },
      {
        Tab: "10",
        PV_size: "14",
        Storage_size: "6",
        EMS: "Nein",
      },
      {
        Tab: "11",
        PV_size: "0",
        Storage_size: "9",
        EMS: "Nein",
      },
      {
        Tab: "12",
        PV_size: "4",
        Storage_size: "9",
        EMS: "Nein",
      },
      {
        Tab: "13",
        PV_size: "7",
        Storage_size: "9",
        EMS: "Nein",
      },
      {
        Tab: "14",
        PV_size: "10",
        Storage_size: "9",
        EMS: "Nein",
      },
      {
        Tab: "15",
        PV_size: "14",
        Storage_size: "9",
        EMS: "Nein",
      },
      {
        Tab: "16",
        PV_size: "0",
        Storage_size: "12",
        EMS: "Nein",
      },
      {
        Tab: "17",
        PV_size: "4",
        Storage_size: "12",
        EMS: "Nein",
      },
      {
        Tab: "18",
        PV_size: "7",
        Storage_size: "12",
        EMS: "Nein",
      },
      {
        Tab: "19",
        PV_size: "10",
        Storage_size: "12",
        EMS: "Nein",
      },
      {
        Tab: "20",
        PV_size: "14",
        Storage_size: "12",
        EMS: "Nein",
      },
      {
        Tab: "21",
        PV_size: "0",
        Storage_size: "15",
        EMS: "Nein",
      },
      {
        Tab: "22",
        PV_size: "4",
        Storage_size: "15",
        EMS: "Nein",
      },
      {
        Tab: "23",
        PV_size: "7",
        Storage_size: "15",
        EMS: "Nein",
      },
      {
        Tab: "24",
        PV_size: "10",
        Storage_size: "15",
        EMS: "Nein",
      },
      {
        Tab: "25",
        PV_size: "14",
        Storage_size: "15",
        EMS: "Nein",
      },
      {
        Tab: "26",
        PV_size: "0",
        Storage_size: "0",
        EMS: "Ja",
      },
      {
        Tab: "27",
        PV_size: "4",
        Storage_size: "0",
        EMS: "Ja",
      },
      {
        Tab: "28",
        PV_size: "7",
        Storage_size: "0",
        EMS: "Ja",
      },
      {
        Tab: "29",
        PV_size: "10",
        Storage_size: "0",
        EMS: "Ja",
      },
      {
        Tab: "30",
        PV_size: "14",
        Storage_size: "0",
        EMS: "Ja",
      },
      {
        Tab: "31",
        PV_size: "0",
        Storage_size: "6",
        EMS: "Ja",
      },
      {
        Tab: "32",
        PV_size: "4",
        Storage_size: "6",
        EMS: "Ja",
      },
      {
        Tab: "33",
        PV_size: "7",
        Storage_size: "6",
        EMS: "Ja",
      },
      {
        Tab: "34",
        PV_size: "10",
        Storage_size: "6",
        EMS: "Ja",
      },
      {
        Tab: "35",
        PV_size: "14",
        Storage_size: "6",
        EMS: "Ja",
      },
      {
        Tab: "36",
        PV_size: "0",
        Storage_size: "9",
        EMS: "Ja",
      },
      {
        Tab: "37",
        PV_size: "4",
        Storage_size: "9",
        EMS: "Ja",
      },
      {
        Tab: "38",
        PV_size: "7",
        Storage_size: "9",
        EMS: "Ja",
      },
      {
        Tab: "39",
        PV_size: "10",
        Storage_size: "9",
        EMS: "Ja",
      },
      {
        Tab: "40",
        PV_size: "14",
        Storage_size: "9",
        EMS: "Ja",
      },
      {
        Tab: "41",
        PV_size: "0",
        Storage_size: "12",
        EMS: "Ja",
      },
      {
        Tab: "42",
        PV_size: "4",
        Storage_size: "12",
        EMS: "Ja",
      },
      {
        Tab: "43",
        PV_size: "7",
        Storage_size: "12",
        EMS: "Ja",
      },
      {
        Tab: "44",
        PV_size: "10",
        Storage_size: "12",
        EMS: "Ja",
      },
      {
        Tab: "45",
        PV_size: "14",
        Storage_size: "12",
        EMS: "Ja",
      },
      {
        Tab: "46",
        PV_size: "0",
        Storage_size: "15",
        EMS: "Ja",
      },
      {
        Tab: "47",
        PV_size: "4",
        Storage_size: "15",
        EMS: "Ja",
      },
      {
        Tab: "48",
        PV_size: "7",
        Storage_size: "15",
        EMS: "Ja",
      },
      {
        Tab: "49",
        PV_size: "10",
        Storage_size: "15",
        EMS: "Ja",
      },
      {
        Tab: "50",
        PV_size: "14",
        Storage_size: "15",
        EMS: "Ja",
      },
    ],
    buildingTypePreHeatOption: [
      {
        buildingType: "un_ren_ext_",
        option1: "55",
        option2: "-",
      },
      {
        buildingType: "un_ren_",
        option1: "55",
        option2: "-",
      },
      {
        buildingType: "p_ren_",
        option1: "55",
        option2: "-",
      },
      {
        buildingType: "kfW_100_",
        option1: "45",
        option2: "35",
      },
      {
        buildingType: "kfW_85_",
        option1: "45",
        option2: "35",
      },
      {
        buildingType: "kfW_70_",
        option1: "45",
        option2: "35",
      },
      {
        buildingType: "kfW_55_",
        option1: "35",
        option2: "-",
      },
      {
        buildingType: "kfW_40_",
        option1: "35",
        option2: "-",
      },
    ],
    preHeatTempOption: 0,
    singlePreHeatOptionEVLookupTable: [
      {
        scenario: "1",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "2",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "3",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "4",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "5",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "6",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "7",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "8",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "9",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "10",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "11",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "12",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "13",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "14",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "15",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "16",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "17",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "18",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "19",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "20",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "21",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "22",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "23",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "24",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "25",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "26",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "27",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "28",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "29",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "30",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "31",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "32",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
    ],
    singlePreHeatOptionNoEVLookupTable: [
      {
        scenario: "1",
        option: "1",
        sqm: "200",
        kwh: "2000",
      },
      {
        scenario: "2",
        option: "1",
        sqm: "150",
        kwh: "2000",
      },
      {
        scenario: "3",
        option: "1",
        sqm: "200",
        kwh: "4000",
      },
      {
        scenario: "4",
        option: "1",
        sqm: "150",
        kwh: "4000",
      },
      {
        scenario: "5",
        option: "1",
        sqm: "200",
        kwh: "6000",
      },
      {
        scenario: "6",
        option: "1",
        sqm: "150",
        kwh: "6000",
      },
      {
        scenario: "7",
        option: "1",
        sqm: "200",
        kwh: "8000",
      },
      {
        scenario: "8",
        option: "1",
        sqm: "150",
        kwh: "8000",
      },
    ],
    dualPreHeatOptionNoEVLookupTable: [
      {
        scenario: "1",
        option: "1",
        sqm: "200",
        kwh: "2000",
      },
      {
        scenario: "2",
        option: "1",
        sqm: "150",
        kwh: "2000",
      },
      {
        scenario: "3",
        option: "2",
        sqm: "200",
        kwh: "2000",
      },
      {
        scenario: "4",
        option: "2",
        sqm: "150",
        kwh: "2000",
      },
      {
        scenario: "5",
        option: "1",
        sqm: "200",
        kwh: "4000",
      },
      {
        scenario: "6",
        option: "1",
        sqm: "150",
        kwh: "4000",
      },
      {
        scenario: "7",
        option: "2",
        sqm: "200",
        kwh: "4000",
      },
      {
        scenario: "8",
        option: "2",
        sqm: "150",
        kwh: "4000",
      },
      {
        scenario: "9",
        option: "1",
        sqm: "200",
        kwh: "6000",
      },
      {
        scenario: "10",
        option: "1",
        sqm: "150",
        kwh: "6000",
      },
      {
        scenario: "11",
        option: "2",
        sqm: "200",
        kwh: "6000",
      },
      {
        scenario: "12",
        option: "2",
        sqm: "150",
        kwh: "6000",
      },
      {
        scenario: "13",
        option: "1",
        sqm: "200",
        kwh: "8000",
      },
      {
        scenario: "14",
        option: "1",
        sqm: "150",
        kwh: "8000",
      },
      {
        scenario: "15",
        option: "2",
        sqm: "200",
        kwh: "8000",
      },
      {
        scenario: "16",
        option: "2",
        sqm: "150",
        kwh: "8000",
      },
    ],
    dualPreHeatOptionEVLookupTable: [
      {
        scenario: "1",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "2",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "3",
        option: "2",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "4",
        option: "2",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_10k",
      },
      {
        scenario: "5",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "6",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "7",
        option: "2",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "8",
        option: "2",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_10k",
      },
      {
        scenario: "9",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "10",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "11",
        option: "2",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "12",
        option: "2",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_10k",
      },
      {
        scenario: "13",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "14",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "15",
        option: "2",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "16",
        option: "2",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_10k",
      },
      {
        scenario: "17",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "18",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "19",
        option: "2",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "20",
        option: "2",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "21",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "22",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "23",
        option: "2",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "24",
        option: "2",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "25",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "26",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "27",
        option: "2",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "28",
        option: "2",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "29",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "30",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "31",
        option: "2",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "32",
        option: "2",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_10k",
      },
      {
        scenario: "33",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "34",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "35",
        option: "2",
        sqm: "200",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "36",
        option: "2",
        sqm: "150",
        kwh: "2000",
        evProfile: "Family_20k",
      },
      {
        scenario: "37",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "38",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "39",
        option: "2",
        sqm: "200",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "40",
        option: "2",
        sqm: "150",
        kwh: "4000",
        evProfile: "Family_20k",
      },
      {
        scenario: "41",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "42",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "43",
        option: "2",
        sqm: "200",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "44",
        option: "2",
        sqm: "150",
        kwh: "6000",
        evProfile: "Family_20k",
      },
      {
        scenario: "45",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "46",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "47",
        option: "2",
        sqm: "200",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "48",
        option: "2",
        sqm: "150",
        kwh: "8000",
        evProfile: "Family_20k",
      },
      {
        scenario: "49",
        option: "1",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "50",
        option: "1",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "51",
        option: "2",
        sqm: "200",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "52",
        option: "2",
        sqm: "150",
        kwh: "2000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "53",
        option: "1",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "54",
        option: "1",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "55",
        option: "2",
        sqm: "200",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "56",
        option: "2",
        sqm: "150",
        kwh: "4000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "57",
        option: "1",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "58",
        option: "1",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "59",
        option: "2",
        sqm: "200",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "60",
        option: "2",
        sqm: "150",
        kwh: "6000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "61",
        option: "1",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "62",
        option: "1",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "63",
        option: "2",
        sqm: "200",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
      {
        scenario: "64",
        option: "2",
        sqm: "150",
        kwh: "8000",
        evProfile: "Commuter_20k",
      },
    ],
    EGen_elc_kWh_PV_MFH: 0,
    HH_EGen_elc_kWh_PV_MFH: 0,
    energy_to_grid_kWh_PV_MFH: 0,
    HH_energy_to_grid_kWh_PV_MFH: 0,
    EGen_sh_kWh_HP_A_W_MFH: 0,
    HH_EGen_sh_kWh_HP_A_W_MFH: 0,
    EGen_sh_kWh_HP_B_W_MFH: 0,
    HH_EGen_sh_kWh_HP_B_W_MFH: 0,
    EGen_hw_kWh_HP_A_W_MFH: 0,
    HH_EGen_hw_kWh_HP_A_W_MFH: 0,
    EGen_hw_kWh_HP_B_W_MFH: 0,
    HH_EGen_hw_kWh_HP_B_W_MFH: 0,
    Avg_Eff_JAZ_HP_A_W_MFH: 0,
    HH_Avg_Eff_JAZ_HP_A_W_MFH: 0,
    Avg_Eff_JAZ_HP_B_W_MFH: 0,
    HH_Avg_Eff_JAZ_HP_B_W_MFH: 0,
    EGen_sh_kWh_EDWW_MFH: 0,
    HH_EGen_sh_kWh_EDWW_MFH: 0,
    EGen_sh_kWh_EDWW_MFH_Brine: 0,
    EGen_hw_kWh_EDWW_MFH: 0,
    HH_EGen_hw_kWh_EDWW_MFH: 0,
    EGen_hw_kWh_EDWW_MFH_Brine: 0,
    HH_EGen_hw_kWh_EDWW_MFH_Brine: 0,
    EGen_elc_kWh_PV_MFH_NoEMS: 0,
    HH_EGen_elc_kWh_PV_MFH_NoEMS: 0,
    energy_to_grid_kWh_PV_MFH_NoEMS: 0,
    HH_energy_to_grid_kWh_PV_MFH_NoEMS: 0,
    EGen_sh_kWh_HP_A_W_MFH_NoEMS: 0,
    HH_EGen_sh_kWh_HP_A_W_MFH_NoEMS: 0,
    EGen_sh_kWh_HP_B_W_MFH_NoEMS: 0,
    HH_EGen_sh_kWh_HP_B_W_MFH_NoEMS: 0,
    EGen_hw_kWh_HP_A_W_MFH_NoEMS: 0,
    HH_EGen_hw_kWh_HP_A_W_MFH_NoEMS: 0,
    EGen_hw_kWh_HP_B_W_MFH_NoEMS: 0,
    HH_EGen_hw_kWh_HP_B_W_MFH_NoEMS: 0,
    Avg_Eff_JAZ_HP_A_W_MFH_NoEMS: 0,
    HH_Avg_Eff_JAZ_HP_A_W_MFH_NoEMS: 0,
    Avg_Eff_JAZ_HP_B_W_MFH_NoEMS: 0,
    HH_Avg_Eff_JAZ_HP_B_W_MFH_NoEMS: 0,
    EGen_sh_kWh_EDWW_MFH_NoEMS: 0,
    HH_EGen_sh_kWh_EDWW_MFH_NoEMS: 0,
    EGen_sh_kWh_EDWW_MFH_Brine_NoEMS: 0,
    EGen_hw_kWh_EDWW_MFH_NoEMS: 0,
    HH_EGen_hw_kWh_EDWW_MFH_NoEMS: 0,
    EGen_hw_kWh_EDWW_MFH_Brine_NoEMS: 0,
    HH_EGen_hw_kWh_EDWW_MFH_Brine_NoEMS: 0,
    backendUrl: `https://sectorcoupling-api.thernovotools.com/results`,
    //backendUrl: `https://bosch-endkundentool-api.azurewebsites.net/results`,
  };

  setProduct = (product) => {
    this.setState((prevState) => ({ productSelected: product }));
  };

  setEntryProduct = (product) => {
    this.setState((prevState) => ({ entryProduct: product }));
  };

  setProducts = (productsLng) => {
    this.setState({ products: productsLng });
  };

  setHeatpumpAudio = (audioState) => {
    this.setState((prevState) => ({ heatpumpAudio: audioState }));
  };

  setHeatpumpVolume = (volume) => {
    this.setState((prevState) => ({ heatpumpVolume: volume }));
  };

  setViewLocation = (viewLocation) => {
    this.setState((prevState) => ({ viewLocation: viewLocation }));
  };

  setViewLocationPrevious = (viewLocation) => {
    this.setState((prevState) => ({ viewLocationPrevious: viewLocation }));
  };

  setActiveView = (view) => {
    this.setState((prevState) => ({ activeView: view }));
  };

  setActiveStep = (step) => {
    this.setState((prevState) => ({ activeStep: step }));
  };

  setSelectedTab = (tab) => {
    this.setState((prevState) => ({ selectedTab: tab }));
  };

  setTime = (time) => {
    this.setState((prevState) => ({ time: time }));
  };

  setAppVolume = (volume) => {
    this.setState((prevState) => ({ appVolume: volume }));
  };

  setBackgroundVolume = (volume) => {
    this.setState((prevState) => ({ backgroundVolume: volume }));
  };

  setMenu = (state) => {
    this.setState((prevState) => ({ menuOpen: state }));
  };

  setMenuFloating = (state) => {
    this.setState((prevState) => ({ menuIsFloating: state }));
  };

  setAmbient = (state) => {
    this.setState((prevState) => ({ ambientAudio: state }));
  };

  setInitialLoad = (state) => {
    this.setState((prevState) => ({ initialLoad: state }));
  };

  setSelectedBackgroundAudio = (state) => {
    this.setState((prevState) => ({ selectedBackgroundAudio: state }));
  };

  setAudioContext = (state) => {
    this.setState((prevState) => ({ audioContext: state }));
  };

  setGainNode = (state) => {
    this.setState((prevState) => ({ gainNode: state }));
  };

  setMediaSource = (state) => {
    this.setState((prevState) => ({ mediaSource: state }));
  };

  trackUser = (state) => {
    this.setState((prevState) => ({ userTracked: state }));
  };

  setTerms = (state) => {
    this.setState((prevState) => ({ acceptedTerms: state }));
  };

  setSliderState = (state) => {
    this.setState((prevState) => ({ disableSlider: state }));
  };

  setStepperNav = (steps) => {
    this.setState((prevState) => ({ stepperNavActive: steps }));
  };

  setNavDirection = (direction) => {
    this.setState((prevState) => ({ navDirection: direction }));
  };

  setGasBrine = (result) => {
    this.setState((prevState) => ({ Eta_sh_gas_EDWW_MFH_Brine: result }));
  };

  setElc_Self_Consumption = (result) => {
    this.setState((prevState) => ({ elc_Self_Consumption: result }));
  };

  setPower_kW_PV_MFH = (result) => {
    this.setState((prevState) => ({ Power_kW_PV_MFH: result }));
  };

  setTCO_thermal_EUR_a = (result) => {
    this.setState((prevState) => ({ TCO_thermal_EUR_a: result }));
  };

  setBuildingEnegeryStandard = (result) => {
    this.setState((prevState) => ({ BuildingEnegeryStandard: result }));
  };

  setEnergyUse = (result) => {
    this.setState((prevState) => ({ EnergyUse: result }));
  };

  setBuildingSize = (result) => {
    this.setState((prevState) => ({ BuildingSize: result }));
  };

  setGasOilSwitch = (result) => {
    this.setState((prevState) => ({ GasOilSwitch: result }));
  };

  setKfwValue = (result) => {
    this.setState((prevState) => ({ kfwValue: result }));
  };

  setInsulationValue = (result) => {
    this.setState((prevState) => ({ insulationValue: result }));
  };

  setOilLNGValue = (result) => {
    this.setState((prevState) => ({ OilLNGValue: result }));
  };

  setDisabledOilUsage = (result) => {
    this.setState((prevState) => ({ disabledOilUsage: result }));
  };

  setDisabledLNGUsage = (result) => {
    this.setState((prevState) => ({ disabledLNGUsage: result }));
  };

  setOilUsageLiters = (result) => {
    this.setState((prevState) => ({ OilUsageLiters: result }));
  };

  setLNGUsage = (result) => {
    this.setState((prevState) => ({ LNGUsage: result }));
  };

  setHeatDistribution = (result) => {
    this.setState((prevState) => ({ heatDistributionValue: result }));
  };

  setEnergyUsageKWH = (result) => {
    this.setState((prevState) => ({ energyUsagekWh: result }));
  };

  setHeatpumpType = (result) => {
    this.setState((prevState) => ({ heatpumpType: result }));
  };

  setEV = (result) => {
    this.setState((prevState) => ({ ev: result }));
  };

  setOdometerIncrease = (result) => {
    this.setState((prevState) => ({ odometerIncrease: result }));
  };

  setOdometerIncreaseKWH = (result) => {
    this.setState((prevState) => ({ odometerIncreaseKWH: result }));
  };

  setHomeCharging = (result) => {
    this.setState((prevState) => ({ homeCharging: result }));
  };

  setPVOutput = (result) => {
    this.setState((prevState) => ({ pvOutput: result }));

    if (result === 0) {
      this.setState((prevState) => ({ pvOutputkWh: 4 }));
    } else if (result === 1) {
      this.setState((prevState) => ({ pvOutputkWh: 7 }));
    } else if (result === 2) {
      this.setState((prevState) => ({ pvOutputkWh: 10 }));
    } else if (result === 3) {
      this.setState((prevState) => ({ pvOutputkWh: 14 }));
    }
  };

  setHomeStorage = (result) => {
    this.setState((prevState) => ({ homeStorage: result }));
  };

  setHomeStorageSize = (result) => {
    this.setState((prevState) => ({ homeStorageSize: result }));

    if (result === "none") {
      this.setState((prevState) => ({ homeStorageSizekWh: 0 }));
    } else {
      if (result === 0) {
        this.setState((prevState) => ({ homeStorageSizekWh: 6 }));
      } else if (result === 1) {
        this.setState((prevState) => ({ homeStorageSizekWh: 9 }));
      } else if (result === 2) {
        this.setState((prevState) => ({ homeStorageSizekWh: 12 }));
      } else if (result === 3) {
        this.setState((prevState) => ({ homeStorageSizekWh: 15 }));
      }
    }
  };

  setInvestmentCost = (result) => {
    this.setState((prevState) => ({ investmentCost: result }));
  };

  setDisabledInvestmentCost = (result) => {
    this.setState((prevState) => ({ disabledInvestmentCost: result }));
  };

  setInvestmentCostEUR = (result) => {
    this.setState((prevState) => ({ investmentCostEUR: result }));
  };

  setElectricityCost = (result) => {
    this.setState((prevState) => ({ electricityCost: result }));
  };

  setGridRevenue = (result) => {
    this.setState((prevState) => ({ gridRevenue: result }));
  };

  setBackBtn = (result) => {
    this.setState((prevState) => ({ backBtn: result }));
  };

  setFwdBtn = (result) => {
    this.setState((prevState) => ({ fwdBtn: result }));
  };

  setSteps = (steps) => {
    this.setState((prevState) => ({ ...steps }));
  };

  setCostOverTime = (time) => {
    this.setState((prevState) => ({ costOverTime: time }));
  };

  setPieSize = (size, iconSize, innerRadius, fontSize, xHeatpumpLabel, xEVLabel, xHouseholdLabel, yHeatpumpLabel, yEVLabel, yHouseholdLabel, xPositionIconMargin, yPositionIconMargin, xPositionEVIconMargin, yPositionEVIconMargin, xPositionHouseholdIconMargin, yPositionHouseholdIconMargin) => {
    this.setState((prevState) => ({ pieChartSize: size, pieIconSize: iconSize, innerRadiusMargin: innerRadius, pieLabelFontSize: fontSize, xPositionHeatpumpLabel: xHeatpumpLabel, xPositionEVLabel: xEVLabel, xPositionHouseholdLabel: xHouseholdLabel, yPositionHeatpumpLabel: yHeatpumpLabel, yPositionEVLabel: yEVLabel, yPositionHouseholdLabel: yHouseholdLabel, xPositionIconMargin: xPositionIconMargin, yPositionIconMargin: yPositionIconMargin, xPositionEVIconMargin: xPositionEVIconMargin, yPositionEVIconMargin: yPositionEVIconMargin, xPositionHouseholdIconMargin: xPositionHouseholdIconMargin }));
  };

  setActiveMilestone = (milestone) => {
    this.setState((prevState) => ({ activeMilestone: milestone }));
  };

  setMilestoneHeadline = (headline) => {
    this.setState((prevState) => ({ milestoneHeadline: headline }));
  };

  setAnchorEl = (anchor) => {
    this.setState((prevState) => ({ setAnchorEl: anchor }));
  };

  setBackdrop = (show) => {
    this.setState((prevState) => ({ backdrop: show }));
  };

  setMenuBackdrop = (show) => {
    this.setState((prevState) => ({ menuBackdrop: show }));
  };

  setOffGrid1SVG = (svg) => {
    this.setState((prevState) => ({ offgrid1SVG: svg }));
  };

  setOffGrid2SVG = (svg) => {
    this.setState((prevState) => ({ offgrid2SVG: svg }));
  };

  setElectricityUse1SVG = (svg) => {
    this.setState((prevState) => ({ electricityUse1SVG: svg }));
  };

  setElectricityUse2SVG = (svg) => {
    this.setState((prevState) => ({ electricityUse2SVG: svg }));
  };

  setHouseholdUse1SVG = (svg) => {
    this.setState((prevState) => ({ householdUse1SVG: svg }));
  };

  setHouseholdUse2SVG = (svg) => {
    this.setState((prevState) => ({ householdUse2SVG: svg }));
  };

  setBreakEvenBase64 = (base64) => {
    this.setState((prevState) => ({ breakEvenBase64: base64 }));
  };

  setOffgridEMS = (ems) => {
    this.setState((prevState) => ({ offgridEMS: ems }));
  };

  setHouseholdEMS = (ems) => {
    this.setState((prevState) => ({ householdEMS: ems }));
  };

  setTestSVG = (svg) => {
    this.setState((prevState) => ({ testSVG: svg }));
  };

  setOffgrid1SVG_NoEMS_Hidden = (svg) => {
    this.setState((prevState) => ({ offgrid1SVG_NoEMS_Hidden: svg }));
  };

  setOffgrid2SVG_NoEMS_Hidden = (svg) => {
    this.setState((prevState) => ({ offgrid2SVG_NoEMS_Hidden: svg }));
  };

  setOffgrid1SVG_EMS_Hidden = (svg) => {
    this.setState((prevState) => ({ offgrid1SVG_EMS_Hidden: svg }));
  };

  setOffgrid2SVG_EMS_Hidden = (svg) => {
    this.setState((prevState) => ({ offgrid2SVG_EMS_Hidden: svg }));
  };

  setHousehold1SVG_EMS_Hidden = (svg) => {
    this.setState((prevState) => ({ household1SVG_EMS_Hidden: svg }));
  };

  setHousehold2SVG_EMS_Hidden = (svg) => {
    this.setState((prevState) => ({ household2SVG_EMS_Hidden: svg }));
  };

  setHousehold1SVG_NoEMS_Hidden = (svg) => {
    this.setState((prevState) => ({ household1SVG_NoEMS_Hidden: svg }));
  };

  setHousehold2SVG_NoEMS_Hidden = (svg) => {
    this.setState((prevState) => ({ household2SVG_NoEMS_Hidden: svg }));
  };

  setCalculationModal = (modal) => {
    this.setState((prevState) => ({ calculationModal: modal }));
  };

  setActiveCalculationView = (view) => {
    this.setState((prevState) => ({ activeCalculationView: view }));
  };

  setWindowWidth = (width) => {
    this.setState((prevState) => ({ windowWidth: width }));
  };

  setWindowHeight = (height) => {
    this.setState((prevState) => ({ windowHeight: height }));
  };

  setTabToSelect = (tab) => {
    this.setState((prevState) => ({ tabToSelect: tab }));
  };

  setTabToSelectEigenverbrauch = (tab) => {
    this.setState((prevState) => ({ tabToSelectEigenverbrauch: tab }));
  };

  setPreHeatTempOption = (option) => {
    this.setState((prevState) => ({ preHeatTempOption: option }));
  };

  setScenarioInDatabase = (scenario) => {
    this.setState((prevState) => ({ scenarioInDatabase: scenario }));
  };

  setDatabaseResult = (result) => {
    this.setState((prevState) => ({ EGen_elc_kWh_PV_MFH: result.EGen_elc_kWh_PV_MFH }));
    this.setState((prevState) => ({ energy_to_grid_kWh_PV_MFH: result.energy_to_grid_kWh_PV_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_HP_A_W_MFH: result.EGen_sh_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_HP_B_W_MFH: result.EGen_sh_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_HP_A_W_MFH: result.EGen_hw_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_HP_B_W_MFH: result.EGen_hw_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ Avg_Eff_JAZ_HP_A_W_MFH: result.Avg_Eff_JAZ_HP_A_W_MFH }));
    this.setState((prevState) => ({ Avg_Eff_JAZ_HP_B_W_MFH: result.Avg_Eff_JAZ_HP_B_W_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_EDWW_MFH: result.EGen_sh_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_EDWW_MFH: result.EGen_hw_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_EDWW_MFH_Brine: result.EGen_hw_kWh_EDWW_MFH_Brine }));
  };

  setDatabaseResultNoEMS = (result) => {
    this.setState((prevState) => ({ EGen_elc_kWh_PV_MFH_NoEMS: result.EGen_elc_kWh_PV_MFH }));
    this.setState((prevState) => ({ energy_to_grid_kWh_PV_MFH_NoEMS: result.energy_to_grid_kWh_PV_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_HP_A_W_MFH_NoEMS: result.EGen_sh_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_HP_B_W_MFH_NoEMS: result.EGen_sh_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_HP_A_W_MFH_NoEMS: result.EGen_hw_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_HP_B_W_MFH_NoEMS: result.EGen_hw_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ Avg_Eff_JAZ_HP_A_W_MFH_NoEMS: result.Avg_Eff_JAZ_HP_A_W_MFH }));
    this.setState((prevState) => ({ Avg_Eff_JAZ_HP_B_W_MFH_NoEMS: result.Avg_Eff_JAZ_HP_B_W_MFH }));
    this.setState((prevState) => ({ EGen_sh_kWh_EDWW_MFH_NoEMS: result.EGen_sh_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_EDWW_MFH_NoEMS: result.EGen_hw_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ EGen_hw_kWh_EDWW_MFH_Brine_NoEMS: result.EGen_hw_kWh_EDWW_MFH_Brine }));
  };

  setDatabaseResultHouseHold = (result) => {
    this.setState((prevState) => ({ HH_EGen_elc_kWh_PV_MFH: result.EGen_elc_kWh_PV_MFH }));
    this.setState((prevState) => ({ HH_energy_to_grid_kWh_PV_MFH: result.energy_to_grid_kWh_PV_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_HP_A_W_MFH: result.EGen_sh_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_HP_B_W_MFH: result.EGen_sh_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_HP_A_W_MFH: result.EGen_hw_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_HP_B_W_MFH: result.EGen_hw_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_Avg_Eff_JAZ_HP_A_W_MFH: result.Avg_Eff_JAZ_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_Avg_Eff_JAZ_HP_B_W_MFH: result.Avg_Eff_JAZ_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_EDWW_MFH: result.EGen_sh_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_EDWW_MFH: result.EGen_hw_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_EDWW_MFH_Brine: result.EGen_hw_kWh_EDWW_MFH_Brine }));
  };

  setDatabaseResultHouseHoldNoEMS = (result) => {
    this.setState((prevState) => ({ HH_EGen_elc_kWh_PV_MFH_NoEMS: result.EGen_elc_kWh_PV_MFH }));
    this.setState((prevState) => ({ HH_energy_to_grid_kWh_PV_MFH_NoEMS: result.energy_to_grid_kWh_PV_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_HP_A_W_MFH_NoEMS: result.EGen_sh_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_HP_B_W_MFH_NoEMS: result.EGen_sh_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_HP_A_W_MFH_NoEMS: result.EGen_hw_kWh_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_HP_B_W_MFH_NoEMS: result.EGen_hw_kWh_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_Avg_Eff_JAZ_HP_A_W_MFH_NoEMS: result.Avg_Eff_JAZ_HP_A_W_MFH }));
    this.setState((prevState) => ({ HH_Avg_Eff_JAZ_HP_B_W_MFH_NoEMS: result.Avg_Eff_JAZ_HP_B_W_MFH }));
    this.setState((prevState) => ({ HH_EGen_sh_kWh_EDWW_MFH_NoEMS: result.EGen_sh_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_EDWW_MFH_NoEMS: result.EGen_hw_kWh_EDWW_MFH }));
    this.setState((prevState) => ({ HH_EGen_hw_kWh_EDWW_MFH_Brine_NoEMS: result.EGen_hw_kWh_EDWW_MFH_Brine }));
  };

  setHeatpumpCombinedUsage = (result) => {
    this.setState((prevState) => ({ heatpumpCombinedUsage: result }));
  };

  setOffgridPVPercentageNoEMS = (result) => {
    this.setState((prevState) => ({ offgridPVPercentageNoEMS: result }));
  };

  setNoEMScombinedEnergyUseKWH = (result) => {
    this.setState((prevState) => ({ NoEMScombinedEnergyUseKWH: result }));
  };

  setNoEMSPercentage = (result) => {
    this.setState((prevState) => ({ noEMSPercentageOffGrid: result }));
  };

  setHouseholdNoEMSpvPercent = (result) => {
    this.setState((prevState) => ({ householdNoEMSpvPercent: result }));
  };

  setInfoBoxCombinedHouseholdUsage = (result) => {
    this.setState((prevState) => ({ infoBoxCombinedHouseholdUsage: result }));
  };

  setInfoBoxHouseholdGridFeed = (result) => {
    this.setState((prevState) => ({ infoBoxHouseholdGridFeed: result }));
  };

  setInfoBoxOffGridGridUsage = (result) => {
    this.setState((prevState) => ({ infoBoxOffGridGridUsage: result }));
  };

  setElectricityCostPercentage = (offgrid, household) => {
    this.setState((prevState) => ({ electricityCostOffGridPercentage: offgrid }));
    this.setState((prevState) => ({ electricityCostHouseholdPercentage: household }));
  };

  setElectricityCostPVsavings = (savings) => {
    this.setState((prevState) => ({ electricityCostPVsavings: savings }));
  };

  setElectricityCostPVEMSsavings = (savings) => {
    this.setState((prevState) => ({ electricityCostPVEMSsavings: savings }));
  };

  addHeatpumpPVems = (array) => {
    this.setState((prevState) => ({ heatpumpPVems: array }));
  };

  addHeatpumpPV = (array) => {
    this.setState((prevState) => ({ heatpumpPV: array }));
  };

  setLoading = (status) => {
    this.setState((prevState) => ({ loading: status }));
  };

  setLoadingOffGrid = (status) => {
    this.setState((prevState) => ({ loadingOffGrid: status }));
  };

  setLoadingHousehold = (status) => {
    this.setState((prevState) => ({ loadingHousehold: status }));
  };

  setDirectLink = (value) => {
    this.setState((prevState) => ({ directLink: value }));
  };

  setSelectedTheme = (value) => {
    this.setState((prevState) => ({ selectedTheme: value }));
  };

  goToView = (newValue, directLink) => {
    if (directLink === true) {
      this.setDirectLink(true);
    }
    this.setActiveView(newValue);
  };

  // Tracking GA4 - Window parent post message
  sendGAEvent = (event, value = null, location) => {
    const eventName = "eventName",
      eventParameterName1 = "eventParameterName1",
      parameterValue1 = "parameterValue1",
      eventParameterName2 = "eventParameterName2",
      parameterValue2 = "parameterValue2",
      eventParameterName3 = "eventParameterName3",
      parameterValue3 = "parameterValue3";

    var eventArray = [];

    if (window.parent) {
      switch (event) {
        // welcome.jsx - excel 1
        case "jetzt-solarstromrechner-starten":
          eventArray[eventName] = "sc_toolstart";
          break;

        case "berechnungsgrundlage":
          eventArray[eventName] = "sc_calculation_basis";
          break;

        // buildingSize.jsx - excel 2
        case "gebaudegrobe-125-175":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Building size";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "125-175 qm";
          break;

        case "gebaudegrobe-175-225":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Building size";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "175-225 qm";
          break;

        // heatingSelection.jsx - excel 3
        // geabude-energiestandard
        case "heizenergiebefard-gebaude-40":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Energy building standard";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "KfW 40";
          break;

        case "heizenergiebefard-gebaude-55":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Energy building standard";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "KfW 55";
          break;

        case "heizenergiebefard-gebaude-70":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Energy building standard";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "KfW 70";
          break;

        case "heizenergiebefard-gebaude-85":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Energy building standard";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "KfW 85";
          break;

        case "heizenergiebefard-gebaude-100":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Energy building standard";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "KfW 100";
          break;

        // ol-oder gasverbrauch
        case "heizenergiebedard-olverbrauch":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Oil or gas consumption";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "Oil consumption " + value;
          break;

        case "heizenergiebedard-gasverbrauch":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Oil or gas consumption";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "Gas consumption " + value;
          break;

        // gebaudeisolierung
        case "heizenergiebedard-vollstandig":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Building insulation";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "very good";
          break;

        case "heizenergiebedard-grobtenteils":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Building insulation";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "good";
          break;

        case "heizenergiebedard-teilweise":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Building insulation";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "partly";
          break;

        case "heizenergiebedard-schlecht":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heating energy requirements";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Building insulation";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "none";
          break;

        // heatdistribution.jsx - excel 4
        case "warmeverteilsystem-heizkorper":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heat distribution system";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Radiator";
          break;

        case "warmeverteilsystem-fubodenheizung":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heat distribution system";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Underfloor heating";
          break;

        case "warmeverteilsystem-fubodenheizung-und-heizkorper":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heat distribution system";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Radiator and underfloor heating";
          break;

        // householdEnergyuse - excel 5
        case "haushaltsstromverbrauch-kwh":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Household electricity consumption";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = value;
          break;

        case "haushaltsstromverbrauch-back-to-result":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Household electricity consumption";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Back to result page";
          break;

        // heatpump.jsx - excel 6
        case "warmepumpe-erdwarmepumpe":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heat pump";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Geothermal heat pump";
          break;

        case "warmepumpe-luftwasserwarmepumper":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Heat pump";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Air source heat pump";
          break;

        // ev.jsx - excel 7
        case "elektroauto-das-eauto-kann":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "E-car";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Yes";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "Car only rarely charged during the day";
          break;

        case "elektroauto-das-eauto-wird":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "E-car";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Yes";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "Car mainly charged during the day";
          break;

        case "elektroauto-10000":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "E-car";
          eventArray[eventParameterName3] = "sc_given_answer1";
          eventArray[parameterValue2] = "Yes";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue2] = "Annual output 10000";
          break;

        case "elektroauto-20000":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "E-car";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Yes";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = "Annual output 20000";
          break;

        case "elektroauto-nein":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "E-car";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "No";
          break;

        // pvOutput.jsx - excel 8
        case "pv-leistung-kwp":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "PV power";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = value + " kwp";
          break;

        // homestorage.jsx - excel 9
        case "batteriespeicher-kwh":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Battery storage";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Yes";
          eventArray[eventParameterName3] = "sc_given_answer2";
          eventArray[parameterValue3] = value + " kwh";
          break;

        case "batteriespeicher-nein":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Battery storage";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "No";
          break;

        // investment.jsx - excel 10
        case "investitionskosten-nein":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Investment costs";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = "Don't know investment costs";
          break;

        case "investitionskosten-amount":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Investment costs";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = value;
          break;

        // electricityCost.jsx - excel 11
        case "stromkosten-amount":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Electricity costs";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = value;
          break;

        // electricityCost.jsx - excel 12
        case "einspeisevergütung-amount":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_question";
          eventArray[parameterValue1] = "Feed-in tariff";
          eventArray[eventParameterName2] = "sc_given_answer1";
          eventArray[parameterValue2] = value;
          break;

        // result part 1 - excel 13
        case "gesamtkosten-strom-20-years":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 1";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Total cost electricity";
          break;

        case "result-part1-berechnungsgrundlage":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 1";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Calculation basis";
          break;

        case "result-part1-next":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 1";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Next";
          break;

        // result part 2 - excel 14
        case "result-part2-infoicons":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 2";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Info icons";
          break;

        case "result-part2-switch-energiemanagement":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 2";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "With Energy management";
          break;

        case "result-part2-berechnungsgrundlage":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 2";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Calculation basis";
          break;

        case "result-part2-change-electricity":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 2";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Change electricity consumption";
          break;

        case "result-part2-next":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Result part 2";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Next";
          break;

        // result part 3 - excel 15
        case "result-part3-save-pdf":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Save";
          break;

        case "result-part3-contact":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Contact";
          break;
        case "result-part3-offer":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Angebot";
          break;

        case "result-part3-heatpump":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Product";
          eventArray[eventParameterName3] = "sc_clicked_element2";
          eventArray[parameterValue3] = "Heat pump";
          break;

        case "result-part3-pv":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Product";
          eventArray[eventParameterName3] = "sc_clicked_element2";
          eventArray[parameterValue3] = "PV";
          break;

        case "result-part3-wallbox":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Product";
          eventArray[eventParameterName3] = "sc_clicked_element2";
          eventArray[parameterValue3] = "Wallbox";
          break;

        case "result-part3-energie-management":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Product";
          eventArray[eventParameterName3] = "sc_clicked_element2";
          eventArray[parameterValue3] = "Energy management";
          break;

        case "result-part3-berechnungsgrundlage":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Calculation basis";
          break;

        case "result-part3-back-to-startpage":
          eventArray[eventName] = "sc_answers";
          eventArray[eventParameterName1] = "sc_result";
          eventArray[parameterValue1] = "Next steps";
          eventArray[eventParameterName2] = "sc_clicked_element";
          eventArray[parameterValue2] = "Back to startpage";
          break;
        default:
      }

      window.parent.postMessage(
        {
          event: "GA4event",
          event_name: eventArray[eventName],
          event_parameterName1: eventArray[eventParameterName1],
          event_parameterValue1: eventArray[parameterValue1],
          event_parameterName2: eventArray[eventParameterName2],
          event_parameterValue2: eventArray[parameterValue2],
          event_parameterName3: eventArray[eventParameterName3],
          event_parameterValue3: eventArray[parameterValue3],
          eventAction: location,
        },
        "*"
      );
    }

    document.addEventListener("DOMContentLoaded", (event) => {
      document.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function (e) {
          window.scrollTo(0, 0);
        });
      });
    });
  };

  getTheme = () => {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("theme")) {
      var entryParam = urlParams.get("theme");
    }
    this.setSelectedTheme(entryParam);
  };

  loading;
  loadingOffGrid;
  loadingHousehold;

  render() {
    const { children } = this.props;
    const {
      products,
      btnThemes,
      fonts,
      navSteps,
      product,
      productSelected,
      selectedTab,
      stepperNavActive,
      entryProduct,
      activeView,
      activeStep,
      activeMilestone,
      milestoneHeadline,
      navDirection,
      time,
      heatpumpAudio,
      disableSlider,
      heatpumpVolume,
      refernceHeatpumpVolume,
      viewLocation,
      viewLocationPrevious,
      selectedBackgroundAudio,
      backgroundAudio,
      deviceIcons,
      backgroundVolume,
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
      odometerIncreaseKWH,
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
      pieChartSize,
      pieIconSize,
      innerRadiusMargin,
      pieLabelFontSize,
      xPositionHeatpumpLabel,
      xPositionEVLabel,
      xPositionHouseholdLabel,
      yPositionHeatpumpLabel,
      yPositionEVLabel,
      yPositionHouseholdLabel,
      xPositionIconMargin,
      yPositionIconMargin,
      xPositionEVIconMargin,
      yPositionEVIconMargin,
      xPositionHouseholdIconMargin,
      yPositionHouseholdIconMargin,
      anchorEl,
      backdrop,
      offgrid1SVG,
      offgrid2SVG,
      electricityUse1SVG,
      electricityUse2SVG,
      householdUse1SVG,
      householdUse2SVG,
      breakEvenBase64,
      offgridEMS,
      householdEMS,
      testSVG,
      offgrid1SVG_NoEMS_Hidden,
      offgrid2SVG_NoEMS_Hidden,
      offgrid1SVG_EMS_Hidden,
      offgrid2SVG_EMS_Hidden,
      household1SVG_EMS_Hidden,
      household2SVG_EMS_Hidden,
      household1SVG_NoEMS_Hidden,
      household2SVG_NoEMS_Hidden,
      calculationModal,
      activeCalculationView,
      menuBackdrop,
      windowWidth,
      windowHeight,
      tabEntries,
      pvMarks,
      pvOutputkWh,
      homeStorageSizekWh,
      tabToSelect,
      tabToSelectEigenverbrauch,
      kfwLookupTable,
      buildingTypePreHeatOption,
      preHeatTempOption,
      singlePreHeatOptionNoEVLookupTable,
      dualPreHeatOptionNoEVLookupTable,
      singlePreHeatOptionEVLookupTable,
      dualPreHeatOptionEVLookupTable,
      scenarioInDatabase,
      EGen_elc_kWh_PV_MFH,
      HH_EGen_elc_kWh_PV_MFH,
      energy_to_grid_kWh_PV_MFH,
      HH_energy_to_grid_kWh_PV_MFH,
      EGen_sh_kWh_HP_A_W_MFH,
      HH_EGen_sh_kWh_HP_A_W_MFH,
      EGen_sh_kWh_HP_B_W_MFH,
      HH_EGen_sh_kWh_HP_B_W_MFH,
      EGen_hw_kWh_HP_A_W_MFH,
      HH_EGen_hw_kWh_HP_A_W_MFH,
      EGen_hw_kWh_HP_B_W_MFH,
      HH_EGen_hw_kWh_HP_B_W_MFH,
      Avg_Eff_JAZ_HP_A_W_MFH,
      HH_Avg_Eff_JAZ_HP_A_W_MFH,
      Avg_Eff_JAZ_HP_B_W_MFH,
      HH_Avg_Eff_JAZ_HP_B_W_MFH,
      EGen_sh_kWh_EDWW_MFH,
      HH_EGen_sh_kWh_EDWW_MFH,
      EGen_sh_kWh_EDWW_MFH_Brine,
      EGen_hw_kWh_EDWW_MFH,
      HH_EGen_hw_kWh_EDWW_MFH,
      EGen_hw_kWh_EDWW_MFH_Brine,
      HH_EGen_hw_kWh_EDWW_MFH_Brine,
      EGen_elc_kWh_PV_MFH_NoEMS,
      HH_EGen_elc_kWh_PV_MFH_NoEMS,
      energy_to_grid_kWh_PV_MFH_NoEMS,
      HH_energy_to_grid_kWh_PV_MFH_NoEMS,
      EGen_sh_kWh_HP_A_W_MFH_NoEMS,
      HH_EGen_sh_kWh_HP_A_W_MFH_NoEMS,
      EGen_sh_kWh_HP_B_W_MFH_NoEMS,
      HH_EGen_sh_kWh_HP_B_W_MFH_NoEMS,
      EGen_hw_kWh_HP_A_W_MFH_NoEMS,
      HH_EGen_hw_kWh_HP_A_W_MFH_NoEMS,
      EGen_hw_kWh_HP_B_W_MFH_NoEMS,
      HH_EGen_hw_kWh_HP_B_W_MFH_NoEMS,
      Avg_Eff_JAZ_HP_A_W_MFH_NoEMS,
      HH_Avg_Eff_JAZ_HP_A_W_MFH_NoEMS,
      Avg_Eff_JAZ_HP_B_W_MFH_NoEMS,
      HH_Avg_Eff_JAZ_HP_B_W_MFH_NoEMS,
      EGen_sh_kWh_EDWW_MFH_NoEMS,
      HH_EGen_sh_kWh_EDWW_MFH_NoEMS,
      EGen_sh_kWh_EDWW_MFH_Brine_NoEMS,
      EGen_hw_kWh_EDWW_MFH_NoEMS,
      HH_EGen_hw_kWh_EDWW_MFH_NoEMS,
      EGen_hw_kWh_EDWW_MFH_Brine_NoEMS,
      HH_EGen_hw_kWh_EDWW_MFH_Brine_NoEMS,
      heatpumpCombinedUsage,
      offgridPVPercentageNoEMS,
      NoEMScombinedEnergyUseKWH,
      noEMSPercentageOffGrid,
      householdNoEMSpvPercent,
      infoBoxCombinedHouseholdUsage,
      infoBoxHouseholdGridFeed,
      infoBoxOffGridGridUsage,
      kWhUsageLookupTable,
      electricityCostOffGridPercentage,
      electricityCostHouseholdPercentage,
      electricityCostPVsavings,
      electricityCostPVEMSsavings,
      PVcostLookupTable,
      StorageCostLookupTable,
      heatpumpPVems,
      heatpumpPV,
      loading,
      loadingOffGrid,
      loadingHousehold,
      directLink,
      selectedTheme,
      backendUrl,
    } = this.state;
    const {
      setProduct,
      setEntryProduct,
      setProducts,
      setHeatpumpAudio,
      setHeatpumpVolume,
      setActiveView,
      goToView,
      getTheme,
      setActiveStep,
      setActiveMilestone,
      setMilestoneHeadline,
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
      setOdometerIncreaseKWH,
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
      setCostOverTime,
      setPieSize,
      setAnchorEl,
      setBackdrop,
      setOffGrid1SVG,
      setOffGrid2SVG,
      setElectricityUse1SVG,
      setElectricityUse2SVG,
      setHouseholdUse1SVG,
      setHouseholdUse2SVG,
      setBreakEvenBase64,
      setHouseholdEMS,
      setOffgridEMS,
      setTestSVG,
      setOffgrid1SVG_NoEMS_Hidden,
      setOffgrid2SVG_NoEMS_Hidden,
      setOffgrid1SVG_EMS_Hidden,
      setOffgrid2SVG_EMS_Hidden,
      setHousehold1SVG_EMS_Hidden,
      setHousehold2SVG_EMS_Hidden,
      setHousehold1SVG_NoEMS_Hidden,
      setHousehold2SVG_NoEMS_Hidden,
      setCalculationModal,
      setActiveCalculationView,
      setMenuBackdrop,
      setWindowWidth,
      setWindowHeight,
      setTabToSelect,
      setTabToSelectEigenverbrauch,
      setPreHeatTempOption,
      setScenarioInDatabase,
      setDatabaseResult,
      setDatabaseResultNoEMS,
      setDatabaseResultHouseHold,
      setDatabaseResultHouseHoldNoEMS,
      setHeatpumpCombinedUsage,
      setOffgridPVPercentageNoEMS,
      setNoEMScombinedEnergyUseKWH,
      setNoEMSPercentage,
      setHouseholdNoEMSpvPercent,
      setInfoBoxCombinedHouseholdUsage,
      setInfoBoxHouseholdGridFeed,
      setInfoBoxOffGridGridUsage,
      setElectricityCostPercentage,
      setElectricityCostPVsavings,
      setElectricityCostPVEMSsavings,
      addHeatpumpPVems,
      addHeatpumpPV,
      setLoading,
      setLoadingOffGrid,
      setLoadingHousehold,
      setDirectLink,
      setSelectedTheme,
      sendGAEvent,
    } = this;

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
          activeMilestone,
          milestoneHeadline,
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
          odometerIncreaseKWH,
          homeCharging,
          homeStorage,
          homeStorageSize,
          homeStorageSizekWh,
          investmentCost,
          disabledInvestmentCost,
          investmentCostEUR,
          electricityCost,
          gridRevenue,
          backBtn,
          fwdBtn,
          anchorEl,
          steps,
          costOverTime,
          pieChartSize,
          pieIconSize,
          innerRadiusMargin,
          pieLabelFontSize,
          xPositionHeatpumpLabel,
          xPositionEVLabel,
          xPositionHouseholdLabel,
          yPositionHeatpumpLabel,
          yPositionEVLabel,
          yPositionHouseholdLabel,
          xPositionIconMargin,
          yPositionIconMargin,
          xPositionEVIconMargin,
          yPositionEVIconMargin,
          xPositionHouseholdIconMargin,
          yPositionHouseholdIconMargin,
          backdrop,
          menuBackdrop,
          offgrid1SVG,
          offgrid2SVG,
          electricityUse1SVG,
          electricityUse2SVG,
          householdUse1SVG,
          householdUse2SVG,
          breakEvenBase64,
          offgridEMS,
          householdEMS,
          testSVG,
          offgrid1SVG_NoEMS_Hidden,
          offgrid2SVG_NoEMS_Hidden,
          offgrid1SVG_EMS_Hidden,
          offgrid2SVG_EMS_Hidden,
          household1SVG_EMS_Hidden,
          household2SVG_EMS_Hidden,
          household1SVG_NoEMS_Hidden,
          household2SVG_NoEMS_Hidden,
          calculationModal,
          activeCalculationView,
          windowWidth,
          windowHeight,
          tabEntries,
          pvMarks,
          pvOutputkWh,
          tabToSelect,
          tabToSelectEigenverbrauch,
          kfwLookupTable,
          buildingTypePreHeatOption,
          preHeatTempOption,
          singlePreHeatOptionNoEVLookupTable,
          dualPreHeatOptionNoEVLookupTable,
          singlePreHeatOptionEVLookupTable,
          dualPreHeatOptionEVLookupTable,
          scenarioInDatabase,
          EGen_elc_kWh_PV_MFH,
          HH_EGen_elc_kWh_PV_MFH,
          energy_to_grid_kWh_PV_MFH,
          HH_energy_to_grid_kWh_PV_MFH,
          EGen_sh_kWh_HP_A_W_MFH,
          HH_EGen_sh_kWh_HP_A_W_MFH,
          EGen_sh_kWh_HP_B_W_MFH,
          HH_EGen_sh_kWh_HP_B_W_MFH,
          EGen_hw_kWh_HP_A_W_MFH,
          HH_EGen_hw_kWh_HP_A_W_MFH,
          EGen_hw_kWh_HP_B_W_MFH,
          HH_EGen_hw_kWh_HP_B_W_MFH,
          Avg_Eff_JAZ_HP_A_W_MFH,
          HH_Avg_Eff_JAZ_HP_A_W_MFH,
          Avg_Eff_JAZ_HP_B_W_MFH,
          HH_Avg_Eff_JAZ_HP_B_W_MFH,
          EGen_sh_kWh_EDWW_MFH,
          HH_EGen_sh_kWh_EDWW_MFH,
          EGen_sh_kWh_EDWW_MFH_Brine,
          EGen_hw_kWh_EDWW_MFH,
          HH_EGen_hw_kWh_EDWW_MFH,
          EGen_hw_kWh_EDWW_MFH_Brine,
          HH_EGen_hw_kWh_EDWW_MFH_Brine,
          EGen_elc_kWh_PV_MFH_NoEMS,
          HH_EGen_elc_kWh_PV_MFH_NoEMS,
          energy_to_grid_kWh_PV_MFH_NoEMS,
          HH_energy_to_grid_kWh_PV_MFH_NoEMS,
          EGen_sh_kWh_HP_A_W_MFH_NoEMS,
          HH_EGen_sh_kWh_HP_A_W_MFH_NoEMS,
          EGen_sh_kWh_HP_B_W_MFH_NoEMS,
          HH_EGen_sh_kWh_HP_B_W_MFH_NoEMS,
          EGen_hw_kWh_HP_A_W_MFH_NoEMS,
          HH_EGen_hw_kWh_HP_A_W_MFH_NoEMS,
          EGen_hw_kWh_HP_B_W_MFH_NoEMS,
          HH_EGen_hw_kWh_HP_B_W_MFH_NoEMS,
          Avg_Eff_JAZ_HP_A_W_MFH_NoEMS,
          HH_Avg_Eff_JAZ_HP_A_W_MFH_NoEMS,
          Avg_Eff_JAZ_HP_B_W_MFH_NoEMS,
          HH_Avg_Eff_JAZ_HP_B_W_MFH_NoEMS,
          EGen_sh_kWh_EDWW_MFH_NoEMS,
          HH_EGen_sh_kWh_EDWW_MFH_NoEMS,
          EGen_sh_kWh_EDWW_MFH_Brine_NoEMS,
          EGen_hw_kWh_EDWW_MFH_NoEMS,
          HH_EGen_hw_kWh_EDWW_MFH_NoEMS,
          EGen_hw_kWh_EDWW_MFH_Brine_NoEMS,
          HH_EGen_hw_kWh_EDWW_MFH_Brine_NoEMS,
          heatpumpCombinedUsage,
          offgridPVPercentageNoEMS,
          NoEMScombinedEnergyUseKWH,
          noEMSPercentageOffGrid,
          householdNoEMSpvPercent,
          infoBoxCombinedHouseholdUsage,
          infoBoxHouseholdGridFeed,
          infoBoxOffGridGridUsage,
          kWhUsageLookupTable,
          electricityCostOffGridPercentage,
          electricityCostHouseholdPercentage,
          electricityCostPVsavings,
          electricityCostPVEMSsavings,
          PVcostLookupTable,
          StorageCostLookupTable,
          heatpumpPVems,
          heatpumpPV,
          loading,
          loadingOffGrid,
          loadingHousehold,
          directLink,
          selectedTheme,
          setProduct,
          setEntryProduct,
          setProducts,
          setHeatpumpAudio,
          setHeatpumpVolume,
          setActiveView,
          goToView,
          getTheme,
          setActiveStep,
          setActiveMilestone,
          setMilestoneHeadline,
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
          setOdometerIncreaseKWH,
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
          setCostOverTime,
          setPieSize,
          setAnchorEl,
          setBackdrop,
          setMenuBackdrop,
          setOffGrid1SVG,
          setOffGrid2SVG,
          setElectricityUse1SVG,
          setElectricityUse2SVG,
          setHouseholdUse1SVG,
          setHouseholdUse2SVG,
          setBreakEvenBase64,
          setHouseholdEMS,
          setOffgridEMS,
          setTestSVG,
          setOffgrid1SVG_NoEMS_Hidden,
          setOffgrid2SVG_NoEMS_Hidden,
          setOffgrid1SVG_EMS_Hidden,
          setOffgrid2SVG_EMS_Hidden,
          setHousehold1SVG_EMS_Hidden,
          setHousehold2SVG_EMS_Hidden,
          setHousehold1SVG_NoEMS_Hidden,
          setHousehold2SVG_NoEMS_Hidden,
          setCalculationModal,
          setActiveCalculationView,
          setWindowWidth,
          setWindowHeight,
          setTabToSelect,
          setTabToSelectEigenverbrauch,
          setPreHeatTempOption,
          setScenarioInDatabase,
          setDatabaseResult,
          setDatabaseResultNoEMS,
          setDatabaseResultHouseHold,
          setDatabaseResultHouseHoldNoEMS,
          setHeatpumpCombinedUsage,
          setOffgridPVPercentageNoEMS,
          setNoEMScombinedEnergyUseKWH,
          setNoEMSPercentage,
          setHouseholdNoEMSpvPercent,
          setInfoBoxCombinedHouseholdUsage,
          setInfoBoxHouseholdGridFeed,
          setInfoBoxOffGridGridUsage,
          setElectricityCostPercentage,
          setElectricityCostPVsavings,
          setElectricityCostPVEMSsavings,
          addHeatpumpPVems,
          addHeatpumpPV,
          setLoading,
          setLoadingOffGrid,
          setLoadingHousehold,
          setDirectLink,
          setSelectedTheme,
          sendGAEvent,
          backendUrl,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;

export { SimulatorProvider };
