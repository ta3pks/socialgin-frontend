import React from "react";

import Topbar from "./partials/topbar";

export default class Layout extends React.Component{
    render(){
        return (
            <div class="wrapper">
                <Topbar />
            </div>
        )
    }
}