export class MorseAudio {
  adx: AudioContext;
  osc: OscillatorNode;
  gain: GainNode;

  freq: number;
  speed: number;

  constructor(freq:number, speed:number) {
    this.freq = freq;
    this.speed = speed;

    this.adx = new AudioContext();
    this.osc = this.adx.createOscillator();
    this.gain = this.adx.createGain();

    this.osc.type = 'sine';
    this.osc.frequency.value = this.freq;
    this.gain.connect(this.adx.destination);
    this.osc.connect(this.gain);
    this.gain.gain.value = 0;
    this.osc.start(); 
  }
  
  initialize() {
    if(this.adx.state == "suspended"){
      this.adx.resume();
    }
  }

  setSpeed(speedInput:number) {
    this.speed = speedInput;
  }

  setFreq(freqInput:number) {
    this.osc.frequency.value = freqInput;
  }

  play() {
    this.gain.gain.setTargetAtTime(0.2, 0, 0.001)
  }

  end() {
    this.gain.gain.setTargetAtTime(0, 0, 0.001)
  }

  async pauseTime(time:number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  async playDot() {
    this.play()
    await this.pauseTime(this.speed);
    this.end()
  }

  async playDash() {
    this.play()
    await this.pauseTime(this.speed+150)
    this.end()
  }

  async playMorse(letter:string) {
    const li = letter.split('')

    for(let i=0; i < li.length; i++) {
      if(li[i] == '.') {
        await this.playDot();
      }
      else {
        await this.playDash();
      }
      await this.pauseTime(this.speed);
    };
  }

  async playString(word:string) {
    const li = word.split('')
  }

}