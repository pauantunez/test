import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import InfoBox from "../../infoBox";
import BreakEven from "./breakEven";
import Cost from "./cost";
import OffGrid from "./offGrid";
import ElectricityUse from "./electricityUse";
import HouseholdUse from "./householdUse";
import InfoBoxResult from "../../infoBoxResult";
import InfoBoxCalculation from "../../infoBoxCalculation";

import "../../../../assets/fonts/BoschSans-Bold-normal";
import "../../../../assets/fonts/BoschSans-Regular-normal";
import "../../../../assets/fonts/BoschSans-Medium-normal";

import { ReactComponent as PDFIcon } from "../../../../assets/img/icons/pdf_small.svg";
import { ReactComponent as ContractIcon } from "../../../../assets/img/icons/contract.svg";
import { ReactComponent as HeatpumpSmallIcon } from "../../../../assets/img/icons/heatpump_small.svg";
import { ReactComponent as PhotovoltaicIcon } from "../../../../assets/img/icons/photovoltaic_small.svg";
import { ReactComponent as WallboxIcon } from "../../../../assets/img/icons/wallbox_small.svg";
import { ReactComponent as EnergyManagementIcon } from "../../../../assets/img/icons/energy_management_small.svg";
import { ReactComponent as MagnifyingGlassIcon } from "../../../../assets/img/icons/magnifying_glass_small.svg";
import { ReactComponent as WrenchIcon } from "../../../../assets/img/icons/wrench_small.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/img/icons/info_large.svg";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


import { Canvg } from "canvg";

import { ReactComponent as BoschLogo } from "../../../../assets/img/bosch.svg";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

import { withTranslation } from "react-i18next";

class Additional extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
      imprint: [],
      theme: props.theme,
    };
  }

  static contextType = AppContext;

  componentDidMount() { }

  inputPVOutput = (value) => {
    const { pvOutput, setPVOutput } = this.context;
    setPVOutput(parseInt(value));
  };

  convertPies = () => {
    const { offgrid1SVG, offgrid2SVG, electricityUse1SVG, electricityUse2SVG, householdUse1SVG, householdUse2SVG, offgrid1SVG_NoEMS_Hidden, offgrid2SVG_NoEMS_Hidden, offgrid1SVG_EMS_Hidden, offgrid2SVG_EMS_Hidden, household1SVG_EMS_Hidden, household2SVG_EMS_Hidden, household1SVG_NoEMS_Hidden, household2SVG_NoEMS_Hidden } = this.context;

    var xmlSerialize = new XMLSerializer();
    var svgString1 = xmlSerialize.serializeToString(offgrid1SVG_EMS_Hidden);
    var svgString2 = xmlSerialize.serializeToString(offgrid2SVG_EMS_Hidden);
    var svgString1_noEMS = xmlSerialize.serializeToString(offgrid1SVG_NoEMS_Hidden);
    var svgString2_noEMS = xmlSerialize.serializeToString(offgrid2SVG_NoEMS_Hidden);
    var svgString3 = xmlSerialize.serializeToString(electricityUse1SVG);
    var svgString4 = xmlSerialize.serializeToString(electricityUse2SVG);
    var svgString5 = xmlSerialize.serializeToString(household1SVG_EMS_Hidden);
    var svgString6 = xmlSerialize.serializeToString(household2SVG_EMS_Hidden);
    var svgString7 = xmlSerialize.serializeToString(household1SVG_NoEMS_Hidden);
    var svgString8 = xmlSerialize.serializeToString(household2SVG_NoEMS_Hidden);

    const canvas = document.getElementById("pie1");
    const ctx = canvas.getContext("2d");
    const v = Canvg.fromString(ctx, svgString1);

    const canvas_NoEMS = document.getElementById("pie1_NoEMS");
    const ctx_NoEMS = canvas_NoEMS.getContext("2d");
    const v_NoEMS = Canvg.fromString(ctx_NoEMS, svgString1_noEMS);

    const canvas2_NoEMS = document.getElementById("pie2_NoEMS");
    const ctx2_NoEMS = canvas2_NoEMS.getContext("2d");
    const v2_NoEMS = Canvg.fromString(ctx2_NoEMS, svgString2_noEMS);

    const canvas2 = document.getElementById("pie2");
    const ctx2 = canvas2.getContext("2d");
    const v2 = Canvg.fromString(ctx2, svgString2);

    const canvas3 = document.getElementById("pie3");
    const ctx3 = canvas3.getContext("2d");
    const v3 = Canvg.fromString(ctx3, svgString3);

    const canvas4 = document.getElementById("pie4");
    const ctx4 = canvas4.getContext("2d");
    const v4 = Canvg.fromString(ctx4, svgString4);

    const canvas5 = document.getElementById("pie5");
    const ctx5 = canvas5.getContext("2d");
    const v5 = Canvg.fromString(ctx5, svgString5);

    const canvas6 = document.getElementById("pie6");
    const ctx6 = canvas6.getContext("2d");
    const v6 = Canvg.fromString(ctx6, svgString6);

    const canvas7 = document.getElementById("pie7");
    const ctx7 = canvas7.getContext("2d");
    const v7 = Canvg.fromString(ctx7, svgString7);

    const canvas8 = document.getElementById("pie8");
    const ctx8 = canvas8.getContext("2d");
    const v8 = Canvg.fromString(ctx8, svgString8);

    console.log(svgString5);

    // Start SVG rendering with animations and mouse handling.
    v.start();
    v2.start();
    v3.start();
    v4.start();
    v5.start();
    v6.start();
    v_NoEMS.start();
    v2_NoEMS.start();
    v7.start();
    v8.start();
  };

  render() {
    const { t } = this.props;
    const { breakEvenBase64, setBreakEvenBase64, BuildingEnegeryStandard, setBuildingEnegeryStandard, kfwValue, insulationValue, setInsulationValue, setKfwValue, OilLNGValue, setOilLNGValue, TCO_thermal_EUR_a, disabledOilUsage, OilUsageLiters, LNGUsage, disabledLNGUsage, heatDistributionValue, energyUsagekWh, pvOutput, setBackdrop, backdrop } = this.context;

    //OffGrid
    // Mit
    var mitGridUsagePercentage = parseInt(sessionStorage.getItem("MIT_GridUsagePercentage"))
    var mitNoEMSPercentage = parseInt(sessionStorage.getItem("MIT_NoEMSPercentageOffGrid"))
    var mitPvUsagePercentage = parseInt(sessionStorage.getItem("MIT_PvUsagePercentage"))
    var autarkiegradWithEMS = mitNoEMSPercentage + mitPvUsagePercentage

    // Ohne
    var ohneGridUsagePercentage = parseInt(sessionStorage.getItem("OHNE_GridUsagePercentage"))
    var ohnePvUsagePercentage = parseInt(sessionStorage.getItem("OHNE_PvUsagePercentage"))


    //household-use
    // Mit
    var MIT_GridFeedPercentage = parseInt(sessionStorage.getItem("MIT_GridFeedPercentage"))
    var MIT_HouseholdUsagePercentage = parseInt(sessionStorage.getItem("MIT_HouseholdUsagePercentage"))
    var MIT_HouseholdNoEMSpvPercent = parseInt(sessionStorage.getItem("MIT_HouseholdNoEMSpvPercent"))
    var eigenverbrauchsanteil = MIT_HouseholdUsagePercentage + MIT_HouseholdNoEMSpvPercent

    // Ohne 
    var Onhe_HouseholdNoEMSpvPercent = parseInt(sessionStorage.getItem("Onhe_HouseholdNoEMSpvPercent"))
    var Onhe_GridFeedPercentageNoEMS = parseInt(sessionStorage.getItem("Onhe_GridFeedPercentageNoEMS"))


    const addFooters = (doc) => {
      const pageCount = doc.internal.getNumberOfPages();

      doc.setFontSize(10);

      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("BoschSans-Medium", "normal");
        doc.setFontSize(10);
        doc.text("© Bosch Thermotechnik GmbH 2023", 15.5, doc.internal.pageSize.getHeight() - 7);
      }
    };

    const printPDF = () => {
      this.convertPies();

      setBackdrop(true);

      const pdf = new jsPDF("p", "mm", "a4");

      const divToDisplay = document.getElementById("printPdf");
      const divToDisplay2 = document.getElementById("printPdf2");
      const divToDisplay3 = document.getElementById("printPdf3");
      const divToDisplay4 = document.getElementById("printPdf4");
      const divToDisplay5 = document.getElementById("printPdf5");
      const divToDisplay6 = document.getElementById("printPdf6");

      html2canvas(divToDisplay, {
        useCORS: true,
        allowTaint: false,
        onclone: function (clonedDoc) {
          clonedDoc.getElementById("printPdf").style.display = "block";
        },
      }).then(function (canvas) {
        const divImage = canvas.toDataURL("image/jpeg", 1.0);

        const imgProps = pdf.getImageProperties(divImage);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        console.log("INTERAL WIDTH");
        console.log(pdfWidth);
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imageAsBlob = canvas.toBlob(
          (blob) => {
            /* … */
          },
          "image/jpeg",
          0.95
        );

        pdf.addImage(divImage, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
        pdf.setFont("BoschSans-Bold", "normal");
        pdf.setFontSize(12);
        pdf.addPage("a4", "portrait");

        html2canvas(divToDisplay2, {
          useCORS: true,
          allowTaint: false,
          onclone: function (clonedDoc2) {
            clonedDoc2.getElementById("printPdf2").style.display = "block";
          },
        }).then(function (canvas2) {
          const divImage2 = canvas2.toDataURL("image/jpeg", 1.0);
          console.log(divImage2);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          pdf.addImage(divImage2, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
          pdf.addPage("a4", "portrait");

          html2canvas(divToDisplay3, {
            useCORS: true,
            allowTaint: false,
            onclone: function (clonedDoc3) {
              clonedDoc3.getElementById("printPdf3").style.display = "block";
            },
          }).then(function (canvas3) {
            const divImage3 = canvas3.toDataURL("image/jpeg", 1.0);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(divImage3, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
            pdf.addPage("a4", "portrait");

            html2canvas(divToDisplay4, {
              useCORS: true,
              allowTaint: true,
              onclone: function (clonedDoc4) {
                clonedDoc4.getElementById("printPdf4").style.display = "block";
              },
            }).then(function (canvas4) {
              const divImage4 = canvas4.toDataURL("image/jpeg", 1.0);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();

              pdf.addImage(divImage4, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
              pdf.addPage("a4", "portrait");

              html2canvas(divToDisplay5, {
                useCORS: true,
                allowTaint: false,
                onclone: function (clonedDoc5) {
                  clonedDoc5.getElementById("printPdf5").style.display = "block";
                },
              }).then(function (canvas5) {
                const divImage5 = canvas5.toDataURL("image/jpeg", 1.0);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                pdf.addImage(divImage5, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
                pdf.addPage("a4", "portrait");

                html2canvas(divToDisplay6, {
                  useCORS: true,
                  allowTaint: false,
                  onclone: function (clonedDoc6) {
                    clonedDoc6.getElementById("printPdf6").style.display = "block";
                  },
                }).then(function (canvas6) {
                  const divImage6 = canvas6.toDataURL("image/jpeg", 1.0);
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = pdf.internal.pageSize.getHeight();

                  pdf.addImage(divImage6, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");

                  addFooters(pdf);
                  pdf.save("download.pdf");

                  setBackdrop(false);
                });
              });
            });
          });
        });
      });
    };

    return (
      <div>
        <div class="cardContainer" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "Bosch-Regular" }}>
          <div>
            <div class="cardContent" style={{ marginBottom: "40px" }}>
              <div class="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between" }}>
                <div style={{ paddingRight: "45px", paddingBottom: "10px" }}>
                  <h3>Ergebnisse speichern</h3>
                  <div>Sichern Sie sich Ihre Ergebnisse, indem Sie diese als PDF jetzt herunterladen</div>
                </div>
                <div class="trackeable" data-event="result-part3-save-pdf" style={{ display: "flex", alignItems: "end" }}>
                  <Button onClick={printPDF} variant="outlined" startIcon={<PDFIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: "Bosch-Regular" }}>
                    Ergebnisse herunterladen
                  </Button>
                </div>
              </div>
            </div>
            <div class="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
              <div class="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                  <h3>Kontakt zum Fachbetrieb</h3>
                  <div>Finden Sie einen Experten in Ihrer Nähe, der Sie bei der Umsetzung unterstützt</div>
                </div>
                <div class="trackeable" data-event="result-part3-contact" style={{ display: "flex", alignItems: "end" }}>
                  <Button variant="outlined" startIcon={<MagnifyingGlassIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: "Bosch-Regular" }}>
                    Jetzt Fachbetrieb finden
                  </Button>
                </div>
              </div>
            </div>
            <div class="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
              <div class="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                  <h3>Angebot für ein energieeffizientes System</h3>
                  <div>Erhalten Sie ein kostenloses, unverbindliches Angebot von einem Installateur in Ihrer</div>
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <a href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/beratung-und-kauf/angebot-anfordern/" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                    <Button variant="outlined" startIcon={<ContractIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: "Bosch-Regular" }}>
                      Angebot anfordern
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div class="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
              <div class="flexContent" style={{ flexDirection: "column", justifyContent: "center", marginTop: "8px", width: "100%" }}>
                <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                  <h3>Wie komme ich zu einem energieeffizienten System?</h3>
                  <div style={{ fontFamily: "Bosch-Bold" }}>Informationen zu unseren Produkten</div>
                </div>
                <div class="additional-links-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignContent: "space-between" }}>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                      <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/waermepumpen-854510-c/" target="_blank" class="panel panel-default card-input-narrow">
                        <div class="panel-heading-narrow">
                          <HeatpumpSmallIcon />
                        </div>
                        <div class="panel-body trackeable" data-event="result-part3-heatpump">Wärmepumpe</div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="OilLNG" class="card-input-element" />
                      <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/solarthermieanlagen-854604-c/" target="_blank" class="panel panel-default card-input-narrow">
                        <div class="panel-heading-narrow">
                          <PhotovoltaicIcon />
                        </div>
                        <div class="panel-body trackeable" data-event="result-part3-pv">PV-Anlage</div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" />
                      <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/power-charge-7000i-19378337-p/" target="_blank" class="panel panel-default card-input-narrow">
                        <div class="panel-heading-narrow">
                          <WallboxIcon />
                        </div>
                        <div class="panel-body trackeable" data-event="result-part3-wallbox">Wallbox</div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingInsulation" class="card-input-element" />
                      <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/energiemanagement-19317456-c/" target="_blank" class="panel panel-default card-input-narrow">
                        <div class="panel-heading-narrow">
                          <EnergyManagementIcon />
                        </div>
                        <div class="panel-body trackeable" data-event="result-part3-energie-management">
                          Energiemanage-
                          <br />
                          mentsystem
                        </div>
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="printPdf" style={{ position: "absolute", left: "0px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ position: "absolute", left: "60px", top: "10px" }}>
            <BoschLogo style={{ maxWidth: "200px" }} />
          </div>
          <div style={{ position: "absolute", left: "60px", top: "110px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ position: "absolute", left: "60px", top: "133px" }}>
            <h1 style={{ marginBlockStart: "4px", marginBlockEnd: "5px" }}>Sparen Sie Stromkosten</h1>
            <div style={{ fontSize: "14px" }}>mit der smarten Kombination aus Photovoltaik, Wärmepumpe, Wallbox und einem intelligenten Energiemanagementsystem.</div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "207px" }}>
            <h3>Ergebnis Teil 1: Stromkosten und Amortisationszeit Ihrer PV-Anlage</h3>
          </div>

          <div style={{ position: "absolute", left: "60px", top: "270px" }}>
            <div style={{ position: "absolute", left: "0px", width: "405px", transform: "scale(0.75)", transformOrigin: "top left" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Gesamtkosten Strom</h3>
              {/* Gráfico barras 1 año */}
              <Cost displayed="single" />
            </div>
            <div style={{ position: "absolute", left: "365px", width: "405px", transform: "scale(0.75)", transformOrigin: "top left" }}>
              <h3 style={{ marginTop: "0px", marginBlockStart: "4px", marginBlockEnd: "8px", height: "18px" }}></h3>
              {/* Gráfico barras 20 años */}
              <Cost displayed="multi" />
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "605px", width: "865px", transform: "scale(0.80)", transformOrigin: "top left" }}>
            <InfoBoxResult box="left" />
          </div>
          <div style={{ position: "absolute", left: "60px", top: "765px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ position: "absolute", left: "60px", top: "795px", transform: "scale(0.85)", transformOrigin: "top left" }}>
            <h3 style={{ marginTop: "0px", marginBlockStart: "0" }}>Amortisationszeit</h3>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "815px" }}>
              <div style={{ width: "60%" }}>
                <span style={{ display: "block", marginBottom: "15px" }}>
                  Investitionskosten PV-System: <strong>{sessionStorage.getItem("InvestmentCostEUR").toLocaleString("DE-de")} €</strong>
                </span>
                <img src={breakEvenBase64} style={{ width: "440px" }} />
              </div>
              <div style={{ width: "40%" }}>
                <InfoBoxResult box="right" />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>

        <div id="printPdf2" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ postion: "relative", height: "10px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginLeft: "60px" }}>
              <BoschLogo style={{ maxWidth: "200px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
            <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "60px", maxWidth: "815px" }}>
            <h3>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "60px", maxWidth: "815px" }}>
            <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Stromverbrauch</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
            <div style={{ position: "relative", width: "730px", height: "253px" }}>
              <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie3" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie4" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <InfoBoxResult box="electricity-use" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
              <hr style={{ width: "675px", height: "1px", marginTop: "0px", background: "#999", border: "none", marginInlineStart: "0em" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "4px", fontSize: "14px" }}>Autarkie</h3>
              <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Mit Energiemanagementsystem</h3>
            </div>
            <div style={{ position: "relative", width: "730px", height: "283px" }}>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie1" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie2" width="375" height="273" />
              </div>
              {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <InfoBoxResult box="off-grid" />
              </div> */}
              <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <Box>
                  <div class="infobox-container">
                    <div class="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "13px", borderBottom: "none" }}>
                      <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {autarkiegradWithEMS}%</h3>
                      <p>
                        Das bedeutet: bis zu <strong>{autarkiegradWithEMS}%</strong> Ihres Gesamtstromverbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                      </p>
                      <p>
                        <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>{mitNoEMSPercentage}%</strong>.{" "}
                      </p>
                      <p>
                      Ca.&nbsp;
                      <strong>{mitGridUsagePercentage}%</strong>
                      &nbsp;Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                      </p>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Ohne Energiemanagementsystem</h3>
            </div>
            <div style={{ position: "relative", width: "730px", height: "283px" }}>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie1_NoEMS" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie2_NoEMS" width="375" height="273" />
              </div>
              {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <InfoBoxResult box="off-grid" />
              </div> */}
              <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
              <Box>
                <div class="infobox-container">
                  <div class="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "13px", borderBottom: "none" }}>
                    <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {ohnePvUsagePercentage}%</h3>
                    <p>
                      Das bedeutet: bis zu <strong>{ohnePvUsagePercentage}%</strong> Ihres Gesamtstromverbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                    </p>
                    <p>
                      <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Autarkiegrad</strong> auf bis zu <strong>{autarkiegradWithEMS}%</strong> erhöhen.{" "}
                    </p>
                    <p>
                      Ca.&nbsp;
                      <strong>{ohneGridUsagePercentage}%</strong>
                      &nbsp;Ihres Gesamtstromverbrauchs beziehen Sie durch das <strong>öffentliche Stromnetz.</strong>
                    </p>
                  </div>
                </div>
              </Box>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>

        <div id="printPdf3" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ postion: "relative", height: "10px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginLeft: "60px" }}>
              <BoschLogo style={{ maxWidth: "200px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "815px" }}>
            <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "60px", maxWidth: "815px" }}>
            <h3>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "60px", maxWidth: "815px" }}>
            <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Eigenverbrauch</h3>
            <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Mit Energiemanagementsystem</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
            <div style={{ position: "relative", width: "730px", height: "273px" }}>
              <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie5" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie6" width="375" height="273" />
              </div>
              {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <InfoBoxResult box="household-use" />
              </div> */}
              <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <Box>
                  <div class="infobox-container">
                    <div class="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "13px", borderBottom: "none" }}>
                      <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {eigenverbrauchsanteil}%</h3>
                      <p>
                        Das bedeutet: bis zu <strong>{Math.round(parseFloat(eigenverbrauchsanteil).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                      </p>
                      <p>
                        <strong>Ohne ein Energiemanagementsystem</strong> beträgt der <strong>Eigenverbrauchsanteil</strong> lediglich ca. <strong>{MIT_HouseholdNoEMSpvPercent}%</strong>.{" "}
                      </p>
                      <p>
                        Ca.&nbsp;
                        <strong>{MIT_GridFeedPercentage}%</strong>
                        &nbsp;Ihres eigens produzierten PV-Stroms speisen Sie ins <strong>öffentliche Stromnetz</strong> ein.
                      </p>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Ohne Energiemanagementsystem</h3>
            </div>
            <div style={{ position: "relative", width: "730px", height: "273px" }}>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie7" width="375" height="273" />
              </div>
              <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <canvas id="pie8" width="375" height="273" />
              </div>
              {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <InfoBoxResult box="household-use" />
              </div> */}
              <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                <Box>
                  <div class="infobox-container">
                    <div class="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "13px", borderBottom: "none" }}>
                      <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {Onhe_HouseholdNoEMSpvPercent}%</h3>
                      <p>
                        Das bedeutet: bis zu <strong>{Math.round(parseFloat(Onhe_HouseholdNoEMSpvPercent).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                      </p>
                      <p>
                        <strong>Mit einem Energiemanagementsystem</strong> lässt sich der <strong>Eigenverbrauchsanteil</strong> auf bis zu <strong>{eigenverbrauchsanteil}%</strong> erhöhen.{" "}
                      </p>
                      <p>
                        Ca.&nbsp;
                        <strong>{Onhe_GridFeedPercentageNoEMS}%</strong>
                        &nbsp;Ihres eigens produzierten PV-Stroms speisen Sie ins <strong>öffentliche Stromnetz</strong> ein.
                      </p>
                    </div>
                    </div>
                </Box>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "700px" }}>
              <hr style={{ width: "690px", height: "1px", marginTop: "0px", background: "#999", border: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3>Weitere Informationen</h3>
              <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Um weitere Informationen zu erhalten, scannen sie den jeweiligen QR-Code.</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", textAlign: "center", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "680px" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%", borderRight: "1px solid #999" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ width: "120px !important", height: "110px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "15px" }}>
                      <PhotovoltaicIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Solarstromrechner
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "15px", marginRight: "60px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%", display: "flex", flexDirection: "row" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ width: "120px !important", height: "110px", marginLeft: "60px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "20px" }}>
                      <WrenchIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Kontakte zum
                      <br />
                      Fachbetrieb
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "15px", marginRight: "0px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>

        <div id="printPdf4" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ postion: "relative", height: "10px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginLeft: "60px" }}>
              <BoschLogo style={{ maxWidth: "200px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "815px" }}>
            <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3>Wie komme ich zu einem energieeffizienten System?</h3>
              <h3 style={{ fontFamily: "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Informationen zu unseren Produkten finden Sie unter den jeweiligen QR-Codes:</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", textAlign: "center", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "690px" }}>
              <div style={{ width: "25%", borderRight: "1px solid #999" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ marginLeft: "23px", width: "120px !important", height: "110px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "20px" }}>
                      <HeatpumpSmallIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Solarstromrechner
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "20px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
              <div style={{ width: "25%", borderRight: "1px solid #999" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ marginLeft: "23px", width: "120px !important", height: "110px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "20px" }}>
                      <PhotovoltaicIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Hintergrundinfos/
                      <br />
                      Definitionen
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "20px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
              <div style={{ width: "25%", borderRight: "1px solid #999" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ marginLeft: "23px", width: "120px !important", height: "110px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "20px" }}>
                      <WallboxIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Berechnungs-
                      <br />
                      grundlage
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "20px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
              <div style={{ width: "25%" }}>
                <label>
                  <input type="radio" name="heating" value="BuildingEnergyStandard" class="card-input-element" />
                  <div class="panel panel-default card-input-narrow card-pdf-width" style={{ marginLeft: "23px", width: "120px !important", height: "110px" }}>
                    <div class="panel-heading-narrow" style={{ marginTop: "20px" }}>
                      <EnergyManagementIcon />
                    </div>
                    <div class="panel-body" style={{ fontSize: "10px" }}>
                      Kontakte zum
                      <br />
                      Fachbetrieb
                    </div>
                  </div>
                </label>
                <div style={{ marginTop: "20px" }}>
                  <img src={require(`../../../../assets/img/qrCode.png`)} style={{ width: "90px" }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>

        <div id="printPdf5" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ postion: "relative", height: "10px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginLeft: "60px" }}>
              <BoschLogo style={{ maxWidth: "200px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "815px" }}>
            <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "15px", paddingLeft: "0px", maxWidth: "815px" }}>
              <h3>Berechnungsgrundlage</h3>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
              <div class="modal-content-width" style={{ position: "relative", width: "680px" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "0px", marginBottom: "20px", textAlign: "left" }}>
                  <div style={{ marginRight: "10px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                    <InfoIcon />
                  </div>
                  <h3 class="pdf-h3">
                    <b>Bitte beachten Sie:</b> Die Ergebnisse des Tools basieren auf historischen Werten, simulierten Daten und darauf aufbauenden Optimierungen und können daher von tatsächlichen Verbräuchen und Erträgen abweichen. Die Daten werden regelmäßig kontrolliert und aktualisiert. Das Tool ersetzt nicht die exakte Planung durch einen/r von Ihnen beauftragten Planungsexperten/-expertin.
                  </h3>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Grundlage für die angezeigten Verbrauchs-, Ertrags- und Amortisationsabschätzungen sind folgende Annahmen:</h3>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <div style={{ width: "50%", transform: "scale(0.80)", transformOrigin: "top left" }}>
                <div>
                  <InfoBoxCalculation box="calculation-1" />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <InfoBoxCalculation box="calculation-2" />
                </div>
              </div>
              <div style={{ width: "50%", transform: "scale(0.80)", transformOrigin: "top left" }}>
                <div>
                  <InfoBoxCalculation box="calculation-5" />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <InfoBoxCalculation box="calculation-3" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>

        <div id="printPdf6" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
          <div style={{ postion: "relative", height: "10px" }}>
            <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginLeft: "60px" }}>
              <BoschLogo style={{ maxWidth: "200px" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "815px" }}>
            <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
            <div style={{ marginBottom: "15px" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Grundlage für die angezeigten Verbrauchs-, Ertrags- und Amortisationsabschätzungen sind folgende Annahmen:</h3>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <div style={{ width: "50%", transform: "scale(0.80)", transformOrigin: "top left" }}>
                <div>
                  <InfoBoxCalculation box="calculation-4" />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <InfoBoxCalculation box="calculation-6" />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <InfoBoxCalculation box="calculation-8" />
                </div>
              </div>
              <div style={{ width: "50%", transform: "scale(0.80)", transformOrigin: "top left" }}>
                <div>
                  <InfoBoxCalculation box="calculation-7" />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <InfoBoxCalculation box="calculation-9" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
            <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Additional));
