import * as React from 'react';
import { cn } from '@bem-react/classname';
import Info from '../../Info/Info';
import Camera from '../../Camera/Camera';
import Player from '../../Player/Player';
import Button from '../../Button/Button';
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

    {item.data && (item.data.humidity || item.data.temperature) && (
      <div className={cnPanel('Line')}>
        <Info
          size={item.size}
          data={[
            `Температура: ${item.data.temperature} C`,
            `Влажность: ${item.data.humidity} %`,
          ]} />
      </div>
    )}

    {item.data && item.data.image && (
      <div className={cnPanel('Line')}>
        <Camera />
      </div>
    )}

    {item.data && item.data.type == 'graph' && (
      <div className={cnPanel('Line')}>
        <img className={cnPanel('Image')} src="public/graph.jpg" alt={item.title} />
      </div>
    )}

    {item.data && item.data.buttons && (
      <div className={cnPanel('Line')}>
        <div className={cnPanel('Buttons')}>
          {item.data.buttons.map(btn => (
            <Button
              key={btn}
              color={btn === 'Нет' ? 'gray' : ''}
              className={cnPanel('Button')}
            >
              {btn}
            </Button>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default PanelBody;
