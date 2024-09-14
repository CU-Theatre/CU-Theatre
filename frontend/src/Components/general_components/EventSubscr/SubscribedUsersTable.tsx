import React, { useState } from 'react';
import './SubscribedUsersTable.scss';
import { allShows } from '../../../utils/allShows';
import { events } from '../../../utils/events';
import classNames from 'classnames';
import { DayOfWeek } from '../../../types/DayOfWeek';

export const SubscribedUsersTable: React.FC = () => {
  const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const classes = ['Heels', 'Pole Dance', 'Twerk', 'Exotic', 'Stretching'];
  const [hiddenColumns, setHiddenColumns] =  useState<Record<'impro' | 'playback' | 'livePerf', Record<DayOfWeek, boolean>>>({
    impro: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    playback: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    livePerf: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  });
  
  const [hiddenClassColumns, setHiddenClassColumns] = useState<Record<'heels' | 'poleDance' | 'twerk' | 'exotic' | 'stretching', Record<DayOfWeek, boolean>>>({
    heels: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    poleDance: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    twerk: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    exotic: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    stretching: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  });

  const toggleColumnVisibility = (column: 'impro' | 'playback' | 'livePerf', day: DayOfWeek) => {
    setHiddenColumns(prevState => ({
      ...prevState,
      [column]: {
        ...prevState[column],
        [day]: !prevState[column][day],
      },
    }));
  };
  
  const toggleClassColumnVisibility = (column: keyof typeof hiddenClassColumns, day: DayOfWeek) => {
    setHiddenClassColumns(prevState => ({
      ...prevState,
      [column]: {
        ...prevState[column],
        [day]: !prevState[column][day],
      },
    }));
  };

  const getUniqueDates = (eventsArray: any[], day: string) => {
    return [...Array.from(new Set(eventsArray.filter(event => event.dayOfWeek === day).map(event => event.date)))];
  };


  return (
    <div className='subscribed-users'>
      <div className='subscribed-users__container'>
        <h2 className='subscribed-users__title title'>Subscribed users</h2>
        <div className='subscribed-users__events'>
          <table className='subscribed-users__shows'>
            <caption className='subscribed-users__caption'>Shows</caption>
            <thead>
              <tr className='subscribed-users__table-head'>
                <th className='subscribed-users__table-titles'>Day of the week</th>
                {allShows.map(show => (
                  <th className='subscribed-users__table-titles' key={show.showName}>{show.showName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(day => {
                const uniqueImproDates = getUniqueDates(events.mainEvents.impro, day);
                const uniquePlaybackDates = getUniqueDates(events.mainEvents.playback, day);
                const uniqueLivePerfDates = getUniqueDates(events.mainEvents.livePerf, day);
                const uniqueDates = Array.from(new Set([...uniqueImproDates, ...uniquePlaybackDates, ...uniqueLivePerfDates]));

                return uniqueDates.map(date => {
                  const improEvents = events.mainEvents.impro.filter(event => event.dayOfWeek === day && event.date === date);
                  const playbackEvents = events.mainEvents.playback.filter(event => event.dayOfWeek === day && event.date === date);
                  const livePerfEvents = events.mainEvents.livePerf.filter(event => event.dayOfWeek === day && event.date === date);

                  return (
                    <tr key={`${day}-${date}`} className='subscribed-users__table-row'>
                      <td>
                        <p className='subscribed-users__day'>
                          {day} ({date})
                        </p>
                      </td>
                      <td className='subscribed-users__column'>
                        {improEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {improEvents.length}</p>
                            {hiddenColumns.impro[day] ? (
                              <div 
                                onClick={() => toggleColumnVisibility('impro', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleColumnVisibility('impro', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', 
                          {'subscribed-users__users--hidden': hiddenColumns.impro[day]})}
                        >
                          {improEvents.map(event => (
                            <p 
                              className='subscribed-users__user' 
                              key={event.phone}
                            >
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {playbackEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {playbackEvents.length}</p>
                            {hiddenColumns.playback[day] ? (
                              <div 
                                onClick={() => toggleColumnVisibility('playback', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleColumnVisibility('playback', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', 
                          {'subscribed-users__users--hidden': hiddenColumns.playback[day]})}
                        >
                          {playbackEvents.map(event => (
                            <p 
                              className='subscribed-users__user' 
                              key={event.phone}
                            >
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {livePerfEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {livePerfEvents.length}</p>
                            {hiddenColumns.livePerf[day] ? (
                              <div 
                                onClick={() => toggleColumnVisibility('livePerf', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleColumnVisibility('livePerf', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', 
                          {'subscribed-users__users--hidden': hiddenColumns.livePerf[day]})}
                        >
                          {livePerfEvents.map(event => (
                            <p 
                              className='subscribed-users__user' 
                              key={event.phone}
                            >
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
          <table className='subscribed-users__shows'>
            <caption className='subscribed-users__caption'>Classes</caption>
            <thead>
              <tr className='subscribed-users__table-head'>
                <th className='subscribed-users__table-titles'>Day of the week</th>
                {classes.map(className => (
                  <th className='subscribed-users__table-titles' key={className}>{className}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day: DayOfWeek) => {
                const uniqueHeelsDates = getUniqueDates(events.otherClasses.heels, day);
                const uniqueTwerkDates = getUniqueDates(events.otherClasses.twerk, day);
                const uniqueExoticDates = getUniqueDates(events.otherClasses.exotic, day);
                const uniquePoleDanceDates = getUniqueDates(events.otherClasses.poleDance, day);
                const uniqueStretchingDates = getUniqueDates(events.otherClasses.stretching, day);
                const uniqueDates = Array.from(new Set([...uniqueHeelsDates, ...uniqueTwerkDates, ...uniqueExoticDates, ...uniquePoleDanceDates, ...uniqueStretchingDates]));

                return uniqueDates.map(date => {
                  const heelsEvents = events.otherClasses.heels.filter(event => event.dayOfWeek === day && event.date === date);
                  const twerkEvents = events.otherClasses.twerk.filter(event => event.dayOfWeek === day && event.date === date);
                  const exoticEvents = events.otherClasses.exotic.filter(event => event.dayOfWeek === day && event.date === date);
                  const poleDanceEvents = events.otherClasses.poleDance.filter(event => event.dayOfWeek === day && event.date === date);
                  const stretchingEvents = events.otherClasses.stretching.filter(event => event.dayOfWeek === day && event.date === date);

                  return (
                    <tr key={`${day}-${date}`} className='subscribed-users__table-row'>
                      <td>
                        <p className='subscribed-users__day'>
                          {day} ({date})
                        </p>
                      </td>
                      <td className='subscribed-users__column'>
                        {heelsEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {heelsEvents.length}</p>
                            {hiddenClassColumns.heels[day] ? (
                              <div 
                                onClick={() => toggleClassColumnVisibility('heels', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleClassColumnVisibility('heels', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', {'subscribed-users__users--hidden': hiddenClassColumns.heels[day]})}>
                          {heelsEvents.map(event => (
                            <p className='subscribed-users__user' key={event.phone}>
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {twerkEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {twerkEvents.length}</p>
                            {hiddenClassColumns.twerk[day] ? (
                              <div 
                                onClick={() => toggleClassColumnVisibility('twerk', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleClassColumnVisibility('twerk', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', {'subscribed-users__users--hidden': hiddenClassColumns.twerk[day]})}>
                          {twerkEvents.map(event => (
                            <p className='subscribed-users__user' key={event.phone}>
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {exoticEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {exoticEvents.length}</p>
                            {hiddenClassColumns.exotic[day] ? (
                              <div 
                                onClick={() => toggleClassColumnVisibility('exotic', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleClassColumnVisibility('exotic', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', {'subscribed-users__users--hidden': hiddenClassColumns.exotic[day]})}>
                          {exoticEvents.map(event => (
                            <p className='subscribed-users__user' key={event.phone}>
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {poleDanceEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {poleDanceEvents.length}</p>
                            {hiddenClassColumns.poleDance[day] ? (
                              <div 
                                onClick={() => toggleClassColumnVisibility('poleDance', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleClassColumnVisibility('poleDance', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', {'subscribed-users__users--hidden': hiddenClassColumns.poleDance[day]})}>
                          {poleDanceEvents.map(event => (
                            <p className='subscribed-users__user' key={event.phone}>
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className='subscribed-users__column'>
                        {stretchingEvents.length > 0 && (
                          <div className='subscribed-users__count-block'>
                            <p>guests: {stretchingEvents.length}</p>
                            {hiddenClassColumns.stretching[day] ? (
                              <div 
                                onClick={() => toggleClassColumnVisibility('stretching', day)} 
                                className='subscribed-users__guests-count'></div>
                            ) : (
                              <div 
                                onClick={() => toggleClassColumnVisibility('stretching', day)} 
                                className='subscribed-users__guests-count subscribed-users__guests-count--close'></div>
                            )}
                          </div>
                        )}
                        <div className={classNames('subscribed-users__users', {'subscribed-users__users--hidden': hiddenClassColumns.stretching[day]})}>
                          {stretchingEvents.map(event => (
                            <p className='subscribed-users__user' key={event.phone}>
                              {event.guestName} ({event.phone})
                            </p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};