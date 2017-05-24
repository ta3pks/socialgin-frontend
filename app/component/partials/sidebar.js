import React from "react";
import { connect } from "react-redux";

import {selectAccount} from "./../../actions/accountActions";
import {modalOpen, modalClose} from "./../../actions/modalActions";


@connect(store=>{
    return {
        accounts : store.User.list,
        open : store.Modal.open
    }
})

export default class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            searchAccount : ""
        }
    }
    openModal(){
        this.props.dispatch(modalOpen())
    }
    render() {
        const that = this;
        return (
            <div className={that.props.mobilSidebar ? "sidebar active" : "sidebar"}>
                <div className="add-account">
                    <button className="btn red" onClick={that.openModal.bind(that)}>
                        ADD ACCOUNT
                    </button>
                </div>
                <div className="search-area">
                    <svg viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                    <input onChange={(e=>{that.setState({searchAccount : e.target.value})}).bind(that)} type="text" className="material-input" placeholder="Search Account"/>
                </div>
                <div className="account-list">
                    {(_=>{
                        var list = that.props.accounts;
                        var data = [];
                        for (let key in list) {
                            if (list.hasOwnProperty(key)) {
                                var account = list[key];
                                var active = account.selected ? "active" : "";
                                if(RegExp(that.state.searchAccount, 'i').test(account.name)){
                                    data.push(
                                        <div key={key} onClick={(_=>{that.props.dispatch(selectAccount(key))}).bind(that)} className={"account " + account.type + " " + active}>
                                            <img className="profile-image" src={account.profile_picture} alt={account.name}/>
                                            <span>{account.name} {account.surname}</span>
                                        </div>
                                    )                      
                                }
                            }
                        }
                        return data
                    })()}
                </div>
            </div>
        );
    }
}
