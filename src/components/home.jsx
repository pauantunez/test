import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { withRouter } from "react-router";
import axios from 'axios';
import AppContext from '../AppContext'
import Disclaimer from './disclaimer/disclaimer';
import Liability from './liability/liability';
import navContent from './tabs/navContent';
import { withTranslation } from 'react-i18next';
import Slider from 'rc-slider';
import { FaVolumeUp, FaVolumeMute, FaHome, FaCloudSun, FaChartLine } from 'react-icons/fa';
import i18n from 'i18next';
import styles from '../styles/home.module.css';
import 'rc-slider/assets/index.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var productEntry;
var entryParam;
var selectedTheme;
var btnColor;
var themeFont;
var labelFont;
var handIcon;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      audio: "audiofile.mp3",
      initialVolumeSet: false,
      initialLoad: false,
      backBtn: true,
      fwdBtn: false,
      selectedProduct: 0,
      selectedTab: 0,
      gainNode: {},
      mediaSource: {},
      audioCtx: {},
      parNo: '44',
      scenNo: '',
    }
  }

  static contextType = AppContext;

  componentWillMount() {

    const { products, btnThemes, fonts } = this.context;
    const productsProps = Object.getOwnPropertyNames(products);
    var foundTheme = 0;

    if(urlParams.get('theme')) {
      entryParam = urlParams.get('theme');
      //alert(entryParam)

      for(let themes = 0; themes < productsProps.length; themes++) {

        if(entryParam === productsProps[themes]) {
          console.log(productsProps[themes])

          require("../styles/"+productsProps[themes]+".css");
          
          selectedTheme = productsProps[themes];
          btnColor = btnThemes[entryParam][0];
          themeFont = fonts[entryParam][0];
          labelFont = fonts[entryParam][1];
          console.log(selectedTheme);

          handIcon = require(`../assets/img/hand-pointing-arrows-${selectedTheme}.svg`);

          foundTheme++;
        } else {
          require("ignore");
          console.log("ignore:" + productsProps[themes])
        }
        
      }

      if(foundTheme === 0) {
        require("../styles/"+productsProps[0]+".css");
        selectedTheme = productsProps[0];
        btnColor = btnThemes.bosch[0];
        themeFont = fonts.bosch[0];
        labelFont = fonts.bosch[1];
        handIcon = require(`../assets/img/hand-pointing-arrows-${selectedTheme}.svg`);
      }

    } else {
      require("../styles/"+productsProps[0]+".css");
      selectedTheme = productsProps[0];
      btnColor = btnThemes.bosch[0];
      themeFont = fonts.bosch[0];
      labelFont = fonts.bosch[1];
      handIcon = require(`../assets/img/hand-pointing-arrows-${selectedTheme}.svg`);
    }
  }

  componentWillReceiveProps = (nextProps, nextContext) => {

    const { products, productSelected, navSteps, selectedTab, setSelectedTab, setNavDirection, stepperNavActive, setActiveView, setActiveStep, navDirection, setStepperNav, heatpumpAudio, activeView, activeStep, disableSlider } = this.context


    //isEnd
    if(nextContext.activeView == 0 && nextContext.selectedTab == 2) {
      this.state.fwdBtn = true;
      this.state.backBtn = false;
    }
    else if(nextContext.activeView == 0 && nextContext.selectedTab == 0) {
      this.state.backBtn = true;
      this.state.fwdBtn = false;
    } else {
      this.state.backBtn = false;
      this.state.fwdBtn = false;
    }

    console.log(nextContext.navDirection)
    //alert(nextContext.navDirection)


  }

  getEntryParameter = async() => {

    const { setProduct } = this.context

    if(urlParams.get('entry')) {
      entryParam = urlParams.get('entry');

      var productList = await i18n.t('products', {returnObjects:true});
  
      var item = await productList.filter(item=>item.slug.toLowerCase().includes(entryParam));

      productEntry = await parseInt(item[0].menuId);

      setProduct(productEntry);
    
    } else {
      setProduct(0);
    }
  }

  isTermsAccepted =() => {
    const { acceptedTerms } = this.context

    if(!acceptedTerms) {
      //snackbar
      this.setState({snackbar: true})
    } else {
      this.trackingCall()
    }
  }

  trackingCall =() => {
    const { userTracked, trackUser } = this.context

    if(!userTracked) {
      window.parent.postMessage({event: "HP-Soundtool", eventCategory: "ToolStart", eventAction: window.location.href},"*")
      trackUser(true);

      console.log(window.location.href)
    }
  }

  handleChange =(e) => {
    const { setProduct } = this.context

    setProduct(e.target.value)
  }

  handleClose =() => {
    this.setState({snackbar: false})
  }

  setTermsState =(e) => {
    const { setTerms } = this.context

    console.log(e)
    setTerms(e)
  }


    async playHeatpumpAudio(view, volume, active, origin, menuProduct) {
        
      const { heatpumpAudio, products, viewLocation, setHeatpumpVolume, setActiveView, setViewLocation, setViewLocationPrevious } = this.context;

      console.log(this.state.selectedProduct);
      setHeatpumpVolume(volume);

      if(!origin) {
        setViewLocationPrevious(viewLocation);
        setViewLocation(view);
        setActiveView(active);
      }

      var heatpump = document.getElementById("heatpumpAudioContainer");

      if(origin) {
        if(heatpump.duration > 0 && !heatpump.paused) {
          await heatpump.pause();
        }
      }
        
        heatpump.src = require(`../assets/audio/${ products[selectedTheme][active].audio[0] }`)

        console.log(heatpump);
        heatpump.volume = volume;

        if(heatpumpAudio) {
          heatpump.play();
        }

      if(!this.state.initialLoad) {
        this.setState({initialLoad: true})
      }

    }



isBeginning =() => {
  const { selectedTab, activeView } = this.context

  if(activeView == 1 && selectedTab == 0) {
    return true
  }
}

isEnd =() => {
  const { selectedTab, activeView } = this.context

  //alert(selectedTab)

  if(activeView == 0 && selectedTab == 2) {
    return true
  }
}

getResult =() => { 
  axios.get(`http://localhost:3000/api/getAll`, { params: { "Par-No": 44, "Scen-No": 42}})
      .then(res => {
        //const persons = res.data;
        //this.setState({ persons });
        console.log(res.data);
      })
}

  render() {

    const { products, productSelected, navSteps, selectedTab, setSelectedTab, stepperNavActive, setActiveView, setActiveStep, setNavDirection, setStepperNav, heatpumpAudio, activeView, activeStep, disableSlider } = this.context

    const { t } = this.props;

    //const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    //setValue(newValue);


    /*console.log(selectedTab);
    if(newValue != 0) {
      this.state.backBtn = false
    } else {
      this.state.backBtn = true
    }*/


    //alert(newValue);
    //this.setState({ selectedTab: newValue })
    setActiveStep(newValue.toString()+"-0")

    setActiveView(0)
    setSelectedTab(newValue);
  };

  const nextTab = (event, newValue) => {
    //setNavDirection('right')

    console.log(navSteps[0])

    console.log(activeView);

    if(navSteps[selectedTab] === activeView) {
      //alert("switch to next tab")
      setSelectedTab(selectedTab+1)
      //setActiveStep("1-0")
      setActiveView(0)
    } else {
      setActiveView(activeView+1);
    }

   
    this.state.backBtn = false;

    /*if(this.isEnd()) {
      this.state.fwdBtn = true;
    } else {
      this.state.fwdBtn = false;
    }*/

    
  };

  const previousTab = (event, newValue) => {
    setNavDirection('left')
    //setValue(newValue);
    //this.state.selectedTab = this.state.selectedTab+1
    //this.setState({ selectedTab: this.state.selectedTab-1 })
    //setSelectedTab(selectedTab-1)

    if(activeView === 0) {
      //alert("switch to next tab")
      setSelectedTab(selectedTab-1)
      //setActiveStep("1-0")
      setActiveView(navSteps[selectedTab-1])
    } else {
      //alert("activeView")
      setActiveView(activeView-1);
    }

    this.state.fwdBtn = false;

    /*if(this.isBeginning()) {
      //alert("that is the start")
      //document.querySelector("#previousTabBtn").disabled = true;
      //console.log(document.querySelector("#previousTabBtn"))
      this.state.backBtn = true
    } else {
      //document.querySelector("#previousTabBtn").disabled = false;
      this.state.backBtn = false
    }*/
  };

  const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
      backgroundColor: '#1890ff',
    },
  });
  
  const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      'Bosch-Regular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));

    return (
      <div className={styles.homeContainer}>
        <div className={styles.setupContainer}>

        <div style={{margin: '28px'}}>

           { /*<input type="text" value={this.state.parNo} /><br />

    <button onClick={() => { this.getResult() }}>getResult</button>*/ }

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AntTabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          <AntTab label="Gebäude & Austattung" icon={<FaHome style={{fontSize: '25px'}} />} iconPosition="start" {...a11yProps(0)} />
          <AntTab label="Ökonomische Kenngrößen" icon={<FaCloudSun style={{fontSize: '25px'}} />} iconPosition="start" {...a11yProps(1)} />
          <AntTab label="Ergebnisse" icon={<FaChartLine style={{fontSize: '25px'}} />} iconPosition="start" {...a11yProps(2)} />
        </AntTabs>


      </Box>
      <TabPanel value={selectedTab} index={0}>
        <navContent />
      </TabPanel>


      <div style={{display: 'flex', justifyContent: 'space-between' }}>
        <Button id="previousTabBtn" variant="contained" startIcon={<ArrowBackIosIcon />} disabled={this.state.backBtn} onClick={() => { previousTab() }}>Zurück</Button>
        <Button id="nextTabBtn" variant="contained" endIcon={<ArrowForwardIosIcon />} disabled={this.state.fwdBtn}  onClick={() => { nextTab() }}>Weiter</Button>
      </div>



 



    </Box>

          
          </div>

        </div>



        <audio id="heatpumpAudioContainer" className={styles.hide}
            controls
            loop
            src={require(`../assets/audio/${ products[selectedTheme][productSelected].audio[0] }`)}>
                Your browser does not support the
                <code>audio</code> element.
        </audio>

        <Disclaimer theme={selectedTheme} />
        <Liability theme={selectedTheme} />

       </div>
    );
  }
}

export default withRouter(withTranslation()(Home))
