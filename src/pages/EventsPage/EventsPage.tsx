import * as React from 'react';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di'
import Title from '../../components/Title/Title';
import store from '../../store/eventsStore';
import {IeventItemType} from '../../../server/types';
import { PanelType } from '../../components/Panel/index';
import './EventsPage.styl';

const cnEventsPage = cn('EventsPage');

const {events} = store.getState();

const EventsPage = () => (
  <div className={cnEventsPage()}>
    <Title size={1}>Лента событий</Title>
    <div className={cnEventsPage('Layout')}>
      {events.map((event: IeventItemType) => (
        <RegistryConsumer key={event.icon}>
          {registries => {
            const cnApp = cn('App');
            const cnPanel = cn('Panel');
            const registry = registries[cnApp()];
            const Panel: React.ComponentType<PanelType> = registry.get(cnPanel())
            return (
              <Panel
                item={event}
                className={cnEventsPage('Item', {size: event.size})}
              />
            )
          }}
        </RegistryConsumer>
      ))}
      
    </div>
  </div>
);

export default EventsPage;
