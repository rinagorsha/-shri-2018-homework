import * as React from 'react';
import { cn } from '@bem-react/classname';
import './Player.styl';

type PlayerType = {
  albumcover: string,
  artist: string,
  track: {
    name: string,
    length: string,
  },
  volume: number,
  className?: string,
};

const cnPlayer = cn('Player');

const Player = ({ albumcover, artist, track, volume, className }: PlayerType) => (
  <div className={cnPlayer(null, [className])}>
    <div className={cnPlayer('Header')}>
    <div
      className={cnPlayer('Picture')}
      style={{backgroundImage: `url(${albumcover})`}}
    />
    <div className={cnPlayer('Info')}>
      <label className={cnPlayer('Name')} for="track">
        {artist} - {name}
      </label>
      <div className={cnPlayer('Duration')}>
        <input id="track" className={cnPlayer('Track')} type="range" name="track" />
        <div className={cnPlayer('Value')}>{track.length}</div>
      </div>
    </div>
    </div>
    <div className={cnPlayer('Controls')}>
      <button type="button" className={cnPlayer('Button', {direction: 'prev'})} />
      <button type="button" className={cnPlayer('Button', {direction: 'next'})} />
      <input className={cnPlayer('Volume')} type="range" defaultValue={volume} />
      <div className={cnPlayer('Value')}>{volume}%</div>
    </div>
  </div>
);

export default Player;
