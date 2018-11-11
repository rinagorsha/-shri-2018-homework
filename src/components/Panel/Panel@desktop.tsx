import * as React from 'react';
import { cn } from '@bem-react/classname';
import PanelHeader from './Header/Panel-Header';
import PanelBody from './Body/Panel-Body';
import PanelAction from './Action/Panel-Action';
import { PanelType } from './index';
import './Panel.styl';

const cnPanel = cn('Panel');

const Panel = ({ item, className }: PanelType) => (
  <article className={cnPanel(
    {
      size: item.size,
      type: item.type,
      hasContent: !!item.description || !!item.data,
      withHover: true,
    },
    [className],
  )}>
    <PanelHeader item={item} />

    {(item.description || item.data) && (
      <PanelBody item={item} />
    )}

    <PanelAction
      type="arrow"
      white={item.type === 'critical' && !(item.data || item.description)}
    />
    <PanelAction
      type="close"
      white={item.type === 'critical'}
    />

  </article>
);

export default Panel;
