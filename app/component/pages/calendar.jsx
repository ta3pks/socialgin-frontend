import React from "react";
import { connect } from "react-redux";
import Month from "./modules/calendar/month";
import Week from "./modules/calendar/week";
import Day from "./modules/calendar/day";

import Config from "./../../config";
import cookier from "../../../public/js/cookier";
import ajax from "../../functions/ajax/ajax";

import {nextMonth, previousMonth, setCalendarType, nextWeek, previousWeek, nextDay, previousDay, setEvents} from "./../../actions/calendarActions";

@connect(store=>{
    return {
        date : store.Calendar.date,
        type : store.Calendar.type,
        weekDate : store.Calendar.weekDate,
        dayDate : store.Calendar.dayDate,
        language : store.User.language,
    }
})
export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      loading : false
    }
  }
  setLoader(){
    this.setState({
      loading : !this.state.loading
    })
  }
  nextMonth() {
    this.props.dispatch(nextMonth())
    const that = this;
        const startDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth()).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth() + 2).getTime() / 1000);
        that.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate();
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
        })
  }
  previousMonth() {
    this.props.dispatch(previousMonth())
    const that = this;
        const startDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth() - 1).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth() + 2).getTime() / 1000);
        that.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate();
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
        })
  }
  nextWeek() {
    this.props.dispatch(nextWeek())
    const that = this;
        const startDate = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(),  that.props.weekDate.getDate() - 7).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(), that.props.weekDate.getDate() + 14) .getTime() / 1000);
        that.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate();
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");            
        })
  }
  previousWeek() {
    this.props.dispatch(previousWeek())
    const that = this;
        const startDate = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(),  that.props.weekDate.getDate() - 7).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(), that.props.weekDate.getDate() + 14) .getTime() / 1000);
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()            
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate();
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");                        
        })
  }
  nextDay() {
    this.props.dispatch(nextDay())
    const that = this;
        const startDate = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(),  that.props.dayDate.getDate(), 0, 0, 0).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(), that.props.dayDate.getDate() + 1, 23, 59, 59) .getTime() / 1000);
        that.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()            
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate() + "-" + (timeSegment.getHours() < 10 ? "0" + timeSegment.getHours() : timeSegment.getHours());
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");                                    
        })
  }
  previousDay() {
    this.props.dispatch(previousDay())
    const that = this;
        const startDate = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(),  that.props.dayDate.getDate() - 3, 0, 0, 0).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(), that.props.dayDate.getDate() + 3, 23, 59, 59) .getTime() / 1000);
        that.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.setLoader()
            const eventList = {}
            for(var i=0; i<result.length; i++){
                var event = result[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate() + "-" + (timeSegment.getHours() < 10 ? "0" + timeSegment.getHours() : timeSegment.getHours());
                if(eventList[timeHandler]){
                    eventList[timeHandler].push(event)
                }else{
                    eventList[timeHandler] = [];
                    eventList[timeHandler].push(event)
                }
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");                                                
        })
  }
  setCalendarType(e) {
    const actionType = e.currentTarget.dataset.id;
    this.props.dispatch(setCalendarType(actionType))
  }
  render() {
    const that = this;
    return (
      <div className="calendar-page animated fadeIn">
        {(_=>{
          if(that.props.type === "month"){
            return (
              <div className="calendar-controller">
                <svg viewBox="0 0 24 24" onClick={that.previousMonth.bind(that)}>
                  <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                </svg>
                <span className="title">{that.props.language.monthList[that.props.date.getMonth()]} {that.props.date.getFullYear()}</span>
                  <svg viewBox="0 0 24 24" onClick={that.nextMonth.bind(that)}>
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
              </div>
            )
          }
        })()}
        {(_=>{
          if(that.props.type === "week"){
            const today = that.props.weekDate;
            const nextWeek = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
            return (
              <div className="calendar-controller">
                <svg viewBox="0 0 24 24" onClick={that.previousWeek.bind(that)}>
                  <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                </svg>
                <span className="title">{that.props.language.monthList[today.getMonth()]} {today.getDate()} - {that.props.language.monthList[nextWeek.getMonth()]} {nextWeek.getDate()}, {nextWeek.getFullYear()}</span>
                  <svg viewBox="0 0 24 24" onClick={that.nextWeek.bind(that)}>
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
              </div>
            )
          }
        })()}
        {(_=>{
          if(that.props.type === "day"){
            const today = that.props.dayDate;
            return (
              <div className="calendar-controller">
                <svg viewBox="0 0 24 24" onClick={that.previousDay.bind(that)}>
                  <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                </svg>
                <span className="title">{that.props.language.monthList[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</span>
                  <svg viewBox="0 0 24 24" onClick={that.nextDay.bind(that)}>
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
              </div>
            )
          }
        })()}
        <div className="calendar-options">
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "month" ? "active" : ""} data-id="month">Monthly</span>
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "week" ? "active" : ""} data-id="week">Weekly</span>
          <span onClick={that.setCalendarType.bind(that)} className={that.props.type === "day" ? "active" : ""} data-id="day">Daily</span>
        </div>
        {(_=>{
          if(that.props.type === "month"){
            return <Month loading={that.state.loading} setLoader={that.setLoader.bind(that)} />
          }
        })()}
        {(_=>{
          if(that.props.type === "week"){
            return <Week loading={that.state.loading} setLoader={that.setLoader.bind(that)} />
          }
        })()}
        {(_=>{
          if(that.props.type === "day"){
            return <Day loading={that.state.loading} setLoader={that.setLoader.bind(that)} />
          }
        })()}
      </div>
    );
  }
}
