import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import config from "../../config";
import cookier from "../../../public/js/cookier";
import {Line, HorizontalBar} from 'react-chartjs-2';


@connect(store=>{
    return {
        accounts : store.User.list,
        reports: store.Report.statistics_list,
    }
})
export default class Reports extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.dispatch({
            type : "UNSELECT_ALL"
        })
    }
    render() {
        const that = this;
        return (
            <div className = "reports-page animated fadeIn"> 
                {(_ => {
                    if(that.props.reports["Line"].datasets.length > 0){
                        return <Line data={that.props.reports["Line"]} options={{scales: {yAxes: [{ticks: {stepSize: 10}}]}}}/>
                    }
                })()}
                {(_ => {
                    if(that.props.reports["Line"].datasets.length > 0){
                        return <HorizontalBar data={that.props.reports["Line"]}/>
                    }
                })()}
            </div>
        );
    }
}