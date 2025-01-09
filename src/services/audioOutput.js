const voiceDebug = true;

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
    
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      log('Available voices:', voices.length);

      voices.forEach(voice => log('Voice:', voice.name, voice.lang));

      if (voices.length) {
        this.voice = voices.find(voice => 

          voice.name === 'Kathy' ||
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
    try {
      if (!text) return;
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
        utterance.pitch = this.defaultSettings.pitch;
        utterance.rate = this.defaultSettings.rate;
        utterance.voice = this.voice;

        utterance.onstart = () => log(`Started speaking ${index + 1}`);
        utterance.onend = () => log(`Ended speaking ${index + 1}`);
        utterance.onerror = (e) => log(`Error speaking ${index + 1}:`, e.error);

        setTimeout(() => {
          log(`6. Attempting to speak sentence ${index + 1}`);
          this.synthesis.speak(utterance);
          log(`7. Synthesis state for sentence ${index + 1}:`, 
            "speaking=" + this.synthesis.speaking,
            "paused=" + this.synthesis.paused);
        }, index * 10);
      });
    } catch(e) {
      log("ERROR:", e.message);
    }
  }
}

export const tts = new TTSService();