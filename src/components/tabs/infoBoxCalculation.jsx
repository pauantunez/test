import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../AppContext'
import { ReactComponent as InfoIcon } from '../../assets/img/icons/info.svg';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { withTranslation } from 'react-i18next';

class InfoBoxCalculation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
      text: props.text,
      boxType: props.box
    }
  }

  static contextType = AppContext

  componentDidMount() {

  }


  render() {

    const { t } = this.props;
    const { BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage } = this.context;

    return (
      <Box component="span" class="infobox-container">
        {this.state.boxType === "calculation-1" && <h3 class="infobox-h3 Bosch-Medium">Gebäudeenergiestandard:</h3>}
        {this.state.boxType === "calculation-2" && <span style={{ display: "block", paddingBottom: "10px" }}>Als Alternativeingabe wird der jährliche Öl- oder Gasverbrauch genutzt:</span>}
        {this.state.boxType === "calculation-2" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "10px" }}>
            Wärmeverteilsystem:
          </h3>
        )}
        {this.state.boxType === "calculation-3" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            Haushaltsstrombedarf:
          </h3>
        )}
        {this.state.boxType === "calculation-4" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            E-Auto:
          </h3>
        )}
        {this.state.boxType === "calculation-5" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            PV-Leistung:
          </h3>
        )}
        {this.state.boxType === "calculation-6" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            Stromspeicher:
          </h3>
        )}
        {this.state.boxType === "calculation-7" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            Wärmepumpe:
          </h3>
        )}
        {this.state.boxType === "calculation-8" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            Ergebnisse:
          </h3>
        )}
        {this.state.boxType === "calculation-9" && (
          <h3 class="infobox-h3 Bosch-Medium" style={{ marginBottom: "0px" }}>
            Investitionskosten:
          </h3>
        )}
        {this.state.boxType === "calculation-2" && <span style={{ display: "block" }}>Das Wärmeverteilsystem hat Einfluss auf die Vorlauftemperatur der Heizungsanlage.</span>}
        <div class="infobox-padding-12-12">
          {this.state.boxType === "calculation-1" && <span>Worin unterscheiden sich die Arten der Wärmepumpen?</span>}
          {this.state.boxType === "calculation-3" && <span>Hier ist ausschließlich der Stromverbrauch des Haushalts gemeint. Die Wärmepumpe, der Heizstab der Wärmepumpe oder das E-Auto sind hier nicht mit inbegriffen.</span>}
          {this.state.boxType === "calculation-4" && (
            <span>
              Das E-Auto wird berechnet mit einer 60 kWh Batterie und einer Ladeleistung von 11 kW. Der Verbrauch beläuft sich auf 1.800 kWh bei 10.000 km Laufleistung pro Jahr und auf 3.600 kWh bei 20.000 km Laufleistung pro Jahr.
              <br />
              Es wird davon ausgegangen, dass das E-Auto ausschließlich zuhause geladen wird. Die Auswahlmöglichkeit, wann das Auto in der Regel zuhause ist, hat Einfluss auf die direkte Ladung durch PV-Strom.
              <br />
              Bei einem Auto, das nur selten tagsüber geladen werden kann, wird davon ausgegangen, dass dieses zwischen 8:00 Uhr und 17:00 Uhr nicht zuhause ist.
            </span>
          )}
          {this.state.boxType === "calculation-5" && <span>Die PV-Leistung ist abhängig von der Größe der nutzbaren Dachfläche, die Dachausrichtung sowie die Standortabhängige jährliche Sonnenstundenzahl. Je größer die Dachfläche, desto mehr kWp PV-Leistung sind möglich. Als Richtwert kann von folgenden Daten ausgegangen werden:</span>}
          {this.state.boxType === "calculation-6" && <span>Die Leistung des Batteriespeichers ist abhängig von der Kapazität. Je größer die Kapazität, desto größer die Leistung.</span>}
          {this.state.boxType === "calculation-7" && (
            <span>
              Anhand der errechneten Lastprofile werden geeignete Bosch Wärmepumpen ausgewählt und deren Leistungsdaten für die Berechnung des Jahresstrom-verbrauchs genutzt.
              <br />
              Es wird unterschieden zwischen einer Luft-Wasser Wärmepumpe und einer Erdwärmepumpe.
            </span>
          )}
          {this.state.boxType === "calculation-8" && (
            <span>
              Für die Kostenberechnung wird von einer jährlichen Strompreissteigerung von 2% ausgegangen.
              <br />
              Die Kostenreduktion durch die Investition in eine PV-Anlage ergibt sich durch die reduzierten Strombezugskosten, den Einspeisevergütungen und den Servicekosten.
              <br />
              Die Servicekosten für die PV-Anlage werden mit 1% pro Jahr angenommen.
              <br />
              Die zusätzlichen Investitionskosten durch ein Energiemanagementsystem werden in Höhe von 400€ angenommen.
            </span>
          )}
          {this.state.boxType === "calculation-9" && <span>Falls die genauen Investitionskosten für das PV-System durch den Nutzer nicht eingegeben werden können, werden diese durch abgeschätzte marktübliche Preise kalkuliert. Zugehörig sind die Preise für die PV-Module und den Batteriespeicher (inkl. Montage und Installation). Dabei werden folgende Annahmen getroffen:</span>}
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
                  Marktübliche Richtpreise für die PV-Anlage und den Stromspeicher
                  <br />
                  genutzt. Beispiel:
                  <br />
                  <ul style={{ marginBlockStart: "0.2em", marginBlockEnd: "0.2em" }}>
                    <li>7 kWp PV-Anlage = ca. 15.000 €</li>
                    <li>9 kWh Stromspeicher = ca. 7.000 €</li>
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
                <div class="width-50">4.000 kWh</div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10">5 - 6 Personen</div>
                <div class="width-50">6.000 kWh</div>
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
                <div class="width-50 padding-left-10">5 kWp</div>
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
            <div class="infobox-row-container" style={{ marginTop: "8px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "28%" }}>
                  Heizbedarf pro Jahr in kWh/m²
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "33%" }}>
                  Gebäudeenergiestandard
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "39%" }}>
                  Gebäudeisolierung
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  25
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  kfW 40
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", height: "auto", width: "39%" }}>
                  Vollständig sehr gut isoliert
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  35
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  kfW 55
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}></div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  45
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  kfW 70
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}>
                  Größtenteils sehr gut isoliert
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  55
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  kfW 85
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}></div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  65
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  kfW 100
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}></div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  95
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}>
                  Teilweise isoliert
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  120
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}></div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "28%" }}>
                  150
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}>
                  Schlecht bis gar nicht isoliert
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Berechnungsgrundlage 2 */}
        {this.state.boxType === "calculation-2" && (
          <div>
            <div class="infobox-row-container" style={{ marginTop: "4px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "50%" }}>
                  Heizverteilsystem
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "50%" }}>
                  Vorlauftemperatur
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "50%" }}>
                  Fußbodenheizung
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "50%" }}>
                  35 °C
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "50%" }}>
                  Heizkörper
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "50%" }}>
                  35/40 °C
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.6", width: "50%" }}>
                  Fußbodenheizung und Heizkörper
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "50%" }}>
                  55 °C
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.boxType === "calculation-5" && (
          <div>
            <div class="infobox-row-container" style={{ marginTop: "4px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "50%" }}>
                  Platzbedarf Dachfläche
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "50%" }}>
                  PV-Leistung
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  24m<sup>2</sup>
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  4 kWp
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  42m<sup>2</sup>
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  7 kWp
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  60m<sup>2</sup>
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  10 kWp
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  84m<sup>2</sup>
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  14 kWp
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>Der PV-Ertrag ergibt sich aus einer Beispielanlage am Standort Würzburg mit einem jährlichen Ertrag von 950 kWh pro kWp installierter Leistung. Es wird eine ideale Südausrichtung der Anlage angenommen.</div>
          </div>
        )}

        {this.state.boxType === "calculation-6" && (
          <div>
            <div class="infobox-row-container" style={{ marginTop: "4px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "50%" }}>
                  Kapazität in kWh
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "50%" }}>
                  Leistung in kW
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  6
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  3
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  9
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  4,5
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  12
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  6
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  15
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  7,5
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>Der Stromspeicher hat eine positive Auswirkung auf den Eigenverbrauch und die Autarkie.</div>
          </div>
        )}

        {/* Berechnungsgrundlage 3 */}
        {this.state.boxType === "calculation-7" && (
          <div>
            <div class="infobox-row-container" style={{ marginTop: "8px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "28%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "33%" }}>
                  Erdwärmepumpe
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "39%" }}>
                  Luft-Wasser-Wärmepumpe
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "2.9", width: "28%" }}>
                  Wärmequelle
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "33%" }}>
                  Erdwärme
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "39%" }}>
                  Umgebungsluft
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "1.6", width: "28%" }}>
                  Funktion
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  Erdkollektor oder Erdsonde
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", lineBreak: "anywhere", width: "39%" }}>
                  Ventilatoren/Luftfilter
                </div>
              </div>
              <div class="infobox-row" style={{ border: "none" }}>
                <div class="width-50 padding-left-10 Bosch-Medium" style={{ lineHeight: "1.6", width: "28%" }}>
                  Eigenschaften
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "33%" }}>
                  Hohe Effizienz
                </div>
                <div class="width-50" style={{ lineHeight: "1.6", width: "39%" }}>
                  Geringer Platzbedarf
                </div>
              </div>
              <div class="infobox-row" style={{ border: "none", marginTop: "12px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "28%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "33%" }}>
                  Geringer Platzbedarf bei Erdsonden
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "39%" }}>
                  Einfache Erschließung der Wärmequelle
                </div>
              </div>
              <div class="infobox-row" style={{ marginTop: "12px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "28%" }}></div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "33%" }}>
                  Geringe Leistungsschwankungen
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", lineBreak: "anywhere", width: "39%" }}>
                  Geringe Investitionskosten
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.boxType === "calculation-9" && (
          <div>
            <div class="infobox-row-container" style={{ marginTop: "4px" }}>
              <div class="infobox-row borderDark Bosch-Medium" style={{ paddingBottom: "3px" }}>
                <div class="width-50 padding-left-10" style={{ lineHeight: "1.5", width: "50%" }}>
                  PV-Anlage
                </div>
                <div class="width-50" style={{ lineHeight: "1.5", width: "50%" }}>
                  Stromspeicher
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  4kWp = ca. 9.200€
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  6kWh = ca. 4.800€
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  7kWp = ca. 15.400€
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  9kWh = ca. 6.930€
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  10kWp = ca. 20.000€
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  12kWh = ca. 8.400€
                </div>
              </div>
              <div class="infobox-row">
                <div class="width-50 padding-left-10" style={{ lineHeight: "2.9", width: "50%" }}>
                  14kWp = 23.800€
                </div>
                <div class="width-50" style={{ lineHeight: "2.9", width: "50%" }}>
                  15kWh = 9.000€
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>Die Mehrwertsteuer ist nicht mit inbegriffen.</div>
          </div>
        )}
      </Box>
    );

  }
}

export default withRouter(withTranslation()(InfoBoxCalculation));