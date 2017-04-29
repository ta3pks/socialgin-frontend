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
            <div className={that.props.mobilMenu ? "menu open" : "menu"}>
                <div className="mobil">
                    <img className="profile_image" src="/public/img/default_profile.png" alt=""/>
                    <h3>Muhammed Furkan AYDIN</h3>
                </div>
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
                    <li className="mobil">
                        Logout
                    </li>
                </ul>
            </div>
        );
    }
}
