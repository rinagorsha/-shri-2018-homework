import * as React from 'react';
import { cn } from '@bem-react/classname';
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
  </div>
);

export default PanelBody;
