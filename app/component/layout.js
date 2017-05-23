import React from "react";
import { connect } from "react-redux";

import Config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index";

import {fetchAccounts, userName, avatar} from "./../actions/accountActions";

@connect(store=>{
    return {
        list : store.User.list
    }
})
export default class Layout extends React.Component{
    constructor(){
        super();
        this.state = {
            mobilSidebar : false,
            mobilMenu : false
        }
    }
    mobil_sidebar(){
        const that = this;
        that.setState({
            mobilSidebar : !that.state.mobilSidebar
        })
    }
    mobil_menu(){
        const that = this;
        that.setState({
            mobilMenu : !that.state.mobilMenu
        })
    }
    componentWillMount(){
        const that = this;
        console.log(that)
        const user_data = localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
        const ajax = new XMLHttpRequest()
        ajax.open("POST", Config.api_url + Config.authorize, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            const data = JSON.parse(ajax.response);
            if(data.error) return window.location.href = "/";
            const xhr = new XMLHttpRequest()
            xhr.open("POST", Config.api_url + Config.getUserData, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                let res = JSON.parse(xhr.response);
                console.log(res)
                if(res.error) return console.log(res);
                const allAccounts = [...res.tw_accounts, ...res.fb_accounts]
                that.props.dispatch({
                    type : "FETCH_ACCOUNT",
                    payload : allAccounts
                })
                that.props.dispatch({
                    type : "USER_NAME",
                    payload : res.name
                })
                that.props.dispatch({
                    type : "AVATAR",
                    payload : res.profile_picture
                })
            }
            xhr.send(`token=${data.data}`)
        }
        ajax.send(`authenticationtoken=${user_data}`)
    }
    render(){
        return (
            <div class="wrapper">
                <Topbar mobil_menu={this.mobil_menu.bind(this)} mobilSidebar={this.state.mobilSidebar} mobil_sidebar={this.mobil_sidebar.bind(this)} />
                <div className="contents">
                    <div className="container">
                        <Sidebar mobilSidebar={this.state.mobilSidebar} />
                        <div className="page-contents">
                            <Menu mobilMenu={this.state.mobilMenu} />
                            <Pages />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}