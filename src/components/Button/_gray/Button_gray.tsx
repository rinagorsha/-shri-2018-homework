import { withBemMod } from '@bem-react/core';
import { ButtonType } from '../index';
import './Button_gray.styl';

const ButtonGray = withBemMod<ButtonType>('Button', { color: 'gray' });

export default ButtonGray;
