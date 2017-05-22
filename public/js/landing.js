const config = require("./../../app/config.js");
const swal = require("./../../bower_components/sweetalert/dist/sweetalert.min.js");

import "./../../bower_components/sweetalert/dist/sweetalert.css";

window.addEventListener("DOMContentLoaded", function () {
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
            ajax.open("GET", config.api_url + config.twitter.access_token + `?oauth_token=${query.oauth_token}&oauth_verifier=${query.oauth_verifier}`, true);
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

    function menu() {
        document.querySelector(".mobil-menu").classList.toggle("active")
    }

    function loader(buttonArea, loading, state) {
        if (loading) {
            document.querySelector(buttonArea).classList.add("loading")
            document.querySelector(buttonArea).disabled = true;
            document.querySelector(buttonArea + " .title").innerHTML = "<div class='loader'></div>"
        } else {
            document.querySelector(buttonArea).classList.remove("loading")
            document.querySelector(buttonArea).disabled = false;
            document.querySelector(buttonArea + " .title").innerHTML = "Login with " + state
        }
    }

    function facebookAuthenticate(access_token, id) {
        var ajax = new XMLHttpRequest()
        ajax.open("POST", config.api_url + config.facebook.authenticate, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            let data = JSON.parse(ajax.response);
            if (data.error) return swal("Error !", data.error, "error")
            localStorage.setItem("socialgin_user_data", data.data);
            window.location.href = config.dashboard_uri
        }
        ajax.send(`access_token=${access_token}&id=${id}`)
    }
    function twitterAuthenticate(access_token) {
        var ajax = new XMLHttpRequest()
        ajax.open("POST", config.api_url + config.twitter.authenticate, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            let data = JSON.parse(ajax.response);
            if (data.error) return swal("Error !", data.error, "error")
            localStorage.setItem("socialgin_user_data", data.data);
            window.location.href = config.dashboard_uri
        }
        ajax.send(`access_token=${access_token}`)
    }
    document.querySelector(".social-button.facebook").addEventListener("click", function (e) {
        FB.login(function (response) {
            if (response.status == "connected") {
                FB.api("/me", "get", {
                    fields: "id,name,picture, email"
                }, function (res) {
                    var access_token = FB.getAuthResponse()['accessToken'];
                    var face_id = res.id;
                    loader(".social-button.facebook", true, "Facebook")
                    var ajax = new XMLHttpRequest()
                    ajax.open("POST", config.api_url + config.facebook.register, true);
                    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    ajax.onload = function () {
                        let data = JSON.parse(ajax.response);
                        console.log(data)
                        if (data.code && data.code != 0) {
                            if (data.code == 1) {
                                return facebookAuthenticate(access_token, face_id)
                            } else if (data.code == -1) {
                                loader(".social-button.facebook", false, "Facebook")
                                swal("Error !", data.error, "error");
                            }
                        }
                        if (data.data == "Success") return facebookAuthenticate(access_token, face_id)
                    }
                    ajax.send(`access_token=${access_token}&id=${face_id}`)
                })
            }
        }, {
            scope: 'public_profile, email'
        });
    })

    document.querySelector(".social-button.twitter").addEventListener("click", function (e) {
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
                ajax.open("POST", config.api_url + config.twitter.register, true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.onload = function () {
                    let data = JSON.parse(ajax.response);
                    console.log(data)
                    if (data.code && data.code != 0) {
                        if (data.code == 1) {
                            return twitterAuthenticate(access_token)
                        } else if (data.code == -1) {
                            loader(".social-button.twitter", false, "Twitter")
                            swal("Error !", data.error, "error");
                        }
                    }
                    if (data.data == "Success") return twitterAuthenticate(access_token)
                }
                ajax.send(`access_token=${access_token}`)
            }
        }, 300)
        loader(".social-button.twitter", true, "Twitter")
        ajax.open("GET", config.api_url + config.twitter.request_token, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.onload = function () {
            let data = JSON.parse(ajax.response);
            console.log(data)
            if (data.error) return swal("Error !", data.error, "error");
            window.twitter_app.location.href = data.data
        }
        ajax.send()
    })
})