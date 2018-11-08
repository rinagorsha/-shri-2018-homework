import * as React from 'react';
import { cn } from '@bem-react/classname';
import Logo from '../Logo/Logo';
import NavHeader from '../NavHeader/NavHeader';
import './Header.styl';

const header = cn('Header');

const Header = () => (
  <header className={header()}>
    <Logo className={header('Logo')} />
    <div className={header('Nav')}>
      <NavHeader />
    </div>
    <button className={header('Menu')} type="button"></button>
  </header>
);

export default Header;
