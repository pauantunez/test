import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepContent } from '@mui/material'
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import AppContext from '../../AppContext'
import Tab1Step1 from './building/step1'
import Tab1Step2 from './building/step2'
import Tab1Step3 from './building/step3'
import Tab1Step4 from './building/step4'
import FacilitiesStep1 from './facilities/step1'
import FacilitiesStep2 from './facilities/step2'
import FacilitiesStep3 from './facilities/step3'
import FacilitiesStep4 from './facilities/step4'
import CostStep1 from './cost/step1'
import CostStep2 from './cost/step2'
import CostStep3 from './cost/step3'
import ResultStep1 from './result/step1'
import ResultStep2 from './result/step2'
import ResultStep3 from './result/step3'

import {
  Button,
} from 'reactstrap';
import axios from 'axios';

import { withTranslation } from 'react-i18next';

import {ReactComponent as HomeIcon} from '../../assets/img/icons/home.svg';
import {ReactComponent as PhotovoltaicIcon} from '../../assets/img/icons/photovoltaic.svg';
import {ReactComponent as CashIcon} from '../../assets/img/icons/cash.svg';
import {ReactComponent as ClipboardIcon} from '../../assets/img/icons/clipboard.svg';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const steps = ['Select campaign settings', '', 'Create an ad'];
var entryParam;
var foundTheme;
var btnFont;
var fontHeadline;
var fontRegular;
var btnColor;

class NavContent extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            overlayToggle: false,
            imprint: [],
            theme: props.theme,
            activeStep: 0,

        }
    }

    static contextType = AppContext

    componentDidMount() {
        
    }

    async toggleModal() {

      if(this.state.overlayToggle) {
          this.setState({overlayToggle: false})
      } else {
          this.setState({overlayToggle: true})
      }

    }

    handleStep(step) {

      const { selectedTab, activeView, activeStep, setActiveView, setActiveStep, steps, setSteps, setFwdBtn } = this.context;

      if(activeView != step) {

        if(step != 0) {
          if(steps[step-1] === false) {
            setActiveView(step);
            setActiveStep(selectedTab.toString()+"-"+step.toString())
            setFwdBtn(true);
          }
        } else {
            setActiveView(step);
            setActiveStep(selectedTab.toString()+"-"+step.toString())
            setFwdBtn(true);
        }
      
      }

    }

    nextStep(step) {
      this.setState({activeStep: this.state.activeStep+1})
    }

    render() {

      const { t } = this.props;
      const { overlayToggle } = this.state;
      const { heatpumpAudio, products, viewLocation, activeView, setHeatpumpVolume, setActiveView, setViewLocation, setViewLocationPrevious } = this.context;

      const styles = {
        main: {
          backgroundColor: "#f1f1f1",
          width: "100%",
        },
        activeCompleted: {
          filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)'
        },
        incomplete: {
          filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)'
        },
      };


      function EmptyIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="0" />
          </SvgIcon>
        );
      }



const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    paddingTop: '0px',
    fontSize: '12px',
    [`& .MuiStepLabel-label`]: {
      marginTop: '0px',
      fontSize: '14px',
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        '#2C76D2',
        marginLeft: 'calc(0% - 13px)',
        marginRight: 'calc(0% - 13px)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        '#2C76D2',
        marginLeft: 'calc(0% - 13px)',
        marginRight: 'calc(0% - 13px)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
    marginLeft: 'calc(0% - 13px)',
    marginRight: 'calc(0% - 13px)',
    
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 32,
  height: 32,
  display: 'flex',
  marginTop: '7px',
  borderRadius: '50%',
  justifyContent: 'center',
  cursor: 'pointer',
  alignItems: 'center',
  ...(ownerState.active && {
    background:
      '#2C76D2',
      fontSize: '12px',
  }),
  ...(ownerState.completed && {
    background:
      '#2C76D2',
      fontSize: '12px',
      
  }),
}));

const ColorlibStepIconRootSmall = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 16,
  height: 16,
  display: 'flex',
  marginTop: '15px',
  borderRadius: '50%',
  justifyContent: 'center',
  cursor: 'pointer',
  alignItems: 'center',
  ...(ownerState.active && {
    background:
      '#2C76D2',
      backgroundPosition: 'bottom center',
  }),
  ...(ownerState.completed && {
    background:
      '#2C76D2',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <HomeIcon className={completed || active? 'iconColorCompleted': 'iconColorStandard'} />,
    2: <EmptyIcon />,
    3: <EmptyIcon />,
    4: <EmptyIcon />,
    5: <PhotovoltaicIcon className={completed || active? 'iconColorCompleted': 'iconColorStandard'} />,
    6: <EmptyIcon />,
    7: <EmptyIcon />,
    8: <EmptyIcon />,
    9: <CashIcon className={completed || active? 'iconColorCompleted': 'iconColorStandard'} />,
    10: <EmptyIcon />,
    11: <EmptyIcon />,
    12: <ClipboardIcon className={completed || active? 'iconColorCompleted': 'iconColorStandard'} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ColorlibStepIconSmall(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AccessAlarmIcon />,
    2: <EmptyIcon />,
    3: <EmptyIcon />,
    4: <EmptyIcon />,
    5: <PhotovoltaicIcon />,
    6: <EmptyIcon />,
    7: <EmptyIcon />,
    8: <EmptyIcon />,
    9: <CashIcon />,
    10: <EmptyIcon />,
    11: <EmptyIcon />,
    12: <ClipboardIcon />,
  };

  return (
    <ColorlibStepIconRootSmall ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRootSmall>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};





          return  ( 
          <div>

            <Stack sx={{ width: '100%' }} spacing={4}>
                  <Stepper alternativeLabel activeStep={activeView} connector={<ColorlibConnector />}>
                                <Step key="0" style={{alignItems: 'flex-start'}}>
                                  <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => { this.handleStep(0) }}>
                                    <span style={{display: 'block', marginTop: '-8px', fontSize: '13px', fontFamily: 'Bosch-Medium'}}>Gebäude</span>
                                  </StepLabel>
                                </Step>
                                <Step key="1">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(1) }}></StepLabel>
                                </Step>
                                <Step key="2">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(2) }}></StepLabel>
                                </Step>
                                <Step key="3">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(3) }}></StepLabel>
                                </Step>
                                <Step key="4">
                                  <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => { this.handleStep(4) }}>
                                    <span style={{display: 'block', marginTop: '-8px', fontSize: '13px', fontFamily: 'Bosch-Medium'}}>Ausstattung</span>
                                  </StepLabel>
                                </Step>
                                <Step key="5">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(5) }}></StepLabel>
                                </Step>
                                <Step key="6">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(6) }}></StepLabel>
                                </Step>
                                <Step key="6">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(7) }}></StepLabel>
                                </Step>
                                <Step key="7">
                                  <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => { this.handleStep(8) }}>
                                    <span style={{display: 'block', marginTop: '-8px', fontSize: '13px', fontFamily: 'Bosch-Medium'}}>Ökonomische Größen</span>
                                  </StepLabel>
                                </Step>
                                <Step key="8">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(9) }}></StepLabel>
                                </Step>
                                <Step key="9">
                                  <StepLabel StepIconComponent={ColorlibStepIconSmall} onClick={() => { this.handleStep(10) }}></StepLabel>
                                </Step>
                                <Step key="10">
                                  <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => { this.handleStep(11) }}>
                                    <span style={{display: 'block', marginTop: '-8px', fontSize: '13px', fontFamily: 'Bosch-Medium'}}>
                                      <span>
                                        Ergebnis&nbsp;
                                        { activeView==11 &&
                                          <span>(1/2)</span>
                                        }
                                        { activeView==12 &&
                                          <span>(2/2)</span>
                                        }
                                        { activeView==13 &&
                                          <span>(2/2)</span>
                                        }
                                      </span>
                                    
                                    </span>
                                  </StepLabel>
                                </Step>
                  </Stepper>
                </Stack>

            <Box sx={{ width: '100%' }}>

              { activeView==0 && <Tab1Step1 /> }
              { activeView==1 && <Tab1Step2 /> }
              { activeView==2 && <Tab1Step3 /> }
              { activeView==3 && <Tab1Step4 /> }
              { activeView==4 && <FacilitiesStep1 /> }
              { activeView==5 && <FacilitiesStep2 /> }
              { activeView==6 && <FacilitiesStep3 /> }
              { activeView==7 && <FacilitiesStep4 /> }
              { activeView==8 && <CostStep1 /> }
              { activeView==9 && <CostStep2 /> }
              { activeView==10 && <CostStep3 /> }
              { activeView==11 && <ResultStep1 /> }
              { activeView==12 && <ResultStep2 /> }
              { activeView==13 && <ResultStep3 /> }

            </Box>

          </div>
          )

  }
}

export default withRouter(withTranslation()(NavContent));