import React  from 'react';
import './SubscribedUsersTable.scss';
import { EventsTable } from './eventsTable';
import { events } from '../../../utils/events';

export const SubscribedUsersTable: React.FC = () => {
  return (
    <div className='subscribed-users'>
      <div className='subscribed-users__container'>
        <h2 className='subscribed-users__title title'>Subscribed users</h2>
        <EventsTable events={events}/>
      </div>
    </div>
  );
};