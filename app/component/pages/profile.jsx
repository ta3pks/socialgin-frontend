import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import Config from "./../../config";

@connect(store=>{
    return {
        user_name : store.User.user_name,
        avatar : store.User.avatar
    }
})
export default class ProfilePage extends React.Component {
    constructor(){
        super();
    }
    save(){
        const user_data = window.localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
        axios.post(Config.setSettings, "token=" + encodeURIComponent(user_data) + "&email=" + encodeURIComponent("furkanaydin@socialgin.com") + "&name=" + encodeURIComponent("Domatez") + "&surname=" + encodeURIComponent("Efendi")).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        const that = this;
        return (
            <div className="profile-page animated fadeIn">
                <div className="user-info">
                    <img src={that.props.avatar} alt={that.props.user_name}/>
                    <h1>{that.props.user_name}</h1>
                </div>
                <div className="settings-area">
                    <select className="material-input">
                        <option value="en">
                            English
                        </option>
                        <option value="tr">
                            Turkce
                        </option>
                    </select>
                    <input type="text" className="material-input" placeholder="Enter your email address" value="enterdarksde@gmail.com"/>
                    <input type="text" className="material-input" placeholder="Enter your name"/>
                    <input type="text" className="material-input" placeholder="Enter your surname."/>
                    <div className="settings-footer">
                        <button className="btn red" onClick={that.save.bind(that)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}
