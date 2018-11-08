import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Logo.styl';

const cnLogo = cn('Logo');

type LogoType = {
  className?: string,
}

const Logo = ({ className }: LogoType) => (
  <a className={cnLogo(null, [className])} href="index.html">Яндекс Дом</a>
);

export default Logo;
