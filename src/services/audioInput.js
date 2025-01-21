const currentRecognition = new window.webkitSpeechRecognition();
export { currentRecognition };
const autoSend = false;


class SpeechToText {
  constructor(onSpeech, onSubmit) {
    this.recognition = currentRecognition;
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.timer = null;

    this.recognition.onresult = (event) => {
      const text = event.results[event.resultIndex][0].transcript;
      onSpeech(text);
      if (autoSend == true) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          onSubmit();
        }, 7000);
      }
    };
  }

  startListening() {  // onSpeech will get called with each piece of text
    try {
      this.recognition.start();
    } catch (e) {
      if (e.message !== 'recognition has already started') {
        throw e; // Re-throw if it's a different error
      }
    }
  }

  stopListening() {
    if (this.timer) clearTimeout(this.timer);
    this.recognition.stop();
  }
}

export default SpeechToText;