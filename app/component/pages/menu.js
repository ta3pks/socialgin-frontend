import React from "react";

import { Route } from "./../../actions/routerActioıns";
import { connect } from "react-redux";
import Sidebar from "./../partials/sidebar";
@connect(store=>{
    return {
        page : store.Router.page
    }
})
export default class Menu extends React.Component {
    constructor(){
        super();
        this.state = {
            toggle : false
        }
    }
    logout(){
        window.location.href = "/logout";
    }
    render() {
        return (
            <div>
                {(_=>{
                    if(this.state.toggle){
                        return <Sidebar /> // örnek
                    }else{
                        return <span>Content burada</span>
                    }
                })()}
            </div>
        );
    }
}
