import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Panel-Action.styl';

const cnPanel = cn('Panel');

type PanelActionType = {
  type: 'arrow' | 'close',
  white: boolean,
  className?: string,
}

const PanelAction = ({ white, type, className }: PanelActionType) => (
  <button
    type="button"
    title="Раскрыть событие"
    className={cnPanel('Action', {
      type,
      white
    })}
  />
);

export default PanelAction;
