import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InfoBoxCalculation from "./infoBoxCalculation";

import { ReactComponent as CloseIcon } from "../../assets/img/icons/close.svg";
import { ReactComponent as InfoIcon } from "../../assets/img/icons/info_large.svg";
import { ReactComponent as ForwardThinIcon } from "../../assets/img/icons/arrow_forward_thin.svg";
import { ReactComponent as BackThinIcon } from "../../assets/img/icons/arrow_back_thin.svg";

import { ReactComponent as BuderusBackThinIcon } from "../../assets/img/icons/buderus/arrow_back_thin.svg";

import { ReactComponent as BuderusInfoIcon } from "../../assets/img/icons/buderus/info_large.svg";

import { withTranslation } from "react-i18next";

class CalculationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      color: props.color,
      size: props.size,
      placement: props.placement,
    };
  }

  static contextType = AppContext;

  componentDidMount() {}

  nextTab() {
    const { setActiveCalculationView, activeCalculationView } = this.context;

    setActiveCalculationView(activeCalculationView + 1);
  }

  previousTab() {
    const { setActiveCalculationView, activeCalculationView } = this.context;

    setActiveCalculationView(activeCalculationView - 1);
  }

  render() {
    const { activeCalculationView, setCalculationModal, calculationModal } = this.context;
    const handleClose = () => {
      /* var container = document.getElementsByClassName("home_homeContainer__CHK-E")[0];
      container.style.display = "block"; */
      setCalculationModal(false);
    };

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      bgcolor: "background.paper",
      border: "none",
      boxShadow: 24,
      p: 0,
      overflow: "scroll",
    };

    return (
      <Modal open={calculationModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={{ zIndex: 999999 }}>
        <Box className="calculationModal" sx={style}>
          {activeCalculationView === 0 && (
            <div className="modal-container-padding" style={{ display: "block" /*padding: '20px'*/ }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-width" style={{ position: "relative" }}>
                  <div className="text-alignment" style={{ width: "100%" }}>
                    <h1>Berechnungsgrundlage 1/3</h1>
                  </div>
                  <div onClick={handleClose} style={{ position: "absolute", right: "0px", top: "10px", cursor: "pointer" }}>
                    <CloseIcon />
                  </div>
                </div>
              </div>

              <div id="scrollable-container">
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <div className="modal-content-width" style={{ position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "24px", width: "100%", marginTop: "35px", marginBottom: "30px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", textAlign: "left" }}>
                      <div style={{ marginRight: "10px" }}>{this.context.selectedTheme === "buderus" ? <BuderusInfoIcon /> : <InfoIcon />}</div>
                      <div>
                        <strong>Bitte beachten Sie:</strong> Die Ergebnisse des Tools basieren auf historischen Werten, simulierten Daten und darauf aufbauenden Optimierungen und können daher von tatsächlichen Verbräuchen und Erträgen abweichen. Die Daten werden regelmäßig kontrolliert und aktualisiert. Das Tool ersetzt nicht die exakte Planung durch eine/n von Ihnen beauftragte/n Planungsexperten/-expertin.
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <div className="modal-content-width" style={{ position: "relative" }}>
                    <hr style={{ width: "100%", height: "2px", border: "none", background: "#E0E2E5" }} />
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <div className="modal-content-width" style={{ position: "relative", marginBottom: "10px" }}>
                    <h3>Grundlage für die angezeigten Verbrauchs-, Ertrags- und Amortisationsabschätzungen sind folgende Annahmen:</h3>
                  </div>
                </div>
                <div className="modal-content-flex-direction" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <div className="modal-content-box-width">
                    <InfoBoxCalculation box="calculation-1" />
                  </div>
                  <div className="divider-hide" style={{ width: "2%" }}>
                    <hr style={{ width: "1px", height: "100%", border: "none", background: "#E0E2E5" }} />
                  </div>
                  <div className="modal-content-box-width top-30">
                    <InfoBoxCalculation box="calculation-2" />
                  </div>
                </div>
                <div style={{ position: "fixed", width: "100%", bottom: "2.5%" }}>
                  <div className="justify-nav" style={{ display: "flex", width: "100%" }}>
                    <div className="modal-nav-width" style={{ position: "relative", marginTop: "30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div></div>
                        <div>
                          <Button
                            id="nextTabBtn"
                            variant="contained"
                            endIcon={<ForwardThinIcon />}
                            onClick={() => {
                              this.nextTab();
                            }}
                            style={{
                              textTransform: "none",
                              borderRadius: "0px",
                              fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
                              backgroundColor: this.context.selectedTheme === "buderus" ? "#002d59" : "#007BC0",
                              "&:hover": {
                                backgroundColor: this.context.selectedTheme === "buderus" ? "#001d39" : "#00629A",
                              },
                            }}
                          >
                            Weiter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCalculationView === 1 && (
            <div className="modal-container-padding" style={{ display: "block" /*padding: '20px'*/ }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-width" style={{ position: "relative" }}>
                  <div className="text-alignment" style={{ width: "100%" }}>
                    <h1>Berechnungsgrundlage 2/3</h1>
                  </div>
                  <div onClick={handleClose} style={{ position: "absolute", right: "0px", top: "10px", cursor: "pointer" }}>
                    <CloseIcon />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-width" style={{ position: "relative", marginBottom: "10px" }}>
                  <h3>Grundlage für die angezeigten Verbrauchs-, Ertrags- und Amortisationsabschätzungen sind folgende Annahmen:</h3>
                </div>
              </div>
              <div className="modal-content-flex-direction" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-box-width">
                  <div>
                    <InfoBoxCalculation box="calculation-3" />
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <InfoBoxCalculation box="calculation-5" />
                  </div>
                </div>
                <div className="divider-hide" style={{ width: "2%" }}>
                  <hr style={{ width: "1px", height: "100%", border: "none", background: "#E0E2E5" }} />
                </div>
                <div className="modal-content-box-width top-30">
                  <div>
                    <InfoBoxCalculation box="calculation-4" />
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <InfoBoxCalculation box="calculation-6" />
                  </div>
                </div>
              </div>
              <div style={{ position: "fixed", width: "100%", bottom: "2.5%" }}>
                <div className="justify-nav" style={{ display: "flex", width: "100%" }}>
                  <div className="modal-nav-width" style={{ position: "relative", marginTop: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <Button
                          id="previousTabBtn"
                          variant="outlined"
                          startIcon={this.context.selectedTheme === "buderus" ? <BuderusBackThinIcon /> : <BackThinIcon />}
                          onClick={() => {
                            this.previousTab();
                          }}
                          style={{
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
                        >
                          Zurück
                        </Button>
                      </div>
                      <div>
                        <Button
                          id="nextTabBtn"
                          variant="contained"
                          endIcon={<ForwardThinIcon />}
                          onClick={() => {
                            this.nextTab();
                          }}
                          style={{
                            textTransform: "none",
                            borderRadius: "0px",
                            fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
                            backgroundColor: this.context.selectedTheme === "buderus" ? "#002d59" : "#007BC0",
                            "&:hover": {
                              backgroundColor: this.context.selectedTheme === "buderus" ? "#001d39" : "#00629A",
                            },
                          }}
                        >
                          Weiter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCalculationView === 2 && (
            <div className="modal-container-padding" style={{ display: "block", /*padding: '20px',*/ overflow: "hidden" }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-width" style={{ position: "relative" }}>
                  <div className="text-alignment" style={{ width: "100%" }}>
                    <h1>Berechnungsgrundlage 3/3</h1>
                  </div>
                  <div onClick={handleClose} style={{ position: "absolute", right: "0px", top: "10px", cursor: "pointer" }}>
                    <CloseIcon />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-width" style={{ position: "relative", marginBottom: "10px" }}>
                  <h3>Grundlage für die angezeigten Verbrauchs-, Ertrags- und Amortisationsabschätzungen sind folgende Annahmen:</h3>
                </div>
              </div>
              <div className="modal-content-flex-direction" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <div className="modal-content-box-width">
                  <div>
                    <InfoBoxCalculation box="calculation-7" />
                  </div>
                </div>
                <div className="divider-hide" style={{ width: "2%" }}>
                  <hr style={{ width: "1px", height: "100%", border: "none", background: "#E0E2E5" }} />
                </div>
                <div className="modal-content-box-width">
                  <div className="top-30">
                    <InfoBoxCalculation box="calculation-9" />
                  </div>
                  <div className="top-30" style={{ marginTop: "30px" }}>
                    <InfoBoxCalculation box="calculation-8" />
                  </div>
                </div>
              </div>
              <div style={{ position: "fixed", width: "100%", bottom: "2.5%" }}>
                <div className="justify-nav" style={{ display: "flex", width: "100%" }}>
                  <div className="modal-nav-width" style={{ position: "relative", marginTop: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <Button
                          id="previousTabBtn"
                          variant="outlined"
                          startIcon={this.context.selectedTheme === "buderus" ? <BuderusBackThinIcon /> : <BackThinIcon />}
                          onClick={() => {
                            this.previousTab();
                          }}
                          style={{
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
                        >
                          Zurück
                        </Button>
                      </div>
                      <div>
                        <Button
                          id="nextTabBtn"
                          variant="contained"
                          onClick={handleClose}
                          style={{
                            textTransform: "none",
                            borderRadius: "0px",
                            fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular",
                            backgroundColor: this.context.selectedTheme === "buderus" ? "#002d59" : "#007BC0",
                            "&:hover": {
                              backgroundColor: this.context.selectedTheme === "buderus" ? "#001d39" : "#00629A",
                            },
                          }}
                        >
                          Schließen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    );
  }
}

export default withRouter(withTranslation()(CalculationModal));
