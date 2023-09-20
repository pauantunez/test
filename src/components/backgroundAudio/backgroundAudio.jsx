import React from 'react';
import AppContext from '../../AppContext'

import styles from '../../styles/backgroundAudio.module.css';

export default class BackgroundAudio extends React.Component {
  
    constructor(props) {
        super(props)
        
        this.state = {
            audio: "birds.mp3",
        }
        
    }

    static contextType = AppContext

    componentDidMount() {
        const { appVolume, viewLocation, backgroundAudio, time, ambientAudio, backgroundAudioLevels } = this.context

        var convertedVolume = appVolume;
        var backgroundVolume = 0;
        
            if(time) {
              if(viewLocation === 'outdoor') {
                
                if(ambientAudio) {
                    backgroundVolume = backgroundAudioLevels['outdoorNight'];
                }

                this.playBackgroundAudio(backgroundAudio[2],backgroundVolume*convertedVolume);
                
                
              } else {
                if(ambientAudio) {
                    backgroundVolume = backgroundAudioLevels['indoorNight'];
                }
                
                this.playBackgroundAudio(backgroundAudio[3],backgroundVolume*convertedVolume);
                
              }
            } else {
              if(viewLocation === 'outdoor') {
                if(ambientAudio) {
                    backgroundVolume = backgroundAudioLevels['outdoorDay'];
                }
                
                this.playBackgroundAudio(backgroundAudio[0],backgroundVolume*convertedVolume);
              } else {
                if(ambientAudio) {
                    backgroundVolume = backgroundAudioLevels['indoorDay'];
                }
                
                this.playBackgroundAudio(backgroundAudio[1],backgroundVolume*convertedVolume);
              }
            }
        
    }

    playBackgroundAudio(source, volume) {
      var heatpump = document.getElementById("backgroundAudioContainer");
      heatpump.src = require(`../../assets/audio/${ source }`)
      //heatpump.volume = volume;
      //heatpump.play();
      
    }

    adaptZoom(zoom) {
        this.props.action(zoom);
    }

    render() {
    return (

        <div className={styles.backgroundAudio}>
            <audio id="backgroundAudioContainer" className={styles.hide}
                controls
                loop
                >
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </div>

    );
  }
}