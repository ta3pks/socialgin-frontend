import React from "react";
import { connect } from "react-redux";

import config from "../../config";
import cookier from "../../../public/js/cookier";
import {Line, Bar} from 'react-chartjs-2';
import {Chart} from 'react-google-charts';


@connect(store=>{
    return {
        accounts : store.User.list,
        reports: store.Report.statistics_list,
        language : store.User.language,
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
                        return (
                            <div className="chart">
                                <div className="chart-title">
                                    Fans Statistics
                                </div>
                                <div className="chart-area">
                                    <Line data={that.props.reports["Line"]} options={{scales: {yAxes: [{ticks: {stepSize: 10}}]}}}/>
                                </div>
                            </div>
                        )
                    }
                })()}
                {(_ => {
                    if(that.props.reports["Bar"].datasets.length > 0){
                        return (
                            <div className="chart">
                                <div className="chart-title">
                                    Gender Statistics
                                </div>
                                <div className="chart-area">
                                    <Bar data={that.props.reports["Bar"]}/>
                                </div>
                            </div>
                        )
                    }
                })()}
                {(_ => {
                    if(that.props.reports["Country"].datasets.length > 0){
                        return that.props.reports["Country"].datasets.map(dataset=>{
                            return (
                                <div className="chart" key={window.keyGenerator()}>
                                    <div className="chart-title">
                                        {dataset.label}
                                    </div>
                                    <div className="chart-area">
                                        <Chart chartType="GeoChart" width={"100%"} height={"100%"} data={dataset.data} options={{}} graph_id={window.keyGenerator()} egend_toggle={true}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                })()}
                {(_=>{
                    
                })()}
            </div>
        );
    }
}