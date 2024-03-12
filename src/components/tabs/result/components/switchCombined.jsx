import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import axios from "axios";

import { withTranslation } from "react-i18next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, annotationPlugin, ChartDataLabels);

const AntSwitch = styled(Switch)(({ theme }) => {
  const { selectedTheme } = React.useContext(AppContext); // Obtén el tema seleccionado del contexto

  return {
    width: 49,
    height: 24,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: "6px 5px 5px 5px",
      "&.Mui-checked": {
        transform: "translateX(26px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: selectedTheme === "buderus" ? "#002D59" : "007BC0",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 24 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  };
});

class CombinedSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      results: Array,
      Eta_sh_gas_EDWW_MFH_Brine: String,
    };
  }

  static contextType = AppContext;

  componentWillMount() {
    const { setLoadingOffGrid, setLoadingHousehold, setFwdBtn } = this.context;

    setFwdBtn(false);
    setLoadingOffGrid(true);
    setLoadingHousehold(true);
  }

  componentDidMount() {
    this.getInitialResult();
  }

  getInitialResult = () => {
    const { scenarioInDatabase, kfwValue, ev, homeStorageSizekWh, pvOutputkWh, tabEntries } = this.context;

    //find the correct TAB for the "NO EMS" case
    let tabInTable = tabEntries.find((o) => o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Nein");

    //call getResult for the correct TAB
    this.getResult(kfwValue + ev, scenarioInDatabase, tabInTable.Tab);
    this.getResultNoEMS(kfwValue + ev, scenarioInDatabase);
  };

  energyUsageCombined = (result) => {
    const { heatpumpType, setHouseholdNoEMSpvPercent, setNoEMSPercentage, setNoEMScombinedEnergyUseKWH, energyUsagekWh, odometerIncreaseKWH } = this.context;
    var Avg_Eff_JAZ_HP;

    if (heatpumpType === "1") {
      Avg_Eff_JAZ_HP = result.Avg_Eff_JAZ_HP_A_W_MFH;
    } else {
      Avg_Eff_JAZ_HP = result.Avg_Eff_JAZ_HP_B_W_MFH;
    }

    //Enegery usage heatpump
    var energyUsageHeatpump = (parseFloat(result.EGen_sh_kWh_HP_A_W_MFH) + parseFloat(result.EGen_sh_kWh_HP_B_W_MFH) + parseFloat(result.EGen_hw_kWh_HP_A_W_MFH) + parseFloat(result.EGen_hw_kWh_HP_B_W_MFH)) / parseFloat(Avg_Eff_JAZ_HP);

    //Energy usage heating rod
    var energyUsageHeatingRod = (parseFloat(result.EGen_sh_kWh_EDWW_MFH) + parseFloat(result.EGen_sh_kWh_EDWW_MFH_Brine) + parseFloat(result.EGen_hw_kWh_EDWW_MFH) + parseFloat(result.EGen_hw_kWh_EDWW_MFH_Brine)) / parseFloat(0.99);

    //console.log(energyUsageHeatpump+energyUsageHeatingRod+parseInt(energyUsagekWh)+odometerIncreaseKWH);
    var combinedResult = energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
    setNoEMScombinedEnergyUseKWH(combinedResult);

    var pvUsagePercentNoEMS = ((parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(combinedResult)) * 100;
    setNoEMSPercentage(pvUsagePercentNoEMS);

    var householdNoEMSPercent = ((parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(result.EGen_elc_kWh_PV_MFH)) * 100;

    setHouseholdNoEMSpvPercent(householdNoEMSPercent);

    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
  };

  changeStatus = (event) => {
    const { setLoadingOffGrid, kfwValue, ev, setOffgridEMS, scenarioInDatabase, tabEntries, setTabToSelect, pvOutputkWh, homeStorageSizekWh, setHouseholdEMS, setLoadingHousehold } = this.context;
    setOffgridEMS(event.target.checked);
    setLoadingOffGrid(true);

    setHouseholdEMS(event.target.checked);
    setLoadingHousehold(true);

    var emsValue;
    if (event.target.checked) {
      emsValue = "Ja";
    } else {
      emsValue = "Nein";
    }

    let tabInTable = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === emsValue;
    });
    setTabToSelect(tabInTable.Tab);
    // console.log("Tab entries: " + tabInTable)

    setTimeout(() => {
      this.getResult(kfwValue + ev, scenarioInDatabase);
    }, "1000");
    this.getInitialResult();
  };

  getResult = (kfw, scenario, noEMSTab) => {
    const { setLoadingOffGrid, setDatabaseResult, heatpumpType, tabToSelect } = this.context;
    var tab;
    if (noEMSTab) {
      tab = noEMSTab;
    } else {
      tab = tabToSelect.toString();
    }
    axios
      .get(`https://bosch-endkundentool-api.azurewebsites.net/results`, {
        params: {
          Document: kfw,
          ScenNo: scenario,
          ConfigNo: heatpumpType.toString(),
          Tab: tab,
        },
      })
      .then((res) => {
        if (res.data.data.length !== 0) {
          if (noEMSTab) {
            this.energyUsageCombined(res.data.data[0]);
          } else {
            setDatabaseResult(res.data.data[0]);
          }
          setLoadingOffGrid(false);
        }
        sessionStorage.setItem("Autarkie_energy_to_grid_kWh_PV_MFH", res.data.data[0].energy_to_grid_kWh_PV_MFH);
      });

    const { setLoadingHousehold, setDatabaseResultHouseHold, tabToSelectEigenverbrauch } = this.context;
    if (noEMSTab) {
      tab = noEMSTab;
    } else {
      tab = tabToSelectEigenverbrauch.toString();
    }
    axios
      .get(`https://bosch-endkundentool-api.azurewebsites.net/results`, {
        params: { Document: kfw, ScenNo: scenario, ConfigNo: heatpumpType.toString(), Tab: tab },
      })
      .then((res) => {
        if (res.data.data.length !== 0) {
          if (noEMSTab) {
            this.energyUsageCombined(res.data.data[0]);
          } else {
            setDatabaseResultHouseHold(res.data.data[0]);
          }

          setLoadingHousehold(false);
        }
      });
  };

  getResultNoEMS = (kfw, scenario, noEMSTab) => {
    const { setDatabaseResultNoEMS, heatpumpType, homeStorageSizekWh, pvOutputkWh, tabEntries } = this.context;

    let tabInTable = tabEntries.find((o) => {
      return o.PV_size === pvOutputkWh.toString() && o.Storage_size === homeStorageSizekWh.toString() && o.EMS === "Nein";
    });

    axios
      .get(`https://bosch-endkundentool-api.azurewebsites.net/results`, {
        params: {
          Document: kfw,
          ScenNo: scenario,
          ConfigNo: heatpumpType.toString(),
          Tab: tabInTable.Tab,
        },
      })
      .then((res) => {
        if (res.data.data.length !== 0) {
          setDatabaseResultNoEMS(res.data.data[0]);
          /* setDatabaseResultHouseHoldNoEMS(res.data.data[0]); */
        }
        //sessionStorage.setItem("Autarkie_energy_to_grid_kWh_PV_MFH", res.data.data[0].energy_to_grid_kWh_PV_MFH);
      });
  };

  render() {
    const { offgridEMS } = this.context;

    return (
      <div>
        <Stack direction="row" spacing={1} alignItems="center">
          <AntSwitch onChange={this.changeStatus} checked={offgridEMS} inputProps={{ "aria-label": "ant design" }} />
        </Stack>
      </div>
    );
  }
}

export default withRouter(withTranslation()(CombinedSwitch));
