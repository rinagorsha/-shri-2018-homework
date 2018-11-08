import * as React from 'react';
import { cn } from '@bem-react/classname';
import Title from '../../components/Title/Title';
import './EventsPage.styl';

const cnEventsPage = cn('EventsPage');

const EventsPage = () => (
  <div className={cnEventsPage()}>
    <Title size={1}>Лента событий</Title>
    <div className={cnEventsPage('Layout')}>
    </div>
  </div>
);

export default EventsPage;
