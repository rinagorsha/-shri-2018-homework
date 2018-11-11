import * as React from 'react';
import { ButtonType } from './index';
import './Button.styl';

const Button: React.SFC<ButtonType> = ({ children, className }) => (
  <button className={className}>
    {children}
  </button>
);

export default Button;
