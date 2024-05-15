import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { Button } from "reactstrap";
import { withTranslation } from "react-i18next";
import styles from "../../styles/home.module.css";
import LicensesData from "./licensesData";

var fontRegular;
var btnColor;

class Disclaimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayToggle: false,
    };
  }

  static contextType = AppContext;

  componentDidMount() {}

  async toggleDisclaimer() {
    if (this.state.overlayToggle) {
      this.setState({ overlayToggle: false });
    } else {
      this.setState({ overlayToggle: true });
    }
  }

  render() {
    const { overlayToggle } = this.state;

    return (
      <div className="right-bottom-links">
        <div className={`licenze-popup ${overlayToggle ? styles.show : styles.hide} ${styles.disclaimerContainer} ${styles.scaleDisclaimerContainer}`} style={{ zIndex: "99999999999" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", height: "100%", overflow: "auto" }}>
            <div style={{ width: "100%", fontSize: "15px", fontFamily: fontRegular }}>
              <div>
                <p>
                  <strong>OSS Lizenzen</strong>
                </p>

                <LicensesData />
                <br />
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  this.toggleDisclaimer();
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
            this.toggleDisclaimer();
          }}
          className="disclaimerBtn"
          style={{ fontFamily: "Bosch-Regular" }}
        >
          OSS Lizenzen
        </Button>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Disclaimer));
