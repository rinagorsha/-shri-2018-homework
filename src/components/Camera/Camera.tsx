import * as React from 'react';
import { cn } from '@bem-react/classname';
import Info from '../Info/Info';
import './Camera.styl';

const cnCamera = cn('Camera');

const Camera = () => (
  <div className={cnCamera()} touch-action="none">
    <div className={cnCamera('Container')}>
      <div className={cnCamera('Image')} />
    </div>
    <Info
      className={cnCamera('Info')}
      data={[
        `Приближение:`,
        `Яркость:`,
      ]}
    />
  </div>
);

export default Camera;
