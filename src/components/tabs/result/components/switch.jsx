import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";

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

class CustomSwitch extends React.Component {
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
    const { setLoadingOffGrid, setFwdBtn } = this.context;

    setFwdBtn(false);
    setLoadingOffGrid(true);
  }

  componentDidMount() {}

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

    var combinedResult = energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
    setNoEMScombinedEnergyUseKWH(combinedResult);

    var pvUsagePercentNoEMS = ((parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(combinedResult)) * 100;
    setNoEMSPercentage(pvUsagePercentNoEMS);

    var householdNoEMSPercent = ((parseFloat(result.EGen_elc_kWh_PV_MFH) - parseFloat(result.energy_to_grid_kWh_PV_MFH)) / parseFloat(result.EGen_elc_kWh_PV_MFH)) * 100;

    setHouseholdNoEMSpvPercent(householdNoEMSPercent);

    return energyUsageHeatpump + energyUsageHeatingRod + parseInt(energyUsagekWh) + odometerIncreaseKWH;
  };

  inputOffgridEMS = (event) => {
    const { setLoadingOffGrid, kfwValue, ev, setOffgridEMS, scenarioInDatabase, tabEntries, setTabToSelect, pvOutputkWh, homeStorageSizekWh } = this.context;
    setOffgridEMS(event.target.checked);
    setLoadingOffGrid(true);
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
  };

  render() {
    const { offgridEMS } = this.context;

    return (
      <div>
        <Stack direction="row" spacing={1} alignItems="center">
          <AntSwitch onChange={this.inputOffgridEMS} checked={offgridEMS} inputProps={{ "aria-label": "ant design" }} />
        </Stack>
      </div>
    );
  }
}

export default withRouter(withTranslation()(CustomSwitch));
