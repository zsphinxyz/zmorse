export class MorseAudio {
  adx: AudioContext;
  osc?: OscillatorNode;
  gain?: GainNode;

  freq: number;
  speed: number;

  constructor(freq: number, speed: number) {
    this.freq = freq;
    this.speed = speed;

    this.adx = new AudioContext();
  }
  
  initialize() {
    this.osc = this.adx.createOscillator();
    this.gain = this.adx.createGain();
    this.osc.type = 'sine';
    this.osc.frequency.value = this.freq;
    this.osc.connect(this.gain);
    this.gain.connect(this.adx.destination);
    this.gain.gain.value = 0;
    if (this.adx.state == "suspended") {
      this.osc.start();
    }
    // this.gain.gain.value = 0.2;
  }

  setSpeed(speedInput: number) {
    this.speed = speedInput;
  }

  setFreq(freqInput: number) {
    if(this.osc) {this.osc.frequency.value = freqInput}
  }

  play() {
    this.gain && this.gain.gain.setTargetAtTime(0.2, 0, 0.001)
  }

  end() {
    if(this.gain) {
      this.gain.gain.setTargetAtTime(0, 0, 0.001);
      this.gain.gain.value = 0;
    }
  }

  async pauseTime(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  stopAudio() {
    if(this.osc && this.gain) {
      this.adx.suspend();
      this.osc.disconnect();
      this.osc.stop();
      this.gain.disconnect();
      this.gain.gain.value = 0;
    }
  }

  restartAudio() {
    if (!this.adx) {
      this.adx = new AudioContext();
    }
    this.adx.resume();
    this.initialize();
  }

  async playDot() {
    this.play();
    await this.pauseTime(this.speed);
    this.end();
  }

  async playDash() {
    this.play();
    await this.pauseTime(this.speed * 3);
    this.end();
  }

  async playMorse(morse: string) {
    this.initialize();
    const morseLi = morse.split('');
    const morseLength = morseLi.length;
    for (let i = 0; i < morseLength; i++) {
      if (morseLi[i] == '.') {
        await this.playDot();
      }
      else {
        await this.playDash();
      }
      await this.pauseTime(this.speed);
    }
  }

  async playMorseString(morseStr: string) {
    const morseLi = morseStr.split(' ');

    for (let i = 0; i < morseLi.length; i++) {
      let morseWord = morseLi[i].split('');
      for (let j = 0; j < morseWord.length; j++) {
        await this.playMorse(morseWord[j])
      }
      await this.pauseTime(this.speed * 2)
    }
  }

}