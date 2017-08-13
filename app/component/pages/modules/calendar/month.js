import React from "react";
import { connect } from "react-redux";

import cookier from "../../../../../public/js/cookier";
import Config from "../../../../config"
import {setEvents} from "../../../../actions/calendarActions";
import ajax from "../../../../functions/ajax/ajax";

@connect(store=>{
    return {
        date : store.Calendar.date,
        events : store.Calendar.events,
        accounts : store.User.list,
        language : store.User.language,
    }
})

export default class CalendarMonth extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        const that = this;
        const startDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth()).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth() + 2).getTime() / 1000);
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
            <div className="calendar-month animated fadeIn">
                <ol class="day-names">
                    {that.props.language.dayNamesShort.map(name=>{
                        return <li key={name}>{name}</li>
                    })}
                </ol>
                <ol className="days">
                    {(_=>{
                        let controlDate = new Date(that.props.date.getFullYear(), that.props.date.getMonth() + 1, 0)
                        let currDate = new Date(that.props.date.getFullYear(), that.props.date.getMonth(), 1)
                        let iter = 0;
                        let ready = true;
                        let yansit = [];
                        const eventList = that.props.events;
                        if (currDate.getDay() !== 0) {
                            iter = 0 - currDate.getDay()
                        }
                        while (ready) {
                            let isOfset = Boolean(iter < 1 || +currDate > +controlDate);
                            let isoDate = currDate.toISOString()
                            isoDate = isoDate.slice(0, isoDate.indexOf('T'))
                            currDate = new Date(that.props.date.getFullYear(), that.props.date.getMonth(), ++iter)
                            yansit.push(
                                <li key={window.keyGenerator()} className={iter < 1 || +currDate > +controlDate ? "outside" : ""}>
                                    <div className="date">{currDate.getDate()}</div>
                                    {(_=>{
                                        let event = eventList[currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate()];
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
                            if (+controlDate < +currDate && currDate.getDay() === 1) {
                                ready = false
                            }
                        }
                        return yansit;
                    })()}
                </ol>
            </div>
        );
            }
    }
}
