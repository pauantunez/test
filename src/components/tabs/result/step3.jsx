import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";
import Additional from "./components/additional";

import { withTranslation } from "react-i18next";

import "jspdf-autotable";

class ResultStep3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
    };
  }

  static contextType = AppContext;

  componentDidMount() {}

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  inputPower_kW_PV_MFH = (event) => {
    const { setPower_kW_PV_MFH } = this.context;

    setPower_kW_PV_MFH(event.target.value);
  };

  inputBuildingEnegeryStandard = (event) => {
    const { setBuildingEnegeryStandard } = this.context;
    setBuildingEnegeryStandard(event.target.value);
  };

  inputBuildingSize = (event) => {
    const { setBuildingSize } = this.context;
    setBuildingSize(event.target.value);
  };

  inputGasOilSwitch = (event) => {
    const { setGasOilSwitch } = this.context;
    setGasOilSwitch(event.target.checked);
  };

  investmentCost = () => {
    const { pvOutputkWh, PVcostLookupTable, investmentCostEUR } = this.context;

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);

    let investmentCostResult = Math.abs(PVcostInTable.cost);

    if (investmentCostEUR > 0) {
      investmentCostResult = parseInt(investmentCostEUR) * -1;
    }

    return Math.abs(investmentCostResult);
  };

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  async changeVolume(e, value) {
    const { setEnergyUse } = this.context;
    setEnergyUse(value);
  }

  render() {
    sessionStorage.setItem("InvestmentCostEUR", this.investmentCost().toLocaleString("DE-de"));

    return (
      <div style={{ marginLeft: "3%", marginRight: "3%" }}>
        <Additional />
      </div>
    );
  }
}

export default withRouter(withTranslation()(ResultStep3));
