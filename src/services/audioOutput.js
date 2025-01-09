class TTSService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voice = null;
    
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      if (voices.length) {
        this.voice = voices.find(voice => 
          voice.name === 'Google US English' ||
          voice.name.includes('Female')
        ) || voices[0];
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

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    sentences.forEach((sentence, index) => {
      let processedSentence = sentence.trim().replace(/\./g, ',');

      console.log(processedSentence);

      const utterance = new SpeechSynthesisUtterance(processedSentence);
      
      utterance.pitch = this.defaultSettings.pitch;
      utterance.rate = this.defaultSettings.rate;
      utterance.voice = this.voice;

      console.log(this.voice);

      setTimeout(() => {
        this.synthesis.speak(utterance);
      }, index * 10);
    });
  }
}

export const tts = new TTSService();