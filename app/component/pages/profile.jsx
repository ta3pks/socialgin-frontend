import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import cookier from "../../../public/js/cookier";

import Config from "./../../config";

@connect(store=>{
    return {
        name : store.User.name,
        surname : store.User.surname,
        avatar : store.User.avatar,
        email : store.User.email
    }
})
export default class ProfilePage extends React.Component {
    constructor(){
        super();
        this.state = {
            name : "",
            surname : "",
            email : ""
        }
    }
    save(){
        const that = this;
        const user_data = cookier.parse("token");
        if(!user_data) return window.location.href = "/";
        axios.post(Config.setSettings, "token=" + encodeURIComponent(user_data) + "&email=" + encodeURIComponent(that.state.email) + "&name=" + encodeURIComponent(that.state.name) + "&surname=" + encodeURIComponent(that.state.surname)).then(data=>{
            const res = data.data;
            console.log("Beta : ", res)
            if(res.error) return swal("Error !", res.error, "error");
            swal("Success !", "", "success");
            that.props.dispatch({
                type : "SET_NAME_SURNAME",
                payload : {
                    name : that.state.name,
                    surname : that.state.surname
                }
            })
            that.props.dispatch({
                type : "SET_EMAIL",
                payload : {
                    email : that.state.email
                }
            })
        }).catch(err=>{
            swal("Error !", err || "Somethings wrong. Please try again later.", "error");
        })
    }
    componentDidMount(){
        this.setState({
            name : this.props.name,
            surname : this.props.surname,
            email : this.props.email
        })
    }
    render() {
        const that = this;
        return (
            <div className="profile-page animated fadeIn">
                <div className="user-info">
                    <img src={that.props.avatar} alt={that.props.name + " " + that.props.surname}/>
                    <h1>{that.props.name + " " + that.props.surname}</h1>
                </div>
                <div className="settings-area">
                    <input onChange={(e=>{this.setState({ email : e.target.value })}).bind(that)} type="text" className="material-input" placeholder="Enter your email address" value={this.state.email}/>
                    <input onChange={(e=>{this.setState({ name : e.target.value })}).bind(that)} type="text" className="material-input" placeholder="Enter your name" value={that.state.name}/>
                    <input onChange={(e=>{this.setState({ surname : e.target.value })}).bind(that)} type="text" className="material-input" placeholder="Enter your surname." value={that.state.surname}/>
                    <div className="settings-footer">
                        <button className="btn red" onClick={that.save.bind(that)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}
