import React from "react";
import { connect } from "react-redux";

import Config from "../../../../config"
import {setEvents} from "../../../../actions/calendarActions";
import cookier from "../../../../../public/js/cookier";
import ajax from "../../../../functions/ajax/ajax";

@connect(store=>{
    return {
        date : store.Calendar.date,
        events : store.Calendar.events,
        weekDate : store.Calendar.weekDate,
        accounts : store.User.list,
        language : store.User.language,
    }
})

export default class CalendarWeek extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        const that = this;
        const startDate = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(),  that.props.weekDate.getDate()).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.weekDate.getFullYear(), that.props.weekDate.getMonth(), that.props.weekDate.getDate() + 7) .getTime() / 1000);
        that.props.setLoader()
        ajax("get", Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : cookier.parse("token")
            }
        }, true, 1).then(result=>{
            that.props.setLoader()
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
    render() {
        const that = this;
          if(that.props.loading){
            return (
                <div className="content-loader">
                  <div className="loader"></div>
                </div>
            )
          }else{
              return (
            <div className="calendar-week animated fadeIn">
                <ol class="day-names">
                    {(_=>{
                        const yazdir = [];
                        let day = that.props.weekDate
                        let ready = true;
                        let dayNumber = 0;
                        while(ready){
                            yazdir.push(
                                <li key={window.keyGenerator()}>
                                    <span>{that.props.language.dayNamesShort[day.getDay()]}</span>
                                    <span>({day.getMonth() +1}/{day.getDate()})</span>
                                </li>
                            );
                            day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
                            dayNumber++
                            if(dayNumber == 7){
                                ready = false;
                            }
                        }
                        return yazdir
                    })()}
                </ol>
                <ol class="event-list">
                    {(_=>{
                        const yazdir = [];
                        let day = new Date(that.props.weekDate)
                        let ready = true;
                        let dayNumber = 0;
                        while(ready){
                            yazdir.push(
                                <li key={window.keyGenerator()}>
                                    {(_=>{
                                        let event = that.props.events[day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()];
                                        if(event){
                                           return event.map(currentDateEvent=>{
                                               return (
                                                   <div key={window.keyGenerator()} className="event">
                                                        <div className="event-explanation">
                                                            {(_=>{
                                                                return (
                                                                    <span>
                                                                        {(_=>{
                                                                            if(currentDateEvent.text){
                                                                                return currentDateEvent.text
                                                                            }else if(currentDateEvent.image_links.length){
                                                                                return currentDateEvent.image_links.length + " images"
                                                                            }else if(currentDateEvent.link){
                                                                                return currentDateEvent.link
                                                                            }
                                                                        })()}
                                                                        {", will be shared on "}
                                                                        {(_=>{
                                                                            if(that.props.accounts[currentDateEvent.account_id]){
                                                                                return that.props.accounts[currentDateEvent.account_id].name + " " + that.props.accounts[currentDateEvent.account_id].surname + "."
                                                                            }else{
                                                                                return "An account"
                                                                            }
                                                                        })()}
                                                                    </span>
                                                                )
                                                            })()}
                                                        </div>
                                                    </div>
                                                )
                                           })
                                       }
                                    })()}
                                </li>
                            );
                            day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
                            dayNumber++
                            if(dayNumber == 7){
                                ready = false;
                            }
                        }
                        return yazdir
                    })()}
                </ol>
            </div>
        );
          }
    }
}
