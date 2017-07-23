import React from "react";
import notifier from "notifier/js/notifier.js";
import axios from "axios";
import {
    connect
} from "react-redux";

import {
    selectAccount
} from "./../../actions/accountActions";
import {
    modalOpen,
    modalClose
} from "./../../actions/modalActions";
import {
    loadedSidebar
} from "./../../actions/settingsAcrions"
import config from "./../../config";
import cookier from "../../../public/js/cookier";

import "notifier/css/notifier.css";

const colors = {
    0 : "rgba(75,192,192,0.4)",
    1 : "rgba(230,126,34,0.4)",
    2 : "rgba(46,204,113,0.4)",
    3 : "rgba(52,152,219,0.4)",
    4 : "rgba(241,196,15,0.4)"
}

@connect(store => {
    return {
        accounts: store.User.list,
        open: store.Modal.open,
        reports: store.Report.statistics_list,
        page: store.Router.page
    }
})

export default class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchAccount: ""
        }
    }
    openModal() {
        this.props.dispatch(modalOpen())
    }
    hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.4)';
        }else{
            return colors[Math.round(Math.random()* 3)]
        }
    }
    selectAccount(e) {
        const that = this;
        const targetData = e.currentTarget.dataset.key;
        if (!targetData) return;
        if (that.props.page["Reports"].active && that.props.accounts[targetData].selected === false) {
            var dt = new Date()
            dt.setMonth(dt.getMonth() - 1)
            axios.get(config.graph.facebook.fans, {
                params: {
                    start: Math.round(dt.getTime() / 1000),
                    token: cookier.parse("token"),
                    id: targetData
                }
            }).then(data => {
                const res = data.data;
                console.log("Beta : ", res);
                if (res.error) return swal("Error !", res.error || "Somethings went wrong. Please try again later.", "error");
                const labels = []
                const datasetData = []
                res.map(numbers => {
                    let date = new Date(numbers.end_time);
                    labels.push(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())
                    let value = numbers.value ? numbers.value : null
                    datasetData.push(value)
                })
                that.props.dispatch({
                    type: "SET_LINE_LABELS",
                    payload: labels
                })
                const social_accounts = that.props.accounts[targetData];
                const lineColor = that.hexToRgbA('#' + Math.floor(Math.random()*16777215).toString(16));
                that.props.dispatch({
                    type: "SET_LINE_DATASET",
                    payload: {
                        user_id : social_accounts.id,
                        label: social_accounts.name + " " + social_accounts.surname +"'s Facebook Page Fans",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: lineColor,
                        borderColor: lineColor,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 1.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: lineColor,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: lineColor,
                        pointHoverBorderColor: lineColor,
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        data: datasetData
                    }
                })
            }).catch(err => {
                console.log("Beta : ", err);
                swal("Error !", err || "Somethings went wrong. Please try again later.", "error");
            })
        }else if(that.props.page["Reports"].active && that.props.accounts[targetData].selected === true){
            console.log("teas")
            that.props.dispatch({
                type : "REMOVE_LINE_DATASET",
                payload : targetData
            })
        }
        that.props.dispatch(selectAccount(targetData))
    }
    render() {
        const that = this;
        return (
            <div className={that.props.mobilSidebar ? "sidebar active" : "sidebar"}>
                <div className="add-account">
                    <button className="btn red" onClick={that.openModal.bind(that)}>
                        ADD ACCOUNT
                    </button>
                </div>
                <div className="search-area">
                    <svg viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                    <input onChange={(e=>{that.setState({searchAccount : e.target.value})}).bind(that)} type="text" className="material-input" placeholder="Search Account"/>
                </div>
                <div className="account-list">
                    {(_=>{
                        var list = that.props.accounts;
                        var data = [];
                        for (let key in list) {
                            if (list.hasOwnProperty(key)) {
                                var account = list[key];
                                var active = account.selected ? "active" : "";
                                if(RegExp(that.state.searchAccount, 'i').test(account.name)){
                                    data.push(
                                        <div key={key} data-key={key} onClick={that.selectAccount.bind(that)} className={"account " + config.accountTypes[account.type] + " " + active}>
                                            <img className="profile-image" src={account.profile_picture} alt={account.name}/>
                                            <span>{account.name} {account.surname}</span>
                                        </div>
                                    )                      
                                }
                            }
                        }
                        return data
                    })()}
                </div>
            </div>
        );
    }
}