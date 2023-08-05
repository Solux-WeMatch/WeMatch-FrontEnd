import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './MyCalendar.module.css';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
    // Add more events here
  ];


// toolbar 커스텀한 부분 
  const MyCustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };
  
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };
  
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };
  
    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span>
          {date.format('YYYY-MM')}
        </span>
      );
    };
  
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>Previous</button>
          <button type="button" onClick={goToNext}>Next</button>
          <button type="button" onClick={goToToday}>Today</button>
        </span>
        <span className="rbc-toolbar-label">{label()}</span>
      </div>
    );
  };


  return (
    <div className={styles.calendarContainer}>
      {/* 헤더 부분 */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>기능들 채워주세요</span>
      </div>
      <div className={styles.profile}></div>

      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 1200 , width: 1000 }}
        startAccessor="start"
        endAccessor="end"
        view='week'
        defaultView='week'
        components={{
          toolbar: MyCustomToolbar,
        }}
      />
    </div>
  );
};

export default MyCalendar;
