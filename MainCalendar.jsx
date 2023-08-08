import React, { Component } from 'react';
import CalendarDays from './CalendarDays';
import Main_side from './Main_side';
import './MainCalendar.css'

export default class MainCalendar extends Component {
  constructor() {
    super();

    this.weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    this.months = [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ];

    this.state = {
      selectedDay: new Date(),
    };
  }

  handleSelectDay = (day) => {
    this.setState({ selectedDay: day.date })
  };

  render() {
    return (
      <div className='container'>
       <div className='side-bar'>
          <Main_side selectedDay={this.state.selectedDay} />
        </div>
        <div className="calendar">
          <div className="calendar-header">
            <h2>
              {this.state.selectedDay.getFullYear()}년 {this.months[this.state.selectedDay.getMonth()]}
            </h2>
          </div>
          <div className="calendar-body">
            <div className="table-header">
              {this.weekdays.map((weekday) => {
                return (
                  <div className="weekday">
                    <p>{weekday}</p>
                  </div>
                );
              })}
            </div>
            <CalendarDays 
              day={this.state.selectedDay}
              onSelectDay={this.handleSelectDay}
            />
          </div>
        </div>
      </div>
    );
  }
}