import { currentRecognition } from "./audioInput";

const voiceDebug = false;

if (voiceDebug && !window.consoleDiv) {
  window.consoleDiv = document.createElement('div');
  window.consoleDiv.style.cssText = 'position:fixed; top:0; left:0; right:0; height:150px; background:black; overflow:auto; padding:10px; border-top:1px solid black; z-index:99999';
  document.body.appendChild(window.consoleDiv);
}
const log = (...args) => {
  console.log(...args);
  if (voiceDebug) {
    window.consoleDiv.innerHTML += args.join(' ') + '<br>';
    window.consoleDiv.scrollTop = window.consoleDiv.scrollHeight;
  }
};

class TTSService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voice = null;

    window.speechSynthesis.onstart = () => {
      this.stopListening();  // Stop recognition when synthesis begins
    };
    
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      log('Available voices:', voices.length);

      voices.forEach(voice => log('Voice:', voice.name, voice.lang));

      if (voices.length) {
        this.voice = voices.find(voice => 

          voice.name === 'Shelly' ||
          voice.name === 'Google US English' ||
          voice.name.includes('Female')
        ) || voices[1];
        log('Selected voice:', this.voice?.name);
      }
    };

    loadVoices();

    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoices;
    }


    this.settings = {
        pitch: 1.0,
        rate: 1.2
      };
    }

  speak(text) {
    try {
      currentRecognition.stop();
      if (!text) return;
      console.log("MIC TURNED OFF");
      this.synthesis.cancel();
      
      log("Voice details:", {
        name: this.voice?.name,
        lang: this.voice?.lang,
        localService: this.voice?.localService,
        voiceURI: this.voice?.voiceURI
      });

      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      sentences.forEach((sentence, index) => {
        let processedSentence = sentence.trim().replace(/\./g, ',');
        const utterance = new SpeechSynthesisUtterance(processedSentence);
        utterance.pitch = this.settings.pitch;
        utterance.rate = this.settings.rate;
        utterance.voice = this.voice;

        setTimeout(() => {
          this.synthesis.speak(utterance);
        }, index * 10);

        if (index === sentences.length - 1) {
          utterance.onend = () => {
            console.log("MIC TURNEDON");
            currentRecognition.start();  // Turn mic back on after last sentence
          };
        }

      });
    } catch(e) {
      log("ERROR:", e.message);
    }
  }
}

export const tts = new TTSService();