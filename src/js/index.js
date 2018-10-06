/**
 * Проверяет, тачевое ли устройство
 * Нужно, чтобы убрать hover-эффекты на тач-устройствах
 */
(() => {
  let isMobile = false;
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }
  if (isMobile) {
    document.body.classList.add('user-is-touching');
    return;
  }

  window.addEventListener('touchstart', function onFirstTouch() {
    document.body.classList.add('user-is-touching');
    window.removeEventListener('touchstart', onFirstTouch, false);
  });
})();

/**
 * Обрезает заголовки
 */
(() => {
  const titles = document.querySelectorAll('.js-truncate');

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

  let evCache = [];
  let gesture = null;
  let prevDiff = -1;
  let currentScale = 1;
  let currentAtan = 0;
  let prevAtan = null;
  const SCALE_MULTIPLIER = 10000;

  camera.addEventListener('pointerdown', (event) => {
    // console.log('id', event.pointerId);
    camera.setPointerCapture(event.pointerId);
    evCache.push(event);

    console.log('down')
    const {x, y} = event;
    const currentX = parseInt(image.style.left, 10) || 0;
    const currentY = parseInt(image.style.top, 10) || 0;

    gesture = {
      startX: event.x - currentX,
      startY: event.y - currentY,
    };

    if (evCache.length === 2) {
      const dx = evCache[0].x - evCache[1].x;
      const dy = evCache[0].y - evCache[1].y;
      prevAtan = Math.atan2(dy,dx);
    }
  });

  camera.addEventListener('pointermove', (event) => {
    if (!gesture) {
      return
    }

    // drag
    if (evCache.length === 1) {
      const dx = gesture.startX - event.x;
      const dy = gesture.startY - event.y;
      image.style.left = `${-dx}px`;
      image.style.top = `${-dy}px`;
    }

    // scale and brightness
    if (evCache.length === 2) {
      const dx = evCache[0].x - evCache[1].x;
      const dy = evCache[0].y - evCache[1].y;
      const atan = Math.atan2(dy,dx) //* 180 / Math.PI;
      
      // if (prevAtan === null) {
      //   prevAtan = atan;
      //   return;
      // }

      // console.log('atan', prevAtan, atan, prevAtan - atan);

      

      const curDiff = Math.hypot(dy,dx);
      console.log('curDiff', curDiff)
      if (Math.abs(curDiff - prevDiff) > 2) {
        if (curDiff > prevDiff) currentScale += curDiff / SCALE_MULTIPLIER;
        if (curDiff < prevDiff) currentScale -= curDiff / SCALE_MULTIPLIER;
      }
      prevDiff = curDiff;

      currentScale = Math.max(1, currentScale);

      image.style.transform = `scale(${currentScale})`
      image.style.filter = `brightness(${Math.abs(atan)})`;
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
    console.log('up')
  }
  camera.addEventListener('pointerup', resetGesture);
  camera.addEventListener('pointercancel', resetGesture);
})();
