import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import Config from "./../../config";

import Notifications from "./../pages/modules/topbar/notifications.jsx";
import ProfileMenu from "./../pages/modules/topbar/profile.jsx";

import {loadedTopbar} from "./../../actions/settingsAcrions";

@connect(store=>{
    return {
        user_name : store.User.user_name,
        avatar : store.User.avatar,
        loaded : store.Settings.page_load
    }
})
export default class Topbar extends React.Component {
    constructor(){
        super();
        this.state={
            profile_dropdown : false,
            notification_dropdown : false
        }
    }
    dropdownNotification(){
        const that = this;
        that.setState({ notification_dropdown: !that.state.notification_dropdown });
    }
    dropdownMenu(){
        const that = this;
        that.setState({ profile_dropdown: !that.state.profile_dropdown });
    }
    logout(){
        window.localStorage.setItem("socialgin_user_data", "");
        window.location.href = "/"
    }
    render() {
        const that = this;
        return (
            <div className="topbar">
                <div className="container">
                    <div className="logo-area">
                        <a href="#" className={that.props.mobilSidebar ? "open" : ""} onClick={that.props.mobil_sidebar}>
                            <svg viewBox="0 0 24 24">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </a>
                        <img class="logo" src="/public/img/logo_icon_white.svg" alt="" />
                        <a href="#" onClick={that.props.mobil_menu} className="mobil_menu_button">
                            <svg viewBox="0 0 24 24">
                                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                            </svg>
                        </a>
                    </div>
                    {(_=>{
                        if(that.props.loaded.topbar && that.props.loaded.sidebar){
                            return (
                                <div className="user-area">
                                    <div className="notifications">
                                        <svg viewBox="0 0 24 24" onClick={that.dropdownNotification.bind(that)}>
                                            <path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
                                        </svg>
                                        {(_=>{
                                            const array = []
                                                if(that.state.notification_dropdown){
                                                    array.push(<div key="3" className="closer" onClick={that.dropdownNotification.bind(that)}></div>)
                                                    array.push(<Notifications key="4" />)
                                                    return array
                                                }
                                        })()}
                                    </div>
                                    <div className="user-info">
                                        <img onClick={that.dropdownMenu.bind(that)} className="profile-image" src={that.props.avatar} alt=""/>
                                        <span onClick={that.dropdownMenu.bind(that)}>{that.props.user_name}</span>
                                        <svg onClick={that.dropdownMenu.bind(that)} className="icon-dropdown" viewBox="0 0 24 24">
                                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                        </svg>
                                        {(_=>{
                                            const array = []
                                            if(that.state.profile_dropdown){
                                                array.push(<div key="1" className="closer" onClick={that.dropdownMenu.bind(that)}></div>)
                                                array.push(<ProfileMenu key="2" />)
                                                return array
                                            }
                                        })()}
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }
}
