import * as React from 'react';
import { cn } from '@bem-react/classname';
import Info from '../Info/Info';
import './Camera.styl';

const cnCamera = cn('Camera');

interface IGesture {
  startX: number;
  startY: number;
}

type CameraState = {
  currentScale: number;
  backgroundPosition: string,
  diffAtan: number,
}

const SCALE_MULTIPLIER = 8000;
const PINCH_VS_SCALE = 3;
const MAX_SCALE = 2;

class Camera extends React.Component<null, CameraState> {
  gesture: IGesture | null = null;
  evCache: PointerEvent[] = [];
  image: HTMLElement | null;
  camera: HTMLElement | null;
  prevScaleDiff: number  = -1;

  state = {
    currentScale: 1,
    backgroundPosition: '50% 50%',
    diffAtan: 1,
  }

  render() {
    const { backgroundPosition, diffAtan, currentScale } = this.state;
    return (
      <div
        className={cnCamera()}
        touch-action="none"
        ref={(el) => this.camera = el}
        onPointerDown={this.setPointerCapture}
        onPointerMove={this.changeCamera}
        onPointerUp={this.resetGesture}
        onPointerCancel={this.resetGesture}
      >
        <div className={cnCamera('Container')}>
          <div
            className={cnCamera('Image', {touch: true})}
            ref={(el) => this.image = el}
            style={{
              backgroundPosition,
              filter: `brightness(${diffAtan})`,
              transform: `scale(${currentScale})`,
            }}
          />
        </div>
        <Info
          className={cnCamera('Info')}
          data={[
            `Приближение: ${Math.round(currentScale * 100)}%`,
            `Яркость: ${Math.round(diffAtan * 100)}%`,
          ]}
        />
      </div>
    );
  }

  setPointerCapture = (event: PointerEvent) => {
    if (!this.camera || !this.image) return;

    this.camera.setPointerCapture(event.pointerId);
    this.evCache.push(event);

    const currentX = parseInt(getComputedStyle(this.image).backgroundPositionX || '0', 10);
    const currentY = parseInt(getComputedStyle(this.image).backgroundPositionY || '0', 10);
    this.gesture = {
      startX: event.screenX - currentX,
      startY: event.screenY - currentY,
    };
  }

  changeCamera = (event: PointerEvent) => {
    if (!this.gesture) {
      return;
    }

    // drag
    if (this.evCache.length === 1) {
      const dx = this.gesture.startX - event.screenX;
      const dy = this.gesture.startY - event.screenY;

      this.setState({
        backgroundPosition: `${-dx}px ${-dy}px`,
      });
    }

    if (this.evCache.length === 2) {
      // brightness
      const dx = Math.abs(this.evCache[0].x - this.evCache[1].x);
      const dy = Math.abs(this.evCache[0].y - this.evCache[1].y);
      const diffAtan = Math.atan2(dy, dx);
      this.setState({
        diffAtan,
      });

      // scale
      const currentScaleDiff = Math.hypot(dy, dx);
      let {currentScale} = this.state;

      if (Math.abs(currentScaleDiff - this.prevScaleDiff) > PINCH_VS_SCALE) {
        if (currentScaleDiff > this.prevScaleDiff) currentScale += currentScaleDiff / SCALE_MULTIPLIER;
        if (currentScaleDiff < this.prevScaleDiff) currentScale -= currentScaleDiff / SCALE_MULTIPLIER;
      }
      currentScale = Math.min(MAX_SCALE, Math.max(1, currentScale));
      this.prevScaleDiff = currentScaleDiff;

      this.setState({
        currentScale,
      });
    }

    for (let i = 0; i < this.evCache.length; i++) {
      if (event.pointerId === this.evCache[i].pointerId) {
        this.evCache[i] = event;
        break;
      }
    }
  }

  resetGesture = (): void => {
    if (!this.gesture) {
      return;
    }
    this.gesture = null;
    this.evCache = [];
  };
}

export default Camera;
