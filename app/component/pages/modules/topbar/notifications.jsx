import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Config from "./../../../../config";
import {Route} from "./../../../../actions/routerActioıns";
@connect(store=>{
    return {
        accounts : store.User.list
    }
})
export default class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded : false,
      notifications : []
    }
  }
  routeNotifications(){
    const that = this;
    that.props.dropdownNotification()
    that.props.dispatch(Route("Notifications"))
  }
  componentWillMount(){
    const that = this;
    const user_data = window.localStorage.getItem("socialgin_user_data");
    if(!user_data) return window.location.href = "/";
    // skip, start, end kosullari da var !
    axios.get(Config.getNotifications, {
      params: {
        n : 10,
        skip : 0,
        unreadonly : false,
        token : user_data
      }
    }).then(data=>{
      const notificationData = data.data;
      if(notificationData.error) return swal("Error !", notificationData.error || "", "error");
      that.setState({
        loaded : true,
        notifications : notificationData
      })
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }
  render() {
    const that = this;
    return (
      <div className={"nutification-area animated fadeIn"}>
        <div className="top-notifications">
          <span>Notifications</span>
          <svg viewBox="0 0 24 24" onClick={that.props.dropdownNotification}>
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </div>
        <div className="notifications-content">
          {(_=>{
            if(that.state.loaded){
              if(that.state.notifications.length == 0){
                return (
                  <div className="notify">
                    <p className="not">There is no notification.</p>
                  </div>
                )
              }else {
                return that.state.notifications.map(notification=>{
                  let date = new Date(notification.date * 1000);
                  return (
                    <div className="notify" key={window.keyGenerator()}>
                      <p className="not">
                        {notification.message} {"by "}
                        {(_=>{
                          if(notification.additional && notification.additional.accounts.length > 0){
                            const accounts = [];
                            for(var i=0; i<notification.additional.accounts.length; i++){
                              if(i === notification.additional.accounts.length - 1){
                                console.log("ustte : ", that.props.accounts[notification.additional.accounts[i].id])
                                accounts.push(
                                  <strong key={window.keyGenerator()}>
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
                          }
                        })()}
                      </p>
                      <span className="date">{date.getDate()}.{date.getMonth()}.{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</span>
                    </div>
                  )
                })
              }
            }else{
              return(
                <div className="content-loader">
                  <div className="loader"></div>
                </div>
              )
            }
          })()}

        </div>
        <div className="notifications-footer">
          <button className="btn red" onClick={that.routeNotifications.bind(that)}>
            Wiew all notifications
          </button>
        </div>
      </div>
    );
  }
}
