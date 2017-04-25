import React from "react";
import { connect } from "react-redux";

@connect(store=>{
    return {
        page : store.Router.page
    }
})
export default class Topbar extends React.Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div className="topbar">
                topbar
            </div>
        );
    }
}
