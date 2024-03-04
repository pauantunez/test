import React from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../AppContext'
import {
  Button,
} from 'reactstrap';

import { withTranslation } from 'react-i18next';

import styles from '../../styles/home.module.css'; 

var entryParam;
var foundTheme;
var fontRegular;
var btnColor;

class Disclaimer extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            audio: "audiofile.mp3",
            overlayToggle: false,
            theme: props.theme
        }
    }

    static contextType = AppContext

    componentDidMount() {

      const {products, btnThemes, fonts } = this.context;
      const productsProps = Object.getOwnPropertyNames(products);
      var btnFont;

      if(this.state.theme) {
        entryParam = this.state.theme;
  
        for(let themes = 0; themes < productsProps.length; themes++) {
  
          if(entryParam === productsProps[themes]) {
            console.log(productsProps[themes])
  
            import("../../styles/"+productsProps[themes]+".css");

            btnFont = fonts[entryParam][2];
            btnColor = btnThemes[entryParam][0];
            fontRegular = fonts[entryParam][1];
            

            foundTheme++;
          }
          
        }
  
        if(foundTheme === 0) {
          import("../../styles/"+productsProps[0]+".css");
          btnFont = fonts.bosch[2];
          btnColor = btnThemes.bosch[0];
          fontRegular = fonts.bosch[1];
        }
  
      } else {
        import("../../styles/"+productsProps[0]+".css");
        btnFont = fonts.bosch[2];
        btnColor = btnThemes.bosch[0];
        fontRegular = fonts.bosch[1];
      }
        
    }

    async toggleDisclaimer() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;

          return  ( 
          <div>

            <div className={`${overlayToggle? styles.show: styles.hide} ${styles.disclaimerContainer} ${styles.scaleDisclaimerContainer}`} style={{zIndex: '999999999'}} >
            

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'left', height: '100%', overflow: 'auto'}}>
            
            <div style={{width: '100%', fontSize: '15px', fontFamily: fontRegular}}>

                <div>
                <p><strong>{t('disclaimer.licenses')}</strong></p>
                
                <p>@emotion/react<br />
                <a href="https://github.com/emotion-js/emotion/blob/d25316393639232df16ba836b407e3678eea5e4d/packages/react/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>    
                @emotion/styled<br />
                <a href="https://github.com/emotion-js/emotion/blob/d25316393639232df16ba836b407e3678eea5e4d/packages/styled/LICENSE" rel="noreferrer"  target="_blank">MIT License</a>
                </p>
                <p>
                @mui/material<br />
                <a href="https://github.com/mui-org/material-ui/blob/18de7b8155f3e00ac50ed1656fc358b2021d74d0/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                @testing-library/jest-dom<br />
                <a href="https://github.com/testing-library/jest-dom/blob/a9beb47455dae0f455ddacc473d0ddabe09f0b43/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                @testing-library/react<br />
                <a href="https://github.com/testing-library/react-testing-library/blob/8f17a2bc4fa9c2c17a623b38ded9ab18b086e457/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                @testing-library/user-event<br />
                <a href="https://github.com/testing-library/user-event/blob/a5ca2e47f30ea71b72a443c227ea125beb4e84b7/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                bootstrap<br />
                <a href="https://github.com/twbs/bootstrap/blob/c1222d6952d7f95b19299f79562285d587808996/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                framer-motion<br />
                <a href="https://github.com/framer/motion/blob/7a696557c1dbbd0bfe52969e0a3b93fa1b579877/LICENSE.md" rel="noreferrer" target="_blank">MIT License</a>       
                </p>
                <p>
                i18next<br />
                <a href="https://github.com/i18next/i18next/blob/79c0fa2ea597af5cb571f28c5a29b3ea171ddb66/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                rc-slider<br />
                <a href="https://github.com/react-component/slider/blob/9d6dcc5e351767c60d1be250d47c4c496b6b3c6f/LICENSE" rel="noreferrer" target="_blank">MIT License</a>   
                </p>
                <p>
                react<br />
                <a href="https://github.com/facebook/react/blob/529dc3ce84f0efe99a8be33ff453c09d5801d5ca/LICENSE" rel="noreferrer" target="_blank">MIT License</a>    
                </p>
                <p>
                react-css-transition-replace<br />
                <a href="https://github.com/marnusw/react-css-transition-replace/blob/54c994010c3eccf48c2c9dd1e224dc84d48820ba/LICENSE.md" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-device-detect<br />
                <a href="https://github.com/duskload/react-device-detect/blob/e24ad612b4b73757137aec9ab78f60b7d2075dd0/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-dom<br />
                <a href="https://github.com/facebook/react/blob/529dc3ce84f0efe99a8be33ff453c09d5801d5ca/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-gtm-module<br />
                <a href="https://github.com/alinemorelli/react-gtm/blob/b1257405a82e900c174032a773a8ba70a8628081/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-i18next<br />
                <a href="https://github.com/i18next/react-i18next/blob/e91ed946979d8a27cf0dd255c5ac7e516e02c073/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-icons<br />
                <a href="https://github.com/react-icons/react-icons/blob/6d9ccf4df416785fb4b29d1bbc00ff12bed0df87/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-responsive<br />
                <a href="https://github.com/yocontra/react-responsive/blob/30dcc055bd79c057d9e691c8cc30df6138858556/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-router-dom<br />
                <a href="https://github.com/remix-run/react-router/blob/df1f77a2cb95f8884576e9abaa8357a3077326cf/LICENSE.md" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-scripts<br />
                <a href="https://github.com/facebook/create-react-app/blob/a422bf227cf5294a34d68696664e9568a152fd8f/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                react-sound<br />
                <a href="https://github.com/leoasis/react-sound/blob/0bdd545a7b4148209b6234e5eecd3ef215c3ada8/LICENSE.txt" rel="noreferrer" target="_blank">ISC License</a>
                </p>
                <p>
                react-transition-group<br />
                <a href="https://github.com/reactjs/react-transition-group/blob/f5bfc1062a2d103e09678e0c024b5deec6b843f8/LICENSE" rel="noreferrer" target="_blank">BSD 3-Clause License</a>
                
                </p>
                <p>
                reactstrap<br />
                <a href="https://github.com/reactstrap/reactstrap/blob/37a63c673269bcd6eb3a7331583afa94113b73f6/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                standardized-audio-context<br />	
                <a href="https://github.com/chrisguttandin/standardized-audio-context/blob/a82771aed6ef01818b50e780feaf3d14d38edb45/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                styled-components<br />
                <a href="https://github.com/styled-components/styled-components/blob/80cf751528f5711349dd3c27621022b4c95b4b7f/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                use-sound<br />
                <a href="https://github.com/joshwcomeau/use-sound/blob/22651057278be62c775d266dd61b279a3040f155/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                web-vitals<br />
                <a href="https://github.com/GoogleChrome/web-vitals/blob/71ac4a03c4c71861196925275e803a05ad017723/LICENSE" rel="noreferrer" target="_blank">Apache License 2.0</a>
                </p>
                <p>
                immer<br />
                <a href="https://github.com/immerjs/immer/blob/d8f26362a9ff1ca7385943ce0b4cb49e9530edaf/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                ansi-html<br />	
                <a href="https://github.com/Tjatse/ansi-html/blob/99ec49e431c70af6275b3c4e00c7be34be51753c/LICENSE" rel="noreferrer" target="_blank">Apache License 2.0</a>
                </p>
                <p>
                ansi-regex<br />
                <a href="https://github.com/chalk/ansi-regex/blob/02fa893d619d3da85411acc8fd4e2eea0e95a9d9/license" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                nth-check<br />
                <a href="https://github.com/fb55/nth-check/blob/a411ed4d6b5b0ecb5f15aa3b8febd87006a38c67/LICENSE" rel="noreferrer" target="_blank">BSD 2-Clause License</a>
                </p>
                <p>
                glob-parent<br />
                <a href="https://github.com/gulpjs/glob-parent/blob/3aa3ed70a996548af5b3f55250f34451ba261e19/LICENSE" rel="noreferrer" target="_blank">ISC License</a>
                </p>
                <p>
                browserslist<br />
                <a href="https://github.com/browserslist/browserslist/blob/b43f8af68ff909e67009d016b8ad9e6162691d85/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <p>
                node-forge<br />
                <a href="https://github.com/digitalbazaar/forge/blob/7928551717b60e5def1785cfa7728c1107716c91/LICENSE" rel="noreferrer" target="_blank">BSD 3-Clause License</a>
                </p>
                <p>
                axios<br />
                <a href="https://github.com/axios/axios/blob/c9aca7525703ab600eacd9e95fd7f6ecc9942616/LICENSE" rel="noreferrer" target="_blank">MIT License</a>
                </p>
                <br />
                </div>
            </div>
            <div>
                <Button onClick={() => { this.toggleDisclaimer() }} className="btnBackground" style={{position: 'absolute', top: '5px', right: '5px', borderRadius: '40px', width: '40px', height: '40px', color: '#fff', border: 'none', fontFamily: 'Bosch-Bold', background: btnColor}}>x</Button>
            </div>

            </div>

            </div>

            { this.state.theme === 'bosch' &&
              <Button onClick={(e) => { this.toggleDisclaimer() }} className="disclaimerBtn" style={{fontFamily: 'Bosch-Bold'}}>
                {t('disclaimer.button')}
              </Button>
            }

            { this.state.theme === 'buderus' &&
              <Button onClick={(e) => { this.toggleDisclaimer() }} className="disclaimerBtn" style={{fontFamily: 'Helvetica-Neue-Roman'}}>
                {t('disclaimer.button')}
              </Button>
            }

          </div>
          )

  }
}

export default withRouter(withTranslation()(Disclaimer));