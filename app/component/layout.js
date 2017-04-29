import React from "react";

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