import * as React from 'react';
import { cn } from '@bem-react/classname';
import Title from '../../components/Title/Title';
import Panel from '../../components/Panel/Panel';
import store from '../../store/eventsStore';
import {IeventItemType} from '../../../server/types';
import './EventsPage.styl';

const cnEventsPage = cn('EventsPage');

const {events} = store.getState();

const EventsPage = () => (
  <div className={cnEventsPage()}>
    <Title size={1}>Лента событий</Title>
    <div className={cnEventsPage('Layout')}>
      {events.map((event: IeventItemType) => (
        <Panel
          key={event.icon}
          item={event}
          className={cnEventsPage('Item', {size: event.size})}
        />
      ))}
    </div>
  </div>
);

export default EventsPage;
