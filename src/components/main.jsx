import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { withRouter } from "react-router";
import AppContext from "../AppContext";
import NavContent from "./tabs/navContent";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "../styles/home.module.css";
import "rc-slider/assets/index.css";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ReactComponent as ForwardThinIcon } from "../assets/img/icons/arrow_forward_thin.svg";
import { ReactComponent as BackThinIcon } from "../assets/img/icons/arrow_back_thin.svg";
import { ReactComponent as HouseSmallIcon } from "../assets/img/icons/house_small.svg";
import { ReactComponent as FwdBtnIcon } from "../assets/img/icons/fwd_btn.svg";
import { ReactComponent as FwdBtnInactiveIcon } from "../assets/img/icons/fwd_btn_inactive.svg";
import { ReactComponent as MenuCloseIcon } from "../assets/img/icons/menu_close.svg";
import { ReactComponent as InfoIcon } from "../assets/img/icons/info.svg";

import { isMobile } from "react-device-detect";

import { ReactComponent as BuderusBackThinIcon } from "../assets/img/icons/buderus/arrow_back_thin.svg";
import { ReactComponent as BuderusInfoIcon } from "../assets/img/icons/buderus/info.svg";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "@mui/material/Link";

import CalculationModal from "./tabs/modal";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var productEntry;
var entryParam;
var selectedTheme;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: "audiofile.mp3",
      initialVolumeSet: false,
      initialLoad: false,
      backBtn: true,
      fwdBtn: false,
      restart: true,
      selectedProduct: 0,
      selectedTab: 0,
      gainNode: {},
      mediaSource: {},
      audioCtx: {},
      parNo: "44",
      scenNo: "",
      heatpumpPVems: [],
      heatpumpPV: [],
    };
  }

  static contextType = AppContext;

  componentWillMount() {
    this.context.getTheme();
    const { products, sendGAEvent } = this.context;
    const productsProps = Object.getOwnPropertyNames(products);
    var foundTheme = 0;

    if (urlParams.get("theme")) {
      entryParam = urlParams.get("theme");

      for (let themes = 0; themes < productsProps.length; themes++) {
        if (entryParam === productsProps[themes]) {
          import("../styles/" + productsProps[themes] + ".css");

          selectedTheme = productsProps[themes];

          foundTheme++;
        } else {
        }
      }

      if (foundTheme === 0) {
        import("../styles/" + productsProps[0] + ".css");
        selectedTheme = productsProps[0];
      }
    } else {
      import("../styles/" + productsProps[0] + ".css");
      selectedTheme = productsProps[0];
    }

    // Tracking GA4 - Event listener
    document.body.addEventListener("click", (event) => {
      var trackeableElement = event.target.closest(".trackeable");
      if (trackeableElement && !trackeableElement.dataset.handled) {
        var eventName = trackeableElement.dataset.event;
        sendGAEvent(eventName, null, window.location.href);
        trackeableElement.dataset.handled = true;
      }
    });
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    //isEnd
    if (nextContext.activeView === 14) {
      this.setState({
        fwdBtn: true,
        backBtn: false,
        restart: false,
      });
    } else if (nextContext.activeView === 0) {
      this.setState({
        backBtn: true,
        fwdBtn: false,
      });
    } else {
      this.setState({
        backBtn: false,
        fwdBtn: false,
      });
    }
  };

  handleClick(event) {
    const { setMenuBackdrop, menuBackdrop } = this.context;

    if (menuBackdrop) {
      //setMenu(false);
      setMenuBackdrop(false);
    } else {
      //setMenu(true);
      setMenuBackdrop(true);
    }
  }

  handleStep(step) {
    const { selectedTab, activeView, setActiveView, setActiveStep, steps, setFwdBtn, setMenuBackdrop } = this.context;
    if (activeView !== step) {
      if (step !== 0) {
        if (steps[step - 1] === false) {
          setActiveView(step);
          setActiveStep(selectedTab.toString() + "-" + step.toString());
          setFwdBtn(true);
          setMenuBackdrop(false);
        }
      } else {
        setActiveView(step);
        setActiveStep(selectedTab.toString() + "-" + step.toString());
        setFwdBtn(true);
        setMenuBackdrop(false);
      }
    }
  }

  getEntryParameter = async () => {
    const { setProduct } = this.context;

    if (urlParams.get("entry")) {
      entryParam = urlParams.get("entry");

      var productList = await i18n.t("products", { returnObjects: true });

      var item = await productList.filter((item) => item.slug.toLowerCase().includes(entryParam));

      productEntry = await parseInt(item[0].menuId);

      setProduct(productEntry);
    } else {
      setProduct(0);
    }
  };

  isTermsAccepted = () => {
    const { acceptedTerms } = this.context;

    if (!acceptedTerms) {
      //snackbar
      this.setState({ snackbar: true });
    } else {
      this.trackingCall();
    }
  };

  trackingCall = () => {
    const { userTracked, trackUser } = this.context;

    if (!userTracked) {
      window.parent.postMessage({ event: "HP-Soundtool", eventCategory: "ToolStart", eventAction: window.location.href }, "*");
      trackUser(true);
    }
  };

  handleChange = (e) => {
    const { setProduct } = this.context;

    setProduct(e.target.value);
  };

  handleClose = () => {
    this.setState({ snackbar: false });
  };

  setTermsState = (e) => {
    const { setTerms } = this.context;

    setTerms(e);
  };

  isBeginning = () => {
    const { selectedTab, activeView } = this.context;

    if (activeView === 1 && selectedTab === 0) {
      return true;
    }
  };

  isEnd = () => {
    const { selectedTab, activeView } = this.context;

    if (activeView === 0 && selectedTab === 2) {
      return true;
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    let value;
    const CustomButton = styled(Button)({
      textTransform: "none",
      borderRadius: "0px",
      fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
      backgroundColor: this.context.selectedTheme === "buderus" ? "#002d59" : "#007BC0",
      "&:hover": {
        backgroundColor: this.context.selectedTheme === "buderus" ? "#001d39" : "#00629A",
      },
      // Agrega más estilos según sea necesario
    });

    const { menuBackdrop, steps, menuOpen, setActiveView, setNavDirection, setDirectLink, activeView, fwdBtn, setFwdBtn, setActiveMilestone, setMilestoneHeadline, backdrop, directLink, sendGAEvent, BuildingEnegeryStandard, OilUsageLiters, OilLNGValue, LNGUsage, homeCharging, odometerIncrease, homeStorageSize, pvOutput, energyUsagekWh, disabledInvestmentCost, investmentCostEUR, electricityCost, gridRevenue, setCalculationModal } = this.context;

    const handleOpen = () => setCalculationModal(true);

    const nextTab = (event, newValue) => {
      setActiveView(activeView + 1);
      setFwdBtn(true);
      this.setState({ backBtn: false });

      if (activeView + 1 === 4) {
        setActiveMilestone(1);
        setMilestoneHeadline("Ausstattung");
      } else if (activeView + 1 === 8) {
        setActiveMilestone(2);
        setMilestoneHeadline("Ökonomische Größen");
      } else if (activeView + 1 === 11) {
        setActiveMilestone(3);
        setMilestoneHeadline("Ergebnis");
      }
    };

    const previousTab = (event, newValue) => {
      setNavDirection("left");

      setActiveView(activeView - 1);
      this.setState({ fwdBtn: false });

      if (activeView - 1 === 0) {
        setActiveMilestone(0);
        setMilestoneHeadline("Gebäude");
      } else if (activeView - 1 <= 3) {
        setActiveMilestone(0);
        setMilestoneHeadline("Gebäude");
      } else if (activeView - 1 <= 7) {
        setActiveMilestone(1);
        setMilestoneHeadline("Ausstattung");
      } else if (activeView - 1 <= 10) {
        setActiveMilestone(2);
        setMilestoneHeadline("Ökonomische Größen");
      } else if (activeView - 1 === 11) {
        setActiveView(activeView - 2);
      }
    };

    return (
      <div className={styles.homeContainer}>
        {menuOpen && (
          <div style={{ position: "absolute", width: "100%", height: "100%", marginTop: "90px", marginLeft: "10px", background: "#eee", overflowY: "scroll", zIndex: "999999" }}>
            <div style={{ display: "flex", flexDirection: "column", margin: "25px" }}>
              <div>
                <h3 style={{ marginBottom: "10px", fontSize: "20px", marginBlockStart: "0", color: "#000" }}>Gebäude</h3>
              </div>
              <Link
                className={steps[0] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(0);
                }}
              >
                <span>Gebäudeenergiestandard</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[0] === false && <FwdBtnIcon />}
                  {steps[0] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[1] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(1);
                }}
              >
                <span>Heizverteilsystem</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[1] === false && <FwdBtnIcon />}
                  {steps[1] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[2] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(2);
                }}
              >
                <span>Stromverbrauch</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[2] === false && <FwdBtnIcon />}
                  {steps[2] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>Ausstattung</h3>
              </div>
              <Link
                className={steps[3] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(3);
                }}
              >
                <span>PV-Leistung</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[3] === false && <FwdBtnIcon />}
                  {steps[3] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[4] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(4);
                }}
              >
                <span>Solarstromspeicher / Batteriespeicher</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[4] === false && <FwdBtnIcon />}
                  {steps[4] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[5] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(5);
                }}
              >
                <span>Elektroauto</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[5] === false && <FwdBtnIcon />}
                  {steps[5] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[6] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(6);
                }}
              >
                <span>Wärmepumpe</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[6] === false && <FwdBtnIcon />}
                  {steps[6] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[7] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(7);
                }}
              >
                <span>Energiemanagement</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[7] === false && <FwdBtnIcon />}
                  {steps[7] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>Ökonomische Kenngrößen</h3>
              </div>
              <Link
                className={steps[8] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(8);
                }}
              >
                <span>Investitionskosten</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[8] === false && <FwdBtnIcon />}
                  {steps[8] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[9] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(9);
                }}
              >
                <span>Stromkosten</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[9] === false && <FwdBtnIcon />}
                  {steps[9] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(10);
                }}
              >
                <span>Einspeisevergütung</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>Ergebnis</h3>
              </div>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(11);
                }}
              >
                <span>Stromkosten und Amortisationszeit Ihrer PV-Anlage</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(12);
                }}
              >
                <span>Stromverbrauch, Autarkie und Eigenverbrauch</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
            </div>
          </div>
        )}
        <Backdrop sx={{ color: "#fff", zIndex: "9999999" }} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop sx={{ color: "#fff", zIndex: "9999999" }} open={menuBackdrop}>
          <div
            style={{ position: "absolute", right: "8px", top: "13px" }}
            onClick={() => {
              this.handleClick();
            }}
          >
            <MenuCloseIcon />
          </div>
          <div style={{ color: "#FFF", width: "100%", height: "100%", lineHeight: "36px", background: "#eee", marginTop: "0px", overflowY: "scroll" }}>
            <div style={{ display: "flex", flexDirection: "column", margin: "15px 25px 25px 15px" }}>
              <div>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Medium", color: "#000", marginBottom: "10px", fontSize: "20px", marginBlockStart: "0" }}>Gebäude</h3>
              </div>
              <Link
                className={steps[0] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(0);
                }}
              >
                <span>Gebäudegröße</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[0] === false && <FwdBtnIcon />}
                  {steps[0] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[1] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(1);
                }}
              >
                <span>Heizenergiebedarf</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[1] === false && <FwdBtnIcon />}
                  {steps[1] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[2] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(2);
                }}
              >
                <span>Wärmeverteilsystem</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[2] === false && <FwdBtnIcon />}
                  {steps[2] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[3] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(3);
                }}
              >
                <span>Haushaltsstromverbrauch</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[3] === false && <FwdBtnIcon />}
                  {steps[3] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Medium", color: "#000", marginBottom: "10px", fontSize: "20px" }}>Ausstattung</h3>
              </div>
              <Link
                className={steps[4] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(4);
                }}
              >
                <span>Wärmepumpe</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[4] === false && <FwdBtnIcon />}
                  {steps[4] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[5] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(5);
                }}
              >
                <span>Elektroauto</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[5] === false && <FwdBtnIcon />}
                  {steps[5] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[6] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(6);
                }}
              >
                <span>PV-Leistung</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[6] === false && <FwdBtnIcon />}
                  {steps[6] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[7] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(7);
                }}
              >
                <span>Batteriespeicher</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[7] === false && <FwdBtnIcon />}
                  {steps[7] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Medium", color: "#000", marginBottom: "10px", fontSize: "20px" }}>Ökonomische Kenngrößen</h3>
              </div>
              <Link
                className={steps[8] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(8);
                }}
              >
                <span>Investitionskosten</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[8] === false && <FwdBtnIcon />}
                  {steps[8] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[9] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(9);
                }}
              >
                <span>Stromkosten</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[9] === false && <FwdBtnIcon />}
                  {steps[9] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(10);
                }}
              >
                <span>Einspeisevergütung</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <div>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Medium", color: "#000", marginBottom: "10px", fontSize: "20px" }}>Ergebnis</h3>
              </div>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(11);
                }}
              >
                <span>Stromkosten und Amortisationszeit Ihrer PV-Anlage</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
              <Link
                className={steps[10] === false ? "activeMobileLink" : "inactiveMobileLink"}
                onClick={() => {
                  this.handleStep(12);
                }}
              >
                <span>Stromverbrauch, Autarkie und Eigenverbrauch</span>
                <span style={{ display: "block", alignItems: "end" }}>
                  {steps[10] === false && <FwdBtnIcon />}
                  {steps[10] === true && <FwdBtnInactiveIcon />}
                </span>
              </Link>
            </div>
          </div>
        </Backdrop>
        <div className={styles.setupContainer}>
          <div className={styles.toolMargin}>
            <Box sx={{ width: "100%" }}>
              <NavContent theme={selectedTheme} />
            </Box>
          </div>
        </div>
        <div className="bottomNav" style={{ position: isMobile ? "absolute" : "fixed", width: "100%", bottom: "3%", zIndex: "999999" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "3%", marginRight: "3%" }}>
            <Button
              id="previousTabBtn"
              variant="outlined"
              startIcon={this.context.selectedTheme === "buderus" ? <BuderusBackThinIcon /> : <BackThinIcon />}
              disabled={this.state.backBtn}
              sx={{
                background: "#FFF",
                textTransform: "none",
                borderRadius: "0px",
                fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
                color: this.context.selectedTheme === "buderus" ? "#000000" : "",
                border: this.context.selectedTheme === "buderus" ? "1px solid #000000" : "",
                "&:hover": {
                  border: this.context.selectedTheme === "buderus" ? "1px solid #000000" : "",
                },
              }}
              onClick={() => {
                previousTab();
              }}
            >
              {activeView === 11 && <span>Zurück</span>}
              {activeView === 13 && <span>Ergebnis Teil 1</span>}
              {activeView === 0 && <span>Zurück</span>}
              {activeView === 1 && <span>Zurück</span>}
              {activeView === 2 && <span>Zurück</span>}
              {activeView === 3 && <span>Zurück</span>}
              {activeView === 4 && <span>Zurück</span>}
              {activeView === 5 && <span>Zurück</span>}
              {activeView === 6 && <span>Zurück</span>}
              {activeView === 7 && <span>Zurück</span>}
              {activeView === 8 && <span>Zurück</span>}
              {activeView === 9 && <span>Zurück</span>}
              {activeView === 10 && <span>Zurück</span>}
              {activeView === 12 && <span>Zurück</span>}
              {activeView === 14 && <span>Ergebnis Teil 2</span>}
            </Button>

            <CustomButton
              id="CalcInfoBtn"
              startIcon={this.context.selectedTheme === "buderus" ? <BuderusInfoIcon /> : <InfoIcon />}
              style={{ background: "#FFF", border: this.context.selectedTheme === "buderus" ? "1px solid #000000" : "1px solid #007BC0", textTransform: "none", borderRadius: "0px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular" }}
              className={activeView === 12 || activeView === 13 || activeView === 14 ? styles.show : styles.hide}
              onClick={() => {
                /* var container = document.getElementsByClassName("home_homeContainer__CHK-E")[0];
                container.style.display = "none"; */
                handleOpen();
              }}
            >
              <span className="trackeable" style={{ fontSize: "12px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", color: this.context.selectedTheme === "buderus" ? "#000000" : "#007BC0", cursor: "pointer" }} data-event={activeView === 12 ? "result-part1-berechnungsgrundlage" : activeView === 13 ? "result-part2-berechnungsgrundlage" : activeView === 14 ? "result-part3-berechnungsgrundlage" : ""}>
                Berechnungsgrundlage
              </span>
            </CustomButton>

            <CustomButton
              id="nextTabBtn"
              variant="contained"
              endIcon={<ForwardThinIcon />}
              disabled={fwdBtn}
              style={{ textTransform: "none", borderRadius: "0px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular" }}
              className={activeView !== 14 ? styles.show : styles.hide}
              onClick={() => {
                if (activeView === 3 && directLink === true) {
                  setDirectLink(false);
                  setActiveView(13);
                } else if (activeView === 1 && BuildingEnegeryStandard === "OilLNG") {
                  if (OilLNGValue === "oil-usage") {
                    sendGAEvent("heizenergiebedard-olverbrauch", OilUsageLiters, window.location.href);
                    nextTab();
                  } else {
                    sendGAEvent("heizenergiebedard-gasverbrauch", LNGUsage, window.location.href);
                    nextTab();
                  }
                } else if (activeView === 3) {
                  var value;
                  if (energyUsagekWh === 0) value = 4000;
                  else if (energyUsagekWh === 1) value = 6000;
                  else value = 8000;

                  sendGAEvent("haushaltsstromverbrauch-kwh", value, window.location.href);
                  nextTab();
                } else if (activeView === 5) {
                  if (homeCharging === "Commuter_") {
                    sendGAEvent("elektroauto-das-eauto-kann", null, window.location.href);
                    nextTab();
                  } else {
                    sendGAEvent("elektroauto-das-eauto-wird", null, window.location.href);
                    nextTab();
                  }

                  if (odometerIncrease === "10k") {
                    sendGAEvent("elektroauto-10000", 10000, window.location.href);
                    nextTab();
                  } else {
                    sendGAEvent("elektroauto-20000", 20000, window.location.href);
                    nextTab();
                  }
                } else if (activeView === 6) {
                  if (pvOutput === 0) value = 4;
                  else if (pvOutput === 1) value = 7;
                  else if (pvOutput === 2) value = 10;
                  else value = 14;

                  sendGAEvent("pv-leistung-kwp", value, window.location.href);
                  nextTab();
                } else if (activeView === 7) {
                  if (homeStorageSize === 0) value = 6;
                  else if (homeStorageSize === 1) value = 9;
                  else if (homeStorageSize === 2) value = 12;
                  else value = 15;

                  sendGAEvent("batteriespeicher-kwh", value, window.location.href);
                  nextTab();
                } else if (activeView === 8 && !disabledInvestmentCost) {
                  sendGAEvent("investitionskosten-amount", investmentCostEUR, window.location.href);
                  nextTab();
                } else if (activeView === 9) {
                  sendGAEvent("stromkosten-amount", electricityCost, window.location.href);
                  nextTab();
                } else if (activeView === 10) {
                  sendGAEvent("einspeisevergütung-amount", gridRevenue, window.location.href);
                  nextTab();
                } else {
                  nextTab();
                }
              }}
            >
              {activeView === 10 && <span>Ergebnis Teil 1</span>}
              {activeView === 11 && <span>Ergebnis Teil 1</span>}
              {activeView === 12 && (
                <span className="trackeable" data-event="result-part1-next">
                  Ergebnis Teil 2
                </span>
              )}
              {activeView === 0 && <span>Weiter</span>}
              {activeView === 1 && <span>Weiter</span>}
              {activeView === 2 && <span>Weiter</span>}
              {activeView === 3 && directLink === false && <span>Weiter</span>}
              {activeView === 3 && directLink === true && (
                <span className="trackeable" data-event="haushaltsstromverbrauch-back-to-result">
                  Zurück zum Ergebnis
                </span>
              )}
              {activeView === 4 && <span>Weiter</span>}
              {activeView === 5 && <span>Weiter</span>}
              {activeView === 6 && <span>Weiter</span>}
              {activeView === 7 && <span>Weiter</span>}
              {activeView === 8 && <span>Weiter</span>}
              {activeView === 9 && <span>Weiter</span>}
              {activeView === 13 && (
                <span className="trackeable" data-event="result-part2-next">
                  Zusatz
                </span>
              )}
            </CustomButton>

            <CustomButton
              id="restartBtn"
              variant="contained"
              startIcon={<HouseSmallIcon />}
              disabled={this.state.restart}
              style={{ textTransform: "none", borderRadius: "0px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular" }}
              className={activeView === 14 ? styles.show : styles.hide}
              onClick={() => {
                setActiveView(0);
              }}
            >
              <span className="trackeable" data-event="result-part3-back-to-startpage">
                Zurück zum Start
              </span>
            </CustomButton>
          </div>
        </div>
        <CalculationModal />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Main));
