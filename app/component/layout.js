import React from "react";
import { connect } from "react-redux";
import cookier from "../../public/js/cookier";

import notifier from "notifier/js/notifier.js";
import axios from "axios";

import config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index.jsx";
import Loading from "./pages/loading.jsx";

import {fetchAccounts, userName, avatar, setMail} from "./../actions/accountActions";
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
        axios.get(config.getAccounts, {
            params : {
                token : user_data
            }
        }).then(response=>{
            const res = response.data;
            console.log("Beta : ", res)
            if(res.length === 0) notifier.show('Warning!' , 'You dont have any account !', 'warning', '', 0);
            if(res.error){
                if(res.err_id != "-1"){
                    return swal({
                        title: "Beta error occured \n Code : " + res.err_id,
                        text: "Please copy this code and contact us.",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "rgba(52, 152, 219,1.0)",
                        confirmButtonText: "Copy",
                        closeOnConfirm: false
                    },function(){
                        var textField = document.createElement('textarea')
                        textField.innerText = res.err_id;
                        document.body.appendChild(textField)
                        textField.select()
                        document.execCommand('copy')
                        textField.remove()
                        swal("Copied!", "Please contact us using this email : beta@socialgin.com", "success");
                    });
                }
                swal("Somethings wrong with your accounts.", res.error || "Please contact us.", "error");
            }
            that.props.dispatch({
                type : "FETCH_ACCOUNT",
                payload : res
            })
            that.props.dispatch(loadedSidebar())
        }).catch(function (error) {
            swal("Authenticate error !", error, "error")
            setTimeout(_=>{
                window.location.href = "/"
            }, 1000)
        });
    }
    getTopbarContent(){
        const that = this;
        const user_data = cookier.parse("token") || "";
        if(!user_data) return window.location.href = "/";
        axios.get(config.getUserData, {
            params : {
                token : user_data
            }
        }).then(userData=>{
            const userInfo = userData.data
            console.log("Beta : ", userInfo)
            if(userInfo.error){
                if(userInfo.err_id != "-1"){
                    return swal({
                        title: "Beta error occured \n Code : " + userInfo.err_id,
                        text: "Please copy this code and contact us.",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "rgba(52, 152, 219,1.0)",
                        confirmButtonText: "Copy",
                        closeOnConfirm: false
                    },function(){
                        var textField = document.createElement('textarea')
                        textField.innerText = userInfo.err_id;
                        document.body.appendChild(textField)
                        textField.select()
                        document.execCommand('copy')
                        textField.remove()
                        swal("Copied!", "Please contact us using this email : beta@socialgin.com", "success");
                    });
                }
                swal("Error !", userInfo.error, "error")
            }
                
            that.props.dispatch({
                type: "USER_NAME",
                payload: userInfo.name + " " + userInfo.surname
            })
            that.props.dispatch({
                type: "AVATAR",
                payload: userInfo.profile_picture
            })
            that.props.dispatch(setMail(userInfo.email || ""))
            that.props.dispatch({
                type : "SET_NAME_SURNAME",
                payload : {
                    name : userInfo.name,
                    surname : userInfo.surname
                }
            })
            that.props.dispatch(loadedTopbar())
        }).catch(function (error) {
            swal("Authenticate error !", error, "error")
            setTimeout(_=>{
                 window.location.href = "/"
            }, 1000)
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