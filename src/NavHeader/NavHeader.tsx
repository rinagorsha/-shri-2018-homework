import * as React from 'react';
import { cn } from '@bem-react/classname';
import './NavHeader.styl';

const navClass = cn('NavHeader');

const NavHeader = () => (
  <nav className={navClass()}>
    <a className={navClass('Item', {active: true})} href="#">События</a>
    <a className={navClass('Item')} href="#">Сводка</a>
    <a className={navClass('Item')} href="#">Устройства</a>
    <a className={navClass('Item')} href="#">Сценарии</a>
    <a className={navClass('Item')} href="video-monitoring.html">Видеонаблюдение</a>
  </nav>
);

export default NavHeader;
