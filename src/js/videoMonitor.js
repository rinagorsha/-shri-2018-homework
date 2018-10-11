import Hls from 'hls.js';

export default class VideoMonitor {
  constructor(container, url, popup) {
    this.isOpen = false;

    this.url = url;
    this.container = container;
    this.video = this.container.querySelector('.js-monitoring-video');
    this.popup = popup;

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

    this.popup.open({
      mediaContainer: this.container,
      mediaElement: this.video,
    });
  }
}
