import React from "react";
import { connect } from "react-redux";

import config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index.jsx";
import Loading from "./pages/loading.jsx";

import {fetchAccounts, userName, avatar} from "./../actions/accountActions";
import {loadedSidebar, loadedTopbar} from "./../actions/settingsAcrions";
import notifier from "notifier/js/notifier.js";
import axios from "axios";

window.keyGenerator = function(){
    let code = ""
    const hex = "qwertyuiopasdfghjklzxcvbnm1234567890";
    while(code.length < 10){
        code = code + hex[Math.floor(Math.random() * 36)];
    }
    return code
}

@connect(store=>{
    return {
        list : store.User.list,
        loaded : store.Settings.page_load
    }
})

export default class Layout extends React.Component{
    constructor(){
        super();
        this.state = {
            mobilSidebar : false,
            mobilMenu : false,
            page_load : false
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
    getSidebarContent(){
        const that = this;
        const user_data = localStorage.getItem("socialgin_user_data") || "";
        if(!user_data) return window.location.href = "/";
        axios.get(config.getAccounts, {
            params : {
                token : user_data
            }
        }).then(response=>{
            const res = response.data;
            if(res.length === 0) notifier.show('Warning!' , 'You dont have any account !', 'warning', '', 0);
            if(res.error) swal("Somethings wrong with your accounts.", res.error || "Please contact with us.", "error");
            that.props.dispatch({
                type : "FETCH_ACCOUNT",
                payload : res
            })
            that.props.dispatch(loadedSidebar())
        }).catch(function (error) {
            swal("Authenticate error !", error, "error")
            setTimeout(_=>{
                window.location.href = "/"
            }, 3000)
        });
    }
    getTopbarContent(){
        const that = this;
        const user_data = localStorage.getItem("socialgin_user_data") || "";
        if(!user_data) return window.location.href = "/";
        axios.get(config.getUserData, {
            params : {
                token : user_data
            }
        }).then(userData=>{
            const userInfo = userData.data
            if(userInfo.error) return swal("Error !", userInfo.error, "error")
            that.props.dispatch({
                type: "USER_NAME",
                payload: userInfo.name + " " + userInfo.surname
            })
            that.props.dispatch({
                type: "AVATAR",
                payload: userInfo.profile_picture
            })
            that.props.dispatch(loadedTopbar())
        }).catch(function (error) {
            swal("Authenticate error !", error, "error")
            setTimeout(_=>{
                 window.location.href = "/"
            }, 3000)
        });
    }
    componentDidMount(){
        this.getSidebarContent();
        this.getTopbarContent();
    }
    render(){
        const that = this;
        if(that.props.loaded.topbar && that.props.loaded.sidebar){
            return (
                <div class="wrapper animated fadeIn">
                    <Topbar mobil_menu={this.mobil_menu.bind(this)} mobilSidebar={this.state.mobilSidebar} mobil_sidebar={this.mobil_sidebar.bind(this)} />
                    <div className="contents">
                        <div className="container">
                            <div className="page-contents">
                                <Menu mobilMenu={this.state.mobilMenu} />
                                <Pages />
                            </div>
                            <Sidebar mobilSidebar={this.state.mobilSidebar} />
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Loading />
        }
    }
}