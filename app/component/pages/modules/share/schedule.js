import React from "react";
import Moment from "moment";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { connect } from "react-redux";

import {setDate, setHour, setMinute} from "./../../../../actions/shareActions";

@connect(store=>{
    return {
        date : store.Share.date,
        hour : store.Share.hour,
        minute : store.Share.minute
    }
})


export default class Schedule extends React.Component {
    constructor(){
        super();
    }
    select_day(day){
        this.props.dispatch(setDate(day))
    }
    selectHour(e){
        this.props.dispatch(setHour(e.currentTarget.value))
    }
    selectMinute(e){
        this.props.dispatch(setMinute(e.currentTarget.value))
    }
    render() {
        const that = this;
        return (
            <div className="schedule animated fadeIn">
                <div className="timer">
                    <div className="time-selecter">
                        <div className="time-select-area">
                            <select value={that.props.hour} onChange={that.selectHour.bind(that)} className="material-input">
                                {(_=>{
                                    let options = []
                                    for(let i=0; i<24; i++){
                                        if(i<10) i = "0" + i;
                                        options.push(<option key={i} value={i}>{i}</option>)
                                    }
                                    return options
                                })()}
                            </select>
                            <span className="sapirate">:</span>
                            <select value={that.props.minute < 10 ? "0" + that.props.minute : that.props.minute} onChange={that.selectMinute.bind(that)} className="material-input">
                                {(_=>{
                                    let options = []
                                    for(let i=0; i<=59; i++){
                                        if(i<10) i = "0" + i;
                                        options.push(<option key={i} value={i}>{i}</option>)
                                    }
                                    return options
                                })()}
                            </select>
                        </div>
                    </div>
                    <label><input type="checkbox" name="checkbox" value="value" />Email me when message is sent</label>
                </div>
                <div className="calendar-area">
                    <DayPicker selectedDays={that.props.date} onDayClick={day => that.select_day(day)} />
                </div>
            </div>
        );
    }
}
