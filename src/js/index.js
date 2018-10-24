import VideoMonitor from './videoMonitor';
import Popup from './popup';

/**
 * Проверяет, тачевое ли устройство
 */
(() => {
  let isTouchDevice = false;

  if (('ontouchstart' in window) || navigator.msMaxTouchPoints || window.DocumentTouch && document instanceof DocumentTouch) {
    isTouchDevice = true;
  }

  if (isTouchDevice) {
    document.body.classList.add('is-touch-device');
    return;
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
      let text = item.dataset.original
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
(() => {
  const camera = document.querySelector('.js-camera');
  const image = document.querySelector('.js-camera-image');
  const scaleEl = document.querySelector('.js-camera-scale');
  const brightnessEl = document.querySelector('.js-camera-brightness');

  if (!camera || !image || !scaleEl || !brightnessEl) return;

  let evCache = [];
  let gesture = null;
  let prevScaleDiff = -1;
  let currentScale = 1;

  const SCALE_MULTIPLIER = 8000;
  const PINCH_VS_SCALE = 3;
  const MAX_SCALE = 2;

  camera.addEventListener('pointerdown', (event) => {
    camera.setPointerCapture(event.pointerId);
    evCache.push(event);

    const {x, y} = event;
    const currentX = parseInt(getComputedStyle(image).backgroundPositionX, 10) || 0;
    const currentY = parseInt(getComputedStyle(image).backgroundPositionY, 10) || 0;

    gesture = {
      startX: event.x - currentX,
      startY: event.y - currentY,
    };
  });

  camera.addEventListener('pointermove', (event) => {
    if (!gesture) {
      return
    }

    // drag
    if (evCache.length === 1) {
      const dx = gesture.startX - event.x;
      const dy = gesture.startY - event.y;

      image.style.backgroundPosition = `${-dx}px ${-dy}px`;
    }

    if (evCache.length === 2) {
      // brightness
      const dx = Math.abs(evCache[0].x - evCache[1].x);
      const dy = Math.abs(evCache[0].y - evCache[1].y);
      const diffAtan = Math.atan2(dy,dx);
      image.style.filter = `brightness(${diffAtan})`;
      brightnessEl.innerText = `${Math.round(diffAtan * 100)}%`;

      // scale
      const currentScaleDiff = Math.hypot(dy, dx);
      if (Math.abs(currentScaleDiff - prevScaleDiff) > PINCH_VS_SCALE) {
        if (currentScaleDiff > prevScaleDiff) currentScale += currentScaleDiff / SCALE_MULTIPLIER;
        if (currentScaleDiff < prevScaleDiff) currentScale -= currentScaleDiff / SCALE_MULTIPLIER;
      }
      currentScale = Math.min(MAX_SCALE, Math.max(1, currentScale));
      prevScaleDiff = currentScaleDiff;

      image.style.transform = `scale(${currentScale})`;
      scaleEl.innerText = `${Math.round(currentScale * 100)}%`;
    }

    for (let i = 0; i < evCache.length; i++) {
      if (event.pointerId == evCache[i].pointerId) {
        evCache[i] = event;
        break;
      }
    }
  });

  const resetGesture = () => {
    if (!gesture) {
      return
    }
    gesture = null;
    evCache = [];
  }
  camera.addEventListener('pointerup', resetGesture);
  camera.addEventListener('pointercancel', resetGesture);
})();

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
