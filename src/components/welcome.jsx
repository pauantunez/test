import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import AppContext from "../AppContext";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "../styles/home.module.css";
import "rc-slider/assets/index.css";
import { ReactComponent as CoinIcon } from "../assets/img/icons/coins_small.svg";
import { ReactComponent as PVSunIcon } from "../assets/img/icons/pv_sun_small.svg";
import { ReactComponent as ElectricitySunIcon } from "../assets/img/icons/electricity_sun_small.svg";
import { ReactComponent as LightningSmallIcon } from "../assets/img/icons/lightning_small.svg";

import { ReactComponent as BuderusCoinIcon } from "../assets/img/icons/buderus/coins_small.svg";
import { ReactComponent as BuderusPVSunIcon } from "../assets/img/icons/buderus/pv_sun_small.svg";
import { ReactComponent as BuderusElectricitySunIcon } from "../assets/img/icons/buderus/electricity_sun_small.svg";
import { ReactComponent as BuderusLightningSmallIcon } from "../assets/img/icons/buderus/lightning_small.svg";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CalculationModal from "./tabs/modal";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var productEntry;
var entryParam;

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

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: "audiofile.mp3",
      initialVolumeSet: false,
      initialLoad: false,
      backBtn: true,
      fwdBtn: false,
      selectedProduct: 0,
      selectedTab: 0,
      gainNode: {},
      mediaSource: {},
      audioCtx: {},
      parNo: "44",
      scenNo: "",
    };
  }

  static contextType = AppContext;

  componentWillMount() {
    this.context.getTheme();
    const { products /* , sendGAEvent */ } = this.context;
    const productsProps = Object.getOwnPropertyNames(products);
    var foundTheme = 0;

    if (urlParams.get("theme")) {
      entryParam = urlParams.get("theme");

      for (let themes = 0; themes < productsProps.length; themes++) {
        if (entryParam === productsProps[themes]) {
          import("../styles/" + productsProps[themes] + ".css");

          foundTheme++;
        } else {
          require("ignore");
        }
      }

      if (foundTheme === 0) {
        import("../styles/" + productsProps[0] + ".css");
      }
    } else {
      import("../styles/" + productsProps[0] + ".css");
    }

    /* document.body.addEventListener("click", (event) => {
      var trackeableElement = event.target.closest(".trackeable");
      if (trackeableElement) {
        var eventName = trackeableElement.dataset.event;
        sendGAEvent(eventName, null, window.location.href);
      }
    }); */
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    //isEnd
    if (nextContext.activeView === 0 && nextContext.selectedTab === 2) {
      this.setState({ fwdBtn: true, backBtn: false });
    } else if (nextContext.activeView === 0 && nextContext.selectedTab === 0) {
      this.setState({ fwdBtn: false, backBtn: true });
    } else {
      this.setState({ fwdBtn: false, backBtn: false });
    }
  };

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
    const { setCalculationModal } = this.context;

    const handleOpen = () => setCalculationModal(true);

    return (
      <div className={styles.homeContainer}>
        <div className={styles.setupContainer}>
          <div>
            <div>{/*<img src={require(`../assets/img/house-placeholder.png`)} alt="" style={{width: '100%'}} />*/}</div>
            <div className="welcomeContainer" style={{ display: "flex" }}>
              <div className="left-container">
                <p style={{ fontFamily: "Bosch-Bold", fontSize: "16px" }}>Sparen Sie Stromkosten – mit der smarten Kombination aus Photovoltaik, Wärmepumpe, Wallbox und einem intelligenten Energiemanagementsystem</p>
                <p style={{ paddingTop: "25px" }}>Ermitteln Sie mit dem Tool für Ihr Einfamilienhaus:</p>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "row", padding: "15px 0 15px 0" }}>
                    <div>{this.context.selectedTheme === "buderus" ? <BuderusCoinIcon style={{ paddingRight: "10px" }} /> : <CoinIcon style={{ paddingRight: "10px" }} />}</div>
                    <div>
                      <span style={{ fontFamily: "Bosch-Bold" }}>Stromkostenersparnis:</span> Wieviel Stromkosten kann man durch eine PV-Anlage einsparen?
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", padding: "15px 0 15px 0" }}>
                    <div>{this.context.selectedTheme === "buderus" ? <BuderusPVSunIcon style={{ paddingRight: "10px" }} /> : <PVSunIcon style={{ paddingRight: "10px" }} />}</div>
                    <div>
                      <span style={{ fontFamily: "Bosch-Bold" }}>Amortisationszeit:</span> Wann sind die Investitionskosten für eine PV-Anlage durch geringere jährliche Stromkosten erwirtschaftet?
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", padding: "15px 0 15px 0" }}>
                    <div>{this.context.selectedTheme === "buderus" ? <BuderusElectricitySunIcon style={{ paddingRight: "10px" }} /> : <ElectricitySunIcon style={{ paddingRight: "10px" }} />}</div>
                    <div>
                      <span style={{ fontFamily: "Bosch-Bold" }}>Autarkie:</span> Welchen Anteil des Strombedarfs können Sie durch eine PV-Anlage selbst produzieren?
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", padding: "15px 0 15px 0" }}>
                    <div>{this.context.selectedTheme === "buderus" ? <BuderusLightningSmallIcon style={{ paddingRight: "10px" }} /> : <LightningSmallIcon style={{ paddingRight: "10px" }} />}</div>
                    <div>
                      <span style={{ fontFamily: "Bosch-Bold" }}>Eigenverbrauchsanteil:</span> Wieviel des selbst erzeugten PV-Stroms verbrauchen Sie selbst?
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-container" style={{ display: "flex", justifyContent: "end" }}>
                <img src={this.context.selectedTheme === "buderus" ? require(`../assets/img/buderus/preview.png`) : require(`../assets/img/preview.png`)} alt="" style={{ width: this.context.selectedTheme === "buderus" ? "" : "85%", height: "auto", objectFit: "contain", margin: "14px" }} />
              </div>
            </div>
            <div className="welcomeBtns" style={{ display: "flex", margin: "3% 5% 0 5%" }}>
              <div className="startBtn">
                <span className="trackeable" data-event="jetzt-solarstromrechner-starten">
                  <Link style={{ display: "inline-block", textAlign: "center", backgroundColor: this.context.selectedTheme === "buderus" ? "#002D59" : "#006a9b", color: this.context.selectedTheme === "buderus" ? "#FFFFFF" : "#FFF", textDecoration: "none", margin: "5px 10px 0 0", padding: "10px 20px 10px 20px", fontSize: "14px", fontFamily: "Bosch-Regular" }} to={this.context.selectedTheme === "buderus" ? "./main?theme=buderus" : "./main"}>
                    Jetzt Solarstromrechner starten
                  </Link>
                </span>
              </div>
              <div className="explanationBtn">
                <div className="calculationBase trackeable" onClick={handleOpen} style={{ fontSize: "12px", fontFamily: "Bosch-Regular", color: this.context.selectedTheme === "buderus" ? "#000000" : "#007BC0", cursor: "pointer" }} data-event="berechnungsgrundlage">
                  Berechnugsgrundlage
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="noticeBottom">Hinweis: Die Ergebnisse beruhen auf Annahmen und können in der Realität abweichen. Bitte besprechen Sie die Details mit einem Fachbetrieb in Ihrer Nähe.</div>

        <CalculationModal />
      </div>
    );
  }
}

export default withRouter(withTranslation()(Welcome));
