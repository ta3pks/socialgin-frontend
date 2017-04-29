import React from "react";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./partials/menu";

import Pages from "./pages/index";
export default class Layout extends React.Component{
    constructor(){
        super();
        this.state = {
            mobilSidebar : false
        }
    }
    mobil_sidebar(){
        console.log(this)
        const that = this;
        that.setState({
            mobilSidebar : !that.state.mobilSidebar
        })
    }
    render(){
        return (
            <div class="wrapper">
                <Topbar mobilSidebar={this.state.mobilSidebar} mobil_sidebar={this.mobil_sidebar.bind(this)} />
                <div className="contents">
                    <div className="container">
                        <Sidebar mobilSidebar={this.state.mobilSidebar} />
                        <div className="page-contents">
                            <Menu />
                            <Pages />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}