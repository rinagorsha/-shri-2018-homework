import * as React from 'react';
import { cn } from '@bem-react/classname';
import './NavHeader.styl';

const cnNavHeader = cn('NavHeader');

const NavHeader = () => (
  <nav className={cnNavHeader()}>
    <a className={cnNavHeader('Item', {active: true})} href="#">События</a>
    <a className={cnNavHeader('Item')} href="#">Сводка</a>
    <a className={cnNavHeader('Item')} href="#">Устройства</a>
    <a className={cnNavHeader('Item')} href="#">Сценарии</a>
    <a className={cnNavHeader('Item')} href="video-monitoring.html">Видеонаблюдение</a>
  </nav>
);

export default NavHeader;
