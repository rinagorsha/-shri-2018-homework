import Hls from 'hls.js';
import VideoController from './videoController';

export default class VideoMonitor {
  isOpen: boolean;
  url: string;
  container: HTMLElement;
  video: HTMLVideoElement;
  popup: VideoController;
  brightnessValue: number;
  contrastValue: number;

  constructor(container: HTMLElement, video: HTMLVideoElement, url: string, popup: VideoController) {
    this.isOpen = false;

    this.url = url;
    this.container = container;
    this.video = video;
    this.popup = popup;

    this.brightnessValue = 100;
    this.contrastValue = 100;

    if (!this.video) return;

    this.init();
    this.initVideoStream();
  }

  init() {
    this.container.addEventListener('click', () => this.open());
  }

  initVideoStream(): void {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.url);
      hls.attachMedia(this.video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video.play();
      });
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = this.url;
      this.video.addEventListener('loadedmetadata', () => {
        this.video.play();
      });
    }
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.video.muted = false;
    this.video.play(); // на случай, если автоплей не сработал

    this.popup.open(this);
  }

  close(): void {
    this.isOpen = false;
    this.video.muted = true;
  }
}
