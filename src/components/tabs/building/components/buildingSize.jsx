import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import { ReactComponent as HouseSunSmallIcon } from "../../../../assets/img/icons/house_sun_small.svg";
import { ReactComponent as HouseSunLargeIcon } from "../../../../assets/img/icons/house_sun_large.svg";
import { ReactComponent as HouseCircleIcon } from "../../../../assets/img/icons/house_circle.svg";
/* Buderus Icons */
import { ReactComponent as BuderusHouseIcon } from "../../../../assets/img/icons/buderus/house_icon.svg";
import { ReactComponent as BuderusHouseSmallIcon } from "../../../../assets/img/icons/buderus/house_small_icon.svg";
import { ReactComponent as BuderusHouseLargeIcon } from "../../../../assets/img/icons/buderus/house_large_icon.svg";

import { withTranslation } from "react-i18next";
import { validate } from "validate.js";

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
    const { BuildingSize, setFwdBtn } = this.context;

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
    const { setBuildingSize, setFwdBtn, steps, setSteps, activeView, goToView } = this.context;
    setBuildingSize(event.target.value);

    setFwdBtn(false);
    steps[activeView] = false;
    setSteps({ ...steps });
    goToView(1);
    setFwdBtn(true);
  };

  render() {
    const { BuildingSize } = this.context;

    return (
      <div>
        <div class="cardContainer step-one">
          <div class="cardLargeIcon">{this.context.selectedTheme === "buderus" ? <BuderusHouseIcon /> : <HouseCircleIcon />}</div>
          <div class="cardContent">
            <div class="flexContent">
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="cardIconInset">{this.context.selectedTheme === "buderus" ? <BuderusHouseIcon style={{ marginLeft: "10px", width: "55px" }} /> : <HouseCircleIcon style={{ marginLeft: "10px", width: "55px" }} />}</div>
                  <h3 class="cardHeadline">Gebäudegröße</h3>
                </div>
                <span class="cardDescription">Wie viel m&#178; Wohnfläche besitzt Ihr Gebäude?</span>
              </div>
              <div class="flexRow">
                <div>
                  <label>
                    <input type="radio" name="product" value="150" class="card-input-element trackeable" checked={BuildingSize === "150"} onChange={this.inputBuildingSize} data-event="gebaudegrobe-125-175" />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusHouseSmallIcon /> : <HouseSunSmallIcon />}</div>
                      <div class="panel-body">125 - 175 m&#178;</div>
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    <input type="radio" name="product" value="200" class="card-input-element trackeable" checked={BuildingSize === "200"} onChange={this.inputBuildingSize} data-event="gebaudegrobe-175-225" />
                    <div class="panel panel-default card-input">
                      <div class="panel-heading">{this.context.selectedTheme === "buderus" ? <BuderusHouseLargeIcon /> : <HouseSunLargeIcon />}</div>
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
