import * as React from 'react';
import { cn } from '@bem-react/classname';
import Title from '../../Title/Title';
import Icon from '../../Icon/Icon';
import Info from '../../Info/Info';
import {IeventItemType} from '../../../../server/types';
import './Panel-Header.styl';

const cnPanel = cn('Panel');

type PanelHeaderType = {
  item: IeventItemType,
}

const PanelHeader = ({ item }: PanelHeaderType) => {
  return (
    <header className={cnPanel('Header')}>
      <div className={cnPanel('HeaderTitle')}>
        <Icon
          icon={item.icon}
          active={item.type === 'critical'}
          className={cnPanel('HeaderIcon')}
        />
        <Title
          size={2}
          className={cnPanel('HeaderName')}
          title={item.title}
        >
          {item.title}
        </Title>
      </div>
      <Info data={[item.source, item.time]} size={item.size} />
    </header>
  );
}

export default PanelHeader;
