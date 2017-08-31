import React from "react";
import {connect} from "react-redux";
import cookier from "../../public/js/cookier";
import ajax from "../functions/ajax/ajax";

import config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index.jsx";
import Loading from "./pages/loading.jsx";

import {setMail} from "./../actions/accountActions";
import {loadedSidebar, loadedTopbar} from "./../actions/settingsAcrions";


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
        const user_data = cookier.parse("token") || "";
        if(!user_data) return window.location.href = "/";
        ajax("get", config.getAccounts, {params : {token : user_data}}, true, 1).then(result=>{
            that.props.dispatch({
                type : "FETCH_ACCOUNT",
                payload : result
            })
            that.props.dispatch(loadedSidebar())
        }).catch(errHandler=>{
            window.location.href = "/"
        })
    }
    getTopbarContent(){
        const that = this;
        const user_data = cookier.parse("token") || "";
        if(!user_data) return window.location.href = "/";
        ajax("get", config.getUserData, {params : {token : user_data}}, true, 1).then(result=>{
            that.props.dispatch({
                type: "USER_NAME",
                payload: result.name + " " + result.surname
            })
            that.props.dispatch({
                type: "AVATAR",
                payload: result.profile_picture
            })
            that.props.dispatch(setMail(result.email || ""))
            that.props.dispatch({
                type : "SET_NAME_SURNAME",
                payload : {
                    name : result.name,
                    surname : result.surname
                }
            })
            that.props.dispatch(loadedTopbar())
        }).catch(errHandler=>{
            window.location.href = "/"
        })
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