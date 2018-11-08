import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Logo.styl';

const logo = cn('Logo');

const Logo = ({ className }) => (
  <a className={logo(null, [className])} href="index.html">Яндекс Дом</a>
);

export default Logo;
