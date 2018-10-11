export default class Popup {
  constructor(node) {
    this.node = node;
    this.mediaContainer = null;
    this.closeButton = document.getElementById('video-monitoring-close');
    this.mainContainer = document.getElementById('video-monitoring-container');
    this.illuminationOutput = document.getElementById('video-monitoring-illumination');

    this.illuminationValue = null;
    this.intervalID = null;
    this.audioIntervalID = null;
    this.requestFrameID = null;

    this.TICK = 50;
    this.ANALYSER_FFTSIZE = 128;

    this.mediaElement = null;
    this.audioNode = null;
    this.videoCanvas = document.getElementById('video-monitoring-video');
    this.videoCanvasCtx = this.videoCanvas.getContext('2d');

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 64;
    this.sourceNodes = {};

    this.audioCanvas = document.getElementById('video-monitoring-audio');
    this.audioCanvasCtx = this.audioCanvas.getContext('2d');
    this.dataArrayAlt;
    this.bufferLengthAlt;

    this.init();
  }

  init() {
    this.closeButton.addEventListener('click', this.close.bind(this))

    // Esc
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.close();
    });
  }

  open({
    mediaContainer,
    mediaElement,
  }) {

    this.mediaContainer = mediaContainer;
    document.body.classList.add('opened-video');
    this.mediaElement = mediaElement;

    this.videoCanvas.width = mediaElement.offsetWidth;
    this.videoCanvas.height = mediaElement.offsetHeight;

    this.node.classList.add('open');
    this.mediaContainer.classList.add('open');
    this.closeButton.classList.add('open');

    this.requestFrameID = requestAnimationFrame(this.drawVideo.bind(this));
    
    this.intervalID = setInterval(() => this.calcIllumination(), this.TICK);
    this.videoIntervalID = setInterval(() => this.drawVideo(), this.TICK);
    this.initAnalyser();
  }

  close() {
    clearInterval(this.intervalID);
    clearInterval(this.videoIntervalID);
    clearInterval(this.audioIntervalID);
    cancelAnimationFrame(this.requestFrameID);
    this.audioNode.disconnect(this.analyser);

    this.node.classList.remove('open');
    this.closeButton.classList.remove('open');
    if(this.mediaContainer) this.mediaContainer.classList.remove('open');
    document.body.classList.remove('opened-video');
  }

  drawVideo() {
    const {width, height} = this.videoCanvas;
    this.videoCanvasCtx.drawImage(this.mediaElement, 0, 0, width, height);
  }

  calcIllumination() {
    const {width, height} = this.videoCanvas;
    const imageData = this.videoCanvasCtx.getImageData(0, 0, width, height);
    const {data} = imageData;

    let illumination = 0;
    for (let i = 0; i < data.length; i += 4) {
      illumination += (299 * data[i] + 587 * data[i+1] + 114 * data[i+2]) / 1000;
    }
    illumination = illumination / data.length;
    this.illuminationValue = illumination;
    this.illuminationOutput.innerText = Math.round(illumination * 10) / 10;
  }

  initAnalyser() {
    const id = this.mediaElement.getAttribute('id');
    this.audioNode = this.sourceNodes[id];
    if (!this.audioNode) {
      this.audioNode = this.audioCtx.createMediaElementSource(this.mediaElement);
      this.sourceNodes[id] = this.audioNode;
    }
    this.audioNode.connect(this.analyser).connect(this.audioCtx.destination)

    this.bufferLengthAlt = this.analyser.frequencyBinCount;
    this.dataArrayAlt = new Uint8Array(this.bufferLengthAlt);

    this.audioIntervalID = setInterval(this.audioVisualizing.bind(this), this.TICK);
  }

  audioVisualizing() {
    const width = this.audioCanvas.width;
    const height = this.audioCanvas.height;

    this.analyser.getByteFrequencyData(this.dataArrayAlt);

    this.audioCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.audioCanvasCtx.fillRect(0, 0, width, height);

    const barWidth = (width / this.bufferLengthAlt) * 2.5;
    let barHeight;
    let x = 0;

    for(var i = 0; i < this.bufferLengthAlt; i++) {
      barHeight = this.dataArrayAlt[i];

      this.audioCanvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
      this.audioCanvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight/2);

      x += barWidth + 1;
    }
  }
}
