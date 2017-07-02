import React from "react";

import Topbar from "./../partials/topbar";

export default class Loading extends React.Component {
    constructor(){
        super();
    }
    render() {
        const that = this;
        return (
            <div className="loading-page animated fadeIn">
                 <Topbar />
                 <div className="loading-wrapper">
                     <div className="loading-logo-wrapper">
                         <img src="/public/img/logo_icon_maincolor.svg" alt="Logo"/>
                     </div>
                 </div>
            </div>
        );
    }
}
