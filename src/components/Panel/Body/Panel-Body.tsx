import * as React from 'react';
import { cn } from '@bem-react/classname';
import Player from '../../Player/Player';
import {IeventItemType} from '../../../../server/types';
import './Panel-Body.styl';

type PanelBodyType = {
  item: IeventItemType,
  className?: string,
}

const cnPanel = cn('Panel');

const PanelBody = ({ item, className }: PanelBodyType) => (
  <div className={cnPanel('Content')}>

    {item.description && (
      <div className={cnPanel('Line')}>
        <div className={cnPanel('Text')}>
          {item.description}
        </div>
      </div>
    )}

    {item.data && item.data.track && (
      <div className={cnPanel('Line')}>
        <Player
          albumcover={item.data.albumcover}
          artist={item.data.artist}
          track={item.data.track}
          volume={item.data.volume}
          className={cnPanel('Player')}
        />
      </div>
    )}
  </div>
);

export default PanelBody;
