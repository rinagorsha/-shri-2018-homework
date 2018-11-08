import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Main.styl';

type MainType = {
  children?: React.ReactNode,
}

const cnMain = cn('Main');

const Main = ({ children }: MainType) => (
  <main className={cnMain()}>
    {children}
  </main>
);

export default Main;
