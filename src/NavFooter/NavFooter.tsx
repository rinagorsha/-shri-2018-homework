import * as React from 'react';
import { cn } from '@bem-react/classname';
import './NavFooter.styl';

const navClass = cn('NavFooter');

const NavFooter = ({ className }) => (
  <nav className={navClass(null, [className])}>
    <a className={navClass('Item')} href="#">Помощь</a>
    <a className={navClass('Item')} href="#">Обратная связь</a>
    <a className={navClass('Item')} href="#">Разработчикам</a>
    <a className={navClass('Item')} href="#">Условия использования</a>
    <a className={navClass('Item')} href="license.pdf" target="_blank">Авторские права</a>
  </nav>
);

export default NavFooter;
