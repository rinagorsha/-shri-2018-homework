interface IGesture {
  startX: number;
  startY: number;
}

export default () => {
  const camera: HTMLElement | null = document.querySelector('.js-camera');
  const image: HTMLElement | null = document.querySelector('.js-camera-image');
  const scaleEl: HTMLElement | null = document.querySelector('.js-camera-scale');
  const brightnessEl: HTMLElement | null = document.querySelector('.js-camera-brightness');

  if (!camera || !image || !scaleEl || !brightnessEl) return;

  let evCache: PointerEvent[] = [];
  let gesture: IGesture | null = null;
  let prevScaleDiff: number = -1;
  let currentScale: number = 1;

  const SCALE_MULTIPLIER: number = 8000;
  const PINCH_VS_SCALE: number = 3;
  const MAX_SCALE: number = 2;

  camera.addEventListener('pointerdown', (event: PointerEvent) => {
    camera.setPointerCapture(event.pointerId);
    evCache.push(event);

    const currentX: number = parseInt(getComputedStyle(image).backgroundPositionX || '0', 10);
    const currentY: number = parseInt(getComputedStyle(image).backgroundPositionY || '0', 10);

    gesture = {
      startX: event.x - currentX,
      startY: event.y - currentY,
    };
  });

  camera.addEventListener('pointermove', (event: PointerEvent) => {
    if (!gesture) {
      return;
    }

    // drag
    if (evCache.length === 1) {
      const dx: number = gesture.startX - event.x;
      const dy: number = gesture.startY - event.y;

      image.style.backgroundPosition = `${-dx}px ${-dy}px`;
    }

    if (evCache.length === 2) {
      // brightness
      const dx: number = Math.abs(evCache[0].x - evCache[1].x);
      const dy: number = Math.abs(evCache[0].y - evCache[1].y);
      const diffAtan: number = Math.atan2(dy, dx);
      image.style.filter = `brightness(${diffAtan})`;
      brightnessEl.innerText = `${Math.round(diffAtan * 100)}%`;

      // scale
      const currentScaleDiff: number = Math.hypot(dy, dx);
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
      if (event.pointerId === evCache[i].pointerId) {
        evCache[i] = event;
        break;
      }
    }
  });

  const resetGesture = (): void => {
    if (!gesture) {
      return;
    }
    gesture = null;
    evCache = [];
  };
  camera.addEventListener('pointerup', resetGesture);
  camera.addEventListener('pointercancel', resetGesture);
};
