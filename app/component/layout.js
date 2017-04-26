import React from "react";

import Topbar from "./partials/topbar";
import Sidebar from "./partials/sidebar";
export default class Layout extends React.Component{
    render(){
        return (
            <div class="wrapper">
                <Topbar />
                <div className="contents">
                    <div className="container">
                        <Sidebar />
                    </div>
                </div>
            </div>
        )
    }
}