import React from "react";
import { connect } from "react-redux";

import Language from "./../../../../language/index";


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
                        if (currDate.getDay() !== 0) {
                            iter = 0 - currDate.getDay()
                        }
                        while (ready) {
                            let isOfset = Boolean(iter < 1 || +currDate > +controlDate);
                            let isoDate = currDate.toISOString()
                            isoDate = isoDate.slice(0, isoDate.indexOf('T'))
                            currDate = new Date(that.props.date.getFullYear(), that.props.date.getMonth(), ++iter)
                            yansit.push(
                                <li key={Math.random() + iter + currDate.getDate()} className={iter < 1 || +currDate > +controlDate ? "outside" : ""}>
                                    <div className="date">{currDate.getDate()}</div>
                                    {(_=>{
                                        let data = []
                                        for(let i=0; i<that.props.events.length; i++){
                                            let thisDate = new Date(that.props.events[i].date);
                                            let nowDate =  currDate
                                            if(thisDate.getFullYear() == nowDate.getFullYear() && thisDate.getMonth() == nowDate.getMonth() + 1 && thisDate.getDate() == nowDate.getDate()){
                                                data.push(<div key={i} className="event">{that.props.events[i].title}</div>)
                                            }
                                        }
                                        return data
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
