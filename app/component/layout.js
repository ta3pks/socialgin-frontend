import React from "react";

import Config from "./../config";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index";
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
        const user_data = localStorage.getItem("socialgin_user_data");
        if(!user_data) return window.location.href = "/";
        var ajax = new XMLHttpRequest()
        ajax.open("POST", Config.api_url + Config.authorize, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            let data = JSON.parse(ajax.response);
            if(data.error) return window.location.href = "/";
            console.log(data)
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