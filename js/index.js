let isOn = false;

function initAudio() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Create an empty 5 seconds stereo buffer
    const numberOfChannels = 2;
    const length = this.audioContext.sampleRate * 5;
    const sampleRate = this.audioContext.sampleRate;
    const myArrayBuffer = this.audioContext.createBuffer(numberOfChannels, length, sampleRate);

    // Fill the buffer with white noise just random values between -1.0 and 1.0
    for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      // This gives us the actual array that contains the data
      const nowBuffering = myArrayBuffer.getChannelData(channel);
      for (let i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // Audio needs to be in [-1.0; 1.0]
        nowBuffering[i] = Math.random() * 2 - 1;
      }
    }

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    this.noiseSource = this.audioContext.createBufferSource();

    this.gainNode = this.audioContext.createGain();

    // Set the buffer in the AudioBufferSourceNode
    this.noiseSource.buffer = myArrayBuffer;
    this.noiseSource.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
}

function play(){
    isOn = !isOn;
    const switchButton = document.getElementById("switch-button");
    switchButton.innerHTML = isOn ? "Turn Off" : "Turn On";

    if (isOn) {
        initAudio();

        // Connect the AudioBufferSourceNode to the destination so we can hear the sound
        this.noiseSource.connect(this.audioContext.destination);
        this.noiseSource.loop = true;
	    this.noiseSource.start();
    } else {
        this.noiseSource.stop();
    }
}
