import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";

import { withTranslation } from "react-i18next";
import Heatpump from "./components/heatpump";

class FacilitiesStep1 extends React.Component {
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

  inputTCO_thermal_EUR_a = (event) => {
    const { setTCO_thermal_EUR_a } = this.context;

    setTCO_thermal_EUR_a(event.target.value);
  };

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  render() {
    return (
      <div>
        <Heatpump />
      </div>
    );
  }
}

export default withRouter(withTranslation()(FacilitiesStep1));
