import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { Button } from "reactstrap";
import axios from "axios";

import { withTranslation } from "react-i18next";

import styles from "../../styles/home.module.css";

var entryParam;
var foundTheme;
var btnFont;
var fontRegular;
var btnColor;

class Liability extends React.Component {
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
    const { i18n } = this.props;
    const { products, btnThemes, fonts } = this.context;
    const productsProps = Object.getOwnPropertyNames(products);
    const langString = i18n.language;
    const adaptedLangString = langString.slice(0, 2) + "-" + langString.slice(2);
    console.log("Adapted lang: ", adaptedLangString);

    axios.get(`https://policies.ttprivacy.com/api/v1/imprints/legalentity/TTDE/language/${adaptedLangString}`).then((res) => {
      const imprint = res.data;
      this.setState({ imprint });

      //console.log(this.state.imprint)
      console.log(this.state);
    });

    if (this.state.theme) {
      entryParam = this.state.theme;

      for (let themes = 0; themes < productsProps.length; themes++) {
        if (entryParam === productsProps[themes]) {
          console.log(productsProps[themes]);

          import("../../styles/" + productsProps[themes] + ".css");

          btnFont = fonts[entryParam][2];
          fontHeadline = fonts[entryParam][2];
          fontRegular = fonts[entryParam][1];
          btnColor = btnThemes[entryParam][0];

          foundTheme++;
        }
      }

      if (foundTheme === 0) {
        import("../../styles/" + productsProps[0] + ".css");
        btnFont = fonts.bosch[2];
        fontHeadline = fonts.bosch[2];
        fontRegular = fonts.bosch[1];
        btnColor = btnThemes.bosch[0];
      }
    } else {
      import("../../styles/" + productsProps[0] + ".css");
      btnFont = fonts.bosch[2];
      fontHeadline = fonts.bosch[2];
      fontRegular = fonts.bosch[1];
      btnColor = btnThemes.bosch[0];
    }
  }

  async toggleModal() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  render() {
    const { overlayToggle } = this.state;

    return (
      <div>
        <div className={`${overlayToggle ? styles.show : styles.hide} ${styles.disclaimerContainer} ${styles.scaleDisclaimerContainer}`} style={{ zIndex: "999999999" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", height: "100%", overflow: "auto" }}>
            <div style={{ width: "100%", fontSize: "15px", fontFamily: fontRegular }}>
              <p>
                <strong>Hinweise zu wiedergegebenen Geräuschen</strong>
              </p>

              <p style={{ lineHeight: "24px" }}>Die simulierte Lautstärke der wiedergegebenen Sounds können von der tatsächlich in der Realität empfundenen Lautstärke abweichen. Die Sounds wurden von handelsüblichen Geräten im Abstand von 1m unter gleichen Bedingungen aufgenommen.</p>
            </div>
            <div>
              <Button
                onClick={() => {
                  this.toggleModal();
                }}
                className="btnBackground"
                style={{ position: "absolute", top: "5px", right: "5px", borderRadius: "40px", width: "40px", height: "40px", color: "#fff", border: "none", fontFamily: "Bosch-Bold", background: btnColor }}
              >
                x
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={(e) => {
            this.toggleModal();
          }}
          className="imprintBtn"
          style={{ fontFamily: btnFont }}
        >
          Hinweise zu wiedergegebenen Geräuschen
        </Button>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Liability));
