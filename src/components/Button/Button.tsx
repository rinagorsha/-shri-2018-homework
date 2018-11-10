import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Button.styl';

type ButtonType = {
  color?: string,
  children: React.ReactNode,
  className?: string,
};

const cnButton = cn('Button');

const Button = ({ color, children, className }: ButtonType) => (
  <button className={cnButton(null, {color}, [className])}>
    {children}
  </button>
);

export default Button;
