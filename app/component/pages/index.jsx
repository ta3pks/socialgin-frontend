import React from "react";
import { connect } from "react-redux";

import ManagementPage from "./management.jsx";
import CalendarPage from "./calendar.jsx";
import ReportsPage from "./reports.jsx";
import NotificationsPage from "./notifications.jsx";
import ProfilePage from "./profile.jsx";

import AddAccountModal from "./modules/add_account/modal.jsx";

@connect(store=>{
    return {
        page : store.Router.page,
        language : store.User.language,
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
                       return <ProfilePage />
                   }else if(list["Notifications"].active == true){
                       return <NotificationsPage />
                   }
                })()}
                <AddAccountModal />
            </div>
        );
    }
}
