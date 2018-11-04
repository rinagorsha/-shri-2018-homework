import './store';
import './navigation';

// tslint:disable-next-line
declare global {
  // tslint:disable-next-line
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
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
