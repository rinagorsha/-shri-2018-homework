import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Title.styl';

type TitleType = {
  size: 1 | 2 | 3 | 4 | 5 | 6,
  title?: string,
  className?: string,
  children: React.ReactNode,
};

const cnTitle = cn('Title');

const Title = ({ size, title, className, children }: TitleType) => {
  const TagName = `h${size}`;
  return (
    <TagName
    title={title}
      className={cnTitle({size}, [className])}
    >
      {children}
    </TagName>
  );
}

export default Title;
