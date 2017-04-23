import React from "react";
import { connect } from "react-redux";

import { fetchAccounts, selectAccount } from "./../../actions/accountActions";
import { modalToggle } from "./../../actions/modalActions";

@connect(store=>{
    return {
        accounts : store.Accounts.list
    }
})

export default class Accounts extends React.Component {
  constructor() {
    super();
    this.state = {
        searchAccount : ""
    }
  }
  accountSearcher(e){
      this.setState({searchAccount : e.target.value})
  }
  
  openModal(){
    this.props.dispatch(modalToggle())
  }
  selectAccount(e){
    var target = e.target.dataset;
    if(e.target.nodeName == "LI"){
      target = e.target.dataset; 
    }else if(e.target.parentElement.nodeName == "LI"){
      target = e.target.parentElement.dataset;
    }else if(e.target.parentElement.parentElement.nodeName == "LI"){
      target = e.target.parentElement.parentElement.dataset; 
    }
    this.props.dispatch(selectAccount(target.id))
  }
  componentWillMount(){
      const that = this;
      const ajax = new XMLHttpRequest();
      ajax.open("POST", "/api/gel-all-accounts", true);
      ajax.onreadystatechange = function () {
          if (ajax.readyState != 4 || ajax.status != 200) return;
          var res = JSON.parse(ajax.response);
          if(res.code == 0) return swal("Error !", res.error || "", "error");
          that.props.dispatch(fetchAccounts(res.data))
      };
      ajax.send();
  }
  render() {
    const that = this;
    return (
      <div class="accounts-area">
        <div class="panel-header">
          <h2>Account List</h2>
          <button onClick={that.openModal.bind(this)} class="btn-circle">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="search">
          <i class="fa fa-search"></i>
          <input onChange={this.accountSearcher.bind(this)} value={this.state.searchAccount} type="search" class="input-search" placeholder="Search accounts"/>
        </div>
        <div class="account-list">
          <ul>
              {(function(){
                var list = that.props.accounts
                var data = [];
                for (let key in list) {
                  if (list.hasOwnProperty(key)) {
                    var account = list[key];
                    var active = account.selected ? "active" : "";
                    if(RegExp(that.state.searchAccount, 'i').test(account.fullname)){
                      data.push(<li data-id={account.id} onClick={that.selectAccount.bind(that)} key={account.id} className={account.type + " " + active}><img src={account.picture} alt={account.fullname}/><div class="social-from"></div><span>{account.fullname}</span></li>)                      
                    }
                  }
                }
                return data
              })()}
          </ul>
        </div>
      </div>
    );
  }
}