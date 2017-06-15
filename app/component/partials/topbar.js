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
                    <div className="user-area">
                        <div className="notifications">
                            <svg viewBox="0 0 24 24" onClick={that.dropdownNotification.bind(that)}>
                                <path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
                            </svg>
                            <div className={that.state.notification_dropdown ? "nutification-area active": "nutification-area"}>
                                <div className="top-notifications">
                                    <span>Notifications</span>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                    </svg>
                                </div>
                                <div className="notifications-content">
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                    <div className="notify">
                                        <p className="not">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                                        <span className="date">01.02.2019 15:39</span>
                                    </div>
                                </div>
                                <div className="notifications-footer">
                                    <button className="btn red">
                                        Wiew all notifications
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="user-info" onClick={that.dropdownMenu.bind(that)}>
                            <img className="profile-image" src={that.props.avatar} alt=""/>
                            {that.props.user_name}
                            <svg className="icon-dropdown" viewBox="0 0 24 24">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                            <div className={that.state.profile_dropdown ? "user-info-menu active" : "user-info-menu"}>
                                <ul>
                                    <li>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                                        </svg>
                                        Profile
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                                        </svg>
                                        Groups
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
                                        </svg>
                                        Notifications
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19L9.17,17.66C7.76,17.66 7.76,17.66 7.05,16.95C6.34,16.24 6.34,16.24 6.34,14.83L2.81,14.12M5.64,16.95L7.05,18.36L4.39,21.03H2.97V19.61L5.64,16.95M4.22,15.54L5.46,15.71L3,18.16V16.74L4.22,15.54M8.29,18.54L8.46,19.78L7.26,21H5.84L8.29,18.54M13,9.5A1.5,1.5 0 0,0 11.5,11A1.5,1.5 0 0,0 13,12.5A1.5,1.5 0 0,0 14.5,11A1.5,1.5 0 0,0 13,9.5Z" />
                                        </svg>
                                        Plans
                                    </li>
                                    <li onClick={this.logout.bind(this)}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
                                        </svg>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
