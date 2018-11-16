import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Icon.styl';

const cnIcon = cn('Icon');

type IconType = {
  icon: string,
  active: boolean,
  className?: string,
}

const Icon = ({ icon, active, className }: IconType) => (
  <div className={cnIcon(
    {
      type: icon,
      active: active,
    },
    [className]
  )} />
);

export default Icon;
