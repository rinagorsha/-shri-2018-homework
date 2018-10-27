import VideoMonitor from './videoMonitor';
import VideoController from './videoController';
import initCameraController from './cameraController';

declare global {
  interface Window {
    AudioContext: { new(): AudioContext },
    webkitAudioContext: { new(): AudioContext },
  }
}

/**
 * Проверяет, тачевое ли устройство
 */
(() => {
  let isTouchDevice: boolean = false;

  if (('ontouchstart' in window) || navigator.msMaxTouchPoints) {
    isTouchDevice = true;
  }

  if (isTouchDevice) {
    document.body.classList.add('is-touch-device');
  }
})();

/**
 * Обрезает заголовки
 */
(() => {
  const titles: NodeListOf<HTMLElement> = document.querySelectorAll('.js-truncate');
  if (!titles.length) return;

  truncate();
  window.addEventListener('resize', truncate);

  function truncate() {
    for (let i = 0; i < titles.length; i++) {
      const item: HTMLElement = titles[i];
      const lineHeight: string = getComputedStyle(item).lineHeight || '1';

      const maxHeight: number = parseInt(lineHeight, 10) * 2.5;
      const text: string = item.getAttribute('title') || '';
      const textArr: string[] = text.split(' ');
      item.textContent = text;

      while (item.offsetHeight > maxHeight) {
        textArr.pop();
        item.textContent = textArr.join(' ') + '...';
      }
    }
  }
})();

/**
 * Работа камеры
 */
initCameraController();

/**
 * Видеонаблюдение
 */
(() => {
  const urls: string[] = [
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8',
  ];
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.js-monitoring-element');

  const popupElement: HTMLElement | null = document.getElementById('video-monitoring-popup');
  const videoCanvas: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('video-monitoring-video');
  const audioCanvas: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('video-monitoring-audio');
  const canvasMotion: HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('video-monitoring-motion');

  const closeButton: HTMLElement | null = document.getElementById('video-monitoring-close');
  const illuminationOutput: HTMLElement | null = document.getElementById('video-monitoring-illumination');
  const inputBrightness: HTMLInputElement | null = <HTMLInputElement> document.getElementById('video-input-brightness');
  const inputContrast: HTMLInputElement | null = <HTMLInputElement> document.getElementById('video-input-contrast');

  if (
    !elements.length ||
    !popupElement ||
    !videoCanvas ||
    !audioCanvas ||
    !canvasMotion ||
    !closeButton ||
    !illuminationOutput ||
    !inputBrightness ||
    !inputContrast
  ) return;

  const controller: VideoController = new VideoController({
    node: popupElement,
    videoCanvas,
    audioCanvas,
    canvasMotion,
    closeButton,
    inputBrightness,
    inputContrast,
    illuminationOutput,
  });


  for (let i = 0; i < elements.length; i++) {
    const video: HTMLVideoElement | null = elements[i].querySelector('.js-monitoring-video');
    if (!video) continue;

    new VideoMonitor(
      elements[i],
      video,
      urls[i],
      controller,
    );
  }
})();
