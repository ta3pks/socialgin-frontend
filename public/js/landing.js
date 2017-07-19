import Vue from "vue/dist/vue.min.js";
import swal from "sweetalert";
import config from "./../../app/config";

import "sweetalert/dist/sweetalert.css";

import axios from "axios";

document.addEventListener("DOMContentLoaded", _ => {
    window.app = new Vue({
        el: "#app",
        delimiters: ['<%', '%>'],
        data: function () {
            return {
                openEmail: false,
                loginEmail: true,
                loginInfo: {
                    email: null,
                    password: null
                },
                registerInfo: {
                    email: null,
                    password: null,
                    passwordAgain: null,
                    name: null,
                    surname: null
                }
            }
        },
        created: function () {
            if (window.location.search) {
                var queryString = window.location.search.substr(1);
                var queries = queryString.split("&")
                const query = {}
                for (var i = 0; i < queries.length; i++) {
                    let query_part = queries[i].split("=");
                    query[query_part[0]] = query_part[1]
                }
                if (query.oauth_token && query.oauth_verifier) {
                    var ajax = new XMLHttpRequest()
                    ajax.open("GET",config.twitter.access_token + `?oauth_token=${query.oauth_token}&oauth_verifier=${query.oauth_verifier}`, true);
                    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    ajax.onload = function () {
                        let data = JSON.parse(ajax.response);
                        if (data.error) return swal("Error !", data.error, "error")
                        localStorage.setItem("twitter_access_token", data.data)
                        window.close()
                    }
                    ajax.send()
                }
            }
        },
        methods: {
            menu: function () {
                document.querySelector(".mobil-menu").classList.toggle("active")
            },
            loader: function (buttonArea, loading, state) {
                if (loading) {
                    document.querySelector(buttonArea).classList.add("loading")
                    document.querySelector(buttonArea).disabled = true;
                    document.querySelector(buttonArea + " .title").innerHTML = "<div class='loader'></div>"
                } else {
                    document.querySelector(buttonArea).classList.remove("loading")
                    document.querySelector(buttonArea).disabled = false;
                    document.querySelector(buttonArea + " .title").innerHTML = "Login with " + state
                }
            },
            facebookAuthenticate: function (access_token, id) {
                var ajax = new XMLHttpRequest()
                ajax.open("POST", config.facebook.authenticate, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.onload = function () {
                    let data = JSON.parse(ajax.response);
                    if (data.error) return swal("Error !", data.error, "error")
                    localStorage.setItem("socialgin_user_data", data.data);
                    window.location.href = config.dashboard_uri
                }
                ajax.send(`access_token=${access_token}&id=${id}`)
            },
            twitterAuthenticate: function (access_token) {
                var ajax = new XMLHttpRequest()
                ajax.open("POST", config.twitter.authenticate, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.onload = function () {
                    let data = JSON.parse(ajax.response);
                    if (data.error) return swal("Error !", data.error, "error")
                    localStorage.setItem("socialgin_user_data", data.data);
                    window.location.href = config.dashboard_uri
                }
                ajax.send(`access_token=${access_token}`)
            },
            facebookRegister: function () {
                const that = this;
                FB.login(function (response) {
                    if (response.status == "connected") {
                        FB.api("/me", "get", {
                            fields: "id,name,picture, email"
                        }, function (res) {
                            var access_token = FB.getAuthResponse()['accessToken'];
                            var face_id = res.id;
                            that.loader(".social-button.facebook", true, "Facebook")
                            var ajax = new XMLHttpRequest()
                            ajax.open("POST", config.facebook.register, true);
                            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            ajax.onload = function () {
                                let data = JSON.parse(ajax.response);
                                if (data.code && data.code != 0) {
                                    if (data.code == 1) {
                                        return that.facebookAuthenticate(access_token, face_id)
                                    } else if (data.code == -1) {
                                        that.loader(".social-button.facebook", false, "Facebook")
                                        swal("Error !", data.error, "error");
                                    }
                                }
                                if (data.data == "Success") return that.facebookAuthenticate(access_token, face_id)
                            }
                            ajax.send(`access_token=${access_token}&id=${face_id}`)
                        })
                    }
                }, {
                    scope: 'public_profile, email'
                });
            },
            twitterRegister: function () {
                const that = this;
                var ajax = new XMLHttpRequest()
                var w = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0],
                    x = w.innerWidth || e.clientWidth || g.clientWidth,
                    y = w.innerHeight || e.clientHeight || g.clientHeight;
                window.twitter_app = window.open("", "_blank", "width=700,height=500,top=" + ((y / 2) - 250) + ",left=" + ((x / 2) - 350));
                window.twitter_app.document.write("<p>Please wait...</p>");
                const windowCloser = setInterval(_ => {
                    if (window.twitter_app.closed) {
                        clearInterval(windowCloser);
                        const access_token = localStorage.getItem("twitter_access_token");
                        var ajax = new XMLHttpRequest()
                        ajax.open("POST", config.twitter.register, true);
                        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        ajax.onload = function () {
                            let data = JSON.parse(ajax.response);
                            if (data.code && data.code != 0) {
                                if (data.code == 1) {
                                    return that.twitterAuthenticate(access_token)
                                } else if (data.code == -1) {
                                    that.loader(".social-button.twitter", false, "Twitter")
                                    swal("Error !", data.error, "error");
                                }
                            }
                            if (data.data == "Success") return that.twitterAuthenticate(access_token)
                        }
                        console.log(localStorage.getItem("twitter_access_token"))
                        ajax.send(`access_token=${localStorage.getItem("twitter_access_token")}`)
                    }
                }, 300)
                that.loader(".social-button.twitter", true, "Twitter")
                ajax.open("GET", config.twitter.request_token, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.onload = function () {
                    let data = JSON.parse(ajax.response);
                    if (data.error) return swal("Error !", data.error, "error");
                    window.twitter_app.location.href = data.data
                }
                ajax.send()
            },
            registerEmail: function () {
                this.openEmail = !this.openEmail
            },
            emailRegisterer: function (e) {
                if (!this.registerInfo.email || !this.registerInfo.password || !this.registerInfo.passwordAgain || !this.registerInfo.name || !this.registerInfo.surname) {
                    return swal("Error !", "Missing fields !", "error");
                }
                if (this.registerInfo.password != this.registerInfo.passwordAgain) {
                    return swal("Error !", "Password must me same !", "error");
                }
                if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.registerInfo.email)) {
                    return swal("Error !", "Unsupported email address.", "error");
                }
                if(this.registerInfo.password < 4){
                    return swal("Error !", "Password must be more than 4 characters.", "error");
                }
                const that = this;
                var ajax = new XMLHttpRequest()
                ajax.open("POST", config.email.register, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                const button = e.currentTarget;
                button.innerHTML = "Loading..."
                button.disabled = true;
                ajax.onload = function () {
                    button.innerHTML = "Register"
                    button.disabled = false;
                    let data = JSON.parse(ajax.response);
                    if (data.code && data.code != 0) {
                        if (data.code == 1) {
                            return swal("Error !", data.error, "error");
                        } else if (data.code == -1) {
                            return swal("Error !", data.error, "error");
                        }
                    }
                    if (data.data == "Success"){
                        that.loginEmail = true;
                        that.loginInfo.email = that.registerInfo.email;
                        return swal("Success !", "Please login.", "success");
                    }
                }
                ajax.send(`name=${that.registerInfo.name}&surname=${that.registerInfo.surname}&email=${that.registerInfo.email}&password=${that.registerInfo.password}`)
            },
            emailLoginHandler: function (e) {
                if (!this.loginInfo.email || !this.loginInfo.password) {
                    return swal("Error !", "Missing fields !", "error");
                }
                if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.loginInfo.email)) {
                    return swal("Error !", "Unsupported email address.", "error");
                }
                if(this.loginInfo.password < 4){
                    return swal("Error !", "Password must be more than 4 characters.", "error");
                }
                const that = this;
                var ajax = new XMLHttpRequest()
                ajax.open("POST", config.email.authenticate, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                const button = e.currentTarget;
                button.innerHTML = "Loading..."
                button.disabled = true;
                ajax.onload = function () {
                    button.innerHTML = "Login"
                    button.disabled = false;
                    let data = JSON.parse(ajax.response);
                    if (data.code && data.code != 0) {
                        return swal("Error !", data.error, "error");
                    }
                    swal("Success !", "Please wait.", "success");
                    localStorage.setItem("socialgin_user_data", data.data);
                    window.location.href = config.dashboard_uri
                }
                ajax.send(`email=${that.loginInfo.email}&password=${that.loginInfo.password}`)
            }
        }
    })
})