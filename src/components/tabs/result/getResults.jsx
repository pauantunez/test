import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import resultService from "../../../services/results";
import AppContext from "../../../AppContext";

const GetResults = () => {
  const [result, setResult] = useState("");
  const [tab, setTab] = useState(null);
  console.log("🚀 ~ GetResults ~ tab:", tab);

  const context = useContext(AppContext);
  useEffect(() => {
    getScenario();

    console.log("🚀 ~ useEffect ~ resultService.getResult():", resultService.getResult());
  }, []);

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
    setScenarioInDatabase(scenarioInDatabase.scenario);
  };

  const getTab = () => {
    const { tabEntries, pvOutputkWh, homeStorageSizekWh } = context;
    let tabInTable = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Ja";
    });
    setTab(tabInTable);
  };

  return "Hello";
};

export default withRouter(withTranslation()(GetResults));
