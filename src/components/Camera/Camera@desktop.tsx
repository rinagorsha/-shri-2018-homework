import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Camera.styl';

const cnCamera = cn('Camera');

const Camera = () => (
  <div className={cnCamera()} touch-action="none">
    <div className={cnCamera('Container')}>
      <div className={cnCamera('Image')} />
    </div>
  </div>
);

export default Camera;
