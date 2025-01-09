
if (!window.consoleDiv) {
    window.consoleDiv = document.createElement('div');
    window.consoleDiv.style.cssText = 'position:fixed; top:0; left:0; right:0; height:150px; background:black; overflow:auto; padding:10px; border-top:1px solid black; z-index:99999';
    document.body.appendChild(window.consoleDiv);
}

const log = (...args) => {
    console.log(...args);
    window.consoleDiv.innerHTML += args.join(' ') + '<br>';
};


class TTSService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voice = null;
    
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      log('Available voices:', voices.length);
      if (voices.length) {
        this.voice = voices.find(voice => 
          voice.name === 'Samantha' ||
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

    this.defaultSettings = {
      pitch: 1.1,
      rate: 1.2
    };
  }

  speak(text) {

    if (!text) return;
    this.synthesis.cancel();
    log ("speaking", text);

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    sentences.forEach((sentence, index) => {
      let processedSentence = sentence.trim().replace(/\./g, ',');

      console.log(processedSentence);

      const utterance = new SpeechSynthesisUtterance(processedSentence);
      
      utterance.pitch = this.defaultSettings.pitch;
      utterance.rate = this.defaultSettings.rate;
      utterance.voice = this.voice;

      setTimeout(() => {
        this.synthesis.speak(utterance);
      }, index * 10);
    });
  }
}

export const tts = new TTSService();