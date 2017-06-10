import React from "react";
import { connect } from "react-redux";

import Config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index";
import Loading from "./pages/loading";

import {fetchAccounts, userName, avatar} from "./../actions/accountActions";

import XHR from "./modules/ajax"

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
            mobilMenu : false,
            page_load : true
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
        window.keyGenerator = function(){
            let code = ""
            const hex = "qwertyuiopasdfghjklzxcvbnm1234567890";
            while(code.length < 10){
                code = code + hex[Math.floor(Math.random() * 36)];
            }
            return code
        }
        const that = this;
        that.props.dispatch({
            type: "USER_NAME",
            payload: "Muhammed Furkan AYDIN"
        })
        that.props.dispatch({
            type: "AVATAR",
            payload: "https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t1.0-9/17952921_1821201181536646_1731148108127961338_n.jpg?oh=515a518e63b6ddc9adbc973e4b42e265&oe=599F9ED0&__gda__=1507418171_51cb9f6b18d6574781eb469ce80022b8"
        })
        
        // const user_data = localStorage.getItem("socialgin_user_data") || "";
        // if(!user_data) return window.location.href = "/";
        // const ajax = new XHR(user_data, Config.api_url + Config.getUserData, "");
        // ajax.getRequest(function (data) {
        //     if (data.error) {
        //         window.location.href = "/"
        //         return swal("Error !", data.error, "error");
        //     }
        //     that.props.dispatch({
        //         type: "USER_NAME",
        //         payload: data.name + " " + data.surname
        //     })
        //     that.props.dispatch({
        //         type: "AVATAR",
        //         payload: data.profile_picture
        //     })
        //     that.setState({
        //         page_load: true
        //     })
        // })
    }
    render(){
        return (
            <div class="wrapper">
                {(_=>{
                    if(this.state.page_load){
                        return (<div><Topbar mobil_menu={this.mobil_menu.bind(this)} mobilSidebar={this.state.mobilSidebar} mobil_sidebar={this.mobil_sidebar.bind(this)} />
                <div className="contents">
                    <div className="container">
                        <Sidebar mobilSidebar={this.state.mobilSidebar} />
                        <div className="page-contents">
                            <Menu mobilMenu={this.state.mobilMenu} />
                            <Pages />
                        </div>
                    </div>
                </div></div>)
                    }
                })()}
                {(_=>{
                    if(!this.state.page_load){
                        return <Loading />
                    }
                })()}
            </div>
        )
    }
}