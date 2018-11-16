import * as React from 'react';
import { cn } from '@bem-react/classname';
import './NavFooter.styl';

type NavFooterType = {
  className?: string,
}

const cnNavFooter = cn('NavFooter');

const NavFooter = ({ className }: NavFooterType) => (
  <nav className={cnNavFooter(null, [className])}>
    <a className={cnNavFooter('Item')} href="#">Помощь</a>
    <a className={cnNavFooter('Item')} href="#">Обратная связь</a>
    <a className={cnNavFooter('Item')} href="#">Разработчикам</a>
    <a className={cnNavFooter('Item')} href="#">Условия использования</a>
    <a className={cnNavFooter('Item')} href="license.pdf" target="_blank">Авторские права</a>
  </nav>
);

export default NavFooter;
