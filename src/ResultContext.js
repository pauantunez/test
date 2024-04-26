// ResultContext.js
import React, { createContext, useState } from "react";

const ResultContext = createContext();

const ResultProvider = ({ children }) => {
  const [tab, setTab] = useState(null);
  const [tabNoEms, setTabNoEms] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [calculatedResults, setCalculatedResults] = useState([]);
  const [calculatedResultsNoEms, setCalculatedResultsNoEms] = useState([]);
  const [energyUsageCombined, setEnergyUsageCombined] = useState(null);
  const [energyUsageCombinedNoEms, setEnergyUsageCombinedNoEms] = useState(null);
  const [breakEven, setBreakEven] = useState([]);
  const [breakEvenNoEms, setBreakEvenNoEms] = useState([]);
  const [energyUsageHeatpump, setEnergyUsageHeatpump] = useState(null);
  const [energyUsageHeatpumpNoEms, setEnergyUsageHeatpumpNoEms] = useState(null);
  const [gridUsagePercentage, setGridUsagePercentage] = useState(null);
  const [gridUsagePercentageNoEms, setGridUsagePercentageNoEms] = useState(null);
  const [pvUsagePercentage, setPvUsagePercentage] = useState(null);
  const [pvUsagePercentageNoEms, setPvUsagePercentageNoEms] = useState(null);
  const [gridFeedPercentage, setGridFeedPercentage] = useState(null);
  const [gridFeedPercentageNoEms, setGridFeedPercentageNoEms] = useState(null);
  const [houseHoldPvPercentage, setHouseHoldPvPercentage] = useState(null);
  const [houseHoldPvPercentageNoEms, setHouseHoldPvPercentageNoEms] = useState(null);
  const [cost1YearNoPV, setCost1YearNoPV] = useState(null);
  const [cost20YearNoPV, setCost20YearNoPV] = useState(null);
  const [cost1yearPV, setCost1yearPV] = useState(null);
  const [cost1yearPVEMS, setCost1yearPVEMS] = useState(null);
  const [cost20yearPV, setCost20yearPV] = useState(null);
  const [cost20yearPVEMS, setCost20yearPVEMS] = useState(null);

  return (
    <ResultContext.Provider
      value={{
        tab,
        setTab,
        tabNoEms,
        setTabNoEms,
        scenario,
        setScenario,
        calculatedResults,
        setCalculatedResults,
        calculatedResultsNoEms,
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
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export { ResultProvider };
export default ResultContext;
