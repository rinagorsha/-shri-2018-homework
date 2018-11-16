import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Panel-Action.styl';

const cnPanel = cn('Panel');

type PanelActionType = {
  type: 'arrow' | 'close',
  white: boolean,
}

const PanelAction = ({ white, type }: PanelActionType) => (
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
