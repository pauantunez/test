import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../AppContext";
import { Button } from "reactstrap";
import { withTranslation } from "react-i18next";
import styles from "../../styles/home.module.css";
import licensesData from "../../licenses.json";

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

    // Convertir licensesData en un array de objetos
    const licensesArray = Object.entries(licensesData).map(([key, value]) => ({ ...value, key }));

    return (
      <div>
        <div className={`${overlayToggle ? styles.show : styles.hide} ${styles.disclaimerContainer} ${styles.scaleDisclaimerContainer}`} style={{ zIndex: "99999999999" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", height: "100%", overflow: "auto" }}>
            <div style={{ width: "100%", fontSize: "15px", fontFamily: fontRegular }}>
              <div>
                <p>
                  <strong>Licenze OSS</strong>
                </p>

                {licensesArray.map((license, index) => (
                  <p key={index}>
                    <strong>{license.key}</strong>
                    <br />
                    <a href={license.repository} rel="noreferrer" target="_blank">
                      {license.licenses}
                    </a>
                  </p>
                ))}
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
          Licenze OSS
        </Button>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Disclaimer));
