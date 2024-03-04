import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../AppContext";

import { withTranslation } from "react-i18next";
import HeatingSelection from "./components/heatingSelection";

class Tab1Step2 extends React.Component {
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
        <HeatingSelection />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Tab1Step2));
