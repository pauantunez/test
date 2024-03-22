import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SvgIcon from "@mui/material/SvgIcon";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

import AppContext from "../../AppContext";
import Tab1Step1 from "./building/step1";
import Tab1Step2 from "./building/step2";
import Tab1Step3 from "./building/step3";
import Tab1Step4 from "./building/step4";
import FacilitiesStep1 from "./facilities/step1";
import FacilitiesStep2 from "./facilities/step2";
import FacilitiesStep3 from "./facilities/step3";
import FacilitiesStep4 from "./facilities/step4";
import CostStep1 from "./cost/step1";
import CostStep2 from "./cost/step2";
import CostStep3 from "./cost/step3";
import ResultStep1 from "./result/step1";
import ResultStep2 from "./result/step2";
import ResultStep3 from "./result/step3";

import axios from "axios";

import { withTranslation } from "react-i18next";

import { ReactComponent as HomeIcon } from "../../assets/img/icons/home.svg";
import { ReactComponent as PhotovoltaicIcon } from "../../assets/img/icons/photovoltaic.svg";
import { ReactComponent as CashIcon } from "../../assets/img/icons/cash.svg";
import { ReactComponent as ClipboardIcon } from "../../assets/img/icons/clipboard.svg";
import { ReactComponent as MenuIcon } from "../../assets/img/icons/menu.svg";
import { ReactComponent as MenuCloseIcon } from "../../assets/img/icons/menu_close.svg";

import { ReactComponent as BuderusHomeIcon } from "../../assets/img/icons/buderus/home.svg";
import { ReactComponent as BuderusPhotovoltaicIcon } from "../../assets/img/icons/buderus/photovoltaic.svg";
import { ReactComponent as BuderusCashIcon } from "../../assets/img/icons/buderus/cash.svg";
import { ReactComponent as BuderusClipboardIcon } from "../../assets/img/icons/buderus/clipboard.svg";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

class NavContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      activeStep: 0,
      heatpumpPVems: [],
      heatpumpPV: [],
    };
  }

  static contextType = AppContext;

  handleResize = () => {
    const { setWindowWidth, setWindowHeight } = this.context;
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  getResult = (kfw, scenario) => {
    const { backendUrl, setDatabaseResult, setDatabaseResultHouseHold, heatpumpType, tabToSelect } = this.context;

    axios
      .get(backendUrl, {
        params: { Document: kfw, ScenNo: scenario, ConfigNo: heatpumpType.toString(), Tab: tabToSelect.toString() },
      })
      .then((res) => {
        if (res.data.data.length !== 0) {
          setDatabaseResult(res.data.data[0]);
          setDatabaseResultHouseHold(res.data.data[0]);
        }
      });
  };

  breakEven = (year) => {
    const { electricityCost, gridRevenue, electricityCostHouseholdPercentage, pvOutputkWh, homeStorageSize, PVcostLookupTable, investmentCostEUR, StorageCostLookupTable, addHeatpumpPVems } = this.context;
    var investmentCostResult;
    this.setState({ heatpumpPVems: [] });

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
    if (homeStorageSize === "none") {
      investmentCostResult = -Math.abs(PVcostInTable.cost);
    } else {
      let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);
      investmentCostResult = -Math.abs(PVcostInTable.cost + StorageCostInTable.cost);
    }

    if (investmentCostEUR > 0) {
      investmentCostResult = parseInt(investmentCostEUR) * -1;
    }

    const betriebskosten = (1 / 100) * (investmentCostResult + -400);
    const einspeiseverguetung = pvOutputkWh * 1000 * (1 - (electricityCostHouseholdPercentage + 10) / 100) * parseFloat(gridRevenue.replace(",", ".") / 100);

    for (let index = 0; index < 50; index++) {
      const einsparungen = pvOutputkWh * 1000 * ((electricityCostHouseholdPercentage + 10) / 100) * (parseFloat(electricityCost / 100) * (1 + 0.02) ** [index + 1] - parseFloat(gridRevenue.replace(",", ".") / 100));
      if (this.state.heatpumpPVems.length === 0) {
        this.state.heatpumpPVems.push({ expenditure: investmentCostResult + -400 });
      } else {
        this.state.heatpumpPVems.push({ expenditure: parseFloat(this.state.heatpumpPVems[index - 1].expenditure) + betriebskosten + einspeiseverguetung + einsparungen });
      }
    }
    addHeatpumpPVems(this.state.heatpumpPVems);
  };

  breakEvenPVonly = (year) => {
    const { electricityCost, gridRevenue, electricityCostHouseholdPercentage, pvOutputkWh, homeStorageSize, PVcostLookupTable, investmentCostEUR, StorageCostLookupTable, addHeatpumpPV } = this.context;
    var investmentCostResult;

    let PVcostInTable = PVcostLookupTable.find((o) => o.pv === pvOutputkWh);
    if (homeStorageSize === "none") {
      investmentCostResult = -Math.abs(PVcostInTable.cost);
    } else {
      let StorageCostInTable = StorageCostLookupTable.find((o) => o.storage === homeStorageSize);
      investmentCostResult = -Math.abs(PVcostInTable.cost + StorageCostInTable.cost);
    }
    if (investmentCostEUR > 0) {
      investmentCostResult = parseInt(investmentCostEUR) * -1;
    }

    this.setState({ heatpumpPV: [] });

    const betriebskosten = (1 / 100) * investmentCostResult;
    const einspeiseverguetung = pvOutputkWh * 1000 * (1 - electricityCostHouseholdPercentage / 100) * parseFloat(gridRevenue.replace(",", ".") / 100);

    for (let index = 0; index < 50; index++) {
      const einsparungen = pvOutputkWh * 1000 * (electricityCostHouseholdPercentage / 100) * (parseFloat(electricityCost / 100) * (1 + 0.02) ** [index + 1] - parseFloat(gridRevenue.replace(",", ".") / 100));

      if (this.state.heatpumpPV.length === 0) {
        this.state.heatpumpPV.push({ expenditure: investmentCostResult, runningCost: betriebskosten });
      } else {
        this.state.heatpumpPV.push({ expenditure: parseFloat(this.state.heatpumpPV[index - 1].expenditure) + betriebskosten + einspeiseverguetung + einsparungen });
      }
    }
    addHeatpumpPV(this.state.heatpumpPV);
  };

  handleStep(step) {
    const { kfwValue, ev, scenarioInDatabase, selectedTab, activeView, setActiveView, setActiveStep, steps, setFwdBtn, setMenu } = this.context;
    if (activeView !== step) {
      if (step !== 0) {
        if (steps[step - 1] === false) {
          setActiveView(step);
          setActiveStep(selectedTab.toString() + "-" + step.toString());
          setFwdBtn(true);
          setMenu(false);
        }
      } else {
        setActiveView(step);
        setActiveStep(selectedTab.toString() + "-" + step.toString());
        setFwdBtn(true);
        setMenu(false);
      }

      if (step === 11) {
        this.getResult(kfwValue + ev, scenarioInDatabase);
        this.breakEven();
        this.breakEvenPVonly();
      }
    }
  }

  nextStep(step) {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handleClick = (event) => {
    const { setMenuBackdrop, menuBackdrop } = this.context;

    if (menuBackdrop) {
      //setMenu(false);
      setMenuBackdrop(false);
    } else {
      //setMenu(true);
      setMenuBackdrop(true);
    }
  };

  handleClose = () => {
    const { setAnchorEl } = this.context;

    setAnchorEl(null);
  };

  render() {
    const { windowWidth, activeView, activeMilestone, milestoneHeadline, menuBackdrop } = this.context;

    function EmptyIcon(props) {
      return (
        <SvgIcon {...props}>
          <path d="0" />
        </SvgIcon>
      );
    }

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        paddingTop: "0px",
        fontSize: "12px",
        [`& .MuiStepLabel-label`]: {
          marginTop: "0px",
          fontSize: "14px",
        },
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
          marginLeft: "calc(0% - 13px)",
          marginRight: "calc(0% - 13px)",
        },
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
          marginLeft: "calc(0% - 13px)",
          marginRight: "calc(0% - 13px)",
        },
      },
      [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
        marginLeft: "calc(0% - 13px)",
        marginRight: "calc(0% - 13px)",
      },
    }));

    const ColorlibConnectorMobile = styled(StepConnector)(({ theme }) => ({
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        paddingTop: "0px",
        fontSize: "12px",
        [`& .MuiStepLabel-label`]: {
          marginTop: "0px",
          fontSize: "14px",
        },
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
          marginLeft: "calc(0% - 26px)",
          marginRight: "calc(0% - 26px)",
        },
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
          marginLeft: "calc(0% - 26px)",
          marginRight: "calc(0% - 26px)",
        },
      },
      [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
        marginLeft: "calc(0% - 26px)",
        marginRight: "calc(0% - 26px)",
      },
    }));

    const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
      backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 32,
      height: 32,
      display: "flex",
      marginTop: "7px",
      borderRadius: this.context.selectedTheme === "buderus" ? "0" : "50%",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      ...(ownerState.active && {
        background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
        fontSize: "12px",
      }),
      ...(ownerState.completed && {
        background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
        fontSize: "12px",
      }),
    }));

    const ColorlibStepIconRootSmall = styled("div")(({ theme, ownerState }) => ({
      backgroundColor: this.context.selectedTheme === "buderus" ? "#eaeaf0" : "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 16,
      height: this.context.selectedTheme === "buderus" ? 3 : 16,
      display: "flex",
      marginTop: this.context.selectedTheme === "buderus" ? "22px" : "15px",
      borderRadius: this.context.selectedTheme === "buderus" ? 0 : "50%",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      ...(ownerState.active && {
        background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
        backgroundPosition: "bottom center",
      }),
      ...(ownerState.completed && {
        background: this.context.selectedTheme === "buderus" ? "#000000" : "#007bc0",
      }),
    }));

    function ColorlibStepIcon(props) {
      const { active, completed, className } = props;
      const { selectedTheme } = React.useContext(AppContext);
      const icons = {
        1: selectedTheme === "buderus" ? <BuderusHomeIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <HomeIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        2: <EmptyIcon />,
        3: <EmptyIcon />,
        4: <EmptyIcon />,
        5: selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <PhotovoltaicIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        6: <EmptyIcon />,
        7: <EmptyIcon />,
        8: <EmptyIcon />,
        9: selectedTheme === "buderus" ? <BuderusCashIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <CashIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        10: <EmptyIcon />,
        11: <EmptyIcon />,
        12: selectedTheme === "buderus" ? <BuderusClipboardIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <ClipboardIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
      };

      return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
          {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
      );
    }

    function ColorlibStepIconMobile(props) {
      const { active, completed, className } = props;
      const { selectedTheme } = React.useContext(AppContext);
      const icons = {
        1: selectedTheme === "buderus" ? <BuderusHomeIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <HomeIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        2: selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <PhotovoltaicIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        3: selectedTheme === "buderus" ? <BuderusCashIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <CashIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
        4: selectedTheme === "buderus" ? <BuderusClipboardIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} /> : <ClipboardIcon className={completed || active ? "iconColorCompleted" : "iconColorStandard"} />,
      };

      return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
          {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
      );
    }

    function ColorlibStepIconSmall(props) {
      const { active, completed, className } = props;
      const { selectedTheme } = React.useContext(AppContext);
      const icons = {
        1: selectedTheme === "buderus" ? <BuderusHomeIcon /> : <AccessAlarmIcon />,
        2: <EmptyIcon />,
        3: <EmptyIcon />,
        4: <EmptyIcon />,
        5: selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon /> : <PhotovoltaicIcon />,
        6: <EmptyIcon />,
        7: <EmptyIcon />,
        8: <EmptyIcon />,
        9: selectedTheme === "buderus" ? <BuderusCashIcon /> : <CashIcon />,
        10: <EmptyIcon />,
        11: <EmptyIcon />,
        12: selectedTheme === "buderus" ? <BuderusClipboardIcon /> : <ClipboardIcon />,
      };

      return (
        <ColorlibStepIconRootSmall ownerState={{ completed, active }} className={className}>
          {icons[String(props.icon)]}
        </ColorlibStepIconRootSmall>
      );
    }

    ColorlibStepIcon.propTypes = {
      /**
       * Whether this step is active.
       * @default false
       */
      active: PropTypes.bool,
      className: PropTypes.string,
      /**
       * Mark the step as completed. Is passed to child components.
       * @default false
       */
      completed: PropTypes.bool,
      /**
       * The label displayed in the step icon.
       */
      icon: PropTypes.node,
    };

    return (
      <div style={{ height: "100%" }}>
        <Stack sx={{ width: "100%" }} spacing={4}>
          {windowWidth > 900 && (
            <Stepper alternativeLabel activeStep={activeView} connector={<ColorlibConnector />}>
              <Step key="0" style={{ alignItems: "flex-start" }}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => {
                    this.handleStep(0);
                  }}
                >
                  <span style={{ display: "block", marginTop: "-8px", fontSize: "13px", fontFamily: "Bosch-Medium" }}>Gebäude</span>
                </StepLabel>
              </Step>
              <Step key="1">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(1);
                  }}
                ></StepLabel>
              </Step>
              <Step key="2">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(2);
                  }}
                ></StepLabel>
              </Step>
              <Step key="3">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(3);
                  }}
                ></StepLabel>
              </Step>
              <Step key="4">
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => {
                    this.handleStep(4);
                  }}
                >
                  <span style={{ display: "block", marginTop: "-8px", fontSize: "13px", fontFamily: "Bosch-Medium" }}>Ausstattung</span>
                </StepLabel>
              </Step>
              <Step key="5">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(5);
                  }}
                ></StepLabel>
              </Step>
              <Step key="6">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(6);
                  }}
                ></StepLabel>
              </Step>
              <Step key="7">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(7);
                  }}
                ></StepLabel>
              </Step>
              <Step key="8">
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => {
                    this.handleStep(8);
                  }}
                >
                  <span style={{ display: "block", marginTop: "-8px", fontSize: "13px", fontFamily: "Bosch-Medium" }}>Ökonomische Größen</span>
                </StepLabel>
              </Step>
              <Step key="9">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(9);
                  }}
                ></StepLabel>
              </Step>
              <Step key="10">
                <StepLabel
                  StepIconComponent={ColorlibStepIconSmall}
                  onClick={() => {
                    this.handleStep(10);
                  }}
                ></StepLabel>
              </Step>
              <Step key="11">
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => {
                    this.handleStep(11);
                  }}
                >
                  <span style={{ display: "block", marginTop: "-8px", fontSize: "13px", fontFamily: "Bosch-Medium" }}>
                    <span>
                      Ergebnis&nbsp;
                      {activeView === 11 && <span>(1/2)</span>}
                      {activeView === 12 && <span>(2/2)</span>}
                      {activeView === 13 && <span>(2/2)</span>}
                    </span>
                  </span>
                </StepLabel>
              </Step>
            </Stepper>
          )}

          {windowWidth < 900 && (
            <Stepper activeStep={activeMilestone} connector={<ColorlibConnectorMobile />}>
              <Step key="0" style={{ alignItems: "flex-start" }}>
                <StepLabel StepIconComponent={ColorlibStepIconMobile}></StepLabel>
              </Step>
              <Step key="4">
                <StepLabel StepIconComponent={ColorlibStepIconMobile}></StepLabel>
              </Step>
              <Step key="7">
                <StepLabel StepIconComponent={ColorlibStepIconMobile}></StepLabel>
              </Step>
              <Step key="10">
                <StepLabel StepIconComponent={ColorlibStepIconMobile}></StepLabel>
              </Step>
            </Stepper>
          )}

          {windowWidth < 900 && (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "16px", marginLeft: "10px", marginRight: "10px" }}>
              <div style={{ fontFamily: "Bosch-Bold", fontSize: "20px" }}>{milestoneHeadline}</div>
              <div onClick={this.handleClick}>
                {!menuBackdrop && <MenuIcon />}
                {menuBackdrop && <MenuCloseIcon />}
              </div>
            </div>
          )}
        </Stack>

        <Box sx={{ width: "100%" }}>
          {activeView === 0 && <Tab1Step1 />}
          {activeView === 1 && <Tab1Step2 />}
          {activeView === 2 && <Tab1Step3 />}
          {activeView === 3 && <Tab1Step4 />}
          {activeView === 4 && <FacilitiesStep1 />}
          {activeView === 5 && <FacilitiesStep2 />}
          {activeView === 6 && <FacilitiesStep3 />}
          {activeView === 7 && <FacilitiesStep4 />}
          {activeView === 8 && <CostStep1 />}
          {activeView === 9 && <CostStep2 />}
          {activeView === 10 && <CostStep3 />}
          {activeView === 11 && <ResultStep1 />}
          {activeView === 12 && <ResultStep2 />}
          {activeView === 13 && <ResultStep3 />}
        </Box>
      </div>
    );
  }
}

export default withRouter(withTranslation()(NavContent));
