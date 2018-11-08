import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Button.styl';

type ButtonType = {
  color?: 'gray',
  children: React.ReactNode,
};

const cnButton = cn('Button');

const Button = ({ color, children }: ButtonType) => (
  <button className={cnButton(null, {color})}>
    {children}
  </button>
);

export default Button;
