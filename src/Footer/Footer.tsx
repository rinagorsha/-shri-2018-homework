import * as React from 'react';
import { cn } from '@bem-react/classname';
import NavFooter from '../NavFooter/NavFooter';
import './Footer.styl';

const footerClass = cn('Footer');

const Footer = () => (
  <footer className={footerClass()}>
    <NavFooter className={footerClass('Nav')} />
    <div>© 2001-2018 ООО «Яндекс»</div>
  </footer>
);

export default Footer;
