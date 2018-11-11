import { compose, IClassNameProps } from '@bem-react/core';
import Base from './Button';
import ButtonGray from './_gray/Button_gray';
import ButtonYellow from './_yellow/Button_yellow';

export interface ButtonType extends IClassNameProps {
  color?: string,
  children: React.ReactNode,
  className?: string,
};

export default compose(
  ButtonYellow,
  ButtonGray
)(Base);
