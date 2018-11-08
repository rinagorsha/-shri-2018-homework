import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Icon.styl';

const cnIcon = cn('Icon');

type IconType = {
  icon: string,// 'stats' | 'key' | 'robotCleaner' | 'router' | 'thermal' | 'ac' | 'music' | 'fridge' | 'battery' | 'cam' | 'kettle',
  active: boolean,
  className?: string,
}

const Icon = ({ icon, active, className }: IconType) => {
  console.log('---- icon', icon)
  return (
    <div className={cnIcon({
      type: icon,
      active: active,
    })} />
  );
}

export default Icon;
