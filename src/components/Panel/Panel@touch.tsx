import * as React from 'react';
import { cn } from '@bem-react/classname';
import PanelHeader from './Header/Panel-Header';
import PanelBody from './Body/Panel-Body';
import { PanelType } from './index';
import './Panel.styl';

const cnPanel = cn('Panel');

const Panel = ({ item, className }: PanelType) => (
  <article className={cnPanel(
    {
      size: item.size,
      type: item.type,
      hasContent: !!item.description || !!item.data,
    },
    [className],
  )}>
    <PanelHeader item={item} />

    {(item.description || item.data) && (
      <PanelBody item={item} />
    )}
  </article>
);

export default Panel;
