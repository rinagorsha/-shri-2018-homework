import * as React from 'react';
import { cn } from '@bem-react/classname';
import Logo from '../Logo/Logo';
import NavHeader from '../NavHeader/NavHeader';
import './Header.styl';

const cnHeader = cn('Header');

const Header = () => (
  <header className={cnHeader()}>
    <Logo className={cnHeader('Logo')} />
    <div className={cnHeader('Nav')}>
      <NavHeader />
    </div>
    <button className={cnHeader('Menu')} type="button"></button>
  </header>
);

export default Header;
