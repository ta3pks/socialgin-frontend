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
            <div className="calendar-day animated fadeIn">
                day
            </div>
        );
    }
}
