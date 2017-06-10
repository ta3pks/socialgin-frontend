import React from "react";
import { connect } from "react-redux";

import Month from "./modules/calendar/month";
import Week from "./modules/calendar/week";
import Day from "./modules/calendar/day";

import Language from "./../../language/index";

import {nextMonth, previousMonth, setCalendarType} from "./../../actions/calendarActions";

@connect(store=>{
    return {
        date : store.Calendar.date,
        type : store.Calendar.type
    }
})
export default class Calendar extends React.Component {
  constructor() {
    super();
  }
  nextMonth() {
    this.props.dispatch(nextMonth())
  }
  previousMonth() {
    this.props.dispatch(previousMonth())
  }
  setCalendarType(e) {
    const actionType = e.currentTarget.dataset.id;
    this.props.dispatch(setCalendarType(actionType))
  }
  render() {
    const that = this;
    return (
      <div className="calendar-page animated fadeIn">
        <div className="calendar-controller">
          <svg viewBox="0 0 24 24" onClick={that.previousMonth.bind(that)}>
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
          </svg>
          <span className="title">{Language.eng.monthList[that.props.date.getMonth()]} {that.props.date.getFullYear()}</span>
          <svg viewBox="0 0 24 24" onClick={that.nextMonth.bind(that)}>
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
          </svg>
        </div>
        <div className="calendar-options">
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "month" ? "active" : ""} data-id="month">Monthly</span>
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "week" ? "active" : ""} data-id="week">Weekly</span>
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "day" ? "active" : ""} data-id="day">Daily</span>
        </div>
        {(_=>{
          if(that.props.type === "month"){
            return <Month />
          }
        })()}
        {(_=>{
          if(that.props.type === "week"){
            return <Week />
          }
        })()}
        {(_=>{
          if(that.props.type === "day"){
            return <Day />
          }
        })()}
      </div>
    );
  }
}
