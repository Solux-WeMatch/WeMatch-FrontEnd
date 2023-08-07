import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './MyCalendar.module.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 서버로부터 이벤트 데이터 가져오기
    axios.get('/team')
      .then(response => {
        // 가져온 이벤트 데이터를 state에 설정
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleSelectSlot = ({ start }) => {
    // 주차 정보 계산
    const weekNumber = moment(start).isoWeek();
    const year = moment(start).year();
    const groupId = 'groupID'; 

    // 주차 정보 서버에 전송
    const params = { weekNumber, year, groupId }; // 주차 정보를 쿼리스트링 형식으로 설정

    axios.get('http://13.124.181.169:8080', { params })
      .then(response => {
        console.log('주차/ 연도 정보가 성공적으로 전송되었습니다.', response.data);
      })
      .catch(error => {
        console.error('주차/연도 정보 전송 중 오류가 발생했습니다.', error);
      });
  };

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
    <div style={{ display: 'flex' }}>
    <div className={styles.calendarContainer}>
      {/* 헤더 부분 */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>기능들 채워주세요</span>
      </div>
      <div className={styles.profile}></div>

      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 1100 , width: 900 }}
        startAccessor="start"
        endAccessor="end"
        view='week'
        defaultView='week'
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: MyCustomToolbar,
        }}
      />
      <Sidebar/>
    </div>
    </div>
  );
};

export default MyCalendar;
