import React from "react";
import { connect } from "react-redux";
import axios from "axios"

import Config from "../../../../config"
import Language from "./../../../../language/index";
import {setEvents} from "../../../../actions/calendarActions";


@connect(store=>{
    return {
        date : store.Calendar.date,
        events : store.Calendar.events
    }
})

export default class CalendarMonth extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        const that = this;
        const user_data = window.localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
        const startDate = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth()).getTime() / 1000);
        const endTime = Math.round(new Date(that.props.date.getFullYear(), that.props.date.getMonth() + 2).getTime() / 1000);
        axios.get(Config.calendar, {
            params: {
                start : startDate,
                end : endTime,
                token : user_data
            }
        }).then(data=>{
            console.log("Beta : ", data.data);
            const res = data.data;
            if(res.error) return swal("Error !", res.error, "error");
            const eventList = {}
            for(var i=0; i<res.length; i++){
                var event = res[i];
                var timeSegment = new Date(Math.round(event.time * 1000));
                var timeHandler = timeSegment.getFullYear() + "-" + (timeSegment.getMonth() + 1) + "-" + timeSegment.getDate();
                eventList[timeHandler] = event;
            }
            that.props.dispatch(setEvents(eventList))
        }).catch(err=>{
            console.log("Beta : ", err);
            swal("Error !", "Somethings went wrong. Please reload this page and try again.", "error")
        })
    }
    render() {
        const that = this;
        return (
            <div className="calendar-month animated fadeIn">
                <ol class="day-names">
                    {Language.eng.dayNamesShort.map(name=>{
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
                                       if(eventList[currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate()]){
                                           return (
                                               <div key={window.keyGenerator()} className="event">
                                                   <div className="event-explanation">
                                                      BURADA
                                                    </div>
                                                </div>
                                           )
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
