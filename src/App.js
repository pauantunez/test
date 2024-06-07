import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import Welcome from "./components/welcome";
import { SimulatorProvider } from "./AppContext";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Suspense fallback="loading">
          <section id="section-4255078" className="Section Section-space MediaTextModule1 -secondary">
            <div className="container" id="anchor-82516895">
              <div className="Intro Columns">
                <div className="Intro_inner Column">
                  <h3 className="Hl Hl-6">Intelligentes Energiemanagement für maximale Effizienz</h3>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="Columns">
                <div className="Column Columns-1-2">
                  <div className="MediaTextModule1_inner">
                    <p>
                      Es lohnt sich, ein smartes Energiemanagementsystem im Haus zu ergänzen. Dadurch profitieren Sie von einer zusätzlichen <b>Kostenersparnis</b>, da der
                      <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/heizungsratgeber/waermepumpe/stromverbrauch-waermepumpe/" title="Stromverbrauch" target="_self" aria-label="Stromverbrauch">
                        <span className="Link_label">Stromverbrauch</span>
                      </a>
                      in einem vernetzten Haushalt optimiert wird. Zudem erhöht es den Anteil am Gesamtstromverbrauch durch die eigene PV-Anlage und den Eigenverbrauchsanteil des PV-Stroms.
                    </p>
                    <div className="Image" style={{ "--aspect-ratio": "16/9" }}>
                      <picture>
                        <source type="image/webp" srcSet="https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_600x338.webp 600w, https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_900x507.webp 900w, https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_1200x675.webp 1200w" />
                        <source srcSet="https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_600x338original.png 600w, https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_900x507original.png 900w, https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_1200x675original.png 1200w" />
                        <img className="ls-is-cached lazyloaded" src="https://www.bosch-homecomfort.com/de/media/country_pool/bilder/seo-texte/uebersicht_energiemanager_1200x675original.png" alt="Person hält Mobiltelefon in der Hand mit der Energiemanager-App darauf." title="Person hält Mobiltelefon in der Hand mit der Energiemanager-App darauf." role="none" />
                      </picture>
                    </div>
                  </div>
                </div>
                <div className="Column Columns-1-2">
                  <div className="MediaTextModule1_inner">
                    <p>
                      Das Energiemanagement hat die zentrale Aufgabe, den PV-Überschuss des Solarstroms effizient zu steuern. Es ist sozusagen das Gehirn, das alle <b>Energieströme</b> im energieautarken Haus managt und die Geräte gezielt ansteuert. Solche innovativen Technologien passen sich den individuellen Bedürfnissen an und sorgen dafür, dass die Energie genau dann genutzt wird, wenn sie benötigt wird. Eine entscheidende Rolle dabei spielen <b>Regler</b> zur präzisen Steuerung.
                    </p>
                    <p>
                      Der smarte
                      <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/heizungssteuerung/der-energiemanager/" title="Energiemanager von Bosch" target="_self" aria-label="Energiemanager von Bosch">
                        <span className="Link_label">Energiemanager von Bosch</span>
                      </a>
                      verteilt den selbst produzierten Strom aus der PV-Anlage intelligent in Ihrem <b>Smart Home</b> an die verschiedenen Verbrauchsstellen und steuert Ihre Heizungsanlage leistungsgeregelt. Das System stimmt die Betriebszeiten der Wärmepumpe mit den Spitzenzeiten der PV-Produktion ab, um eine optimale Ausnutzung des Photovoltaikstroms zu gewährleisten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="App">
            <div id="top"></div> {/* Elemento ancla */}
            <SimulatorProvider>
              <Route exact path="/" render={(props) => <Redirect to="/deDE/welcome" />} />

              <Route exact path="/:lang/main" component={Main} />

              <Route exact path="/:lang/welcome" component={Welcome} />
            </SimulatorProvider>
          </div>
          <section id="section-4255084" className="Section Section-space MediaTextModule1 -secondary">
            <div className="container" id="anchor--1683929657">
              <div className="Intro Intro-single Columns">
                <div className="Intro_inner Column">
                  <h2 className="Hl Hl-3">Welche Kosten entstehen und ist Förderung möglich?</h2>
                  <p>
                    <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/heizungsratgeber/waermepumpe/waermepumpe-kosten/" title="Wärmepumpen kosten" target="_self" aria-label="Wärmepumpen kosten">
                      <span className="Link_label">Wärmepumpen kosten</span>
                    </a>
                    in der Anschaffung etwa 10.000 bis 15.000 Euro zuzüglich der Installationskosten. Sie erhalten eine hohe staatliche
                    <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/heizungsratgeber/waermepumpe/foerderung-waermepumpe/" title="Förderung für eine Wärmepumpe" target="_self" aria-label="Förderung für eine Wärmepumpe">
                      <span className="Link_label">Förderung für eine Wärmepumpe</span>
                    </a>
                    von mindestens 30 Prozent der Kosten. Die Höhe der Fördersumme hängt von der Art der Wärmepumpe ab und welche vorhandene Heizung Sie ersetzen. Informieren Sie sich, was Sie beim
                    <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/heizungsratgeber/waermepumpe/waermepumpe-nachruesten/" title="Nachrüsten einer Wärmepumpe" target="_self" aria-label="Nachrüsten einer Wärmepumpe">
                      <span className="Link_label">Nachrüsten einer Wärmepumpe</span>
                    </a>
                    beachten müssen.
                  </p>
                  <p>
                    Die Investitionskosten für Photovoltaik richten sich primär nach der Leistung und Größe der Anlage und variieren stark je nach Region und Hersteller. Rechnen Sie im Schnitt mit Kosten von circa <b>10.000 Euro für eine Solaranlage</b>. Hinzu kommen die Kosten für den Stromspeicher. Es besteht die Möglichkeit, die Kombination aus Photovoltaikanlage, Solarstromspeicher und Wallbox durch die KfW fördern zu lassen. Die
                    <a className="Link Link-simple" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/ratgeber-e-mobilitaet/wallbox/wallbox-kosten/" title="Kosten einer Wallbox" target="_self" aria-label="Kosten einer Wallbox">
                      <span className="Link_label">Kosten einer Wallbox</span>
                    </a>
                    starten bei etwa 500 Euro zuzüglich der Installation. Rechnen Sie zusätzlich für das Energiemanagement mit einmaligen Kosten von ungefähr 400 Euro. Diese amortisieren sich in der Regel schnell.
                  </p>
                  <p>
                    Für den Verbrauch gilt: Je mehr Sie von Ihrem Wärmebedarf über die PV-Wärmepumpe decken können, desto günstiger werden die Gesamtwärmekosten. Über die <b>Einspeisevergütung</b> mit einer Solaranlage von etwa 8 Cent pro kWh im Durchschnitt ist es möglich, Ihre Nebenkosten im Haus zu einem großen Teil abzudecken.
                  </p>
                  <p>
                    <a className="Link Link-primary" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/beratung-und-kauf/angebot-anfordern/waermepumpe/#section-3180631" title="Jetzt unverbindlich anfragen!" target="_self" aria-label="Jetzt unverbindlich anfragen!">
                      <span className="Link_label">Jetzt unverbindlich anfragen!</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Suspense>
      </Router>
    );
  }
}

export default App;
