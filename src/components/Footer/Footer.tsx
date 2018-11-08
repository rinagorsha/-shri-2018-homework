import * as React from 'react';
import { cn } from '@bem-react/classname';
import NavFooter from '../NavFooter/NavFooter';
import './Footer.styl';

const cnFooter = cn('Footer');

const Footer = () => (
  <footer className={cnFooter()}>
    <NavFooter className={cnFooter('Nav')} />
    <div>© 2001-2018 ООО «Яндекс»</div>
  </footer>
);

export default Footer;
