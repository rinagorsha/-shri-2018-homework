import { withBemMod } from '@bem-react/core';
import { ButtonType } from '../index';
import './Button_yellow.styl';

const ButtonYellow = withBemMod<ButtonType>('Button', { color: 'yellow' });

export default ButtonYellow;
