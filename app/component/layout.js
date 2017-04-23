import React from "react";

import Sidebar from "./partials/sidebar";
import Accounts from "./partials/accounts";
import Modal from "./partials/modal";
import ShareSystem from "./partials/shareSystem";

export default class Layout extends React.Component{
    render(){
        return (
            <div class="wrapper">
                <Sidebar />
                <Accounts />
                <ShareSystem />
                <Modal />
            </div>
        )
    }
}