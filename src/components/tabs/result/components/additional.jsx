import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../../AppContext";
import CostPdf from "./costPdf";
import InfoBoxResult from "../../infoBoxResult";
import InfoBoxResultPdf from "../../infoBoxResultPdf";
import InfoBoxCalculation from "../../infoBoxCalculation";
import { styled } from "@mui/material/styles";

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

import { ReactComponent as BuderusPDFIcon } from "../../../../assets/img/icons/buderus/pdf_small.svg";
import { ReactComponent as BuderusContractIcon } from "../../../../assets/img/icons/buderus/contract.svg";
import { ReactComponent as BuderusHeatpumpSmallIcon } from "../../../../assets/img/icons/buderus/heatpump_small.svg";
import { ReactComponent as BuderusPhotovoltaicIcon } from "../../../../assets/img/icons/buderus/photovoltaic_small.svg";
import { ReactComponent as BuderusWallboxIcon } from "../../../../assets/img/icons/buderus/wallbox_small.svg";
import { ReactComponent as BuderusEnergyManagementIcon } from "../../../../assets/img/icons/buderus/energy_management_small.svg";
import { ReactComponent as BuderusWrenchIcon } from "../../../../assets/img/icons/buderus/wrench_small.svg";
import { ReactComponent as BuderusInfoIcon } from "../../../../assets/img/icons/buderus/info_large.svg";
import { ReactComponent as BuderusLinkIcon } from "../../../../assets/img/icons/buderus/arrow_fwd_large.svg";
/* import { ReactComponent as BuderusLinkIconPdf } from "../../../../assets/img/icons/buderus/arrow_fwd_large.png"; */

import "rc-slider/assets/index.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Canvg } from "canvg";

import { ReactComponent as BoschLogo } from "../../../../assets/img/bosch.svg";

import { ReactComponent as BuderusLogo } from "../../../../assets/img/buderus/buderus.svg";

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

  componentDidMount() {
    this.convertPies();
    const { sendGAEvent } = this.context;
    sendGAEvent('sc-result3', null, window.location.href);
  }

  inputPVOutput = (value) => {
    const { setPVOutput } = this.context;
    setPVOutput(parseInt(value));
  };

  convertPies = () => {
    const { electricityUse1SVG, electricityUse2SVG, offgrid1SVG_NoEMS_Hidden, offgrid2SVG_NoEMS_Hidden, offgrid1SVG_EMS_Hidden, offgrid2SVG_EMS_Hidden, household1SVG_EMS_Hidden, household2SVG_EMS_Hidden, household1SVG_NoEMS_Hidden, household2SVG_NoEMS_Hidden } = this.context;

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

  adjustPercentage(value1, value2, value3 = 0) {
    const total = value1 + value2 + value3;

    if (total > 100) {
      return value1 - 1;
    } else if (total < 100) {
      return value1 + 1;
    } else {
      return value1;
    }
  }

  render() {
    const { breakEvenNoEms, breakEvenBase64, setBackdrop, gridUsagePercentage, pvUsagePercentageNoEms, gridUsagePercentageNoEms, gridFeedPercentage, houseHoldPvPercentage, houseHoldPvPercentageNoEms, gridFeedPercentageNoEms } = this.context;

    /*  text-transform: none;
  background: none;
  border: none;
  border-radius: 0px;
  fontFamily: 'HelveticaNeue-Roman';
  border-bottom: 1px solid rgb(0, 0, 0);
  color: rgb(0, 0, 0);
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 12px;
  cursor: pointer;
  text-align: left;
  padding-left: 0px;
  line-height: 110%;
  padding-bottom: 1px;*/

    const BuderusContactButton = styled(Button)({
      // Basic styles
      textTransform: "none",
      backgroundColor: "none",
      border: "none",
      borderRadius: "0px",
      fontFamily: "HelveticaNeue-Roman",
      borderBottom: "1px solid rgb(0, 0, 0)",
      color: "rgb(0, 0, 0)",
      WebkitAppearance: "none",
      MozAppearance: "none",
      fontSize: "12px",
      cursor: "pointer",
      textAlign: "left",
      paddingLeft: "0px",
      lineHeight: "110%",
      paddingBottom: "1px",

      // Hover state
      "&:hover": {
        border: "0px",
        borderBottom: "1px solid rgb(0, 0, 0)",
        background: "none",
      },

      // Focus state
      "&:focus": {
        outline: "1px solid #fff",
        outlineOffset: "-4px",
      },

      // Styles for child SVG within the button
      "& svg": {
        width: "12px",
      },

      // Styles for child span within the button
      "& span": {
        display: "block",
        marginRight: "-4px",
        marginLeft: "9px",
        marginTop: "6px",
        float: "right",
      },
    });

    //OffGrid
    // Mit
    var mitGridUsagePercentage = Math.round(gridUsagePercentage);
    var autarkiegradWithEMS = Math.round(pvUsagePercentageNoEms) + Math.round(gridUsagePercentageNoEms - gridUsagePercentage);

    // Ohne
    var ohneGridUsagePercentage = Math.round(gridUsagePercentageNoEms);
    var ohnePvUsagePercentage = Math.round(pvUsagePercentageNoEms);

    //household-use
    // Mit
    var MIT_GridFeedPercentage = Math.round(gridFeedPercentage);
    var eigenverbrauchsanteil = Math.round(parseFloat(houseHoldPvPercentageNoEms)) + Math.round(parseFloat(houseHoldPvPercentage - houseHoldPvPercentageNoEms));
    MIT_GridFeedPercentage = this.adjustPercentage(MIT_GridFeedPercentage, Math.round(houseHoldPvPercentageNoEms), Math.round(houseHoldPvPercentage - houseHoldPvPercentageNoEms));

    // Ohne
    var Onhe_HouseholdNoEMSpvPercent = Math.round(parseFloat(houseHoldPvPercentageNoEms));
    var Onhe_GridFeedPercentageNoEMS = Math.round(gridFeedPercentageNoEms);

    const addFooters = (doc) => {
      const pageCount = doc.internal.getNumberOfPages();
      let year = new Date().getFullYear();

      doc.setFontSize(10);

      var i;

      if (this.context.selectedTheme === "buderus") {
        i = 2;
      } else {
        i = 1;
      }

      for (i; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("BoschSans-Medium", "normal");
        doc.setFontSize(10);
        doc.text("© Bosch Thermotechnik GmbH " + year, 15.5, doc.internal.pageSize.getHeight() - 7);
      }
    };

    const printPDF = () => {
      this.convertPies();
      setBackdrop(true);
      const pdf = new jsPDF("p", "mm", "a4");

      if (this.context.selectedTheme === "buderus") {
        const printHomePdf = document.getElementById("printHomePdf");
        html2canvas(printHomePdf, {
          useCORS: true,
          quality: 2,
          scale: 4,
          allowTaint: false,
          onclone: function (clonedDoc) {
            clonedDoc.getElementById("printHomePdf").style.display = "block";
          },
        }).then(function (canvas) {
          const divImage = canvas.toDataURL("image/jpeg", 1.0);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          pdf.addImage(divImage, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
          pdf.addPage("a4", "portrait");
          continueAddingPages(pdf);
        });
      } else {
        continueAddingPages(pdf);
      }
    };

    const continueAddingPages = (pdf) => {
      const divToDisplay = document.getElementById("printPdf");
      const divToDisplay2 = document.getElementById("printPdf2");
      const divToDisplay3 = document.getElementById("printPdf3");
      const divToDisplay4 = document.getElementById("printPdf4");
      const divToDisplay5 = document.getElementById("printPdf5");
      const divToDisplay6 = document.getElementById("printPdf6");

      html2canvas(divToDisplay, {
        useCORS: true,
        quality: 2,
        scale: 4,
        allowTaint: false,
        onclone: function (clonedDoc) {
          clonedDoc.getElementById("printPdf").style.display = "block";
        },
      }).then(function (canvas) {
        const divImage = canvas.toDataURL("image/jpeg", 1.0);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(divImage, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
        pdf.addPage("a4", "portrait");

        html2canvas(divToDisplay2, {
          useCORS: true,
          allowTaint: false,
          quality: 2,
          scale: 4,
          onclone: function (clonedDoc2) {
            clonedDoc2.getElementById("printPdf2").style.display = "block";
          },
        }).then(function (canvas2) {
          const divImage2 = canvas2.toDataURL("image/jpeg", 1.0);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          pdf.addImage(divImage2, "JPG", 0, 0, pdfWidth, pdfHeight, null, "NONE");
          pdf.addPage("a4", "portrait");

          html2canvas(divToDisplay3, {
            useCORS: true,
            allowTaint: false,
            quality: 2,
            scale: 4,
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
              quality: 2,
              scale: 4,
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
                quality: 2,
                scale: 4,
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
                  quality: 2,
                  scale: 4,
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
        <div className="cardContainer last-step" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular" }}>
          <div>
            <div className="cardContent" style={{ marginBottom: "40px" }}>
              <div className="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between" }}>
                <div style={{ paddingRight: "45px", paddingBottom: "10px" }}>
                  <h3>Ergebnisse speichern</h3>
                  <div className="txt">Sichern Sie sich Ihre Ergebnisse, indem Sie diese als PDF jetzt herunterladen.</div>
                </div>
                <div className="trackeable" data-event="result-part3-save-pdf" style={{ display: "flex", alignItems: "end" }}>
                  <Button disableRipple onClick={printPDF} variant="outlined" startIcon={this.context.selectedTheme === "buderus" ? <BuderusPDFIcon /> : <PDFIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", border: this.context.selectedTheme === "buderus" ? "1px solid #000000" : "", color: this.context.selectedTheme === "buderus" ? "#000000" : "" }}>
                    Ergebnisse herunterladen
                  </Button>
                </div>
              </div>
            </div>
            {this.context.selectedTheme === "buderus" ? (
              <>
                <div className="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
                  <div className="flexContent additional-flex block-content" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                    <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                      <h3>Kontakt zum Fachbetrieb</h3>
                    </div>
                    <div className="block-container">
                      <div className="block contact">
                        <p>Fachbetriebe in ihrer Nähe</p>
                        <div className="trackeable" data-event="result-part3-contact" style={{ display: "flex", alignItems: "end" }}>
                          <a rel="noreferrer" href="https://www.buderus.de/de/services-tools/experten-in-ihrer-naehe/fachbetriebe-in-ihrer-naehe-21776" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                            <BuderusContactButton disableRipple variant="outlined" endIcon={<BuderusLinkIcon />} disabled={this.state.restart}>
                              Fachbetrieb suchen
                            </BuderusContactButton>
                          </a>
                        </div>
                      </div>
                      <div className="block contact">
                        <p>Angebot anfordern</p>
                        <div className="trackeable" data-event="result-part3-offer" style={{ display: "flex", alignItems: "end" }}>
                          <a rel="noreferrer" href="https://www.buderus.de/de/angebot-anfordern" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                            <BuderusContactButton disableRipple variant="outlined" endIcon={<BuderusLinkIcon />} disabled={this.state.restart}>
                              Unverbindliches Angebot anfordem
                            </BuderusContactButton>
                          </a>
                        </div>
                      </div>
                      <div className="block contact">
                        <p>Beratungshotline</p>
                        <div style={{ display: "flex", alignItems: "end" }}>
                          <a rel="noreferrer" href="https://www.buderus.de/de/kontakt-klimapaket" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                            <BuderusContactButton disableRipple variant="outlined" endIcon={<BuderusLinkIcon />} disabled={this.state.restart}>
                              Zur Beratungshotline
                            </BuderusContactButton>
                          </a>
                        </div>
                      </div>
                      <div className="block contact">
                        <p>Niederlassungssuche</p>
                        <div style={{ display: "flex", alignItems: "end" }}>
                          <a rel="noreferrer" href="https://www.buderus.de/de/niederlassungen" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                            <BuderusContactButton disableRipple variant="outlined" endIcon={<BuderusLinkIcon />} disabled={this.state.restart}>
                              Zur Niederlassungssuche
                            </BuderusContactButton>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
                  <div className="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                    <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                      <h3>Kontakt zum Fachbetrieb</h3>
                      <div>Finden Sie einen Experten in Ihrer Nähe, der Sie bei der Umsetzung unterstützt.</div>
                    </div>
                    <div className="trackeable" data-event="result-part3-contact" style={{ display: "flex", alignItems: "end" }}>
                      <a rel="noreferrer" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/service-und-support/installateur-finden/dealersearch/" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                        <Button variant="outlined" startIcon={<MagnifyingGlassIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: "Bosch-Regular" }}>
                          Jetzt Fachbetrieb finden
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="cardContent" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
                  <div className="flexContent additional-flex" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                    <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                      <h3>Angebot für ein energieeffizientes System</h3>
                      <div>Erhalten Sie ein kostenloses, unverbindliches Angebot von einem Installateur in Ihrer Nähe.</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "end" }}>
                      <a className="trackeable" data-event="result-part3-offer" rel="noreferrer" href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/beratung-und-kauf/angebot-anfordern/" target="_blank" style={{ textDecoration: "none", display: "block" }}>
                        <Button variant="outlined" startIcon={<ContractIcon />} disabled={this.state.restart} style={{ width: "250px", height: "50px", textTransform: "none", borderRadius: "0px", fontFamily: "Bosch-Regular" }}>
                          Angebot anfordern
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="cardContent two-blocks" style={{ borderTop: "1px solid #E0E2E5", marginBottom: "40px" }}>
              <div className="flexContent" style={{ flexDirection: "column", justifyContent: "center", marginTop: "8px", width: "100%" }}>
                <div style={{ paddingRight: "30px", paddingBottom: "10px" }}>
                  <h3>Wie komme ich zu einem energieeffizienten System?</h3>
                  <div style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Bold" : "Bosch-Bold" }}>Informationen zu unseren Produkten</div>
                </div>
                <div className="additional-links-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignContent: "space-between" }}>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                      <a rel="noreferrer" href={this.context.selectedTheme === "buderus" ? "https://www.buderus.de/de/waermepumpe" : "https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/waermepumpen-854510-c/"} target="_blank" className="panel panel-default card-input-narrow">
                        <div className="panel-heading-narrow">{this.context.selectedTheme === "buderus" ? <BuderusHeatpumpSmallIcon /> : <HeatpumpSmallIcon />}</div>
                        <div className="panel-body trackeable" data-event="result-part3-heatpump">
                          Wärmepumpe
                        </div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="OilLNG" className="card-input-element" />
                      <a rel="noreferrer" href={this.context.selectedTheme === "buderus" ? "https://www.buderus.de/de/produkte/produkte-uebersicht/photovoltaik-das-haus-wird-zum-kraftwerk-15304" : "https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/solar-und-pv-anlagen-854604-c/"} target="_blank" className="panel panel-default card-input-narrow">
                        <div className="panel-heading-narrow">{this.context.selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon /> : <PhotovoltaicIcon />}</div>
                        <div className="panel-body trackeable" data-event="result-part3-pv">
                          PV-Anlage
                        </div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingInsulation" className="card-input-element" />
                      <a rel="noreferrer" href={this.context.selectedTheme === "buderus" ? "https://www.buderus.de/de/alle-produkte/195985_logavolt-wls11i" : "https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/power-charge-7000i-19378337-p/"} target="_blank" className="panel panel-default card-input-narrow">
                        <div className="panel-heading-narrow">{this.context.selectedTheme === "buderus" ? <BuderusWallboxIcon /> : <WallboxIcon />}</div>
                        <div className="panel-body trackeable" data-event="result-part3-wallbox">
                          Wallbox
                        </div>
                      </a>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="heating" value="BuildingInsulation" className="card-input-element" />
                      <a rel="noreferrer" href={this.context.selectedTheme === "buderus" ? "https://www.buderus.de/de/services-tools/apps/energiemanager-6036" : "https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/energiemanagement-19317456-c/"} target="_blank" className="panel panel-default card-input-narrow">
                        <div className="panel-heading-narrow">{this.context.selectedTheme === "buderus" ? <BuderusEnergyManagementIcon /> : <EnergyManagementIcon />}</div>
                        <div className="panel-body trackeable" data-event="result-part3-energie-management">
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
        <div id="printPdf-container">
          <div id="printHomePdf" style={{ position: "absolute", left: "0px", width: "795px", height: "1150px", display: "none" }}>
            <img src={require(`../../../../assets/img/buderus/homepage_pdf.png`)} alt="" style={{ position: "absolute" /* , height: "10px" */, width: "795px", marginTop: "0" }} />
          </div>
          <div id="printPdf" style={{ position: "absolute", left: "0px", width: "795px", height: "1150px", display: "none" }}>
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ position: "absolute", left: "600px" }}>
                <BuderusLogo style={{ maxWidth: "200px" }} />
              </div>
            ) : (
              <>
                <div style={{ position: "absolute", left: "0px", top: "0px" }}>
                  <img src={require(`../../../../assets/img/top-line.png`)} alt="" style={{ position: "absolute", height: "10px", width: "795px", marginTop: "0" }} />
                </div>
                <div style={{ position: "absolute", left: "60px", top: "10px" }}>
                  <BoschLogo style={{ maxWidth: "200px" }} />
                </div>
                <div style={{ position: "absolute", left: "60px", top: "90px" }}>
                  <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
                </div>
              </>
            )}

            <div style={{ position: "absolute", left: "60px", top: "103px" }}>
              <h1 style={{ marginBlockStart: "4px", marginBlockEnd: "5px" }}>Sparen Sie Stromkosten</h1>
              <div style={{ fontSize: "14px" }}>mit der smarten Kombination aus Photovoltaik, Wärmepumpe, Wallbox und einem intelligenten Energiemanagementsystem.</div>
            </div>
            <div style={{ position: "absolute", left: "60px", top: "177px" }}>
              <h3>Ergebnis Teil 1: Stromkosten und Amortisationszeit Ihrer PV-Anlage</h3>
            </div>

            <div style={{ position: "absolute", left: "60px", top: "225px" }}>
              <div style={{ position: "absolute", left: "0px", width: "405px", transform: "scale(0.75)", transformOrigin: "top left" }}>
                <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Gesamtkosten Strom</h3>
                {/* Gráfico barras 1 año */}
                <CostPdf displayed="one-year" />
              </div>
              <div style={{ position: "absolute", left: "365px", width: "405px", transform: "scale(0.75)", transformOrigin: "top left" }}>
                <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Gesamtstromkosten über 20 Jahre</h3>
                {/* Gráfico barras 20 años */}
                <CostPdf displayed="twenty-years" />
              </div>
            </div>
            <div style={{ position: "absolute", left: "60px", top: "550px" }}>
              <div style={{ position: "absolute", left: "0px", width: "413px", transform: "scale(0.75)", transformOrigin: "top left" }}>
                <InfoBoxResultPdf box="left" displayed="one-year" />
              </div>
              <div style={{ position: "absolute", left: "365px", width: "413px", transform: "scale(0.75)", transformOrigin: "top left" }}>
                <InfoBoxResultPdf box="left" displayed="twenty-years" />
              </div>
            </div>
            {/* <div style={{ position: "absolute", left: "60px", top: "605px", width: "865px", transform: "scale(0.80)", transformOrigin: "top left" }}>
              <InfoBoxResultPdf box="left" displayed="one-year" />
              <InfoBoxResultPdf box="left" displayed="twenty-years" />
            </div> */}
            <div style={{ position: "absolute", left: "60px", top: "745px" }}>
              <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
            </div>
            <div style={{ position: "absolute", left: "60px", top: "765px", transform: "scale(0.85)", transformOrigin: "top left" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "793px" }}>
                <div style={{ width: "55%" }}>
                  <h3 style={{ marginTop: "0px", marginBlockStart: "0" }}>Amortisationszeit</h3>
                  <span style={{ display: "block", marginBottom: "15px" }}>
                    Investitionskosten PV-System: <strong>{Math.abs(breakEvenNoEms[0].expenditure).toLocaleString("de-DE")} €</strong>
                  </span>
                  <img alt="" src={breakEvenBase64} style={{ width: "440px" }} />
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "25px", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: "15px" }}>
                        <div style={{ marginTop: "2px", width: "14px", height: "14px", background: this.context.selectedTheme === "buderus" ? "#3C3C3B" : "#007BC0", borderRadius: "14px" }}></div>
                      </div>
                      <div>Kapitalentwicklung mit PV ohne Energiemanagementsystem </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginTop: "6px" }}>
                      <div style={{ marginRight: "15px" }}>
                        <div style={{ marginTop: "2px", width: "14px", height: "14px", background: this.context.selectedTheme === "buderus" ? "#B2B2B2" : "#18837E", borderRadius: "14px" }}></div>
                      </div>
                      <div>Kapitalentwicklung mit PV und mit Energiemanagementsystem *</div>
                    </div>
                  </div>
                </div>

                <div style={{ width: "42%" }}>
                  <InfoBoxResultPdf box="right" />
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
              <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
            </div>
          </div>

          <div id="printPdf2" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <div style={{ marginLeft: "600px" }}>
                  <BuderusLogo style={{ maxWidth: "200px" }} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "60px", maxWidth: "815px" }}>
              <h3>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "60px", maxWidth: "815px" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Stromverbrauch</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
              <div style={{ position: "relative", width: "730px", height: "253px" }}>
                <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie3" width="440" height="273" />
                </div>
                <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie4" width="440" height="273" />
                </div>
                <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <InfoBoxResult box="electricity-use" />
                </div>

                <div className="additional-flex first-col caption" style={{ position: "absolute", top: "240px", left: "0px", transform: "scale(0.85)", transformOrigin: "top left", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#996193" : "#9E2896", borderRadius: "12px" }}></div>
                    </div>
                    <div>Haushalt</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#CC36BD" : "#004975", borderRadius: "12px" }}></div>
                    </div>
                    <div>Wärmepumpe</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#C535BC", borderRadius: "12px" }}></div>
                    </div>
                    <div>Elektro-Auto</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <hr style={{ width: "675px", height: "1px", marginTop: "0px", background: "#999", border: "none", marginInlineStart: "0em" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "815px" }}>
                <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "4px", fontSize: "14px" }}>Autarkie</h3>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "14px" }}>Mit Energiemanagementsystem</h3>
              </div>
              <div style={{ position: "relative", width: "730px", height: "283px" }}>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie1" width="440" height="273" />
                </div>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie2" width="440" height="273" />
                </div>

                <div className="additional-flex second-col caption" style={{ position: "absolute", top: "240px", left: "0px", transform: "scale(0.85)", transformOrigin: "top left", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E", borderRadius: "12px" }}></div>
                    </div>
                    <div>PV-Anlage</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", borderRadius: "12px" }}></div>
                    </div>
                    <div>Vorteil durch EMS</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", borderRadius: "12px" }}></div>
                    </div>
                    <div>Netzbezug</div>
                  </div>
                </div>

                {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <InfoBoxResult box="off-grid" />
                </div> */}
                <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <Box>
                    <div className="infobox-container">
                      <div className="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "14px", borderBottom: "none" }}>
                        <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Autarkiegrad: ca. {autarkiegradWithEMS}%</h3>
                        <p>
                          Das bedeutet: bis zu <strong>{autarkiegradWithEMS}%</strong> Ihres Gesamtstromverbrauchs wird durch die <strong>eigene PV-Anlage produziert.</strong>
                        </p>
                        <p>
                          <strong>Ohne ein Energiemanagementsystem</strong> beträgt ihr <strong>Autarkiegrad</strong> lediglich ca. <strong>{ohnePvUsagePercentage}%</strong>.{" "}
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
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "14px" }}>Ohne Energiemanagementsystem</h3>
              </div>
              <div style={{ position: "relative", width: "730px", height: "283px" }}>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie1_NoEMS" width="440" height="273" />
                </div>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie2_NoEMS" width="440" height="273" />
                </div>

                <div className="additional-flex third-col caption" style={{ position: "absolute", top: "240px", left: "0px", transform: "scale(0.85)", transformOrigin: "top left", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E", borderRadius: "12px" }}></div>
                    </div>
                    <div>PV-Anlage</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", borderRadius: "12px" }}></div>
                    </div>
                    <div>Vorteil durch EMS</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", borderRadius: "12px" }}></div>
                    </div>
                    <div>Netzeinspeisung</div>
                  </div>
                </div>

                {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <InfoBoxResult box="off-grid" />
                </div> */}
                <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <Box>
                    <div className="infobox-container">
                      <div className="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "14px", borderBottom: "none" }}>
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
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <div style={{ marginLeft: "600px" }}>
                  <BuderusLogo style={{ maxWidth: "200px" }} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "60px", maxWidth: "815px" }}>
              <h3>Ergebnis Teil 2: Stromverbrauch, Autarkie und Eigenverbrauch</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "0px", paddingLeft: "60px", maxWidth: "815px" }}>
              <h3 style={{ marginBlockStart: "4px", marginBlockEnd: "8px", fontSize: "14px" }}>Eigenverbrauch</h3>
              <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "14px" }}>Mit Energiemanagementsystem</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
              <div style={{ position: "relative", width: "730px", height: "273px" }}>
                <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie5" width="375" height="273" />
                </div>

                <div style={{ position: "absolute", top: "0", left: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie6" width="375" height="273" />
                </div>

                <div className="additional-flex second-col caption" style={{ position: "absolute", top: "240px", left: "0px", transform: "scale(0.85)", transformOrigin: "top left", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E", borderRadius: "12px" }}></div>
                    </div>
                    <div>PV-Anlage</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", borderRadius: "12px" }}></div>
                    </div>
                    <div>Vorteil durch EMS</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", borderRadius: "12px" }}></div>
                    </div>
                    <div>Netzbezug</div>
                  </div>
                </div>

                {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <InfoBoxResult box="household-use" />
                </div> */}
                <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <Box>
                    <div className="infobox-container">
                      <div className="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "14px", borderBottom: "none" }}>
                        <h3 style={{ marginBlockStart: "0", marginBlockEnd: "8px" }}>Eigenverbrauchsanteil: ca. {eigenverbrauchsanteil}%</h3>
                        <p>
                          Das bedeutet: bis zu <strong>{Math.round(parseFloat(eigenverbrauchsanteil).toFixed(2))}%</strong> Ihres eigens produzierten PV-Stroms <strong>verbrauchen Sie selbst.</strong>
                        </p>
                        <p>
                          <strong>Ohne ein Energiemanagementsystem</strong> beträgt der <strong>Eigenverbrauchsanteil</strong> lediglich ca. <strong>{Onhe_HouseholdNoEMSpvPercent}%</strong>.{" "}
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
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "14px" }}>Ohne Energiemanagementsystem</h3>
              </div>
              <div style={{ position: "relative", width: "730px", height: "273px" }}>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie7" width="375" height="273" />
                </div>
                <div style={{ position: "absolute", top: "0", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <canvas id="pie8" width="375" height="273" />
                </div>

                <div className="additional-flex third-col caption" style={{ position: "absolute", top: "240px", left: "0px", transform: "scale(0.85)", transformOrigin: "top left", fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontSize: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#F8D927" : "#18837E", borderRadius: "12px" }}></div>
                    </div>
                    <div>PV-Anlage</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#5278A2" : "#00884A", borderRadius: "12px" }}></div>
                    </div>
                    <div>Vorteil durch EMS</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", color: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3" }}>
                    <div style={{ marginRight: "10px" }}>
                      <div style={{ marginTop: "2px", width: "12px", height: "12px", background: this.context.selectedTheme === "buderus" ? "#75ACE7" : "#A4ABB3", borderRadius: "12px" }}></div>
                    </div>
                    <div>Netzeinspeisung</div>
                  </div>
                </div>

                {/* <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <InfoBoxResult box="household-use" />
                </div> */}
                <div style={{ position: "absolute", top: "0", left: "400px", transform: "scale(0.85)", transformOrigin: "top left" }}>
                  <Box>
                    <div className="infobox-container">
                      <div className="infobox-row" style={{ display: "block", lineHeight: "22px", fontSize: "14px", borderBottom: "none" }}>
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
            </div>
            <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
              <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
            </div>
          </div>

          <div id="printPdf4" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <div style={{ marginLeft: "600px" }}>
                  <BuderusLogo style={{ maxWidth: "200px" }} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "0px", maxWidth: "815px" }}>
                <h3>Weitere Informationen</h3>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "14px" }}>Um weitere Informationen zu erhalten, scannen sie den jeweiligen QR-Code.</h3>
              </div>
              {this.context.selectedTheme === "buderus" ? (
                <>
                  <div className="cardContent" style={{ marginBottom: "40px" }}>
                    <div className="flexContent additional-flex block-content" style={{ width: "100%", justifyContent: "space-between", marginTop: "8px" }}>
                      <div className="block-container">
                        <div className="block contact">
                          <p>Fachbetriebe in ihrer Nähe</p>
                          <div className="qr-container">
                            <img alt="lmt" src={require(`../../../../assets/img/qr/buderus_dealer_search.png`)} style={{ width: "70px" }} />
                          </div>
                          <p>buderus.de/fachbetrieb</p>
                        </div>
                        <div className="block contact">
                          <p>Angebot anfordern</p>
                          <div className="qr-container">
                            <img alt="lmt" src={require(`../../../../assets/img/qr/buderus_lmt.png`)} style={{ width: "70px" }} />
                          </div>
                          <p>buderus.de/angebot</p>
                        </div>
                        <div className="block contact">
                          <p>Beratungshotline</p>
                          <div className="qr-container">
                            <img alt="lmt" src={require(`../../../../assets/img/qr/buderus_hotline.png`)} style={{ width: "70px" }} />
                          </div>
                          <p>buderus.de/hotline</p>
                        </div>
                        <div className="block contact">
                          <p>Niederlassungssuche</p>
                          <div className="qr-container">
                            <img alt="lmt" src={require(`../../../../assets/img/qr/buderus_branch.png`)} style={{ width: "70px" }} />
                          </div>
                          <p>buderus.de/niederlassung</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", textAlign: "center", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "690px" }}>
                    <div style={{ width: "25%" }}>
                      <label>
                        <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                        <a href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/wissen/der-energiemanager/sektorenkopplung/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_tool&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                          <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                            {this.context.selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon /> : <PhotovoltaicIcon />}
                          </div>
                          <div className="panel-body icons" style={{ fontSize: "10px" }}>
                            Solarstromrechner
                          </div>
                        </a>
                      </label>
                      <p style={{ fontSize: "10px" }}>bosch-hc.de/solarstromrechner</p>
                      <div>
                        <img alt="sectorcoupling_tool" src={require(`../../../../assets/img/qr/sectorcoupling_tool.png`)} style={{ width: "90px" }} />
                      </div>
                    </div>
                    <div style={{ width: "25%" }}>
                      <label>
                        <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                        <a href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/service-und-support/installateur-finden/dealersearch/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_dealersearch&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                          <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                            {this.context.selectedTheme === "buderus" ? <BuderusContractIcon /> : <ContractIcon />}
                          </div>
                          <div className="panel-body icons" style={{ fontSize: "10px" }}>
                            Unverbindliches
                            <br />
                            Angebot anfragen
                          </div>
                        </a>
                      </label>
                      <p style={{ fontSize: "10px" }}>bosch-hc.de/angebot</p>
                      <div>
                        <img alt="dealer_search" src={require(`../../../../assets/img/qr/dealer_search.png`)} style={{ width: "100px" }} />
                      </div>
                    </div>
                    <div style={{ width: "25%" }}>
                      <label>
                        <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                        <a href="https://www.bosch-homecomfort.com/de/de/wohngebaeude/beratung-und-kauf/angebot-anfordern/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_lmt&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                          <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                            {this.context.selectedTheme === "buderus" ? <BuderusWrenchIcon /> : <WrenchIcon />}
                          </div>
                          <div className="panel-body icons" style={{ fontSize: "10px" }}>
                            Kontakte zum
                            <br />
                            Fachbetrieb
                          </div>
                        </a>
                      </label>
                      <p style={{ fontSize: "10px" }}>bosch-hc.de/installateur</p>
                      <div>
                        <img alt="lmt" src={require(`../../../../assets/img/qr/lmt.png`)} style={{ width: "90px" }} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", maxWidth: "815px" }}>
              <hr style={{ width: "675px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "20px", paddingLeft: "0px", maxWidth: "815px" }}>
                <h3>Wie komme ich zu einem energieeffizienten System?</h3>
                <h3 style={{ fontFamily: this.context.selectedTheme === "buderus" ? "HelveticaNeue-Roman" : "Bosch-Regular", fontWeight: "normal", marginBlockStart: "0px", marginBlockEnd: "0px", fontSize: "13px" }}>Informationen zu unseren Produkten finden Sie unter den jeweiligen QR-Codes:</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "flex-start", textAlign: "center", marginTop: "0px", marginBottom: "0px", paddingLeft: "0px", maxWidth: "690px" }}>
                <div style={{ width: "25%" }}>
                  <label>
                    <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                    <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/waermepumpen-854510-c/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_heatpump&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                      <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                        {this.context.selectedTheme === "buderus" ? <BuderusHeatpumpSmallIcon /> : <HeatpumpSmallIcon />}
                      </div>
                      <div className="panel-body icons" style={{ fontSize: "10px" }}>
                        Wärmepumpe
                      </div>
                    </a>
                  </label>
                  {this.context.selectedTheme === "buderus" ? <p style={{ fontSize: "10px" }}>buderus.de/waermepumpe</p> : <p style={{ fontSize: "10px" }}>bosch-hc.de/waermepumpe</p>}
                  <div>{this.context.selectedTheme === "buderus" ? <img alt="heatpump" src={require(`../../../../assets/img/qr/buderus_heatpump.png`)} style={{ width: "70px" }} /> : <img alt="heatpump" src={require(`../../../../assets/img/qr/heatpump.png`)} style={{ width: "70px" }} />}</div>
                </div>
                <div style={{ width: "25%" }}>
                  <label>
                    <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                    <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/solarthermieanlagen-854604-c/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_pv&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                      <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                        {this.context.selectedTheme === "buderus" ? <BuderusPhotovoltaicIcon /> : <PhotovoltaicIcon />}
                      </div>
                      <div className="panel-body icons" style={{ fontSize: "10px" }}>
                        PV-Anlage
                      </div>
                    </a>
                  </label>
                  {this.context.selectedTheme === "buderus" ? <p style={{ fontSize: "10px" }}>buderus.de/pv</p> : <p style={{ fontSize: "10px" }}>bosch-hc.de/pv</p>}
                  <div>{this.context.selectedTheme === "buderus" ? <img alt="heatpump" src={require(`../../../../assets/img/qr/buderus_pv.png`)} style={{ width: "70px" }} /> : <img alt="pv" src={require(`../../../../assets/img/qr/pv.png`)} style={{ width: "70px" }} />}</div>
                </div>
                <div style={{ width: "25%" }}>
                  <label>
                    <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                    <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/power-charge-7000i-19378337-p/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_wallbox&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" rel="noreferrer" target="_blank" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                      <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                        {this.context.selectedTheme === "buderus" ? <BuderusWallboxIcon /> : <WallboxIcon />}
                      </div>
                      <div className="panel-body icons" style={{ fontSize: "10px" }}>
                        Wallbox
                      </div>
                    </a>
                  </label>
                  {this.context.selectedTheme === "buderus" ? <p style={{ fontSize: "10px" }}>buderus.de/wallbox</p> : <p style={{ fontSize: "10px" }}>bosch-hc.de/wallbox</p>}
                  <div>{this.context.selectedTheme === "buderus" ? <img alt="heatpump" src={require(`../../../../assets/img/qr/buderus_wallbox.png`)} style={{ width: "70px" }} /> : <img alt="" src={require(`../../../../assets/img/qr/wallbox.png`)} style={{ width: "70px" }} />}</div>
                </div>
                <div style={{ width: "25%" }}>
                  <label>
                    <input type="radio" name="heating" value="BuildingEnergyStandard" className="card-input-element" />
                    <a href="https://www.bosch-homecomfort.com/de/de/ocs/wohngebaeude/energiemanagement-19317456-c/?utm_source=pdf&utm_medium=qrcode&utm_campaign=202403_sectorcoupling_ems&utm_content=none&utm_creative_format=pdf&utm_marketing_tactic=performance" target="_blank" rel="noreferrer" className="panel panel-default card-input-narrow card-pdf-width" style={{ textDecoration: "none", marginLeft: "23px", width: "120px !important", height: "110px" }}>
                      <div className="panel-heading-narrow" style={{ marginTop: "20px" }}>
                        {this.context.selectedTheme === "buderus" ? <BuderusEnergyManagementIcon /> : <EnergyManagementIcon />}
                      </div>
                      <div className="panel-body icons" style={{ fontSize: "10px" }}>
                        Energiemanage-
                        <br />
                        mentsystem
                      </div>
                    </a>
                  </label>
                  {this.context.selectedTheme === "buderus" ? <p style={{ fontSize: "10px" }}>buderus.de/ems</p> : <p style={{ fontSize: "10px" }}>bosch-hc.de/energiemanagement</p>}
                  <div>{this.context.selectedTheme === "buderus" ? <img alt="heatpump" src={require(`../../../../assets/img/qr/buderus_ems.png`)} style={{ width: "70px" }} /> : <img alt="heatpump" src={require(`../../../../assets/img/qr/ems.png`)} style={{ width: "70px" }} />}</div>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", left: "60px", top: "1094px" }}>
              <hr style={{ width: "690px", height: "1px", marginTop: "12px", background: "#999", border: "none" }} />
            </div>
          </div>

          <div id="printPdf5" style={{ position: "absolute", left: "730px", width: "795px", height: "1150px", display: "none" }}>
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <div style={{ marginLeft: "600px" }}>
                  <BuderusLogo style={{ maxWidth: "200px" }} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "60px", maxWidth: "1000px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "0px", marginBottom: "15px", paddingLeft: "0px", maxWidth: "815px" }}>
                <h3>Berechnungsgrundlage</h3>
              </div>
              <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
                <div className="modal-content-width" style={{ position: "relative", width: "680px" }}>
                  <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "0px", marginBottom: "20px", textAlign: "left" }}>
                    <div style={{ marginRight: "10px", transform: "scale(0.85)", transformOrigin: "top left" }}>{this.context.selectedTheme === "buderus" ? <BuderusInfoIcon /> : <InfoIcon />}</div>
                    <h3 className="pdf-h3">
                      <b>Bitte beachten Sie:</b> Die Ergebnisse des Tools basieren auf historischen Werten, simulierten Daten und darauf aufbauenden Optimierungen und können daher von tatsächlichen Verbräuchen und Erträgen abweichen. Die Daten werden regelmäßig kontrolliert und aktualisiert. Das Tool ersetzt nicht die exakte Planung durch eine/n von Ihnen beauftragte/n Planungsexperten/-expertin.
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
            {this.context.selectedTheme === "buderus" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <div style={{ marginLeft: "600px" }}>
                  <BuderusLogo style={{ maxWidth: "200px" }} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
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
      </div>
    );
  }
}

export default withRouter(withTranslation()(Additional));
