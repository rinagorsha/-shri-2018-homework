import * as React from 'react';
import dispatcher from 'shri-2018-flux';
import { cn } from '@bem-react/classname';
import store, { LOCATION_CHANGE } from '../../store/locationStore';
import './NavHeader.styl';

const cnNavHeader = cn('NavHeader');

const ITEMS = [
  {name: 'События', url: 'events'},
  {name: 'Сводка', url: '#'},
  {name: 'Устройства', url: '#'},
  {name: 'Сценарии', url: '#'},
  {name: 'Видеонаблюдение', url: 'monitoring'},
];

type NavHeaderState = {
  currentPage: string,
}

class NavHeader extends React.Component<{}, NavHeaderState> {
  state = {
    currentPage: store.getState().currentPage || '',
  }

  render() {
    const { currentPage } = this.state;

    return (
      <nav className={cnNavHeader()}>
        {ITEMS.map(item => (
          <a
            className={cnNavHeader(
              'Item',
              {active: item.url === currentPage}
            )}
            href={item.url}
            key={item.name}
            onClick={(e: React.MouseEvent) => this.changeLocation(e, item.url)}
          >
            {item.name}
          </a>
        ))}
      </nav>
    )
  }

  changeLocation = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    dispatcher.dispatch({
      type: LOCATION_CHANGE,
      data: url,
    });
  }
}

export default NavHeader;
