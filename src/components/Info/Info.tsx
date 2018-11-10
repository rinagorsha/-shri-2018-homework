import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Info.styl';

const cnInfo = cn('Info');

type InfoType = {
  size?: string,
  data: string[],
  className?: string,
}

const Info = ({ size, data, className }: InfoType) => (
  <div className={cnInfo(null, {size}, [className])}>
    {data.map(item => (
      <div key={item} className={cnInfo('InfoItem')}>{item}</div>
    ))}
  </div>
);

export default Info;
