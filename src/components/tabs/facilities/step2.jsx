import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";
import EV from "./components/ev";

import { withTranslation } from "react-i18next";

class FacilitiesStep2 extends React.Component {
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
    return (
      <div>
        <EV />
      </div>
    );
  }
}

export default withRouter(withTranslation()(FacilitiesStep2));
