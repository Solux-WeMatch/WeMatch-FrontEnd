import React, { useState, useEffect } from 'react';
import Event from './Event';
import './Main_side.css';
// import axios from 'axios';

const SideBar = ({ selectedDay }) => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [mockEvents, setMockEvents] = useState([
    {
        eventId: 1,
        memberId: 19,
        eventName: '뮤지컬',
        start_schedule: '2023-08-06T14:00:00',
        end_schedule: '2023-08-06T15:30:00',
      },
      {
        eventId: 2,
        memberId: 19,
        eventName: '저녁 약속',
        start_schedule: '2023-08-06T18:40:00',
        end_schedule: '2023-08-06T22:00:00',
      },
      {
        eventId: 3,
        memberId: 19,
        eventName: '알바',
        start_schedule: '2023-08-07T13:30:00',
        end_schedule: '2023-08-07T16:30:00',
      },
      {
        eventId: 4,
        memberId: 19,
        eventName: '농구',
        start_schedule: '2023-08-08T18:50:00',
        end_schedule: '2023-08-08T21:00:00',
      },
      {
        eventId: 5,
        memberId: 19,
        eventName: '과외',
        start_schedule: '2023-08-09T10:00:00',
        end_schedule: '2023-08-09T12:00:00',
      },
      {
        eventId: 6,
        memberId: 19,
        eventName: '알바',
        start_schedule: '2023-08-09T13:30:00',
        end_schedule: '2023-08-09T16:30:00',
      },
      {
        eventId: 7,
        memberId: 19,
        eventName: '농구',
        start_schedule: '2023-08-10T12:30:00',
        end_schedule: '2023-08-10T14:00:00',
      },
      {
        eventId: 8,
        memberId: 19,
        eventName: '알바',
        start_schedule: '2023-08-10T19:00:00',
        end_schedule: '2023-08-10T22:00:00',
      },
      {
        eventId: 9,
        memberId: 19,
        eventName: '과외',
        start_schedule: '2023-08-11T10:00:00',
        end_schedule: '2023-08-11T12:00:00',
      },
      {
        eventId: 10,
        memberId: 19,
        eventName: '알바',
        start_schedule: '2023-08-11T13:30:00',
        end_schedule: '2023-08-11T16:29:00',
      },
      {
        eventId: 11,
        memberId: 19,
        eventName: '농구 대회',
        start_schedule: '2023-08-11T17:00:00',
        end_schedule: '2023-08-11T21:00:00',
      },
      {
        eventId: 12,
        memberId: 19,
        eventName: '알바',
        start_schedule: '2023-08-12T07:30:00',
        end_schedule: '2023-08-12T13:00:00',
      },
      {
        eventId: 13,
        memberId: 19,
        eventName: '농구 대회',
        start_schedule: '2023-08-12T15:00:00',
        end_schedule: '2023-08-12T19:00:00',
      },
  ]);

  

  const fetchEventsForSelectedDay = () => {
    const newSelectedDay = new Date(selectedDay);
    newSelectedDay.setDate(selectedDay.getDate()+1);
    const formattedDate = newSelectedDay.toISOString().split('T')[0];
    // console.log(formattedDate);
    const memberId = 19;

    const filteredEvents = mockEvents.filter((event) => {
      const eventDate = event.start_schedule.split('T')[0];
      return eventDate === formattedDate;
    });

    setEvents(filteredEvents);

    // const queryString = `?memberId=${memberId}&date=${formattedDate}`;

    // axios.get(`https://cors-anywhere.herokuapp.com/corsdemo/http://13.124.181.169:8080/event/day${queryString}`)
    // .then((response) => {
    //     const data = response.data;
    //     if (data.success) {
    //         setEvents(data.data);
    //     } else {
    //         console.error('Error fetching events:', data.message);
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error fetching events:', error);
    // });

    // fetch(`http://13.124.181.169:8080/event/day${queryString}`)
    // .then((response) => response.json())
    // .then((data) => {
    // if (data.success) {
    //     setEvents(data.data);
    // } else {
    //     console.error('Error fetching events:', data.message);
    // }
    // })
    // .catch((error) => {
    // console.error('Error fetching events:', error);
    // });
  };

  useEffect(() => {
    if (selectedDay) {
      fetchEventsForSelectedDay();
    }
  }, [selectedDay]);

  const handleAddEventClick = () => {
    setShowAddEventForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.eventId !== eventId);
    setEvents(updatedEvents);

    const updatedMockEvents = mockEvents.filter((event) => event.eventId !== eventId);
    setMockEvents(updatedMockEvents);

    // axios.delete(`https://cors-anywhere.herokuapp.com/corsdemo/http://13.124.181.169:8080/event/delete?eventId=${eventId}`)
    // .then((response) => {
    //     const data = response.data;
    //     if (data.success) {
    //         // Filter out the deleted event from the events array
    //         const updatedEvents = events.filter((event) => event.eventId !== eventId);
    //         setEvents(updatedEvents);
    //     } else {
    //         console.error('Error deleting event:', data.message);
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error deleting event:', error);
    // });

    // fetch(`http://13.124.181.169:8080/event/delete?eventId=${eventId}`, {
    //   method: 'DELETE',
    // })
    // .then((response) => response.json())
    // .then((data) => {
    // if (data.success) {
    //     // Filter out the deleted event from the events array
    //     const updatedEvents = events.filter((event) => event.eventId !== eventId);
    //     setEvents(updatedEvents);
    // } else {
    //     console.error('Error deleting event:', data.message);
    // }
    // })
    // .catch((error) => {
    // console.error('Error deleting event:', error);
    // });
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="sidebar">
      <h1 className="date">{selectedDay.getDate()}</h1>
      <h3 className="date">{daysOfWeek[selectedDay.getDay()]}</h3>
      <div className="eventListContainer">
        {selectedDay && events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.eventId}>
                <p>{event.eventName}</p>
                <p>
                  {event.start_schedule} - {event.end_schedule}
                </p>
                <button onClick={() => handleDeleteEvent(event.eventId)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>아무 일도 없는 날!</p>
        )}
      </div>
      <div className="addEventContainer">
        {selectedDay && <Event selectedDay={selectedDay} mockEvents={mockEvents} setMockEvents={setMockEvents} />}
      </div>
    </div>
  );
};

export default SideBar;
