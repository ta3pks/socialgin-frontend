import React from "react";
import { connect } from "react-redux";

import ManagementPage from "./management";
import CalendarPage from "./calendar";
import ReportsPage from "./reports";
import NotificationsPage from "./notifications.jsx";

import AddAccountModal from "./modules/add_account/modal";

@connect(store=>{
    return {
        page : store.Router.page
    }
})

export default class Pages extends React.Component {
    constructor(){
        super();
    }
    render() {
        const that = this;
        return (
            <div className="page-area">
                {(_=>{
                   var list = this.props.page;
                   if(list["Management"].active == true){
                       return <ManagementPage />
                   }else if(list["Calendar"].active == true){
                       return <CalendarPage />
                   }else if(list["Reports"].active == true){
                       return <ReportsPage />
                   }else if(list["Profile"].active == true){
                       return <ReportsPage />
                   }else if(list["Groups"].active == true){
                       return <ReportsPage />
                   }else if(list["Notifications"].active == true){
                       return <NotificationsPage />
                   }else if(list["Plans"].active == true){
                       return <ReportsPage />
                   }
                })()}
                <AddAccountModal />
            </div>
        );
    }
}
