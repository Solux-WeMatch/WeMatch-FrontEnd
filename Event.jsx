import React, { useState } from 'react';
import './Main_side.css';

const Event = ({ selectedDay, mockEvents, setMockEvents }) => {
  const [eventName, setEventName] = useState('');
  const [startSchedule, setStartSchedule] = useState('');
  const [endSchedule, setEndSchedule] = useState('');

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getDateTimeAnHourAway = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSaveEvent = () => {

    const newEvent = {
      eventId: mockEvents.length + 1,
      memberId: 19,
      eventName: eventName,
      start_schedule: startSchedule || getCurrentDateTime(),
      end_schedule: endSchedule || getDateTimeAnHourAway(),
    };
  
    const nextDay = new Date(selectedDay);
    nextDay.setDate(selectedDay.getDate() + 1);
  
    const updatedMockEvents = [...mockEvents, newEvent]; 
    setMockEvents(updatedMockEvents);
    console.log(updatedMockEvents);

    // axios.delete(`https://cors-anywhere.herokuapp.com/corsdemo/http://13.124.181.169:8080/event/delete?eventId=${eventId}`)
    // .then((response) => {
    //     const data = response.data;
    //     if (data.success) {
    //         const updatedEvents = events.filter((event) => event.eventId !== eventId);
    //         setEvents(updatedEvents);
    //     } else {
    //         console.error('Error deleting event:', data.message);
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error deleting event:', error);
    // });

    // fetch('http://13.124.181.169:8080/event/save', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newEvent),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       onAddEvent((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }]);
    //       // setEventName('');
    //       // setStartSchedule('');
    //       // setEndSchedule('');
    //     } else {
    //       console.error('Error saving event:', data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error creating event:', error);
    //   });
  };

  const handleUpdateEvent = () => {
    const requestBody = {
      eventId: 2,
      eventName: eventName,
      start_schedule: startSchedule,
      end_schedule: endSchedule,
    };

    // axios.put('https://cors-anywhere.herokuapp.com/corsdemo/http://13.124.181.169:8080/event/update', requestBody) // Use Axios put method
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.error('Error updating event:', error);
    // });

    // fetch('http://13.124.181.169:8080/event/update', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestBody),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error updating event:', error);
    //   });
  };

  return (
    <div className='addEvent'>
      <div className='addEventTime'>
        <input
          type="datetime-local"
          value={startSchedule || getCurrentDateTime()}
          onChange={(e) => setStartSchedule(e.target.value)}
          className='timeInput'
        />
        <input
          type="datetime-local"
          value={endSchedule || getDateTimeAnHourAway()}
          onChange={(e) => setEndSchedule(e.target.value)}
          className='timeInput'
        />
      </div>
      <div className='addEventSpec'>
        <input
          className='addEventText'
          type="text"
          placeholder="일정을 추가하세요"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button className='addButton' onClick={handleSaveEvent}>Save</button>
      </div>
    </div>
  );
};

export default Event;