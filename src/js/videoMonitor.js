import Hls from 'hls.js';

export default class VideoMonitor {
  constructor(container, url, popup) {
    this.url = url;
    this.container = container;
    this.video = this.container.querySelector('.js-monitoring-video');
    this.popup = popup;

    this.init();
  }

  init(url) {
    this.initVideoStream();
    this.container.addEventListener('click', () => {
      this.popup.open(
        this.video,
      );
    });
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
      this.video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
      this.video.addEventListener('loadedmetadata', () => {
        this.video.play();
      });
    }
  }
}
