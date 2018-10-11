import Hls from 'hls.js';

export default class VideoMonitor {
  constructor(container, url, popup) {
    this.isOpen = false;

    this.url = url;
    this.container = container;
    this.video = this.container.querySelector('.js-monitoring-video');
    this.popup = popup;

    this.brightnessValue = 100;
    this.contrastValue = 100;

    this.init();
    this.initVideoStream();
  }

  init(url) {
    this.container.addEventListener('click', () => this.openPopup());
  }

  initVideoStream() {
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(this.url);
      hls.attachMedia(this.video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video.play();
      });
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = url;
      this.video.addEventListener('loadedmetadata', () => {
        this.video.play();
      });
    }
  }

  openPopup() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.video.muted = false;

    this.popup.open({
      mediaContainer: this.container,
      mediaElement: this.video,
      brightness: this.brightnessValue,
      contrast: this.contrastValue,
      closeHandler: this.closePopup.bind(this),
      filterHandler: this.applyFilter.bind(this),
    });
  }

  closePopup(brightness, contrast) {
    this.isOpen = false;
    this.video.muted = true;
  }

  applyFilter(brightness, contrast) {
    this.brightnessValue = brightness;
    this.contrastValue = contrast;
    this.video.style.filter = `brightness(${this.brightnessValue}%) contrast(${this.contrastValue}%)`
  }
}
