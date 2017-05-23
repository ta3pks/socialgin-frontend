import React from "react";
import { connect } from "react-redux";

@connect(store=>{
    return {
        user_name : store.User.user_name,
        avatar : store.User.avatar
    }
})
export default class Topbar extends React.Component {
    constructor(){
        super();
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
                        <img class="logo" src="/public/img/icon.svg" alt="" />
                        <a href="#" onClick={that.props.mobil_menu} className="mobil_menu_button">
                            <svg viewBox="0 0 24 24">
                                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                            </svg>
                        </a>
                    </div>
                    <div className="user-area">
                        <a>
                            <img className="profile-image" src={that.props.avatar} alt=""/>
                            {that.props.user_name}
                            <svg viewBox="0 0 24 24">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <div className={"dropdown"}>
                            <ul>
                                <li>
                                    Settings
                                </li>
                                <li>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
