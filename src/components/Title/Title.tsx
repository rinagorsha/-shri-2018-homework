import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Title.styl';

type TitleType = {
  size: 1 | 2 | 3 | 4 | 5 | 6,
  children: React.ReactNode,
};

const cnTitle = cn('Title');

const Title = ({ size, children }: TitleType) => {
  const TagName = `h${size}`;
  return (
    <TagName className={cnTitle({size})}>
      {children}
    </TagName>
  );
}

export default Title;
