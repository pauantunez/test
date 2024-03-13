import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";
import HeatDistribution from "./components/heatDistribution";

import { withTranslation } from "react-i18next";

class Tab1Step3 extends React.Component {
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
        <HeatDistribution />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Tab1Step3));
