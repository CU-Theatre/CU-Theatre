import React, { useState } from 'react';
import { useHiddenColumns } from '../../../../hooks/useHiddenColumns';
import { DayOfWeek } from '../../../../types/DayOfWeek';
import './EventsTable.scss';
import { useAppContext } from '../../../../AppContext';
import { useHiddenClassColumns } from '../../../../hooks/useHiddenClassColumns';
import { addWeeks, formatDate, getWeek } from '../utils';
import { Events, Guest } from '../../../../types/Events';
import classNames from 'classnames';
import { PreDeleteModal } from '../PreDeleteModal';

interface Props {
  events: Events;
}

export const EventsTable: React.FC<Props> = ({ events }) => {
  const daysOfWeek: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const classes = ['Heels', 'Twerk', 'Exotic',  'Pole Dance','Stretching'];
  const { hiddenColumns, toggleColumnVisibility } = useHiddenColumns();
  const { hiddenClassColumns, toggleClassColumnVisibility } = useHiddenClassColumns();
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
  const { setEventList, currentShows } = useAppContext();
  const [isPreDeleteVisible, setIsPreDeleteVisible] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState<{
    phone?: string;
    category: string;
    day: DayOfWeek;
    date: string;
    isClass: boolean;
  } | null>(null);



  const handlePrevWeek = () => {
    setCurrentWeek(prevWeek => addWeeks(prevWeek, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
  };

  const getUniqueDates = (eventsArray: any[], day: string) => {
    if (!eventsArray) return [];
    return [...new Set(eventsArray.filter(event => event.dayOfWeek === day).map(event => event.date))];
  };

  const isInCurrentWeek = (date: string) => {
    const [day, month] = date.split('.').map(Number);
    const startDay = currentWeek.start.getDate();
    const startMonth = currentWeek.start.getMonth() + 1;
    const endDay = currentWeek.end.getDate();
    const endMonth = currentWeek.end.getMonth() + 1;

    if (startMonth === endMonth) {
      return (month === startMonth && day >= startDay && day <= endDay);
    } else {
      return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
    }
  };

  const openPreDeleteModal = (
    phone: string | undefined,
    category: string,
    day: DayOfWeek,
    date: string,
    isClass: boolean
  ) => {
    setDeleteDetails({ phone, category, day, date, isClass});
    setIsPreDeleteVisible(true);
  };
  return (
    <div className='events-table'>
      <div className='events-table__week-navigation'>
        <button className='events-table__nav-button' type='button' onClick={handlePrevWeek}>Previous</button>
        <span className='events-table__dates'>Dates: {formatDate(currentWeek.start)} - {formatDate(currentWeek.end)}</span>
        <button className='events-table__nav-button' type='button' onClick={handleNextWeek}>Next</button>
      </div>

      <div className='events-table__events'>
        <table className='events-table__shows'>
          <caption className='events-table__caption'>Shows</caption>
          <thead>
            <tr className='events-table__table-head'>
              <th className='events-table__table-titles'>Day of the week</th>
              {currentShows.map(show => (
                <th className='events-table__table-titles' key={show.showName}>{show.showName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map(day => {
              const uniqueImproDates = getUniqueDates(events.mainEvents.impro, day).filter(isInCurrentWeek);
              const uniquePlaybackDates = getUniqueDates(events.mainEvents.playback, day).filter(isInCurrentWeek);
              const uniqueLivePerfDates = getUniqueDates(events.mainEvents.livePerf, day).filter(isInCurrentWeek);
              const uniqueDates = Array.from(new Set([...uniqueImproDates, ...uniquePlaybackDates, ...uniqueLivePerfDates]));

              return uniqueDates.map(date => {
                const improEvents = events.mainEvents.impro.filter((event: Guest) => event.dayOfWeek === day && event.date === date);
                const playbackEvents = events.mainEvents.playback.filter((event: Guest) => event.dayOfWeek === day && event.date === date);
                const livePerfEvents = events.mainEvents.livePerf.filter((event: Guest) => event.dayOfWeek === day && event.date === date);

                return (
                  <tr key={`${day}-${date}`} className='events-table__table-row'>
                    <td>
                      <p className='events-table__day'>
                        {day} ({date})
                      </p>
                    </td>
                    <td className='events-table__column'>
                      {improEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {improEvents.length}</p>
                          {hiddenColumns.impro[day] ? (
                            <div 
                              onClick={() => toggleColumnVisibility('impro', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleColumnVisibility('impro', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', 
                        {'events-table__users--hidden': hiddenColumns.impro[day]})}
                      >
                        {improEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                          <p>
                            {event.guestName} ({event.phone})
                          </p>
                          <button 
                            onClick={() => openPreDeleteModal(event.phone, 'impro', day, date, false)} 
                            type='button' 
                            className='events-table__delete'></button>
                        </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {playbackEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {playbackEvents.length}</p>
                          {hiddenColumns.playback[day] ? (
                            <div 
                              onClick={() => toggleColumnVisibility('playback', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleColumnVisibility('playback', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', 
                        {'events-table__users--hidden': hiddenColumns.playback[day]})}
                      >
                        {playbackEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                            <p>
                              {event.guestName} ({event.phone})
                            </p>
                            <button
                              onClick={() => openPreDeleteModal(event.phone, 'playback', day, date, false)} 
                              type='button' 
                              className='events-table__delete'></button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {livePerfEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {livePerfEvents.length}</p>
                          {hiddenColumns.livePerf[day] ? (
                            <div 
                              onClick={() => toggleColumnVisibility('livePerf', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleColumnVisibility('livePerf', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', 
                        {'events-table__users--hidden': hiddenColumns.livePerf[day]})}
                      >
                        {livePerfEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                          <p>
                            {event.guestName} ({event.phone})
                          </p>
                          <button
                            onClick={() => openPreDeleteModal(event.phone, 'livePerf', day, date, false)}
                            type='button' className='events-table__delete'></button>
                        </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <table className='events-table__shows'>
          <caption className='events-table__caption'>Classes</caption>
          <thead>
            <tr className='events-table__table-head'>
              <th className='events-table__table-titles'>Day of the week</th>
              {classes.map(className => (
                <th className='events-table__table-titles' key={className}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day: DayOfWeek) => {
              const uniqueHeelsDates = getUniqueDates(events.otherClasses.heels, day).filter(isInCurrentWeek);
              const uniqueTwerkDates = getUniqueDates(events.otherClasses.twerk, day).filter(isInCurrentWeek);
              const uniqueExoticDates = getUniqueDates(events.otherClasses.exotic, day).filter(isInCurrentWeek);
              const uniquePoleDanceDates = getUniqueDates(events.otherClasses.poleDance, day).filter(isInCurrentWeek);
              const uniqueStretchingDates = getUniqueDates(events.otherClasses.stretching, day).filter(isInCurrentWeek);
              const uniqueDates = Array.from(new Set([...uniqueHeelsDates, ...uniqueTwerkDates, ...uniqueExoticDates, ...uniquePoleDanceDates, ...uniqueStretchingDates]));

              return uniqueDates.map(date => {
                const heelsEvents = events.otherClasses.heels.filter(event => event.dayOfWeek === day && event.date === date);
                const twerkEvents = events.otherClasses.twerk.filter(event => event.dayOfWeek === day && event.date === date);
                const exoticEvents = events.otherClasses.exotic.filter(event => event.dayOfWeek === day && event.date === date);
                const poleDanceEvents = events.otherClasses.poleDance.filter(event => event.dayOfWeek === day && event.date === date);
                const stretchingEvents = events.otherClasses.stretching.filter(event => event.dayOfWeek === day && event.date === date);

                return (
                  <tr key={`${day}-${date}`} className='events-table__table-row'>
                    <td>
                      <p className='events-table__day'>
                        {day} ({date})
                      </p>
                    </td>
                    <td className='events-table__column'>
                      {heelsEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {heelsEvents.length}</p>
                          {hiddenClassColumns.heels[day] ? (
                            <div 
                              onClick={() => toggleClassColumnVisibility('heels', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleClassColumnVisibility('heels', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', {'events-table__users--hidden': hiddenClassColumns.heels[day]})}>
                        {heelsEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                            <div>
                              {event.guestName} {event.phone} 
                              <p className='events-table__payment'>{event.paymentType}</p>
                              {event.classPrice && (
                                <>
                                  <p className='events-table__payment'>{event.peoplesPerClass}</p>
                                  <p className='events-table__payment'>{event.classPrice}EUR</p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => openPreDeleteModal(event.phone, 'heels', day, date, true)}
                              type='button' className='events-table__delete'></button>
                        </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {twerkEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {twerkEvents.length}</p>
                          {hiddenClassColumns.twerk[day] ? (
                            <div 
                              onClick={() => toggleClassColumnVisibility('twerk', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleClassColumnVisibility('twerk', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', {'events-table__users--hidden': hiddenClassColumns.twerk[day]})}>
                        {twerkEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                            <div>
                              {event.guestName} {event.phone} 
                              <p className='events-table__payment'>{event.paymentType}</p>
                              {event.classPrice && (
                                <>
                                  <p className='events-table__payment'>{event.peoplesPerClass}</p>
                                  <p className='events-table__payment'>{event.classPrice}EUR</p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => openPreDeleteModal(event.phone, 'twerk', day, date, true)}
                              type='button' className='events-table__delete'></button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {exoticEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {exoticEvents.length}</p>
                          {hiddenClassColumns.exotic[day] ? (
                            <div 
                              onClick={() => toggleClassColumnVisibility('exotic', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleClassColumnVisibility('exotic', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', {'events-table__users--hidden': hiddenClassColumns.exotic[day]})}>
                        {exoticEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                              <div>
                                {event.guestName} {event.phone} 
                                <p className='events-table__payment'>{event.paymentType}</p>
                                {event.classPrice && (
                                <>
                                  <p className='events-table__payment'>{event.peoplesPerClass}</p>
                                  <p className='events-table__payment'>{event.classPrice}EUR</p>
                                </>
                              )}
                              </div>
                              <button
                                onClick={() => openPreDeleteModal(event.phone, 'exotic', day, date, true)}
                                type='button' className='events-table__delete'></button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {poleDanceEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {poleDanceEvents.length}</p>
                          {hiddenClassColumns.poleDance[day] ? (
                            <div 
                              onClick={() => toggleClassColumnVisibility('poleDance', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleClassColumnVisibility('poleDance', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', {'events-table__users--hidden': hiddenClassColumns.poleDance[day]})}>
                        {poleDanceEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                            <div>
                              {event.guestName} {event.phone} 
                              <p className='events-table__payment'>{event.paymentType}</p>
                              {event.classPrice && (
                                <>
                                  <p className='events-table__payment'>{event.peoplesPerClass}</p>
                                  <p className='events-table__payment'>{event.classPrice}EUR</p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => openPreDeleteModal(event.phone, 'poleDance', day, date, true)}
                              type='button' className='events-table__delete'></button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='events-table__column'>
                      {stretchingEvents.length > 0 && (
                        <div className='events-table__count-block'>
                          <p>guests: {stretchingEvents.length}</p>
                          {hiddenClassColumns.stretching[day] ? (
                            <div 
                              onClick={() => toggleClassColumnVisibility('stretching', day)} 
                              className='events-table__guests-count'></div>
                          ) : (
                            <div 
                              onClick={() => toggleClassColumnVisibility('stretching', day)} 
                              className='events-table__guests-count events-table__guests-count--close'></div>
                          )}
                        </div>
                      )}
                      <div className={classNames('events-table__users', {'events-table__users--hidden': hiddenClassColumns.stretching[day]})}>
                        {stretchingEvents.map(event => (
                          <div className='events-table__user' key={event.phone}>
                            <div>
                              {event.guestName} {event.phone} 
                              <p className='events-table__payment'>{event.paymentType}</p>
                              {event.classPrice && (
                                <>
                                  <p className='events-table__payment'>{event.peoplesPerClass}</p>
                                  <p className='events-table__payment'>{event.classPrice}EUR</p>
                                </>
                              )}
                            </div>
                            <button
                              onClick={() => openPreDeleteModal(event.phone, 'stretching', day, date, true)}
                              type='button' className='events-table__delete'></button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <PreDeleteModal 
          deleteDetails={deleteDetails}
          isVisible={isPreDeleteVisible}
          setIsPreDeleteVisible={setIsPreDeleteVisible}
          setEventList={setEventList}
        />
      </div>
    </div>
  );
};