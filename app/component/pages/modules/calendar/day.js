import React from "react";
import { connect } from "react-redux";

import cookier from "../../../../../public/js/cookier";
import Config from "../../../../config"
import {setEvents} from "../../../../actions/calendarActions";
import ajax from "../../../../functions/ajax/ajax";

@connect(store=>{
    return {
        dayDate : store.Calendar.dayDate,
        events : store.Calendar.events,
        accounts : store.User.list,
        language : store.User.language,
    }
})

export default class CalendarDay extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        const that = this;
        const startDate = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(),  that.props.dayDate.getDate(), 0, 0, 0).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.dayDate.getFullYear(), that.props.dayDate.getMonth(), that.props.dayDate.getDate() + 1, 23, 59, 59) .getTime() / 1000);
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
            <div className="calendar-day animated fadeIn">
                <ol className="day-names">
                    <li>{that.props.language.dayNamesShort[that.props.dayDate.getDay()]}</li>
                </ol>
                <ol className="event-list">
                    {(_=>{
                        const yansit = []
                        let day = new Date(that.props.dayDate);
                        for(let i=0; i<24; i++){
                            if(i<10) i = "0" + i;
                            yansit.push(
                                <li key={window.keyGenerator()} className="hour">
                                    {i.toString()}:00
                                </li>
                            )
                            yansit.push(
                                <li key={window.keyGenerator()} className="events">
                                    {(_=>{
                                        let event = that.props.events[day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate() + "-" + i];
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
                            )
                        }
                        return yansit
                    })()}
                </ol>
            </div>
        );
            }
    }
}
