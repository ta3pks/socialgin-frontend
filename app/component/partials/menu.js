import React from "react";

import { connect } from "react-redux";
import { Route } from "./../../actions/routerActioıns";
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
        const that = this;
        return (
            <div className="menu">
                <ul>
                    {(_=>{
                        var list = that.props.page;
                        var data = [];
                        for (let key in list) {
                            if (list.hasOwnProperty(key)) {
                                var menu = list[key];
                                var active = menu.active ? "active" : "";
                                data.push(<li onClick={(_=>{that.props.dispatch(Route(key))}).bind(that)} key={key} className={active}>{key}</li>)
                            }
                        }
                        return data
                    })()}
                </ul>
            </div>
        );
    }
}
