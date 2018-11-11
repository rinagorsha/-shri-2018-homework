import * as React from 'react';
import { cn } from '@bem-react/classname';
import Title from '../../Title/Title';
import Icon from '../../Icon/Icon';
import Info from '../../Info/Info';
import {IeventItemType} from '../../../../server/types';
import './Panel-Header.styl';

const cnPanel = cn('Panel');

type PanelHeaderProps = {
  item: IeventItemType,
}

class PanelHeader extends React.PureComponent<PanelHeaderProps> {
  titleEL: HTMLSpanElement | null;

  componentDidMount() {
    this.truncateTitle();

    window.addEventListener('resize', this.truncateTitle)
  }

  render() {
    const { item } = this.props;
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
            <span ref={(item) => this.titleEL = item}>
              {item.title}
            </span>
          </Title>
        </div>
        <Info
          data={[item.source, item.time]}
          size={item.size}
          className={cnPanel('HeaderInfo')}
        />
      </header>
    );
  }

  truncateTitle = () => {
    if (!this.titleEL) return;

    const { title } = this.props.item;
    const lineHeight: string = getComputedStyle(this.titleEL).lineHeight || '1';
    const maxHeight: number = parseInt(lineHeight, 10) * 2.5;

    const textArr: string[] = title.split(' ');
    this.titleEL.textContent = title;

    while (this.titleEL.offsetHeight > maxHeight) {
      textArr.pop();
      this.titleEL.textContent = textArr.join(' ') + '...';
    }

    return title;
  }
}

export default PanelHeader;
