import React from "react";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
import Menu from "./pages/menu";
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
                <Topbar mobil_sidebar={this.mobil_sidebar.bind(this)} />
                <div className="contents">
                    <div className="container">
                        <Sidebar mobilSidebar={this.state.mobilSidebar} />
                        <Menu />
                    </div>
                </div>
            </div>
        )
    }
}