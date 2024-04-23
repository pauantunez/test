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
  const { Avg_Eff_JAZ_HP_A_W_MFH, Avg_Eff_JAZ_HP_B_W_MFH, EGen_sh_kWh_HP_A_W_MFH, EGen_sh_kWh_HP_B_W_MFH, EGen_hw_kWh_HP_A_W_MFH, EGen_hw_kWh_HP_B_W_MFH, EGen_sh_kWh_EDWW_MFH, EGen_sh_kWh_EDWW_MFH_Brine, EGen_hw_kWh_EDWW_MFH, EGen_hw_kWh_EDWW_MFH_Brine, EGen_elc_kWh_PV_MFH, energy_to_grid_kWh_PV_MFH } = results;

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
    betriebskosten = -Math.abs(Math.round((investmentCostResult - 400) * 0.01));
  } else {
    betriebskosten = -Math.abs(Math.round(investmentCostResult * 0.01));
  }

  var Avg_Eff_JAZ_HP;
  if (heatpumpType === "1") {
    Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_A_W_MFH;
  } else {
    Avg_Eff_JAZ_HP = Avg_Eff_JAZ_HP_B_W_MFH;
  }

  //Energy usage heating rod
  var energyUsageHeatingRod = (parseFloat(EGen_sh_kWh_EDWW_MFH) + parseFloat(EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(EGen_hw_kWh_EDWW_MFH) + parseFloat(EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);

  einspeiseverguetung = (EGen_elc_kWh_PV_MFH * (1 - parseFloat(houseHoldPvPercentage) / 100) * parseFloat(gridRevenue.replace(",", "."))) / 100;

  einspeiseverguetung = Math.round(einspeiseverguetung * 100) / 100;

  for (let index = 0; index < 50; index++) {
    einsparungen = energyUsageCombined * (pvUsagePercentage / 100) * (parseFloat(electricityCost / 100) * Math.pow(1 + 0.02, index));

    einsparungen = Math.round(einsparungen * 100) / 100;

    if (heatpumpPV.length === 0) {
      heatpumpPV.push({ expenditure: investmentCostResult, runningCost: betriebskosten });
    } else {
      heatpumpPV.push({ expenditure: parseFloat(heatpumpPV[index - 1].expenditure) + betriebskosten + einspeiseverguetung + einsparungen });
    }
  }
  return heatpumpPV;
};

const electricityCostNoPV1Year = (divided, years, energyUsageCombined, electricityCost) => {
  var timeToNum = years;

  if (years === 1) {
    return Math.round(((parseInt(energyUsageCombined) * (electricityCost / 100)) / 5) * divided * timeToNum).toLocaleString("de-DE") + " €";
  }
};

const electricityCostNoPV20Years = (energyUsageCombined, electricityCost) => {
  const result = Math.abs((parseInt(energyUsageCombined) * (parseFloat(electricityCost) / 100) * (1 - (0.02 + 1) ** 20)) / 0.02);

  return result;
};

const electricityCostPV1Years = (mit_ems, result, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost) => {
  const { EGen_elc_kWh_PV_MFH } = result;

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
    feed_in_revenue = Math.abs(Math.round(EGen_elc_kWh_PV_MFH * (1 - parseFloat(sessionStorage.getItem("eigenverbrauchWithEms")) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100)));
    operating_costs = Math.abs(Math.round((investmentCostResult + 400) * 0.01));
    result = Math.abs(Math.round(operating_costs - feed_in_revenue + (1 - parseFloat(sessionStorage.getItem("autarkiegradWithEMS")) / 100) * parseInt(sessionStorage.getItem("energyUsageCombined")) * ((parseFloat(electricityCost) / 100) * (1 + 0.02))));
  } else {
    feed_in_revenue = Math.abs(Math.round(EGen_elc_kWh_PV_MFH * (1 - parseFloat(sessionStorage.getItem("householdNoEMSPercent")) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100)));
    operating_costs = Math.abs(Math.round(investmentCostResult * 0.01));
    result = Math.abs(Math.round(operating_costs - feed_in_revenue + (1 - parseFloat(sessionStorage.getItem("pvUsagePercentNoEMS")) / 100) * parseInt(sessionStorage.getItem("energyUsageCombined")) * ((parseFloat(electricityCost) / 100) * (1 + 0.02))));
  }

  return Math.abs(result);
};

const GetResults = () => {
  const [tab, setTab] = useState(null);
  const [tabNoEms, setTabNoEms] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [calculatedResults, setCalculatedResults] = useState([]);
  const [calculatedResultsNoEms, setCalculatedResultsNoEms] = useState([]);
  const [energyUsageCombined, setEnergyUsageCombined] = useState(null);
  const [energyUsageCombinedNoEms, setEnergyUsageCombinedNoEms] = useState(null);
  const [breakEven, setbreakEven] = useState([]);
  const [breakEvenNoEms, setbreakEvenNoEms] = useState([]);
  const [energyUsageHeatpump, setenergyUsageHeatpump] = useState(null);
  const [energyUsageHeatpumpNoEms, setenergyUsageHeatpumpNoEms] = useState(null);
  const [gridUsagePercentage, setgridUsagePercentage] = useState(null);
  const [gridUsagePercentageNoEms, setgridUsagePercentageNoEms] = useState(null);
  const [pvUsagePercentage, setpvUsagePercentage] = useState(null);
  const [pvUsagePercentageNoEms, setpvUsagePercentageNoEms] = useState(null);
  const [gridFeedPercentage, setgridFeedPercentage] = useState(null);
  const [gridFeedPercentageNoEms, setgridFeedPercentageNoEms] = useState(null);
  const [houseHoldPvPercentage, sethouseHoldPvPercentage] = useState(null);
  const [houseHoldPvPercentageNoEms, sethouseHoldPvPercentageNoEms] = useState(null);
  const [cost1YearNoPV, setcost1YearNoPV] = useState(null);
  const [cost20YearNoPV, setcost20YearNoPV] = useState(null);
  const [cost1yearPV, setcost1yearPV] = useState(null);

  const context = useContext(AppContext);
  const { backendUrl, kfwValue, ev, heatpumpType, energyUsagekWh, odometerIncreaseKWH, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost } = context;

  useEffect(() => {
    getScenario();
    getTab();
    const { setFwdBtn } = context;

    setFwdBtn(false);
  }, [tab, scenario]);

  const getScenario = () => {
    const { ev, preHeatTempOption, energyUsagekWh, BuildingSize, evProfile, buildingTypePreHeatOption, kfwValue, dualPreHeatOptionEVLookupTable, singlePreHeatOptionEVLookupTable, singlePreHeatOptionNoEVLookupTable, dualPreHeatOptionNoEVLookupTable, setScenarioInDatabase } = context;

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
    const { tabEntries, pvOutputkWh, homeStorageSizekWh } = context;
    let tabInTable = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja";
    });
    let tabInTableNoEms = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Nein";
    });
    setTab(tabInTable);
    setTabNoEms(tabInTableNoEms);
  };

  useEffect(() => {
    if (tab !== null && scenario !== null) {
      resultService
        .getResult(kfwValue + ev, scenario, tab, backendUrl, heatpumpType)
        .then((results) => {
          setCalculatedResults(results);
          const energyUsageHeatpumpResult = calculateheatpumpUsageKWH(results, heatpumpType);
          setenergyUsageHeatpump(energyUsageHeatpumpResult);

          const combined = calculateEnergyUsageCombined(results, energyUsageHeatpumpResult, energyUsagekWh, odometerIncreaseKWH);
          if (sessionStorage.getItem("energyUsageCombined") !== "") {
            sessionStorage.setItem("energyUsageCombined", combined);
          }
          setEnergyUsageCombined(combined);

          const gridUsagePercentageResult = calculategridUsagePercentage(results, combined);
          setgridUsagePercentage(gridUsagePercentageResult);

          const pvUsagePercentageResult = calculatepvUsagePercentage(results, combined);
          setpvUsagePercentage(pvUsagePercentageResult);

          const gridFeedPercentageResult = calculatedgridFeedPercentage(results);
          setgridFeedPercentage(gridFeedPercentageResult);

          const houseHoldPvPercentageResult = calculatedHouseholdpvPercentage(results);
          sethouseHoldPvPercentageNoEms(houseHoldPvPercentageResult);

          const cost1yearNoPvResult = Math.abs(parseInt(electricityCostNoPV1Year(5, 1, combined, electricityCost).replace(".", "").replace(",", "")));
          setcost1YearNoPV(cost1yearNoPvResult);

          const cost20yearNoPvResult = Math.abs(parseInt(electricityCostNoPV20Years(combined, electricityCost)));
          setcost20YearNoPV(cost20yearNoPvResult);

          const cost1yearPVResult = parseInt(electricityCostPV1Years(false, results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost));
          setcost1yearPV(cost1yearPVResult);

          /* TODO:Revisar */
          const breakEvenResult = calculateBreakEven(results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, heatpumpType, energyUsagekWh, odometerIncreaseKWH, true, energyUsageHeatpumpResult, combined, houseHoldPvPercentageResult, pvUsagePercentageResult);

          if (sessionStorage.getItem("heatpumpPVems") !== "") {
            sessionStorage.setItem("heatpumpPVems", JSON.stringify(breakEvenResult));
          }
          setbreakEven(breakEvenResult);
        })

        .catch((error) => {
          console.error("Error al obtener resultados:", error);
        });
    }
    if (tabNoEms !== null && scenario !== null) {
      resultService
        .getResultNoEMS(kfwValue + ev, scenario, tabNoEms, backendUrl, heatpumpType)
        .then((results) => {
          setCalculatedResultsNoEms(results);

          const energyUsageHeatpumpResultNoEms = calculateheatpumpUsageKWH(results, heatpumpType);
          setenergyUsageHeatpumpNoEms(energyUsageHeatpumpResultNoEms);

          const combinedNoEms = calculateEnergyUsageCombined(results, energyUsageHeatpumpResultNoEms, energyUsagekWh, odometerIncreaseKWH);
          if (sessionStorage.getItem("energyUsageCombinedNoEms") !== "") {
            sessionStorage.setItem("energyUsageCombinedNoEms", combinedNoEms);
          }
          setEnergyUsageCombinedNoEms(combinedNoEms);

          const gridUsagePercentageResult = Math.round(calculategridUsagePercentage(results, combinedNoEms));
          setgridUsagePercentageNoEms(gridUsagePercentageResult);

          const pvUsagePercentageResult = calculatepvUsagePercentage(results, combinedNoEms);
          setpvUsagePercentageNoEms(pvUsagePercentageResult);

          const gridFeedPercentageResult = calculatedgridFeedPercentage(results);
          setgridFeedPercentageNoEms(gridFeedPercentageResult);

          const houseHoldPvPercentageResult = calculatedHouseholdpvPercentage(results);
          sethouseHoldPvPercentage(houseHoldPvPercentageResult);

          const breakEvenResult = calculateBreakEven(results, PVcostLookupTable, pvOutputkWh, StorageCostLookupTable, homeStorageSize, investmentCostEUR, gridRevenue, electricityCost, heatpumpType, energyUsagekWh, odometerIncreaseKWH, false, energyUsageHeatpumpResultNoEms, combinedNoEms, houseHoldPvPercentageResult, pvUsagePercentageResult);
          setbreakEvenNoEms(breakEvenResult);
        })

        .catch((error) => {
          console.error("Error al obtener resultados:", error);
        });
    }
  }, [tab, scenario, backendUrl, kfwValue, ev, heatpumpType]);

  return (
    <div>
      <h1>1 graph (Stromverbrauch)</h1>
      <p>energyUsageHeatpump: {energyUsageHeatpump}</p>
      <p>energyUsageHeatpumpNoEms: {energyUsageHeatpumpNoEms}</p>
      <p>EnergyUsageCombinedEms: {energyUsageCombined}</p>
      <p>EnergyUsageCombinedNoEms: {energyUsageCombinedNoEms}</p>
      <p>Elektro-Auro: {odometerIncreaseKWH}</p>
      <p>Haushalt: {energyUsagekWh}</p>
      <h1>2 graph (Autarkie)</h1>
      <p>gridUsagePercentage (Netzbezug): {gridUsagePercentage}</p>
      <p>gridUsagePercentageNoEms (Netzbezug): {gridUsagePercentageNoEms}</p>
      <p>pvUsagePercentage (PV-Anlage) same for both cases ems+noems: {pvUsagePercentageNoEms}</p>
      <p>Benefit EMS (Vorteil durch EMS): {gridUsagePercentageNoEms - gridUsagePercentage}</p>
      <h1>3 graph (Eigenverbrauch)</h1>
      <p>gridFeedPercentage (Netzeinspeisung): {gridFeedPercentage}</p>
      <p>gridFeedPercentageNoEms (Netzeinspeisung): {gridFeedPercentageNoEms}</p>
      <p>houseHoldPvPercentage (PV-Anlage) same for both cases ems+noems: {houseHoldPvPercentage}</p>
      <p>Benefit EMS (Vorteil durch EMS): {houseHoldPvPercentageNoEms - houseHoldPvPercentage}</p>
      <h1>Gesamtkosten Strom</h1>
      <p>ohne PV (1year): {cost1YearNoPV}€</p>
      <p>ohne PV (20Years): {cost20YearNoPV}€</p>
      <p>mit PV (1year): {cost1yearPV}</p>
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
                  <td>{index + 1}</td>
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
                  <td>{index + 1}</td>
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
