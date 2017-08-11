import React from "react";
import { connect } from "react-redux";
import cookier from "../../../../../public/js/cookier";

import {modalOpen, modalClose} from "./../../../../actions/modalActions";

import {addAccount, removeAccount} from "./../../../../actions/accountActions";

import Config from "./../../../../config";
import ajax from "../../../../functions/ajax/ajax";

@connect(store=>{
    return {
        open : store.Modal.open,
        addedAccounts : store.User.list,
        language : store.User.language,
    }
})
export default class Modal extends React.Component {
    constructor(){
        super();
        this.state = {
            facebook : false,
            twitter : false,
            linkedin : false,
            facebookAccounts : [],
            twitterAccount : {}
        }
    }
    selectAccount(e){
        const added = e.currentTarget.dataset.added;
        const account = JSON.parse(e.currentTarget.dataset.account);
        const that = this;
        const user_data = cookier.parse("token");
        if(!user_data) return window.location.href = "/";
        if(added == "true"){
            that.props.dispatch(removeAccount(account.id))
        }else{
            that.props.dispatch(addAccount(account))            
        }
        if(added == "true"){
            ajax("post", Config.removeAccount, `token=${encodeURIComponent(user_data)}&id=${encodeURIComponent(account.id)}&type=${account.type}`, true, 1).then(result=>{
            }).catch(errHandler=>{
                swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
                that.props.dispatch(addAccount(account))
            })
        }else{
            let addType = "";
            if(account.profile_type == "account") addType = Config.facebook.addAccount;
            if(account.profile_type == "page") addType = Config.facebook.addPage;
            if(account.profile_type == "group") addType = Config.facebook.addGroup;
            ajax("post", addType, `token=${encodeURIComponent(user_data)}&id=${encodeURIComponent(account.id)}&access_token=${encodeURIComponent(account.access_token)}`, true, 1).then(result=>{
            }).catch(errHandler=>{
                swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
                that.props.dispatch(removeAccount(account.id))
            })
        }
    }
    twitterSelectAccount(e){
        const added = e.currentTarget.dataset.added;
        const account = JSON.parse(e.currentTarget.dataset.account);
        const that = this;
        const user_data = cookier.parse("token");
        const access_token = localStorage.getItem("twitter_access_token");
        if(!user_data) return window.location.href = "/";
        if(added == "true"){
            that.props.dispatch(removeAccount(account.id))
        }else{
            that.props.dispatch(addAccount(account))            
        }
        if(!access_token) return swal("Error !", "Somethings wrong ! Please try again later.", "error");        
        if(added == "true"){
            that.props.dispatch(modalClose())
            swal({
                title: "Do you want remove this account ?",
                text: "<div class='account center'>" +
                         "<img class='profile-image' src='"+account.profile_picture+"' alt='"+account.name+"'/>" +
                         "<span>"+account.name+" "+account.surname+"</span>" +
                       "</div>",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                html: true,
                confirmButtonColor: "#DD6B55"
             }, function(){
                ajax("post", Config.removeAccount, `token=${encodeURIComponent(user_data)}&id=${encodeURIComponent(account.id)}&type=${account.type}`, true, 1).then(result=>{
                    swal("Success!", "Account deleted was successfly", "success");
                }).catch(errHandler=>{
                    swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
                    that.props.dispatch(addAccount(account))
                })
             });
        }else{
            
        }
    }
    facebookAddAccount(){
        const that = this;
        FB.login(function (response) {
            if (response.status == "connected") {
                FB.api("/me", "get", {fields: "id,name,picture,groups{id,name,picture{url}},accounts{photos{picture},name,id,access_token}"}, function (res) {
                    that.setState({facebookAccounts : []})
                    const accounts = [];
                    var access_token = FB.getAuthResponse()['accessToken'];
                    accounts.push({
                        id: res.id,
                        name: res.name,
                        surname : "",
                        profile_picture: res.picture.data.url,
                        access_token: access_token,
                        type: 0,
                        profile_type : "account"
                    })
                    if (res.accounts) {
                        for (var i = 0; i < res.accounts.data.length; i++) {
                            var iamge = res.accounts.data[i].photos ? res.accounts.data[i].photos.data[0].picture : "/public/img/default_profile.png"
                            accounts.push({
                                id: res.accounts.data[i].id,
                                name: res.accounts.data[i].name,
                                surname : "",
                                profile_picture: iamge,
                                type: 0,
                                access_token: access_token,
                                profile_type : "page"
                            })
                        }
                    }
                    if (res.groups) {
                        for (var i = 0; i < res.groups.data.length; i++) {
                            var iamge = res.groups.data[i].picture ? res.groups.data[i].picture.data.url : "/public/img/default_profile.png"
                            accounts.push({
                                id: res.groups.data[i].id,
                                name: res.groups.data[i].name,
                                surname : "",
                                profile_picture: iamge,
                                type: 0,
                                access_token: access_token,
                                profile_type : "group"
                            })
                        }
                    }
                    that.setState({
                        facebookAccounts : accounts
                    })
                    FB.logout(function (response) {});
                })
            }
        }, {
            scope: 'public_profile, email, manage_pages, user_managed_groups, publish_actions, publish_pages, read_insights, user_photos'
        });
    }
    twitterAddAccount(){
        const that = this;
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
            window.twitter_app = window.open("", "_blank", "width=700,height=500,top=" + ((y / 2) - 250) + ",left=" + ((x / 2) - 350));
            window.twitter_app.document.write('<style>.loading-wrapper{position:fixed;width:100%;min-height:100vh;background-color:#fff;top:0;display:flex;flex-direction:column;justify-content:center;align-items:center}.loading-wrapper img{min-width:200px;height:auto;animation:loadingEffect 1s linear .5s infinite alternate}@keyframes loadingEffect{from{transform:scale(1)}to{transform:scale(.8)}}</style><div class="loading-wrapper"><img src="/public/img/logo_icon_maincolor.svg" alt="Logo"/></div>');
            const windowCloser = setInterval(_ => {
                if (window.twitter_app.closed) {
                    clearInterval(windowCloser);
                    const access_token = localStorage.getItem("twitter_access_token");
                    if(!access_token) return swal("Error !", "Somethings wrong ! Please try again later.", "error");                    
                    const user_data = cookier.parse("token")
                    if(!user_data) return swal("Error !", "Please login first !", "error");
                    ajax("post", Config.twitter.addAccount, `token=${encodeURIComponent(user_data)}&access_token=${encodeURIComponent(access_token)}`, true, 1).then(result=>{
                        that.props.dispatch(modalClose())
                        that.props.dispatch(addAccount(result))
                        swal("Success!", "Account was added successfly.", "success");
                    }).catch(errHandler=>{
                        that.props.dispatch(modalClose())
                        if(errHandler.code == 5) {
                            const account = errHandler.data
                            swal({
                                title: "Do you want remove this account ?",
                                text: "<div class='account center'>" +
                                         "<img class='profile-image' src='"+account.profile_picture+"' alt='"+account.name+"'/>" +
                                         "<span>"+account.name+" "+account.surname+"</span>" +
                                       "</div>",
                                type: "warning",
                                showCancelButton: true,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                                html: true,
                                confirmButtonColor: "#DD6B55"
                             }, function(){
                                ajax("post", Config.removeAccount, `token=${encodeURIComponent(user_data)}&id=${encodeURIComponent(account.id)}&type=${account.type}`, true, 1).then(result=>{
                                    that.props.dispatch(removeAccount(account.id))
                                    swal("Success!", "Account deleted was successfly", "success");
                                }).catch(errHandler=>{
                                    swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
                                    that.props.dispatch(addAccount(account))
                                })
                             });
                             return;
                        }
                        swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
                    })
                }
            }, 300)
            ajax("get", Config.twitter.request_token, "", true, 1).then(result=>{
                window.twitter_app.location.href = result.data
            }).catch(errHandler=>{                
                swal(that.props.language["error"], errHandler.error || that.props.language["somethingWrong"], "error");
            })
    }
    closeModal(e){
        if(e.target.classList.contains("modal")){
            this.props.dispatch(modalClose())
        }
    }
    render() {
        const that = this;
         return (
            <div>
                {(_=>{
                    if(that.props.open){
                        return (
                            <div className="modal open animated fadeIn" onClick={that.closeModal.bind(that)}>
                                <div className="modal-container animated bounceInDown">
                                    <div className={this.state.facebook || this.state.twitter || this.state.linkedin ? "modal-head inside" : "modal-head"}>
                                        {(_=>{
                                            if(this.state.facebook || this.state.twitter || this.state.linkedin){
                                                return(<svg className="close_modal animated fadeIn" viewBox="0 0 24 24"  onClick={(_=>{this.setState({facebook : false, twitter : false, linkedin : false})}).bind(that)}>
                                                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                                </svg>)
                                            }
                                        })()}
                                        <svg className="close_modal" viewBox="0 0 24 24" onClick={(_=>{this.props.dispatch(modalClose())}).bind(that)}>
                                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                        </svg>
                                    </div>
                                    <div className="modal-body">
                                        {(_=>{
                                            if(!this.state.facebook && !this.state.twitter && !this.state.linkedin){
                                                return (<div className="add-account">
                                            <h1>Add Account</h1>
                                            <p>Select the social media where your account is located.</p>
                                            <div className="social-select">
                                                <button className="circle-button facebook" onClick={(_=>{this.setState({facebook : true})}).bind(that)}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                                    </svg>
                                                </button>
                                                <button className="circle-button twitter" onClick={(_=>{this.setState({twitter : true})}).bind(that)}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>)
                                            }
                                        })()}
                                        {(_=>{
                                            if(this.state.facebook){
                                                return (
                                                    <div className="add_account animated fadeIn">
                                                        <h1>Add Account from Facebook</h1>
                                                        <p>Once you connect, you will able to add: Pages, Groups and Profiles</p>
                                                        <button class="social-button facebook" onClick={that.facebookAddAccount.bind(that)}>
                                                            <div class="icon">
                                                                <svg viewBox="0 0 24 24">
                                                                    <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                                                                </svg>
                                                            </div>
                                                            <div class="title">
                                                                Login with Facebook
                                                            </div>
                                                        </button>
                                                        <div className="account-list">
                                                            {(_=>{
                                                                var accounts = that.state.facebookAccounts;
                                                                var addedAccounts = that.props.addedAccounts;
                                                                var data = [];
                                                                accounts.forEach(function(account){
                                                                    let added = false
                                                                    if(addedAccounts[account.id]){
                                                                        added = true
                                                                    }
                                                                    let addedClass =  added ? " active" : ""
                                                                    data.push(
                                                                        <div data-added={added ? "true" : "false"} data-account={JSON.stringify(account)} key={account.id} className={"account " + Config.accountTypes[account.type] + addedClass} onClick={that.selectAccount.bind(that)}>
                                                                            <img className="profile-image" src={account.profile_picture} alt={account.name + " " + account.surname}/>
                                                                            <span>{account.name + " " + account.surname}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                                return data
                                                            })()}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {(_=>{
                                            if(this.state.twitter){
                                                return (
                                                    <div className="add_account animated fadeIn">
                                                        <h1>Add Account from Twitter</h1>
                                                        <p>Once you connect, you will able to add your profile</p>
                                                        <button class="social-button twitter" onClick={that.twitterAddAccount.bind(that)}>
                                                            <div class="icon">
                                                                <svg viewBox="0 0 24 24">
                                                                    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                                                                </svg>
                                                            </div>
                                                            <div class="title">
                                                                Login with Twitter
                                                            </div>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
}
