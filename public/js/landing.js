import Vue from "vue/dist/vue.min.js";
import swal from "sweetalert";
import config from "./../../app/config";
import cookier from "./cookier"

import ajax from "../../app/functions/ajax/ajax";
import Language from "../../app/language/index";

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
            },
            loading: false,
            language : Language[cookier.parse("lang") || "eng"],
            buttonLoader : false
        }
    },
    created: function () {
        const that = this;
        if (window.location.search) {
            this.loading = true;
            var queryString = window.location.search.substr(1);
            var queries = queryString.split("&")
            const query = {}
            for (var i = 0; i < queries.length; i++) {
                let query_part = queries[i].split("=");
                query[query_part[0]] = query_part[1]
            }
            if (query.oauth_token && query.oauth_verifier) {
                ajax("get", config.twitter.access_token + "?oauth_token="+encodeURIComponent(query.oauth_token)+"&oauth_verifier="+encodeURIComponent(query.oauth_verifier), "", true, 1).then(result=>{
                    this.loading = false;
                    localStorage.setItem("twitter_access_token", result.data)
                    window.close()
                }).catch(errHandler=>{
                    swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");
                })
            } else {
                this.loading = false;
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
            const that = this;
            ajax("post", config.facebook.authenticate, `access_token=${access_token}&id=${id}`, true, 1).then(result=>{
                cookier.make("token", result.data, 99, "/");
                window.location.href = config.dashboard_uri
            }).catch(errHandler=>{
                swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error")
            })
        },
        twitterAuthenticate: function (access_token) {
            const that = this;
            ajax("post",  config.twitter.authenticate, `access_token=${access_token}`, true, 1).then(result=>{
                cookier.make("token", result.data, 99, "/");
                window.location.href = config.dashboard_uri
            }).catch(errHandler=>{
                swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error")
            })
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
                        ajax("post", config.facebook.register, `access_token=${access_token}&id=${face_id}`, true, 1).then(results=>{
                            that.facebookAuthenticate(access_token, face_id)
                            that.loader(".social-button.facebook", false, "Facebook")
                        }).catch(errHandler=>{
                            if(errHandler.code != 1) return swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");
                            that.facebookAuthenticate(access_token, face_id)
                            that.loader(".social-button.facebook", false, "Facebook")
                        })
                    })
                }
            }, {
                scope: 'public_profile, email'
            });
        },
        twitterRegister: function () {
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
                    ajax("post", config.twitter.register, `access_token=${localStorage.getItem("twitter_access_token")}`, true, 1).then(result=>{
                         that.twitterAuthenticate(access_token)
                         that.loader(".social-button.twitter", false, "Twitter")
                    }).catch(errHandler=>{
                        if(errHandler.code != 1) return swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");
                         that.twitterAuthenticate(access_token)
                         that.loader(".social-button.twitter", false, "Twitter")
                    })
                }
            }, 300)
            that.loader(".social-button.twitter", true, "Twitter")
            ajax("get", config.twitter.request_token, "", true, 1).then(result=>{
                window.twitter_app.location.href = result.data
            }).catch(errHandler=>{
                that.loader(".social-button.twitter", false, "Twitter")
                swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");
            })
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
            if (this.registerInfo.password < 4) {
                return swal("Error !", "Password must be more than 4 characters.", "error");
            }
            const that = this;
            that.buttonLoader = true
            ajax("post", config.email.register, `name=${that.registerInfo.name}&surname=${that.registerInfo.surname}&email=${that.registerInfo.email}&password=${that.registerInfo.password}`, true, 1).then(result=>{
                that.buttonLoader = false
                that.loginEmail = true;
                that.loginInfo.email = that.registerInfo.email;
            }).catch(errHandler=>{
                that.buttonLoader = false
                swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");                
            })
        },
        emailLoginHandler: function (e) {
            if (!this.loginInfo.email || !this.loginInfo.password) {
                return swal("Error !", "Missing fields !", "error");
            }
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.loginInfo.email)) {
                return swal("Error !", "Unsupported email address.", "error");
            }
            if (this.loginInfo.password < 4) {
                return swal("Error !", "Password must be more than 4 characters.", "error");
            }
            const that = this;
            that.buttonLoader = true
            ajax("post", config.email.authenticate, `email=${that.loginInfo.email}&password=${that.loginInfo.password}`, true, 1).then(result=>{
                cookier.make("token", result.data, 99, "/");
                window.location.href = config.dashboard_uri
            }).catch(errHandler=>{
                that.buttonLoader = false
                swal(that.language["error"], errHandler.error || that.language["somethingWrong"], "error");
            })
        }
    }
})