import React from "react";
import { connect } from "react-redux";

import cookier from "../../../public/js/cookier"
import Config from "../../config";
import ajax from "../../functions/ajax/ajax";

@connect(store=>{
    return {
        accounts : store.User.list,
        language : store.User.language,
    }
})
export default class NotificationsPage extends React.Component {
    constructor(){
        super();
        this.state = {
            loaded : false,
            notifications : [],
        }
    }
    componentWillMount(){
        const that = this;
        const user_data = cookier.parse("token");
        if(!user_data) return window.location.href = "/";
        // skip, start, end kosullari da var !
        ajax("get", Config.getNotifications, {
            params: {
                n : 30,
                skip : 0,
                unreadonly : false,
                token : user_data
            }
        }, true, 1).then(result=>{
            that.setState({
                loaded : true,
                notifications : result
            })
        }).catch(errHandler=>{
            swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");                
        })
  }
    render() {
        const that = this;
        if(!that.state.loaded){
            return (
                <div className="content-loader">
                        <div className="loader"></div>
                    </div>
            )
        }
        return (
            <div className="notificationsPage animated fadeIn">
                <div className="header">
                    Notifications
                </div>
                <div className="container">
                    {that.state.notifications.map(noti=>{
                        let notification = noti;
                        let notificationDate = new Date(Math.floor(noti.date * 1000));
                        return (
                            <div className="notification-item">
                                <div className="time">
                                    <span>{Language.eng.monthListShort[notificationDate.getMonth()] + " " + notificationDate.getDate()}</span>
                                    <span>{notificationDate.getHours() + ":" + notificationDate.getMinutes()}</span>
                                </div>
                                <div className="content">
                                    <div className="message">
                                        {notification.message}
                                        {(_=>{
                                            if(notification.additional && notification.additional.accounts && notification.additional.accounts.length > 0){
                                                const accounts = [];
                                                for(var i=0; i<notification.additional.accounts.length; i++){
                                                if(i === notification.additional.accounts.length - 1){
                                                    accounts.push(
                                                        <strong key={window.keyGenerator()}>
                                                            {" by "}
                                                            {(_=>{
                                                                if(that.props.accounts[notification.additional.accounts[i].id]){
                                                                    return that.props.accounts[notification.additional.accounts[i].id].name + " " + that.props.accounts[notification.additional.accounts[i].id].surname + "."
                                                                }else{
                                                                    return "Deleted Account" + "."
                                                                }
                                                            })()}
                                                        </strong>
                                                    )
                                                }else{
                                                    accounts.push(
                                                    <strong key={window.keyGenerator()}>
                                                    {" by "}
                                                    {(_=>{
                                                        if(that.props.accounts[notification.additional.accounts[i].id]){
                                                            return that.props.accounts[notification.additional.accounts[i].id].name + " " + that.props.accounts[notification.additional.accounts[i].id].surname + ", "
                                                        }else{
                                                            return "Deleted Account" + ", "
                                                        }
                                                    })()}
                                                    </strong>
                                                    )
                                                }
                                            }
                                            return accounts
                                            }else if(notification.additional && notification.additional.account_id){
                                                return (
                                                    <strong key={window.keyGenerator()}>
                                                        {". "}
                                                        {(_=>{
                                                            if(that.props.accounts[notification.additional.account_id]){
                                                                return that.props.accounts[notification.additional.account_id].name + " " + that.props.accounts[notification.additional.account_id].surname
                                                            }else{
                                                                return "Deleted Account" + "."
                                                            }
                                                        })()}
                                                    </strong>
                                                )
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
