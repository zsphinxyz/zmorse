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

  async pauseTime(ms:number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async playDot() {
    this.play()
    await this.pauseTime(this.speed);
    this.end()
  }

  async playDash() {
    this.play()
    await this.pauseTime(this.speed*3)
    this.end()
  }

  async playMorse(letter:string) {
    const li = letter.split('')
    this.initialize();

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

  async playMorseLetter(morseWord:string) {
    const li = morseWord.split('');

    for(let i=0; i<li.length; i++) {
      await this.playMorse(li[i]);
    }
    await this.pauseTime(this.speed);
  }

  async playMorseString(morseString: string) {
    const li = morseString.split(" ");
    const len = li.length;

    for (let i=0; i<len; i++) {
      await this.playMorseLetter(li[i])
      await this.pauseTime(this.speed*3)
    }
  }


  
  private bufferToWave(buffer: AudioBuffer): Blob {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2 + 44;
    const result = new DataView(new ArrayBuffer(length));
    const channels = [];
    let offset = 0;
    let pos = 0;
  
    // Write WAV header
    const writeString = (s: string) => {
      for (let i = 0; i < s.length; i++) {
        result.setUint8(pos++, s.charCodeAt(i));
      }
    };
  
    writeString('RIFF');
    result.setUint32(pos, length - 8, true);
    pos += 4;
    writeString('WAVE');
    writeString('fmt ');
    result.setUint32(pos, 16, true);
    pos += 4;
    result.setUint16(pos, 1, true);
    pos += 2;
    result.setUint16(pos, numOfChannels, true);
    pos += 2;
    result.setUint32(pos, buffer.sampleRate, true);
    pos += 4;
    result.setUint32(pos, buffer.sampleRate * 4, true);
    pos += 4;
    result.setUint16(pos, numOfChannels * 2, true);
    pos += 2;
    result.setUint16(pos, 16, true);
    pos += 2;
    writeString('data');
    result.setUint32(pos, length - pos - 4, true);
    pos += 4;
  
    // Write interleaved audio data
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }
  
    while (pos < length) {
      for (let i = 0; i < numOfChannels; i++) {
        const sample = Math.max(-1, Math.min(1, channels[i][offset])); // Clamp value
        result.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        pos += 2;
      }
      offset++;
    }
  
    return new Blob([result], { type: 'audio/wav' });
  }

  async downloadAudio(morseString: string) {
    // Calculate the total duration of the audio based on the Morse code string
    const unitTime = this.speed; // Base unit time for a dot
    const totalDuration = morseString.split("").reduce((acc, char) => {
      if (char === ".") return acc + unitTime * 3; // Dot duration
      if (char === "-") return acc + unitTime * 5; // Dash duration
      if (char === " ") return acc + unitTime * 7; // Space between words
      return acc + unitTime; // Space between letters
    }, 0) + unitTime * 3; // Add extra time for the final pause
  
    // Create an OfflineAudioContext with the calculated duration
    const offlineCtx = new OfflineAudioContext(1, this.adx.sampleRate * (totalDuration / 1000), this.adx.sampleRate);
  
    // Create oscillator and gain nodes for the offline context
    const osc = offlineCtx.createOscillator();
    const gain = offlineCtx.createGain();
  
    osc.type = this.osc.type;
    osc.frequency.value = this.freq;
  
    gain.gain.value = 0; // Start with gain at 0 (silent)
  
    // Connect nodes
    osc.connect(gain);
    gain.connect(offlineCtx.destination);
  
    // Schedule the Morse code pattern
    let currentTime = 0;
    for (const char of morseString) {
      if (char === ".") {
        gain.gain.setValueAtTime(0.2, currentTime / 1000); // Dot: play
        currentTime += unitTime;
        gain.gain.setValueAtTime(0, currentTime / 1000); // Silence
      } else if (char === "-") {
        gain.gain.setValueAtTime(0.2, currentTime / 1000); // Dash: play
        currentTime += unitTime * 3;
        gain.gain.setValueAtTime(0, currentTime / 1000); // Silence
      } else if (char === " ") {
        currentTime += unitTime * 7; // Space between words
      } else {
        currentTime += unitTime * 3; // Space between letters
      }
      currentTime += unitTime; // Add inter-symbol silence
    }
  
    // Start the oscillator
    osc.start(0);
    osc.stop(currentTime / 1000);
  
    // Render the audio
    const renderedBuffer = await offlineCtx.startRendering();
  
    // Convert the rendered buffer to a WAV file
    const audioBlob = this.bufferToWave(renderedBuffer);
    const url = URL.createObjectURL(audioBlob);
  
    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'morse_code.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 
}