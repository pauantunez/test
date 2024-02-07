import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import Validation from "../../../validation/validation";
import { ReactComponent as HouseSunSmallIcon } from "../../../../assets/img/icons/house_sun_small.svg";
import { ReactComponent as HouseSunLargeIcon } from "../../../../assets/img/icons/house_sun_large.svg";
import { ReactComponent as HouseSunLargeWhiteIcon } from "../../../../assets/img/icons/house_sun_large_white.svg";
import { ReactComponent as HouseCircleIcon } from "../../../../assets/img/icons/house_circle.svg";
import { Button } from "reactstrap";
import axios from "axios";

import { withTranslation } from "react-i18next";
import validator, { validate } from "validate.js";

var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class BuildingSize extends React.Component {
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

  componentWillMount() {
    const { BuildingSize, setBuildingSize, setFwdBtn, fwdBtn } = this.context;

    if (validate.isEmpty(BuildingSize)) {
      setFwdBtn(true);
    } else {
      setFwdBtn(false);
    }
  }

  /* goToView = (newValue) => {
    const { selectedTab, activeView, activeStep, setActiveView, setActiveStep, steps, setSteps, setFwdBtn, setMenuBackdrop, setDirectLink } = this.context;
    setDirectLink(true);
    setActiveView(newValue);
  }; */

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  inputBuildingSize = (event) => {
    const { BuildingSize, setBuildingSize, setFwdBtn, fwdBtn, steps, setSteps, activeView, goToView } = this.context;
    setBuildingSize(event.target.value);

    setFwdBtn(false);
    steps[activeView] = false;
    setSteps({ ...steps });
    goToView(1);
  };

  render() {
    const { t } = this.props;
    const { BuildingSize, setBuildingSize } = this.context;

    return (
      <div>
        <div class="cardContainer">
          <div class="cardLargeIcon">
            <HouseCircleIcon />
          </div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">
                    <HouseCircleIcon style={{ marginLeft: "10px", width: "55px" }} />
                  </div>
                  <h3 class="cardHeadline">Gebäudegröße</h3>
                </div>
                <span class="cardDescription">Wie viel m&#178; Wohnfläche besitzt Ihr Gebäude?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="product" value="150" class="card-input-element" checked={BuildingSize === "150"} onChange={this.inputBuildingSize} />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">
                        <HouseSunSmallIcon />
                      </div>
                      <div class="panel-body">125 - 175 m&#178;</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="product" value="200" class="card-input-element" checked={BuildingSize === "200"} onChange={this.inputBuildingSize} />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">
                        <HouseSunLargeIcon />
                      </div>
                      <div class="panel-body">175 - 225 m&#178;</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(BuildingSize));
