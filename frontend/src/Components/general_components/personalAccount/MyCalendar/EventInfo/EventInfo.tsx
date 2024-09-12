import React from 'react';
import './EventInfo.scss';
import { CourseEvent } from '../../../../../types/CourseEvent';
import { format } from 'date-fns';
import { useAppContext } from '../../../../../AppContext';
import classNames from 'classnames';

interface Props {
  currentEvent: CourseEvent | null;
}

export const EventInfo: React.FC<Props> = ({ currentEvent }) => {
  const { setEventInfoIsOpen, eventInfoIsOpen } = useAppContext();
  return (
    <div className={classNames('event-info', {'event-open' : eventInfoIsOpen})}>
      <div className='event-info__top'>
        <h4 className='event-info__title'>{currentEvent?.title}</h4>
        <button 
          onClick={() => setEventInfoIsOpen(true)} 
          type='button' 
          className='event-info__close'></button>
      </div>
      <div className='event-info__content'>
        <p className='event-info__date'>
          Event day - {currentEvent && format(currentEvent.start, 'dd.MM')}
        </p>
        <p className='event-info__duration'>
          Event duration - {currentEvent && format(currentEvent.start, 'HH:mm')} - {currentEvent && format(currentEvent.end, 'HH:mm')}
        </p>
        <div className='event-info__prepare'>
          <h5 className='event-info__prepare-text'>Dont forget to take with you</h5>
          <ul className='event-info__list'>
            <li className='event-info__item'>
              Clothes – Make sure to bring comfy clothes because you'll be moving, 
              crawling, and possibly rolling around a lot. Who needs yoga class when you have this?
            </li>
            <li className='event-info__item'>
            Notebook and Pen – You’ll want to jot down all the brilliant ideas that pop into your head. 
            Plus, it’s perfect for doodling when inspiration strikes!
            </li>
            <li className='event-info__item'>
              Charged Phone – A charged phone is essential, not just for selfies, but also for capturing those “Did that really happen?” moments. 
              And who knows, maybe you’ll need to make a quick call to your agent!
            </li>
            <li className='event-info__item'>
              Water – Hydration is key! You’re going to be working hard, and you don’t want to dry up like a raisin. 
              Stay hydrated, stay fabulous!
            </li>
            <li className='event-info__item'>
              Good Mood – This is your secret weapon. A great attitude will get you through anything, even the most intense improv exercises. 
              Plus, it’s contagious – spread those good vibes around!
            </li>
            <li className='event-info__item'>
              Now you're all set for whatever comes your way! 😄
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}