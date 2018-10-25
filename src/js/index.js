import VideoMonitor from './videoMonitor';
import Popup from './popup';
import initCameraControll from './cameraControll';

/**
 * Проверяет, тачевое ли устройство
 */
(() => {
  let isTouchDevice = false;

  if (
    (('ontouchstart' in window) || navigator.msMaxTouchPoints) ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
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
  const titles = document.querySelectorAll('.js-truncate');
  if (!titles.length) return;

  truncate();
  window.addEventListener('resize', truncate);

  function truncate() {
    for (let i = 0; i < titles.length; i++) {
      const item = titles[i];
      const maxHeight = parseInt(getComputedStyle(item).lineHeight, 10) * 2.5;
      let text = item.getAttribute('title');
      item.textContent = text;
      text = text.split(' ');

      while (item.offsetHeight > maxHeight) {
        text.pop();
        item.textContent = text.join(' ') + '...';
      }
    }
  }
})();

/**
 * Работа камеры
 */
initCameraControll();

/**
 * Видеонаблюдение
 */
(() => {
  const urls = [
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8',
    'http://127.0.0.1:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8',
  ];
  const elements = document.querySelectorAll('.js-monitoring-element');
  const popupElement = document.getElementById('video-monitoring-popup');
  if (!elements.length || !popupElement) return;

  const popup = new Popup(popupElement);
  for (let i = 0; i < elements.length; i++) {
    elements[i].videoMonitor = new VideoMonitor(
      elements[i],
      urls[i],
      popup,
    );
  }
})();
