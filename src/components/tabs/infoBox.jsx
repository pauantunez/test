import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { ReactComponent as InfoIcon } from "../../assets/img/icons/info.svg";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { withTranslation } from "react-i18next";

class InfoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      boxType: props.box,
    };
  }

  static contextType = AppContext;

  componentDidMount() {}

  render() {
    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

    return (
      <Box component="span" class="infobox-container">
        <h3 class="infobox-h3 Bosch-Medium">Infobox:</h3>
        <div class="infobox-padding-12-12">
          {this.state.boxType === "2-row-2-col" && <span>Als Richtwert kann von folgenden Werten ausgegangen werden:</span>}
          {this.state.boxType === "2-row-2-col-revenue" && (
            <span>
              Bei neu installierten PV-Anlagen (EEG 2023) ergeben sich durch
              <br />
              verschiedene Anlagengrößen auch unterschiedliche
              <br />
              Einspeisevergütungen. Quelle: EEG2023
            </span>
          )}
          {this.state.boxType === "2-row-3-col" && <span>Worin unterscheiden sich die Arten der Wärmepumpen?</span>}
          {this.state.boxType === "4-row-2-col" && <span>Als Richtwert kann von folgenden Werten ausgegangen werden:</span>}
          {this.state.boxType === "4-row-2-col-battery" && <span>Als Richtwert kann von folgenden Werten ausgegangen werden:</span>}

          {/* One row and one column - Investment */}
          {this.state.boxType === "1-row-1-col" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "20px", borderBottom: "none" }}>
                  Um die Investitionssumme Ihrer Anlage ermitteln zu können, werden
                  <br />
                  marktübliche Richtpreise für die PV-Anlage und den Batteriespeicher
                  <br />
                  genutzt. Beispiel:
                  <br />
                  <ul style={{ marginBlockStart: "0.2em", marginBlockEnd: "0.2em" }}>
                    <li>7 kWp PV-Anlage = ca. {this.context.selectedTheme === "buderus" ? (10000).toLocaleString("de-DE") : (15000).toLocaleString("de-DE")} €</li>
                    <li>9 kWh Batteriespeicher = ca. 7.000 €</li>
                  </ul>
                  Die Preise variieren, je nach Anlagengröße und können regional
                  <br />
                  abweichen. Mehrwertsteuer ist nicht mit inbegriffen.
                </div>
              </div>
            </div>
          )}
          {/* One row and one column - Investment */}
          {this.state.boxType === "1-row-1-col-electricity" && (
            <div>
              <div class="infobox-row-container">
                <div class="infobox-row" style={{ display: "block", lineHeight: "20px", borderBottom: "none" }}>
                  Der Durschnittsstrompreis im 2. Halbjahr 2022 lag bei 35 Ct/kWh.
                  <br />
                  (inkl. MwSt.){" "}
                  <a href="https://www-genesis.destatis.de/genesis/online?operation=previous&levelindex=1&step=1&titel=Ergebnis&levelid=1688366713147&acceptscookies=false#abreadcrumb" target="_blank">
                    Quelle Destatis
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Two rows and two columns */}
        {this.state.boxType === "2-row-2-col" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium">
                <div class="width-50 padding-left-10">Anzahl Personen</div>
                <div class="width-50">Stromverbrauch in kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">3 - 4 Personen</div>
                <div class="width-50">{(4000).toLocaleString("de-DE")} kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">5 - 6 Personen</div>
                <div class="width-50">{(6000).toLocaleString("de-DE")} kWh</div>
              </div>
            </div>
          </div>
        )}

        {this.state.boxType === "2-row-2-col-revenue" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium">
                <div class="width-50 padding-left-10">Anlagengröße</div>
                <div class="width-50">Einspeisevergütung</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">&lt; 10 kWp</div>
                <div class="width-50">8,2 Ct/kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">&gt; 10 kWp</div>
                <div class="width-50">7,1 Ct/kWh</div>
              </div>
            </div>
          </div>
        )}

        {/* Two rows and three columns */}
        {this.state.boxType === "2-row-3-col" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ width: "28%" }}></div>
                <div class="width-50" style={{ width: "33%" }}>
                  Erdwärmepumpe
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "39%", textAlign: "right" }}>
                  Luft-Wasser-Wärmepumpe
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "2.9", width: "28%" }}>
                  Wärmequelle
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "33%" }}>
                  Erdreich
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "39%", textAlign: "right" }}>
                  Umgebungsluft
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "2.9", width: "28%" }}>
                  Eigenschaft
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "33%" }}>
                  Hohe Effizienz
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "39%", textAlign: "right" }}>
                  Geringer Platzbedarf
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Four rows and two columns */}
        {this.state.boxType === "4-row-2-col" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium">
                <div class="width-50 padding-left-10">Platzbedarf Dachfläche*</div>
                <div class="width-50">PV-Leistung</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">
                  24m<sup>2</sup>
                </div>
                <div class="width-50">4 kWp</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">
                  42m<sup>2</sup>
                </div>
                <div class="width-50">7 kWp</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">
                  60m<sup>2</sup>
                </div>
                <div class="width-50">10 kWp</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">
                  84m<sup>2</sup>
                </div>
                <div class="width-50">14 kWp</div>
              </div>
            </div>
          </div>
        )}

        {/* Four rows and two columns - Battery Storage */}
        {this.state.boxType === "4-row-2-col-battery" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium">
                <div class="width-50 padding-left-10">PV-Leistung</div>
                <div class="width-50">Größe Batteriespeicher</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">4 kWp</div>
                <div class="width-50">6 kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">7 kWp</div>
                <div class="width-50">9 kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">10 kWp</div>
                <div class="width-50">12 kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">14 kWp</div>
                <div class="width-50">15 kWh</div>
              </div>
            </div>
          </div>
        )}
        {this.state.boxType === "4-row-2-col" && (
          <div class="infobox-padding-12-0 font12">
            <span>
              * Platzbedarf bei kompakter Anordnung ohne Störflächen, Randabstand nicht
              <br />
              berücksichtigt
            </span>
          </div>
        )}

        {/* Berechnungsgrundlage 1 */}
        {this.state.boxType === "calculation-1" && (
          <div>
            <div class="infobox-row-container">
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ width: "28%" }}></div>
                <div class="width-50" style={{ width: "33%" }}>
                  Erdwärmepumpe
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "39%" }}>
                  Luft-Wasser-Wärmepumpe
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "2.9", width: "28%" }}>
                  Wärmequelle
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "33%" }}>
                  Erdreich
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "39%" }}>
                  Umgebungsluft
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "2.9", width: "28%" }}>
                  Eigenschaft
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "33%" }}>
                  Hohe Effizienz
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "39%" }}>
                  Geringer Platzbedarf
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    );
  }
}

export default withRouter(withTranslation()(InfoBox));
