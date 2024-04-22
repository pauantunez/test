import axios from "axios";

const getResult = (kfw, scenario, tabInTable, backendUrl, heatpumpType) => {
  return axios
    .get(backendUrl, {
      params: { Document: kfw, ScenNo: scenario, ConfigNo: heatpumpType.toString(), Tab: tabInTable.Tab },
    })
    .then((res) => {
      if (res.data.data.length !== 0) {
        return res.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      console.error("Error al obtener los resultados:", error);
      throw error;
    });
};

const getResultNoEMS = (kfw, scenario, tabInTable, backendUrl, heatpumpType) => {
  return axios
    .get(backendUrl, {
      params: { Document: kfw, ScenNo: scenario, ConfigNo: heatpumpType.toString(), Tab: tabInTable.Tab },
    })
    .then((res) => {
      if (res.data.data.length !== 0) {
        return res.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      console.error("Error al obtener los resultados:", error);
      throw error;
    });
};

export default {
  getResult,
  getResultNoEMS,
};
