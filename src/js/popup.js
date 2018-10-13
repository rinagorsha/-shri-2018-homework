import MotionDetector from './motionDetector';

export default class Popup {
  constructor(node) {
    this.node = node;
    this.closeButton = document.getElementById('video-monitoring-close');
    this.inputBrightness = document.getElementById('video-input-brightness');
    this.inputContrast = document.getElementById('video-input-contrast');
    this.illuminationOutput = document.getElementById('video-monitoring-illumination');

    this.brightnessValue = 100;
    this.contrastValue = 100;
    this.illuminationValue = null;

    this.intervalID = null;
    this.audioIntervalID = null;
    this.motionIntervalID = null;
    this.requestFrameID = null;

    this.TICK = 50;
    this.ANALYSER_FFTSIZE = 64;

    this.mediaElement = null;
    this.videoCanvas = document.getElementById('video-monitoring-video');
    this.videoCanvasCtx = this.videoCanvas.getContext('2d');

    this.canvasBlended = document.getElementById('video-monitoring-blended');
    this.canvasMotion = document.getElementById('video-monitoring-motion');

    this.audioCanvas = document.getElementById('video-monitoring-audio');
    this.audioCanvasCtx = this.audioCanvas.getContext('2d');
    this.audioCtx = null;
    this.analyser = null;
    this.sourceNodes = {};
    this.dataArrayAlt;
    this.bufferLengthAlt;

    this.motionDetector = new MotionDetector(this.videoCanvas, this.canvasBlended, this.canvasMotion);

    this.init();
  }

  init() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = this.ANALYSER_FFTSIZE;

    // Esc
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.close();
    });
    this.closeButton.addEventListener('click', this.close.bind(this))

    this.inputBrightness.addEventListener('change', (e) => {
      this.brightnessValue = e.target.value;
      this.applyFilter();
    });
    this.inputBrightness.addEventListener('input', (e) => {
      this.brightnessValue = e.target.value;
      this.applyFilter();
    });

    this.inputContrast.addEventListener('change', (e) => {
      this.contrastValue = e.target.value;
      this.applyFilter();
    });
    this.inputContrast.addEventListener('input', (e) => {
      this.contrastValue = e.target.value;
      this.applyFilter();
    });
  }

  open(mediaElement) {
    this.mediaElement = mediaElement;

    this.videoCanvas.width = mediaElement.video.offsetWidth;
    this.videoCanvas.height = mediaElement.video.offsetHeight;
    this.canvasBlended.width = mediaElement.video.offsetWidth;
    this.canvasBlended.height = mediaElement.video.offsetHeight;
    this.canvasMotion.width = mediaElement.video.offsetWidth;
    this.canvasMotion.height = mediaElement.video.offsetHeight;
    
    document.body.classList.add('opened-video');
    this.node.classList.add('open');
    this.mediaElement.container.classList.add('open');
    this.closeButton.classList.add('open');
    this.inputBrightness.value = this.mediaElement.brightnessValue;
    this.inputContrast.value = this.mediaElement.contrastValue;

    this.requestFrameID = requestAnimationFrame(this.drawVideo.bind(this));
    this.intervalID = setInterval(() => this.calcIllumination(), this.TICK);
    this.videoIntervalID = setInterval(() => this.drawVideo(), this.TICK);
    this.motionIntervalID = setInterval(() => this.motionDetector.update(), this.TICK);
    this.initAnalyser();
  }

  close() {
    clearInterval(this.intervalID);
    clearInterval(this.videoIntervalID);
    clearInterval(this.motionIntervalID);
    clearInterval(this.audioIntervalID);
    cancelAnimationFrame(this.requestFrameID);
    this.audioNode.disconnect(this.analyser);

    this.node.classList.remove('open');
    this.closeButton.classList.remove('open');
    this.mediaElement.container.classList.remove('open');
    document.body.classList.remove('opened-video');
    this.mediaElement.close();
    this.mediaElement = null;
  }

  applyFilter() {
    this.mediaElement.video.style.filter = `brightness(${this.brightnessValue}%) contrast(${this.contrastValue}%)`;
    this.mediaElement.brightnessValue = this.brightnessValue;
    this.mediaElement.contrastValue = this.contrastValue;
  }

  drawVideo() {
    const {width, height} = this.videoCanvas;
    this.videoCanvasCtx.drawImage(this.mediaElement.video, 0, 0, width, height);
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
    const id = this.mediaElement.video.getAttribute('id');
    this.audioNode = this.sourceNodes[id];
    if (!this.audioNode) {
      this.audioNode = this.audioCtx.createMediaElementSource(this.mediaElement.video);
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
    this.audioCanvasCtx.clearRect(0, 0, width, height);

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
