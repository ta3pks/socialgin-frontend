import React from "react";

import Language from "./../../language/index";

export default class NotificationsPage extends React.Component {
    constructor(){
        super();
        this.state = {
            notifications : []
        }
    }
    render() {
        const that = this;
        return (
            <div className="notificationsPage animated fadeIn">
                <div className="header">
                    Notifications
                </div>
                <div className="container">
                    {that.state.notifications.map(noti=>{
                        return (
                            <div className="notification-item">
                                <div className="time">
                                    <span>{Language.eng.monthListShort[new Date(noti.date).getMonth()] + " " + new Date(noti.date).getDate()}</span>
                                    <span>{new Date(noti.date).getHours() + ":" + new Date(noti.date).getMinutes()}</span>
                                </div>
                                <div className="content">
                            <div className="message">
                                "{noti.from} tarafindan {noti.to.name + " " + noti.to.surname} hesabina {new Date(noti.date).getDate() + " " + Language.eng.monthList[new Date(noti.date).getMonth()] + " " + new Date(noti.date).getFullYear()} tarahine paylasim atandi."
                            </div>
                            {(_=>{
                                if(noti.content.text){
                                    return (
                                        <div className="text">
                                            {noti.content.text}
                                        </div>
                                    )
                                }
                            })()}
                            {(_=>{
                                if(noti.content.images && noti.content.images.length > 0){
                                    return(
                                        <div className="images">
                                            {noti.content.images.map(image=>{
                                                return <img src={image} key={(Math.floor(Math.random() * 1000)).toString()} alt=""/>
                                            })}
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                        {(_=>{
                            if(noti.needApprove){
                                return (
                                    <div className="approve">
                                        <div className="select success">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                            </svg>
                                        </div>
                                        <div className="select error">
                                            <svg className="icon" viewBox="0 0 24 24">
                                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
