import React from "react";

import { connect } from "react-redux";

import { addAccount, removeAccount } from "./../../actions/accountActions";
import { modalToggle } from "./../../actions/modalActions";

@connect(store=>{
    return {
        toggle : store.Modal.modal,
        accounts : store.Accounts.list
    }
})
export default class Modal extends React.Component {
    constructor(){
        super();
        this.state = {
            tab : "facebook",
            facebook : [],
            twitter : [],
            linkedin : [],
            followTwitter : false
        }
    }
    chanceTab(e){
        if(e.target.nodeName == "DIV"){
            this.setState({tab : e.target.dataset.tab})
        }else if(e.target.parentElement.nodeName == "DIV"){
            this.setState({tab : e.target.parentElement.dataset.tab})
        }else if(e.target.parentElement.parentElement.nodeName == "DIV"){
            this.setState({tab : e.target.parentElement.parentElement.dataset.tab})
        }
    }
    closeModal(){
        this.props.dispatch(modalToggle());
    }
    facebookLogin(){
        const that = this;
        FB.login(function (response) {
            if (response.status == "connected") {
                FB.api("/me", "get", {fields: "id,name,picture,groups{id,name,picture{url}},accounts{photos{picture},name,id,access_token}"}, function (res) {
                    var access_token = FB.getAuthResponse()['accessToken'];
                    let profile = that.state.facebook.slice();
                    profile.push({
                        id: res.id,
                        fullname: res.name,
                        picture: res.picture.data.url,
                        access_token: access_token,
                        type: "facebook"
                    })
                    that.setState({facebook: profile});
                    if (res.accounts) {
                        for (var i = 0; i < res.accounts.data.length; i++) {
                            var iamge = res.accounts.data[i].photos ? res.accounts.data[i].photos.data[0].picture : "/img/icons/default-user.jpg"
                            let profile = that.state.facebook.slice();
                            profile.push({
                                id: res.accounts.data[i].id,
                                fullname: res.accounts.data[i].name,
                                picture: iamge,
                                type: "facebook",
                                access_token: res.accounts.data[i].access_token,
                            })
                            that.setState({facebook: profile});
                        }
                    }
                    if (res.groups) {
                        for (var i = 0; i < res.groups.data.length; i++) {
                            var iamge = res.groups.data[i].picture ? res.groups.data[i].picture.data.url : "/img/icons/default-user.jpg"
                            let profile = that.state.facebook.slice();
                            profile.push({
                                id: res.groups.data[i].id,
                                fullname: res.groups.data[i].name,
                                picture: iamge,
                                type: "facebook",
                                access_token: access_token,
                            })
                            that.setState({facebook: profile});
                            }
                        }
                    FB.logout(function (response) {});
                })
            }
        }, {
            scope: 'public_profile, email, user_birthday, user_events, user_managed_groups, user_photos, user_posts, user_videos, user_website, read_page_mailboxes, manage_pages, publish_pages, publish_actions, pages_show_list, pages_manage_cta, pages_manage_instant_articles, pages_messaging'
        });
    }
    twitterLogin(){
        const that = this;
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "/auth/twitter/request_token", true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState != 4 || ajax.status != 200) return;
            try {
                var res = JSON.parse(ajax.response);
                if (res.code == 0) return swal(res.error, "", "error");
                window.location.href = res.data;
            } catch (err) {
                swal("Error !", "Somethins wrong. Please try again.", "error")
            }
        };
        ajax.send(JSON.stringify({
            state: "add_account",
            twitter_follow : that.state.followTwitter
        }));
    }
    linkedinLogin(){
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "/auth/linkedin/request_token", true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState != 4 || ajax.status != 200) return;
            try {
                var res = JSON.parse(ajax.response);
                if (res.code == 0) return swal(res.error, "", "error");
                window.location.href = res.data;
            } catch (err) {
                swal("Error !", "Somethins wrong. Please try again.", "error")
            }
        };
        ajax.send(JSON.stringify({
            state: "add_account"
        }));
    }
    facebookSelectAccount(e){
        const that = this;
        let target = e.target;
        if(e.target.nodeName == "LI"){
            target = e.target;
        }else if(e.target.parentElement.nodeName == "LI"){
            target = e.target.parentElement;
        }else if(e.target.parentElement.parentElement.nodeName == "LI"){
            target = e.target.parentElement.parentElement;
        }
        let account = {
            access_token : target.dataset.accesstoken,
            fullname : target.dataset.fullname,
            id : target.dataset.id,
            picture : target.dataset.picture,
            type : "facebook"
        };
        const id = account.id;
        const ajax = new XMLHttpRequest();
        if(that.props.accounts[account.id]){
            that.props.dispatch(removeAccount(id));
            ajax.open("POST", "/api/facebook/remove_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(addAccount(account));
                }
            }
            ajax.send(JSON.stringify({
                id: id
            }))
        }else{
            that.props.dispatch(addAccount(account));
            ajax.open("POST", "/api/facebook/add_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(removeAccount(id));
                }
            }
            ajax.send(JSON.stringify({
                id: account.id,
                access_token: account.access_token
            }))
        }
    }
    twitterSelectAccount(e){
        const that = this;
        let target = e.target;
        if(e.target.nodeName == "LI"){
            target = e.target;
        }else if(e.target.parentElement.nodeName == "LI"){
            target = e.target.parentElement;
        }else if(e.target.parentElement.parentElement.nodeName == "LI"){
            target = e.target.parentElement.parentElement;
        }
        let account = {
            access_token : target.dataset.accesstoken,
            access_token_secret : target.dataset.accesstokensecret,
            fullname : target.dataset.fullname,
            id : target.dataset.id,
            picture : target.dataset.picture,
            type : "twitter"
        };
        const id = account.id;
        const ajax = new XMLHttpRequest();
        if(that.props.accounts[account.id]){
            that.props.dispatch(removeAccount(id));
            ajax.open("POST", "/api/twitter/remove_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(addAccount(account));
                }
            }
            ajax.send(JSON.stringify({
                id: id
            }))
        }else{
            that.props.dispatch(addAccount(account));
            ajax.open("POST", "/api/twitter/add_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(removeAccount(id));
                }
            }
            ajax.send(JSON.stringify({
                access_token: account.access_token,
                access_token_secret : account.access_token_secret
            }))
        }
    }
    linkedinSelectAccount(e){
        const that = this;
        let target = e.target;
        if(e.target.nodeName == "LI"){
            target = e.target;
        }else if(e.target.parentElement.nodeName == "LI"){
            target = e.target.parentElement;
        }else if(e.target.parentElement.parentElement.nodeName == "LI"){
            target = e.target.parentElement.parentElement;
        }
        let account = {
            access_token : target.dataset.accesstoken,
            fullname : target.dataset.fullname,
            id : target.dataset.id,
            picture : target.dataset.picture,
            type : "linkedin"
        }
        const id = account.id;
        const ajax = new XMLHttpRequest();
        if(that.props.accounts[account.id]){
            that.props.dispatch(removeAccount(id));
            ajax.open("POST", "/api/linkedin/remove_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(addAccount(account));
                }
            }
            ajax.send(JSON.stringify({
                id: id
            }))
        }else{
            that.props.dispatch(addAccount(account));
            ajax.open("POST", "/api/linkedin/add_account", true);
            ajax.onload = function () {
                var res = JSON.parse(ajax.response);
                if (res.error){
                    that.props.dispatch(removeAccount(id));
                }
            }
            ajax.send(JSON.stringify({
                access_token: account.access_token
            }))
        }
    }
    componentWillMount(){
        const that = this;
        if(window.location.search){
            let search = window.location.search.substr(1);
            let data = {}
            if (search.indexOf("&") != -1) {
                var queries = search.split("&");
                for (var i = 0; i < queries.length; i++) {
                    var query = queries[i].split("=");
                    data[query[0]] = query[1];
                }
            } else {
                var queries = search.split("=");
                data[queries[0]] = queries[1]
            }
            if(data.add_account || data.add_account == "true"){
                let account = []
                if(data.type == "twitter"){
                    account.push({
                        access_token : decodeURIComponent(data.access_token),
                        access_token_secret : decodeURIComponent(data.access_token_secret),
                        fullname : decodeURIComponent(data.fullname),
                        id : decodeURIComponent(data.id),
                        picture : decodeURIComponent(data.picture),
                        screen_name : decodeURIComponent(data.screen_name),
                        type : decodeURIComponent(data.type)
                    })
                    that.setState({tab : "twitter", twitter : account})
                    that.props.dispatch(modalToggle());
                    history.pushState(null, null, "dashboard");
                } else if(data.type == "linkedin"){
                    account.push({
                        access_token : decodeURIComponent(data.access_token),
                        fullname : decodeURIComponent(data.fullname),
                        id : decodeURIComponent(data.id),
                        picture : decodeURIComponent(data.picture),
                        type : decodeURIComponent(data.type)
                    })
                    that.setState({tab : "linkedin", linkedin : account})
                    that.props.dispatch(modalToggle());
                    history.pushState(null, null, "dashboard");
                }
            }
        }
    }
    render() {
        const that = this;
        return (
            <div className={that.props.toggle ? "modal active" : "modal"}>
                <div class="modal-dialog">
                    <div class="modal-head">
                        <h1>Add Account</h1>
                        <button className="modal-close-button" onClick={that.closeModal.bind(this)}>X</button>
                    </div>
                    <div class="modal-body">
                        <div class="social-media-navbar">
                            <div onClick={that.chanceTab.bind(that)} data-tab="facebook" className={that.state.tab == "facebook" ? "social-media facebook active" : "social-media facebook"}>
                                <i class="fa fa-facebook"></i>
                                <span>Facebook</span>
                            </div>
                            <div onClick={that.chanceTab.bind(that)} data-tab="twitter" className={that.state.tab == "twitter" ? "social-media twitter active" : "social-media twitter"}>
                                <i class="fa fa-twitter"></i>
                                <span>Twitter</span>
                            </div>
                            <div onClick={that.chanceTab.bind(that)} data-tab="linkedin" className={that.state.tab == "linkedin" ? "social-media linkedin active" : "social-media linkedin"}>
                                <i class="fa fa-linkedin"></i>
                                <span>LinkedIn</span>
                            </div>
                        </div>
                        <div class="social-media-explanation">
                            <div className={that.state.tab == "facebook" ? "modal-part active" : "modal-part"}>
                                <strong>Add Pages, Groups, and Profiles</strong>
                                <p>Once you connect, you will be able to add :</p>
                                <div class="options">
                                    <i class="fa fa-user"></i>
                                    <span>Facebook Profile</span>
                                </div>
                                <div class="options">
                                    <i class="fa fa-flag"></i>
                                    <span>Facebook Pages</span>
                                </div>
                                <div class="options">
                                    <i class="fa fa-id-card-o"></i>
                                    <span>Facebook Groups</span>
                                </div>
                                <div class="social-button facebook" onClick={that.facebookLogin.bind(that)}>
                                    <div class="icon">
                                        <i class="fa fa-facebook"></i>
                                    </div>
                                    <div class="title">
                                        Login with Facebook
                                    </div>
                                </div>
                                <br/>
                                <div class="account-list">
                                    <ul>
                                        {this.state.facebook.map(function(account){
                                            let isContain = false;
                                            if(that.props.accounts[account.id]){
                                                isContain = true;
                                            }
                                            let className = isContain ? "active" : ""
                                            return <li onClick={that.facebookSelectAccount.bind(that)} className={"facebook " + className} key={account.id} data-accesstoken={account.access_token} data-fullname={account.fullname} data-picture={account.picture} data-id={account.id} data-type={account.type}><img src={account.picture} alt={account.fullname} /><div class="social-from"></div><span>{account.fullname}</span></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={that.state.tab == "twitter" ? "modal-part active" : "modal-part"}>
                                <strong>Add Twitter Profile</strong>
                                <p>To allow Socialgin access to your Twitter account, you must first give
                                    authorization from Twitter.com</p>
                                <br/><br/>
                                <div class="social-button twitter" onClick={that.twitterLogin.bind(that)}>
                                    <div class="icon">
                                        <i class="fa fa-twitter"></i>
                                    </div>
                                    <div class="title">
                                        Login with Twitter
                                    </div>
                                </div>
                                <br/>
                                <label><input type="checkbox" name="checkbox"/> Follow us on Twitter</label>
                                <br/>
                                <div class="account-list">
                                    <ul>
                                        {this.state.twitter.map(function(account){
                                            let isContain = false;
                                            if(that.props.accounts[account.id]){
                                                isContain = true;
                                            }
                                            let className = isContain ? "active" : ""
                                            return <li onClick={that.twitterSelectAccount.bind(that)} className={"twitter " + className} key={account.id} data-accesstoken={account.access_token} data-accesstokensecret={account.access_token_secret} data-fullname={account.fullname} data-picture={account.picture} data-id={account.id} data-type={account.type}><img src={account.picture} alt={account.fullname} /><div class="social-from"></div><span>{account.fullname}</span></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={that.state.tab == "linkedin" ? "modal-part active" : "modal-part"}>
                                <strong>Add LinkedIn Profiles</strong>
                                <p>Once you connect, you will be able to add:</p>
                                <div class="options">
                                    <i class="fa fa-linkedin"></i>
                                    <span>LinkedIn Profile</span>
                                </div>
                                <br/>
                                <br/>
                                <div class="social-button linkedin">
                                    <div class="icon">
                                        <i class="fa fa-linkedin"></i>
                                    </div>
                                    <div class="title" onClick={that.linkedinLogin.bind(that)}>
                                        Login with Linkedin
                                    </div>
                                </div>
                                <br/>
                                <div class="account-list">
                                    <ul>
                                        {this.state.linkedin.map(function(account){
                                            let isContain = false;
                                            if(that.props.accounts[account.id]){
                                                isContain = true;
                                            }
                                            let className = isContain ? "active" : ""
                                            return <li onClick={that.linkedinSelectAccount.bind(that)} className={"linkedin " + className} key={account.id} data-accesstoken={account.access_token} data-fullname={account.fullname} data-picture={account.picture} data-id={account.id} data-type={account.type}><img src={account.picture} alt={account.fullname} /><div class="social-from"></div><span>{account.fullname}</span></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}