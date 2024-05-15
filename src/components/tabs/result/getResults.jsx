import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import resultService from "../../../services/results";
import AppContext from "../../../AppContext";

const calculateEnergyUsageCombined = (results, energyUsageHeatpump, energyUsagekWh, odometerIncreaseKWH) => {
  return Math.round(energyUsageHeatpump + parseInt(energyUsagekWh) + odometerIncreaseKWH);
};

const calculateheatpumpUsageKWH = (results, heatpumpType) => {
  const { EGen_hw_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_sh_kWh_EDWW_MFH, Avg_Eff_JAZ_HP_B_W_MFH, Avg_Eff_JAZ_HP_A_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH } = results;
  var Avg_Eff_JAZ_HP;

  if (heatpumpType === "1") {
    Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH;
  } else {
    Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH;
  }

  //Enegery usage heatpump
  var energyUsageHeatpump = (parseFloat(EGen_sh_kWh_HP_A_W_MFH) + parseFloat(EGen_sh_kWh_HP_B_W_MFH) + parseFloat(EGen_hw_kWh_HP_A_W_MFH) + parseFloat(EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);

  var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);

  return Math.round(energyUsageHeatpump + energyUsageHeatingRod);
};

const calculateEnergyUsagePercentage = (source, energyUsageHeatpump, energyUsageCombined, energyUsagekWh, odometerIncreaseKWH) => {
  if (source === "heatpump") {
    return parseFloat((energyUsageHeatpump / energyUsageCombined) * 100).toFixed(2);
  } else if (source === "household") {
    return parseFloat((parseInt(energyUsagekWh) / energyUsageCombined) * 100).toFixed(2);
  } else if (source === "ev") {
    return parseFloat((parseInt(odometerIncreaseKWH) / energyUsageCombined) * 100).toFixed(2);
  }
};

const calculategridUsagePercentage = (results, energyUsageCombined) => {
  const { energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = results;

  var gridUsagePercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(energyUsageCombined)) * 100;

  return gridUsagePercent;
};

const calculatepvUsagePercentage = (results, energyUsageCombined) => {
  const { energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = results;

  var pvUsagePercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(energyUsageCombined)) * 100;
  return pvUsagePercent;
};

const calculatedgridFeedPercentage = (results) => {
  const { energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = results;

  var gridFeedPercent = 100 - ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(EGen_elc_kWh_PV_MFH)) * 100;

  return gridFeedPercent;
};
const calculatedHouseholdpvPercentage = (results) => {
  const { energy_to_grid_kWh_PV_MFH, EGen_elc_kWh_PV_MFH } = results;
  var householdpvPercent = ((parseFloat(EGen_elc_kWh_PV_MFH) - parseFloat(energy_to_grid_kWh_PV_MFH)) / parseFloat(EGen_elc_kWh_PV_MFH)) * 100;

  return householdpvPercent;
};

const calculateBreakEven = (results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, heatpumpType, energyUsagekWh, odometerIncreaseKWH, ems, energyUsageHeatpump, energyUsageCombined, houseHoldPvPercentage, pvUsagePercentage) => {
  const { EGen_elc_kWh_PV_MFH } = results;

  var investmentCostResult;
  var heatpumpPV = [];

  let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
  let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);
  if (homeStorageSize === "none") {
    investmentCostResult = -Math.abs(PVcostInTable.cost);
  } else {
    investmentCostResult = -Math.abs(PVcostInTable.cost + StorageCostInTable.cost);
  }
  if (investmentCostEUR > 0) {
    investmentCostResult = parseInt(investmentCostEUR) * -1;
  }
  var betriebskosten;
  var einspeiseverguetung;
  var einsparungen;
  if (ems) {
    investmentCostResult = investmentCostResult - 400;
    betriebskosten = -Math.abs(Math.round(investmentCostResult * 0.01));
  } else {
    betriebskosten = -Math.abs(Math.round(investmentCostResult * 0.01));
  }

  einspeiseverguetung = (EGen_elc_kWh_PV_MFH * (1 - parseFloat(Math.round(houseHoldPvPercentage)) / 100) * parseFloat(gridRevenue.replace(",", "."))) / 100;

  einspeiseverguetung = Math.round(einspeiseverguetung * 100) / 100;

  for (let index = 0; index < 50; index++) {
    einsparungen = energyUsageCombined * (Math.round(pvUsagePercentage) / 100) * (parseFloat(electricityCost / 100) * Math.pow(1 + 0.02, index));

    einsparungen = Math.round(einsparungen * 100) / 100;

    if (heatpumpPV.length === 0) {
      heatpumpPV.push({ expenditure: investmentCostResult, runningCost: betriebskosten });
    } else {
      heatpumpPV.push({ expenditure: parseFloat(heatpumpPV[index - 1].expenditure) + betriebskosten + einspeiseverguetung + einsparungen });
    }
  }
  return heatpumpPV;
};

const calculateElectricityCostNoPV1Year = (divided, years, energyUsageCombined, electricityCost) => {
  var timeToNum = years;

  if (years === 1) {
    return Math.round(((parseInt(energyUsageCombined) * (electricityCost / 100)) / 5) * divided * timeToNum).toLocaleString("de-DE") + " €";
  }
};

const calculateElectricityCostNoPV20Years = (energyUsageCombined, electricityCost) => {
  const result = Math.abs((parseInt(energyUsageCombined) * (parseFloat(electricityCost) / 100) * (1 - (0.02 + 1) ** 20)) / 0.02);

  return result;
};

const calculateElectricityCostPV1Years = (mit_ems, results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, energyUsageCombined, pvUsagePercentageNoEms, pvUsagePercentage, houseHoldPvPercentageNoEms, houseHoldPvPercentage) => {
  const { EGen_elc_kWh_PV_MFH } = results;

  const autarkiegradWithEMS = pvUsagePercentage;
  const eigenverbrauchWithEms = houseHoldPvPercentage;

  var result;
  var operating_costs;
  var feed_in_revenue;

  var investmentCostResult;

  let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
  let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);

  if (homeStorageSize === "none") {
    investmentCostResult = PVcostInTable.cost;
  } else {
    investmentCostResult = PVcostInTable.cost + StorageCostInTable.cost;
  }

  if (investmentCostEUR > 0) {
    investmentCostResult = Math.abs(parseInt(investmentCostEUR) * -1);
  }

  if (mit_ems === true) {
    feed_in_revenue = Math.abs(Math.round(EGen_elc_kWh_PV_MFH * (1 - parseFloat(eigenverbrauchWithEms) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100)));
    operating_costs = Math.abs(Math.round((investmentCostResult + 400) * 0.01));
    result = Math.abs(Math.round(operating_costs - feed_in_revenue + (1 - Math.round(parseFloat(autarkiegradWithEMS)) / 100) * parseInt(energyUsageCombined) * ((parseFloat(electricityCost) / 100) * (1 + 0.02))));
  } else {
    feed_in_revenue = Math.abs(Math.round(EGen_elc_kWh_PV_MFH * (1 - parseFloat(houseHoldPvPercentageNoEms) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100)));
    operating_costs = Math.abs(Math.round(investmentCostResult * 0.01));

    result = Math.abs(Math.round(operating_costs - feed_in_revenue + (1 - Math.round(parseFloat(pvUsagePercentageNoEms)) / 100) * parseInt(energyUsageCombined) * ((parseFloat(electricityCost) / 100) * (1 + 0.02))));
  }

  return Math.abs(result);
};

const calculateElectricityCostPV20Years = (mit_ems, results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, energyUsageCombined, pvUsagePercentageNoEms, pvUsagePercentage, houseHoldPvPercentageNoEms, houseHoldPvPercentage) => {
  const { EGen_elc_kWh_PV_MFH } = results;
  var investmentCostResult;

  const autarkiegradWithEMS = pvUsagePercentage;
  const eigenverbrauchWithEms = houseHoldPvPercentage;

  let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
  let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);

  var feed_in_revenue;
  var operating_costs;
  var anual_cost_first_year;

  if (homeStorageSize === "none") {
    investmentCostResult = PVcostInTable.cost;
  } else {
    investmentCostResult = PVcostInTable.cost + StorageCostInTable.cost;
  }

  if (investmentCostEUR > 0) {
    investmentCostResult = Math.abs(parseInt(investmentCostEUR) * -1);
  }

  if (mit_ems === true) {
    feed_in_revenue = Math.abs(Math.round(EGen_elc_kWh_PV_MFH * (1 - parseFloat(Math.round(eigenverbrauchWithEms)) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100)));
    operating_costs = Math.abs(Math.round((investmentCostResult + 400) * 0.01));
    anual_cost_first_year = Math.abs(Math.round(operating_costs - feed_in_revenue + (1 - parseFloat(Math.round(autarkiegradWithEMS)) / 100) * parseInt(energyUsageCombined) * ((parseFloat(electricityCost) / 100) * (1 + 0.02))));
    anual_cost_first_year = Math.round(anual_cost_first_year * 100) / 100;
  } else {
    feed_in_revenue = (EGen_elc_kWh_PV_MFH * (1 - parseFloat(Math.round(houseHoldPvPercentageNoEms)) / 100) * parseFloat(gridRevenue.replace(",", "."))) / 100;
    feed_in_revenue = Math.round(feed_in_revenue * 100) / 100;
    operating_costs = Math.abs(Math.round(investmentCostResult * 0.01));
    anual_cost_first_year = Math.abs(operating_costs - feed_in_revenue + (1 - parseFloat(Math.round(pvUsagePercentageNoEms)) / 100) * parseInt(energyUsageCombined) * ((parseFloat(electricityCost) / 100) * (1 + 0.02)));
    anual_cost_first_year = Math.round(anual_cost_first_year * 100) / 100;
  }
  var result = Math.abs(Math.round((anual_cost_first_year * (1 - (0.02 + 1) ** 20)) / 0.02));
  return Math.abs(result);
};

const GetResults = () => {
  const context = useContext(AppContext);
  const { backendUrl, kfwValue, ev, heatpumpType, energyUsagekWh, odometerIncreaseKWH, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, setActiveView } = context;

  const {
    tab,
    tabNoEms,
    setTabNoEms,
    scenario,
    setCalculatedResults,
    setCalculatedResultsNoEms,
    energyUsageCombined,
    setEnergyUsageCombined,
    energyUsageCombinedNoEms,
    setEnergyUsageCombinedNoEms,
    breakEven,
    setBreakEven,
    breakEvenNoEms,
    setBreakEvenNoEms,
    energyUsageHeatpump,
    setEnergyUsageHeatpump,
    energyUsageHeatpumpNoEms,
    setEnergyUsageHeatpumpNoEms,
    gridUsagePercentage,
    setGridUsagePercentage,
    gridUsagePercentageNoEms,
    setGridUsagePercentageNoEms,
    pvUsagePercentage,
    setPvUsagePercentage,
    pvUsagePercentageNoEms,
    setPvUsagePercentageNoEms,
    gridFeedPercentage,
    setGridFeedPercentage,
    gridFeedPercentageNoEms,
    setGridFeedPercentageNoEms,
    houseHoldPvPercentage,
    setHouseHoldPvPercentage,
    houseHoldPvPercentageNoEms,
    setHouseHoldPvPercentageNoEms,
    cost1YearNoPV,
    setCost1YearNoPV,
    cost20YearNoPV,
    setCost20YearNoPV,
    cost1yearPV,
    setCost1yearPV,
    cost1yearPVEMS,
    setCost1yearPVEMS,
    cost20yearPV,
    setCost20yearPV,
    cost20yearPVEMS,
    setCost20yearPVEMS,
    energyUsageHeatpumpPercentage,
    setEnergyUsageHeatpumpPercentage,
    energyUsageHeatpumpPercentageNoEms,
    setEnergyUsageHeatpumpPercentageNoEms,
    energyUsageEvPercentage,
    setEnergyUsageEvPercentage,
    energyUsageEvPercentageNoEms,
    setEnergyUsageEvPercentageNoEms,
    energyUsageHouseHoldPercentage,
    setEnergyUsageHouseHoldPercentage,
    energyUsageHouseHoldPercentageNoEms,
    setEnergyUsageHouseHoldPercentageNoEms,
    selectedTheme,
  } = context;

  const getDebugFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("debug") === "true";
  };

  const [debug, setDebug] = useState(getDebugFromUrl());

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    setDebug(getDebugFromUrl());
  }, []);

  useEffect(
    () => {
      getScenario();
      getTab();
      const { setFwdBtn } = context;

      setFwdBtn(true);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, scenario]
  );

  const getScenario = () => {
    const { ev, preHeatTempOption, energyUsagekWh, BuildingSize, evProfile, buildingTypePreHeatOption, kfwValue, dualPreHeatOptionEVLookupTable, singlePreHeatOptionEVLookupTable, singlePreHeatOptionNoEVLookupTable, dualPreHeatOptionNoEVLookupTable, setScenarioInDatabase, setScenario } = context;

    let validateOptions = buildingTypePreHeatOption.find((o) => o.buildingType === kfwValue);
    let scenarioInDatabase;
    if (ev === "EV") {
      if (validateOptions.option2 === "-") {
        scenarioInDatabase = singlePreHeatOptionEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString() && o.evProfile === evProfile);
      } else {
        scenarioInDatabase = dualPreHeatOptionEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString() && o.evProfile === evProfile);
      }
    } else {
      if (validateOptions.option2 === "-") {
        scenarioInDatabase = singlePreHeatOptionNoEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString());
      } else {
        scenarioInDatabase = dualPreHeatOptionNoEVLookupTable.find((o) => o.option === preHeatTempOption.toString() && o.kwh === energyUsagekWh.toString() && o.sqm === BuildingSize.toString());
      }
    }
    setScenario(scenarioInDatabase.scenario);
    setScenarioInDatabase(scenarioInDatabase.scenario);
  };

  const getTab = () => {
    const { tabEntries, pvOutputkWh, homeStorageSizekWh, setTab } = context;
    let tabInTable = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja";
    });
    let tabInTableNoEms = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Nein";
    });
    setTab(tabInTable);
    setTabNoEms(tabInTableNoEms);
  };

  useEffect(
    () => {
      if (tab !== null && scenario !== null) {
        const getResultPromise = resultService.getResult(kfwValue + ev, scenario, tab, backendUrl, heatpumpType);
        const getResultNoEMSPromise = resultService.getResultNoEMS(kfwValue + ev, scenario, tabNoEms, backendUrl, heatpumpType);

        Promise.all([getResultPromise, getResultNoEMSPromise])
          .then(([results, resultsNoEMS]) => {
            // Procesamiento de los resultados de la primera solicitud
            setCalculatedResults(results);
            const energyUsageHeatpumpResult = calculateheatpumpUsageKWH(results, heatpumpType);
            setEnergyUsageHeatpump(energyUsageHeatpumpResult);

            const combined = calculateEnergyUsageCombined(results, energyUsageHeatpumpResult, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageCombined(combined);

            const energyUsageHeatpumpPercentageResult = calculateEnergyUsagePercentage("heatpump", energyUsageHeatpumpResult, combined, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageHeatpumpPercentage(energyUsageHeatpumpPercentageResult);

            const energyUsageEvPercentageResult = calculateEnergyUsagePercentage("ev", energyUsageHeatpumpResult, combined, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageEvPercentage(energyUsageEvPercentageResult);

            const energyUsageHouseHoldPercentageResult = calculateEnergyUsagePercentage("household", energyUsageHeatpumpResult, combined, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageHouseHoldPercentage(energyUsageHouseHoldPercentageResult);

            const gridUsagePercentageResult = calculategridUsagePercentage(results, combined);
            setGridUsagePercentage(gridUsagePercentageResult);

            const pvUsagePercentageResult = calculatepvUsagePercentage(results, combined);
            setPvUsagePercentage(pvUsagePercentageResult);

            const gridFeedPercentageResult = calculatedgridFeedPercentage(results);
            setGridFeedPercentage(gridFeedPercentageResult);

            const houseHoldPvPercentageResult = calculatedHouseholdpvPercentage(results);
            setHouseHoldPvPercentage(houseHoldPvPercentageResult);

            const cost1yearNoPvResult = Math.abs(parseInt(calculateElectricityCostNoPV1Year(5, 1, combined, electricityCost).replace(".", "").replace(",", "")));
            setCost1YearNoPV(cost1yearNoPvResult);

            const cost20yearNoPvResult = Math.abs(parseInt(calculateElectricityCostNoPV20Years(combined, electricityCost)));
            setCost20YearNoPV(cost20yearNoPvResult);

            const breakEvenResult = calculateBreakEven(results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, heatpumpType, energyUsagekWh, odometerIncreaseKWH, true, energyUsageHeatpumpResult, combined, houseHoldPvPercentageResult, pvUsagePercentageResult);

            setBreakEven(breakEvenResult);

            // Procesamiento de los resultados de la segunda solicitud
            setCalculatedResultsNoEms(resultsNoEMS);
            const energyUsageHeatpumpResultNoEms = calculateheatpumpUsageKWH(resultsNoEMS, heatpumpType);
            setEnergyUsageHeatpumpNoEms(energyUsageHeatpumpResultNoEms);

            const combinedNoEms = calculateEnergyUsageCombined(resultsNoEMS, energyUsageHeatpumpResultNoEms, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageCombinedNoEms(combinedNoEms);

            const energyUsageHeatpumpPercentageResultNoEms = calculateEnergyUsagePercentage("heatpump", energyUsageHeatpumpResultNoEms, combinedNoEms, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageHeatpumpPercentageNoEms(energyUsageHeatpumpPercentageResultNoEms);

            const energyUsageEvPercentageResultNoEms = calculateEnergyUsagePercentage("ev", energyUsageHeatpumpResultNoEms, combinedNoEms, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageEvPercentageNoEms(energyUsageEvPercentageResultNoEms);

            const energyUsageHouseHoldPercentageResultNoEms = calculateEnergyUsagePercentage("household", energyUsageHeatpumpResultNoEms, combinedNoEms, energyUsagekWh, odometerIncreaseKWH);
            setEnergyUsageHouseHoldPercentageNoEms(energyUsageHouseHoldPercentageResultNoEms);

            const gridUsagePercentageResultNoEms = Math.round(calculategridUsagePercentage(resultsNoEMS, combinedNoEms));
            setGridUsagePercentageNoEms(gridUsagePercentageResultNoEms);

            const pvUsagePercentageResultNoEms = calculatepvUsagePercentage(resultsNoEMS, combinedNoEms);
            setPvUsagePercentageNoEms(pvUsagePercentageResultNoEms);

            const gridFeedPercentageResultNoEms = calculatedgridFeedPercentage(resultsNoEMS);
            setGridFeedPercentageNoEms(gridFeedPercentageResultNoEms);

            const houseHoldPvPercentageResultNoEms = calculatedHouseholdpvPercentage(resultsNoEMS);
            setHouseHoldPvPercentageNoEms(houseHoldPvPercentageResultNoEms);

            const cost1yearPVResult = parseInt(calculateElectricityCostPV1Years(false, resultsNoEMS, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, combinedNoEms, pvUsagePercentageResultNoEms, pvUsagePercentageResult, houseHoldPvPercentageResultNoEms, houseHoldPvPercentageResult));
            setCost1yearPV(cost1yearPVResult);

            const cost1yearPVEMSResult = parseInt(calculateElectricityCostPV1Years(true, results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, combined, pvUsagePercentageResultNoEms, pvUsagePercentageResult, houseHoldPvPercentageResultNoEms, houseHoldPvPercentageResult));
            setCost1yearPVEMS(cost1yearPVEMSResult);

            const cost20yearPVResult = parseInt(calculateElectricityCostPV20Years(false, resultsNoEMS, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, combinedNoEms, pvUsagePercentageResultNoEms, pvUsagePercentageResult, houseHoldPvPercentageResultNoEms, houseHoldPvPercentageResult));
            setCost20yearPV(cost20yearPVResult);

            const cost20yearPVEMSResult = parseInt(calculateElectricityCostPV20Years(true, results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, combined, pvUsagePercentageResultNoEms, pvUsagePercentageResult, houseHoldPvPercentageResultNoEms, houseHoldPvPercentageResult));
            setCost20yearPVEMS(cost20yearPVEMSResult);

            const breakEvenResultNoEms = calculateBreakEven(resultsNoEMS, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, heatpumpType, energyUsagekWh, odometerIncreaseKWH, false, energyUsageHeatpumpResultNoEms, combinedNoEms, houseHoldPvPercentageResultNoEms, pvUsagePercentageResultNoEms);
            setBreakEvenNoEms(breakEvenResultNoEms);
            setLoading(false);
            if (debug === false) {
              setActiveView(12);
            }
          })
          .catch((error) => {
            console.error("Error al obtener resultados:", error);
            setLoading(false);
            setError(error);
          });
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, scenario]
  );
  if (loading) {
    return (
      <div className="loading-results">
        <img src={selectedTheme === "buderus" ? require(`../../../assets/img/buderus/loading-results.gif`) : require(`../../../assets/img/loading-results.gif`)} alt="Loading..." style={{ width: "217px" }} />
      </div>
    );
  }
  if (error) {
    // Error page
    return (
      <div>
        <h1>Huch! Etwas ist schief gelaufen.</h1>
        <p>Es scheint ein Fehler beim Laden der Ergebnisse aufgetreten zu sein. Bitte versuchen Sie es erneut.</p>
      </div>
    );
  }

  if (debug === true) {
  }
  return (
    <div>
      <h1>1 graph (Stromverbrauch)</h1>
      <p>energyUsageHeatpump: {energyUsageHeatpump}</p>
      <p>energyUsageHeatpump Percentage: {energyUsageHeatpumpPercentage}</p>
      <p>energyUsageHeatpumpNoEms: {energyUsageHeatpumpNoEms}</p>
      <p>energyUsageHeatpumpNoEms Percentage: {energyUsageHeatpumpPercentageNoEms}</p>
      <p>EnergyUsageCombinedEms: {energyUsageCombined}</p>
      <p>EnergyUsageCombinedNoEms: {energyUsageCombinedNoEms}</p>
      <p>ElectricityCost: {electricityCost}</p>
      <p>Elektro-Auro: {odometerIncreaseKWH}</p>
      <p>Elektro-Auro Percentage: {energyUsageEvPercentage}</p>
      <p>Elektro-Auro PercentageNoEms: {energyUsageEvPercentageNoEms}</p>
      <p>Haushalt: {energyUsagekWh}</p>
      <p>Haushalt Percentage: {energyUsageHouseHoldPercentage}</p>
      <p>Haushalt PercentageNoEms: {energyUsageHouseHoldPercentageNoEms}</p>
      <h1>2 graph (Autarkie)</h1>
      <p>gridUsagePercentage (Netzbezug): {gridUsagePercentage}</p>
      <p>gridUsagePercentageNoEms (Netzbezug): {gridUsagePercentageNoEms}</p>
      <p>Autarkie {pvUsagePercentage}</p>
      <p>pvUsagePercentage (PV-Anlage) same for both cases ems+noems: {pvUsagePercentageNoEms}</p>
      <p>Benefit EMS (Vorteil durch EMS): {gridUsagePercentageNoEms - gridUsagePercentage}</p>
      <h1>3 graph (Eigenverbrauch)</h1>
      <p>gridFeedPercentage (Netzeinspeisung): {gridFeedPercentage}</p>
      <p>gridFeedPercentageNoEms (Netzeinspeisung): {gridFeedPercentageNoEms}</p>
      <p>Eigenverbrauch: {houseHoldPvPercentage}</p>
      <p>houseHoldPvPercentage (PV-Anlage) same for both cases ems+noems: {houseHoldPvPercentageNoEms}</p>
      <p>Benefit EMS (Vorteil durch EMS): {gridFeedPercentageNoEms - gridFeedPercentage}</p>
      <h1>Gesamtkosten Strom</h1>
      <p>ohne PV (1year): {cost1YearNoPV}€</p>
      <p>ohne PV (20Years): {cost20YearNoPV}€</p>
      <p>mit PV (1year): {cost1yearPV}€</p>
      <p>saving PV (1year): {cost1YearNoPV - cost1yearPV}€</p>
      <p>mit PV und EMS (1year): {cost1yearPVEMS}€</p>
      <p>saving PV + EMS (1year): {cost1YearNoPV - cost1yearPVEMS}€</p>
      <p>mit PV (20year): {cost20yearPV}€</p>
      <p>saving PV (20year): {cost20YearNoPV - cost20yearPV}€</p>
      <p>mit PV und EMS (20year): {cost20yearPVEMS}€</p>
      <p>saving PV + EMS (20year): {cost20YearNoPV - cost20yearPVEMS}€</p>
      <h1>Amortisationszeit</h1>
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "300px", maxHeight: "150px", overflow: "auto", marginRight: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Year</th>
                <th>HeatpumpPVEms</th>
              </tr>
            </thead>
            <tbody>
              {breakEven.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.expenditure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ maxWidth: "300px", maxHeight: "150px", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Year</th>
                <th>HeatpumpPVNoEms</th>
              </tr>
            </thead>
            <tbody>
              {breakEvenNoEms.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.expenditure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withRouter(withTranslation()(GetResults));
